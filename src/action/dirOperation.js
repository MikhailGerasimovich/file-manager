import fs from 'fs/promises';
import { makeFullPath, hasAccessTo, commandHandler } from '../pathHandler.js';

export const mkdir = async (command) => {
    const pathStr = commandHandler(command)[1];
    const pathToDir = makeFullPath(pathStr);
    await fs.mkdir(pathToDir);
}

export const rmdir = async (command) => {
    const pathStr = commandHandler(command)[1];
    const pathToDir = await hasAccessTo(pathStr);
    await fs.rmdir(pathToDir);
}
