import { GetServerSideProps } from 'next';
import { loadPages } from '../api/load-pages';
import Home, { HomeProps } from '../templates/Home';

export default function Page({ data }: HomeProps) {
  return <Home data={data} />;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx,
) => {
  let data = null;

  try {
    data = await loadPages(ctx.params.slug as string);
  } catch (e) {
    data = null;
  }

  if (!data || !data.length) return { notFound: true };

  return {
    props: {
      data,
    },
  };
};
