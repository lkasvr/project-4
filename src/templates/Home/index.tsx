import Head from 'next/head';

import { Base } from '../Base';
import {
  GridTwoColumns,
  GridTwoColumnsProps,
} from '../../components/GridTwoColumns';
import { GridContent, GridContentProps } from '../../components/GridContent';
import { GridText, GridTextProps } from '../../components/GridText';
import { GridImage, GridImageProps } from '../../components/GridImage';
import config from '../../config';
import { theme } from '../../styles/theme';
import { MenuLinkProps } from '../../components/MenuLink';
import { LogoLinkProps } from '../../components/LogoLink';

export type SectionProps =
  | GridImageProps
  | GridTextProps
  | GridTwoColumnsProps
  | GridContentProps;

export type PageData = {
  title: string;
  slug: string;
  footerHtml: string;
  menu: LogoLinkProps & { links: MenuLinkProps[] };
  sections: SectionProps[];
};

export type HomeProps = {
  data: PageData[];
};

function Home({ data }: HomeProps) {
  const { menu, sections, footerHtml, slug, title } = data[0];
  const { links, text, link, srcImg } = menu;

  return (
    <Base
      links={links}
      footerHtml={footerHtml}
      logoData={{ text, link, srcImg }}
    >
      <Head>
        <title>{`${title} | ${config.siteName}`}</title>
        <meta name="theme-color" content={theme.colors.primaryColor} />
        <meta
          name="description"
          content="Um portfólio baseado em landing pages."
        />
      </Head>
      {sections.map((section, i) => {
        const { component } = section;
        const key = `${slug}-${i}`;

        if (component === 'section.section-two-columns')
          return (
            <GridTwoColumns key={key} {...(section as GridTwoColumnsProps)} />
          );

        if (component === 'section.section-content')
          return <GridContent key={key} {...(section as GridContentProps)} />;

        if (component === 'section.section-grid-text')
          return <GridText key={key} {...(section as GridTextProps)} />;

        if (component === 'section.section-grid-image')
          return <GridImage key={key} {...(section as GridImageProps)} />;
      })}
    </Base>
  );
}

export default Home;
