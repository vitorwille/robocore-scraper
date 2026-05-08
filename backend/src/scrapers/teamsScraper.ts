import * as cheerio from 'cheerio';

const $ = await cheerio.fromURL("https://events.robocore.net/teams/");

const $equipesHome = $('td a');
let equipes: string[] = [];
let equipeNames: string[] = [];

for (let i = 0; i < $equipesHome.length; i++) {
    equipes.push(
        $equipesHome[i].attribs.href
    )
    equipeNames.push($equipesHome.eq(i).text().trim());
}

(globalThis as any).equipes = equipes;
(globalThis as any).equipeNames = equipeNames;

export { };