'use strict';

const https = require('https');
const gemojiDbUrl = 'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json';
const ignore = ['feet', 'spider_web', 'speak_no_evil', 'hear_no_evil', 'see_no_evil', 'pig_nose'];

function filter (data) {
  return data
    .filter(entry => entry.category === 'Nature')
    .splice(0, 88)
    .filter(entry => ignore.indexOf(entry.aliases[0]) === -1);
}

function getNames (data) {
  return data.map((entry) => {
    return `':${entry.aliases[0]}:'`;
  });
}

https.get(gemojiDbUrl, (res) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    console.log(getNames(filter(JSON.parse(rawData))).join(' '));
  });
}).on('error', (e) => {
  console.error(e);
  process.exit(1);
});