import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
// import getRawBody from 'raw-body';
import Stripe from 'stripe';

import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let event: Stripe.Event;

    const bufferBody = await buffer(req);
    // const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'] as string | string[] | Buffer;

    try {
      event = stripe.webhooks.constructEvent(
        bufferBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err) {
      console.log({ error: err.message });
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const relevantEvents = new Set([
      'checkout.session.completed',
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted',
    ]);

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;

            if (subscription.customer)
              await saveSubscription(
                subscription.id,
                subscription.customer.toString(),
                event.type === 'customer.subscription.created',
              );
            break;

          case 'checkout.session.completed':
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            if (checkoutSession.customer && checkoutSession.subscription)
              await saveSubscription(
                checkoutSession.subscription.toString(),
                checkoutSession.customer.toString(),
              );
            break;

          default:
            throw Error(`Unhandled event type ${event.type}`);
        }
      } catch (err) {
        return res.json({ error: 'Webhook handler failed' });
      }

      return res.json({ received: true });
    } else return res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }
};
