import express from 'express';
import cors from 'cors';
import { scrape } from './scrapers/podiumAmountScraper.ts';

await import('./scrapers/teamsScraper.ts');
await import('./scrapers/resultUrlGenerator.ts');

const apiServer = express();
const PORT = 3001;

apiServer.use(cors());

apiServer.get('/api/scrape', async (req, res) => {
    console.log('/!\\ request recebida - iniciando scraper...');
    try {
        const data = await scrape();
        res.json(data);
        console.log('[ OK ] dados enviados.');
    } catch (error) {
        console.error('[ X ] erro no scraper: ', error);
        res.status(500).json({ error: 'Falha ao extrair dados - 500 INTERNAL SERVER ERROR' });
    }
});

apiServer.listen(PORT, () => {
    console.log(`scraper api url: http://localhost:${PORT}`);
});

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));