import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;
  height: calc(100vh - 5rem);
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Content = styled.section`
  max-width: 520px;

  > span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  h1 {
    font-weight: 900;
    font-style: normal;
    font-size: 4.5rem;
    line-height: 4.5rem;
    margin-top: 2.5rem;

    span {
      color: var(--cyan-500);
    }
  }

  p {
    font-size: 1.5rem;
    line-height: 2.25rem;
    margin-top: 1.5rem;

    span {
      color: var(--cyan-500);
      font-weight: bold;
    }
  }

  button {
    margin-top: 2.5rem;
  }
`;
