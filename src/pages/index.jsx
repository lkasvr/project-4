import P from 'prop-types';
import { mapData } from '../api/map-data';

import styled from 'styled-components';
import Home from '../templates/Home';

import { loadPages } from '../api/load-pages';

export default function Index({ data = null }) {
  return <Home data={data} />;
}

export const getStaticProps = async () => {
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

Index.propTypes = {
  data: P.array,
};
