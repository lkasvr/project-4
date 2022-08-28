import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { mapData } from '../../api/map-data';

import { Base } from '../Base';
import { PageNotFound } from '../PageNotFound';
import { Loading } from '../Loading';
import { GridTwoColumns } from '../../components/GridTwoColumns';
import { GridContent } from '../../components/GridContent';
import { GridText } from '../../components/GridText';
import { GridImage } from '../../components/GridImage';

import config from '../../config';

function Home() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const isMounted = useRef(true);

  useEffect(() => {
    const pathName = location.pathname.replace(/[^a-z0-9-_]/gi, '');
    const slug = pathName ? pathName : config.defaultSlug;

    const load = async () => {
      try {
        const data = await fetch(`${config.url}${slug}&populate=deep`);
        const json = await data.json();
        const { attributes } = json.data[0];
        const pageData = mapData([attributes]);
        setData(() => pageData[0]);
      } catch (e) {
        setData(() => undefined);
      }
    };

    if (isMounted.current === true) load();

    return () => (isMounted.current = false);
  }, [location]);

  useEffect(() => {
    if (data === undefined) document.title = 'Página não encontrada!';
    if (data && !data.slug) document.title = 'Carregando...';
    if (data && data.title) document.title = data.title;
  }, [data]);

  if (data === undefined) return <PageNotFound />;

  if (data && !data.slug) return <Loading />;

  const { menu, sections, footerHtml, slug } = data;
  const { links, text, link, srcImg } = menu;

  return (
    <Base
      links={links}
      footerHtml={footerHtml}
      logoData={{ text, link, srcImg }}
    >
      {sections.map((section, i) => {
        const { component } = section;
        const key = `${slug}-${i}`;

        if (component === 'section.section-two-columns')
          return <GridTwoColumns key={key} {...section} />;

        if (component === 'section.section-content')
          return <GridContent key={key} {...section} />;

        if (component === 'section.section-grid-text')
          return <GridText key={key} {...section} />;

        if (component === 'section.section-grid-image')
          return <GridImage key={key} {...section} />;
      })}
    </Base>
  );
}

export default Home;
