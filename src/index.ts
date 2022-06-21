import fs from 'fs/promises';
import http from 'http';
import url from 'url';
import { calculator } from './calculator';

const PORT = process.env.PORT || 3601;

export const server = http.createServer(async (req, res) => {
    const path = [...url.parse(req.url as string).path];
    const pathName = url.parse(req.url as string).pathname;
    let dataFile: string = `./data/${pathName}.txt`;
    console.log(dataFile);
    let a = path[1];

    let b = path[2];

    console.log(path);

    let results = calculator(a as number, b as number);

    try {
        const data = await fs.readFile(dataFile, {
            encoding: 'utf-8',
        });

        const template = `<p>${a} + ${b}  = ${results.add}</p>
        <p>${a} - ${b} = ${results.subtract}</p>
        <p>${a} * ${b} = ${results.multiply}</p>
        <p>${a} / ${b} = ${results.divide}</p>`;
        res.end(template);
    } catch (err) {
        res.end('Error');
        server.emit('error', err);
    }
});
