// scripts/copy-html.js
import { readFileSync, writeFileSync } from 'fs';

const base = readFileSync('dist/index.html', 'utf-8');

const pages = [
  {
    file: 'dist/team.html',
    title: 'Team Lookup',
    description: 'Look up a team by ID or URL',
  },
  {
    file: 'dist/stats-leaders.html',
    title: 'Stats Leaderboards',
    description: 'League-wide stats leaderboards',
  },
  {
    file: 'dist/sickos.html',
    title: 'Attribute Sickos',
    description: 'Top attribute ratings across the league',
  },
];

for (const page of pages) {
  let html = base
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace('</head>', `
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
</head>`);

  writeFileSync(page.file, html);
  console.log(`wrote ${page.file}`);
}