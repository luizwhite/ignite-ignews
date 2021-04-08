import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/client';
import { RichText, Date } from 'prismic-reactjs';

import { getPrismicClient } from 'services/prismic';

import { Container, PostArticle, Content } from 'styles/posts';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: any;
    updatedAt: string;
  };
}

interface MySession extends Session {
  user: Session['user'] & {
    activeSubscription: boolean;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [session] = useSession() as [MySession | null | undefined, boolean];
  const router = useRouter();

  useEffect(() => {
    if (!session?.user.activeSubscription)
      router.push(`/posts/preview/${post.slug}`);
  }, [session?.user]);

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <Container>
        <PostArticle>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <Content>
            <RichText render={post.content} />
          </Content>
        </PostArticle>
      </Container>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  const { slug } = params!;

  if (!session?.user.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient();
  const document = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(document.data.title),
    content: document.data.content,
    updatedAt: Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(Date(document.last_publication_date || '')),
  };

  return {
    props: {
      post,
    },
  };
};
