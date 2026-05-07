/// <reference path="../globals.d.ts" />
import * as cheerio from 'cheerio';

export async function scrape() {
    const resultUrls = (globalThis as any).resultUrls;
    const equipes = (globalThis as any).equipes;
    const equipeNames = (globalThis as any).equipeNames;

    const results = [];
    for (let i = 0; i < equipes?.length; i++) {
        let $;
        try {
            $ = await cheerio.fromURL(resultUrls[i]);
        } catch (e) {
            console.error(`Erro ao acessar ${resultUrls[i]}:`, e);
            continue;
        }

        let podium1 = 0;
        let podium2 = 0;
        let podium3 = 0;

        $('h6').each((_, el) => {
            const text = $(el).text();
            if (text.includes('(1° Lugar)')) podium1++;
            if (text.includes('(2° Lugar)')) podium2++;
            if (text.includes('(3° Lugar)')) podium3++;
        });

        const total = podium1 + podium2 + podium3;
        results.push({
            id: i + 1,
            name: equipeNames?.[i] || `Equipe ${i + 1}`,
            top1: podium1,
            top2: podium2,
            top3: podium3,
            total
        });
        console.log(`${equipeNames?.[i] || `Equipe ${i + 1}`}: Top 1: ${podium1} | Top 2: ${podium2} | Top 3: ${podium3} | Total: ${total}`);
    }

    results.sort((a, b) => b.total - a.total);
    results.forEach((r, idx) => { r.rank = idx + 1; });

    return results;
}
