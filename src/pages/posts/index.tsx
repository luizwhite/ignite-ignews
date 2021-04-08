import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText, Date } from 'prismic-reactjs';

import { getPrismicClient } from 'services/prismic';

import { Container, PostsListContainer } from 'styles/posts';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <Container>
        <PostsListContainer>
          {posts.map((post) => (
            <Link href={'/posts/' + post.slug} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </PostsListContainer>
      </Container>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    },
  );

  const posts = response.results.map((post) => ({
    slug: post.uid,
    title: RichText.asText(post.data.title),
    excerpt:
      post.data.content.find(
        ({ type }: { type: string }) => type === 'paragraph',
      )?.text ?? '',
    updatedAt: Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(Date(post.last_publication_date || '')),
  }));

  return {
    props: {
      posts,
    },
  };
};
