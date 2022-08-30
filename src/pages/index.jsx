import P from 'prop-types';
import { mapData } from '../api/map-data';

import styled from 'styled-components';
import Home from '../templates/Home';

import config from '../config';

export default function Index({ data = null }) {
  console.log(data);
  return <Home data={data} />;
}

export const getStaticProps = async () => {
  const raw = await fetch(config.url + config.defaultSlug);
  const json = await raw.json();
  const data = mapData(json.data);

  return {
    props: {
      data,
    },
  };
};

Index.propTypes = {
  data: P.array,
};
