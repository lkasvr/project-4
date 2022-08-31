import { mapData } from './map-data';
import config from '../config';

export const loadPages = async (slug = '') => {
  const cleanSlug = slug
    ? `?filters[slug]=${slug.replace(/[^a-z0-9-_]/gi, '')}&populate=deep`
    : '';
  const url = `${config.url}/api/pages/${cleanSlug}`;

  const raw = await fetch(url);
  const json = await raw.json();
  const data = mapData(json.data);

  return data;
};
