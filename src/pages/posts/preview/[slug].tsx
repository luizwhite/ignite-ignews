import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { RichText, Date } from 'prismic-reactjs';

import { getPrismicClient } from 'services/prismic';

import {
  Container,
  PostArticle,
  Content,
  ContinueReadingContainer,
} from 'styles/posts';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: any;
    updatedAt: string;
  };
}

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const [session, loading] = useSession();
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user.activeSubscription) router.push(`/posts/${post.slug}`);
    else if (!loading) setShowContent(true);
  }, [session, loading]);

  return loading || !showContent ? (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <Container>
        <PostArticle />
      </Container>
    </>
  ) : (
    showContent && (
      <>
        <Head>
          <title>{post.title} | ig.news</title>
        </Head>

        <Container>
          <PostArticle>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <Content $preview>
              <RichText render={[...post.content].splice(0, 3)} />
            </Content>
            <ContinueReadingContainer>
              Wanna continue reading?
              <Link href="/">
                <a>Subscribe now 🤗</a>
              </Link>
            </ContinueReadingContainer>
          </PostArticle>
        </Container>
      </>
    )
  );
};

export default PostPreview;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [], // quais gerar durante a build (no caso, nenhum - será gerado no primeiro acesso)
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;

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
    revalidate: 60 * 30, // 30 minutos
  };
};
