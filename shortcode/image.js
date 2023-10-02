const imagePlugin = require('@11ty/eleventy-img');

async function image(src, alt = '') {
  // support remote img
  src.startsWith('/') ? (src = './assets/' + src) : src;

  let metadata = await imagePlugin(src, {
    hashLength: 8,
    urlPath: '/img/',
    outputDir: 'dist/img',
    widths: ['auto'],
    formats: ['avif', 'webp', 'jpeg'],
  });
  let imageAttributes = {
    alt,
    loading: 'lazy',
    decoding: 'async',
  };
  return imagePlugin.generateHTML(metadata, imageAttributes);
}

module.exports = {image};
