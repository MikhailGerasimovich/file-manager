import zlib from 'zlib';
import stream from 'stream/promises';
import fs from 'fs';
import { makeFullPath, hasAccessTo, commandHandler } from '../pathHandler.js';

export const brotliCompress = async (command) => {
    const pathToFileStr = commandHandler(command)[1];
    const pathToBrStr = commandHandler(command)[2];

    const pathToFile = await hasAccessTo(pathToFileStr);
    const pathToBr = makeFullPath(pathToBrStr);

    const brotli = zlib.createBrotliCompress();
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToBr);

    await stream.pipeline(readStream, brotli, writeStream);
}

export const brotliDecompress = async (command) => {
    const pathToBrStr = commandHandler(command)[1];
    const pathToFileStr = commandHandler(command)[2];

    const pathToBr = await hasAccessTo(pathToBrStr);
    const pathToDecompressFile = makeFullPath(pathToFileStr);

    const brotliDecompress = zlib.createBrotliDecompress();
    const readStream = fs.createReadStream(pathToBr);
    const writeStream = fs.createWriteStream(pathToDecompressFile);

    await stream.pipeline(readStream, brotliDecompress, writeStream);
}