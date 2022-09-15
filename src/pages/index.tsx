import { GetStaticProps } from 'next';

import Home, { HomeProps } from '../templates/Home';

import { loadPages } from '../api/load-pages';

export default function Index({ data = null }: HomeProps) {
  return <Home data={data} />;
}

export const getServerSideProps: GetStaticProps<HomeProps> = async () => {
  let data = null;

  try {
    data = await loadPages('dominic');
  } catch (e) {
    console.error(`Error: ${e} --> in local: /pages/index.jsx -> line 20`);
  }

  if (!data || !data.length) return { notFound: true };

  return {
    props: {
      data,
    },
  };
};
