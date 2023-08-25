const { build, transform } = require("esbuild");
const { env } = require("process");

const debugMode = env.NODE_ENV !== "production";
async function esbuildBuild() {
  try {
    await build({
      entryPoints: [`site/_js/main.ts`],
      outdir: "dist/",
      logLevel: "info",
      platform: "browser",
      target: "es2018",
      format: "esm",
      minify: true,
      treeShaking: true,
      sourcemap: true,
      sourcesContent: debugMode,
      bundle: true,
      charset: "utf8",
      legalComments: "none",
      // splitting: true,
    });
  } catch (err) {
    console.error('esbuildProcess Error: ', err);
  }
}

async function esbuildTransform(content) {
  try {
    const result = await transform(content, {
      logLevel: "info",
      platform: "browser",
      target: "es2018",
      format: "esm",
      minify: true,
      treeShaking: true,
      sourcemap: true,
      // bundle: true,
      // splitting: true,
      charset: "utf8",
      legalComments: "none",
    });

    return result.code;
  } catch (err) {
    console.error('esbuildTransform Error: ', err);
    return content;
  }
}

module.exports = { esbuildBuild, esbuildTransform };
