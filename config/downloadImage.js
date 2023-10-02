const {basename} = require('path');
const {writeFileSync} = require('fs');

async function download(url, path) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  writeFileSync(path, Buffer.from(buffer));
}

async function downloadImage(markdown) {
  const regex = /!\[.*?\]\((.*?)\)/g;
  const matches = markdown.matchAll(regex);
  for (const match of matches) {
    const url = match[1];
    const path = 'dist/img/' + basename(url);
    await download(url, path);
    markdown = markdown.replace(url, path);
  }

  return markdown;
}

module.exports = {downloadImage};
