import stream from 'stream/promises';
import fs from 'fs/promises';
import * as path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { makeFullPath, hasAccessTo, commandHandler } from '../pathHandler.js';

export const cat = async (command) => {
    const pathToFileStr = commandHandler(command)[1];
    const pathToFile = await hasAccessTo(pathToFileStr);
    const readStream = createReadStream(pathToFile, { encoding: 'utf8' });
    readStream.pipe(process.stdout)
    await new Promise((resolve, reject) => {
        readStream.on('end', () => resolve());
        readStream.on('error', () => reject());
    });
    // const fileData = await fs.readFile(await pathAccessHandler(pathToFile), { encoding: 'utf8' });
    // console.log(fileData)
}

export const add = async (command) => {
    const pathStr = commandHandler(command)[1];
    const pathToFile = makeFullPath(pathStr);
    await fs.writeFile(pathToFile, '');
}

export const rn = async (command) => {
    const oldPathStr = commandHandler(command)[1];
    const newPathStr = commandHandler(command)[2];
    const oldPathToFile = await hasAccessTo(oldPathStr);
    const newPathToFile = makeFullPath(newPathStr);

    await fs.rename(oldPathToFile, newPathToFile);
}

export const cp = async (command) => {
    const oldPathStr = commandHandler(command)[1];
    const newPathStr = commandHandler(command)[2];

    const oldPathToFile = await hasAccessTo(oldPathStr);
    const newPathToFile = makeFullPath(path.join(newPathStr, path.basename(oldPathToFile)));

    const readStream = createReadStream(oldPathToFile);
    const writeStream = createWriteStream(newPathToFile);
    await stream.pipeline(readStream, writeStream);
    // readStream.pipe(writeStream);
}

export const rm = async (command) => {
    const pathStr = commandHandler(command)[1];
    const pathToFile = await hasAccessTo(pathStr)
    await fs.rm(pathToFile);
}

export const mv = async (command) => {
    await cp(command);
    await rm(command);
}