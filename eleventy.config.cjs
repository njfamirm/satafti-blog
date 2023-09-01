const { minifyHtml } = require("./config/minify-html");
const { postcssProcess } = require("./config/postcss.js");
const { esbuildTransform } = require("./config/esbuild.js");
const { date } = require("./config/date.js");
const { imageShortcode } = require("./shortcode/image.js");
const timeToRead = require("eleventy-plugin-time-to-read");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

/**
 * 11ty configuration.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns {ReturnType<import("@11ty/eleventy/src/defaultConfig")>}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "assets": "/",
    "img": "/img",
    "img/meta/favicon.ico": "/favicon.ico",
  });

  eleventyConfig.addWatchTarget("site");

  // eleventyConfig.on("eleventy.before", esbuildBuild);

  eleventyConfig.addShortcode("image", imageShortcode);

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(timeToRead);

  eleventyConfig.addFilter("humanReadableDate", date);
  eleventyConfig.addAsyncFilter("postcss", postcssProcess);
  eleventyConfig.addAsyncFilter("esbuild", esbuildTransform);

  eleventyConfig.addTransform("minifyHtml", minifyHtml);
  eleventyConfig.addTransform("trimer", (content) => content.trim());

  return {
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "11ty.js", "md"],
    dir: {
      input: "site",
      output: "dist",
      includes: "_includes",
      data: "_data",
      layouts: "_layouts",
    },
  };
};
