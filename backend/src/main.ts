import express from 'express';
import cors from 'cors';
import { AddressInfo } from 'net';
import { setTimeout } from 'timers/promises';
import { scrape } from './scrapers/podiumAmountScraper.ts';

await import('./scrapers/teamsScraper.ts');
await import('./scrapers/resultUrlGenerator.ts');

const apiServer = express();

const listenerPort = 3001;

apiServer.use(cors());

apiServer.get('/', (req, res) => {
    res.send('<h1>RoboCore Scraper API</h1><a href="https://github.com/vitorwille" target="_blank">github.com/vitorwille</a>');
});

apiServer.get('/api/scrape', async (req: any, res: any) => {
    console.log('\n[ i ] Request recebida - realizando scraping...');

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        const results = await scrape((team) => {
            res.write(`data: ${JSON.stringify(team)}\n\n`);
        });

        res.write(`event: done\ndata: ${JSON.stringify(results)}\n\n`);
        res.end();
        console.log('[ i ] Scraping finalizado.\n');
    } catch (error) {
        console.error('[ X ] Erro no scraper: ', error);
        res.write(`event: error\ndata: ${JSON.stringify({ error: 'falha ao extrair dados' })}\n\n`);
        res.end();
    }

});

const server = apiServer.listen(listenerPort, 'localhost', () => {
    const addressInfo = server.address() as AddressInfo;
    const address = addressInfo.address === '::' ? 'localhost' : addressInfo.address;
    console.log(`\n-------------------------------------------\n[ OK ] API rodando: http://${address}:${listenerPort}\n-------------------------------------------`);
});


server.on('error', async (e: any) => {
    if (e.code === 'EADDRINUSE') {
        console.error(`\n[ X ] Erro: Porta ${listenerPort} ocupada. Scraper encerrado.`);
        await setTimeout(500);
        console.log('[ i ] Para garantir que o scraper nao esteja rodando de fundo, execute: ')
        console.log('[ i ] Unix: "pkill -f node" | Windows: "taskkill /f /im node.exe"\n')
        process.exit(1);
    }
});

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));