import { mapMenu } from './map-menu';
import { mapSections } from './map-sections';

export const mapData = (pagesData = [{}]) => {
  if (pagesData.length && Object.keys(pagesData[0]).length) {
    return pagesData.map((data) => {
      const {
        footer_text: footerHtml,
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

  return {
    footerHtml: '',
    slug: '',
    title: '',
    sections: mapSections(),
    menu: mapMenu(),
  };
};
