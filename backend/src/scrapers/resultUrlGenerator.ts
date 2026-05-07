/// <reference path="../globals.d.ts" />

const baseUrl = 'https://events.robocore.net';
let resultUrls: string[] = [];

for (let i = 0; i < equipes?.length; i++) {
    resultUrls.push(baseUrl + equipes[i] + '/results')
}

(globalThis as any).resultUrls = resultUrls;

export { };
