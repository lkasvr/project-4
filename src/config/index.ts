export default {
  url: 'https://strapi-landing-pages-lvr-v3.herokuapp.com',
  urlAPI: 'https://strapi-landing-pages-lvr-v3.herokuapp.com/api/pages',
  siteName: 'Dominic Esquadrais',
  defaultSlug: 'dominic', // 'landing-page' <- (correto) ajustar na API
  ruleAPICall: (slug) => {
    return `?filters[slug]=${slug.replace(/[^a-z0-9-_]/gi, '')}&populate=deep`;
  },
};
