const { minifyHtml } = require('./config/minify-html');
const { postcssProcess } = require('./config/postcss.js');
const { esbuild } = require('./config/esbuild.js');

/**
 * 11ty configuration.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'assets': '/',
    'assets/img/meta/favicon.ico': '/favicon.ico',
  });

  eleventyConfig.on('eleventy.before', esbuild)
  eleventyConfig.addAsyncFilter('postcss', postcssProcess);
  eleventyConfig.addTransform('minifyHtml', minifyHtml);

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', '11ty.js'],
    dir: {
      input: 'site',
      output: 'dist',
      includes: '_includes',
      data: '_data',
      layouts: '_layouts',
    },
  };
};
