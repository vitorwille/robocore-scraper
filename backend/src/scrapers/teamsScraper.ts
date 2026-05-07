import * as cheerio from 'cheerio';

const $ = await cheerio.fromURL("https://events.robocore.net/teams/");

const $top15Equipes = $('td a');
let equipes: string[] = [];
let equipeNames: string[] = [];

for (let i = 0; i < 15; i++) {
    equipes.push(
        $top15Equipes[i].attribs.href
    )
    equipeNames.push($top15Equipes.eq(i).text().trim());
}

(globalThis as any).equipes = equipes;
(globalThis as any).equipeNames = equipeNames;

export { };