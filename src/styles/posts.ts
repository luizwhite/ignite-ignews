import styled, { css } from 'styled-components';
import { RichText } from 'prismic-reactjs';

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const PostsListContainer = styled.div`
  max-width: 720px;
  margin: 5rem auto 0;

  a {
    display: block;
    transition: color 0.2s;

    & + a {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid var(--gray-700);
    }

    &:hover {
      color: var(--yellow-500);
    }

    time {
      font-size: 1rem;
      display: flex;
      align-items: center;
      color: var(--gray-300);
    }

    strong {
      font-size: 1.5rem;
      margin-top: 1rem;
      line-height: 2rem;
    }

    p {
      color: var(--gray-300);
      margin-top: 0.5rem;
      line-height: 1.625rem;
    }
  }
`;

export const PostArticle = styled.article`
  max-width: 720px;
  margin: 5rem auto 0;

  h1 {
    font-size: 3rem;
    font-weight: 900;
  }

  time {
    display: block;
    font-size: 1rem;
    color: var(--gray-300);
    margin-top: 1rem;
  }
`;

export const Content = styled.div<{ $preview?: boolean }>`
  margin-top: 2rem;
  line-height: 2rem;
  font-size: 1.125rem;
  color: var(--gray-100);

  ${({ $preview }) =>
    $preview &&
    css`
      background-image: linear-gradient(var(--gray-100), transparent);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    `}

  p,
  ul {
    margin: 1.5rem 0;
  }

  ul {
    padding-left: 1.5rem;
    list-style: disc;

    li {
      margin: 0.5rem 0;
    }
  }
`;

export const ContinueReadingContainer = styled.div`
  padding: 2rem;
  margin: 4rem 0 2rem;

  border-radius: 100px;
  background-color: var(--gray-850);

  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;

  a {
    color: var(--yellow-500);
    margin-left: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;
