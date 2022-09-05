import { mapData } from './map-data';
import config from '../config';

export const loadPages = async (slug = '') => {
  const cleanSlug = slug ? config.ruleAPICall(slug) : '';
  const url = `${config.url}/api/pages/${cleanSlug}`;

  const raw = await fetch(url);
  const json = await raw.json();
  const data = mapData(json.data);

  return data;
};
