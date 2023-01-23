import fs from 'fs/promises';
import crypto from 'crypto';
import { hasAccessTo, commandHandler } from '../pathHandler.js';

export const hash = async (command) => {
    const pathStr = commandHandler(command)[1];
    const pathToFile = await hasAccessTo(pathStr);
    const fileData = await fs.readFile(pathToFile);
    const hash = crypto.createHash('sha256').update(fileData).digest('hex');
    console.log(hash);
}