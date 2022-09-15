/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageData } from '../templates/Home';
import { mapMenu } from './map-menu';
import { mapSections } from './map-sections';

export const mapData = (pagesData = [{}] as any): PageData[] => {
  if (pagesData.length && Object.keys(pagesData[0]).length) {
    return pagesData.map((data: any): PageData => {
      const {
        footer_text: footerHtml = '',
        slug,
        title,
        sections = [],
        menu = {},
      } = data.attributes;

      return {
        footerHtml,
        slug,
        title,
        sections: mapSections(sections),
        menu: mapMenu(menu),
      };
    });
  }

  return [
    {
      footerHtml: '',
      slug: '',
      title: '',
      sections: mapSections(),
      menu: mapMenu(),
    },
  ];
};
