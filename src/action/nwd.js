import path from 'path';
import fs from 'fs/promises';
import { dir } from '../dispatcher.js';
import { hasAccessTo, commandHandler } from '../pathHandler.js';

export const up = async (command) => {
    if (command === 'up') {
        dir.currentDir = await hasAccessTo(`${dir.currentDir}/..`);
    } else {
        throw new Error('Invalid params');
    }
}

export const cd = async (command) => {
    const path = commandHandler(command)[1];
    dir.currentDir = await hasAccessTo(path);
}

export const ls = async () => {
    const currentDir = dir.currentDir;
    const data = await fs.readdir(currentDir);
    const result = [];
    for (let file of data) {
        try {
            let type = 'undefined';
            if ((await fs.stat(path.join(currentDir, file))).isDirectory()) {
                type = 'directory';
            }
            if ((await fs.stat(path.join(currentDir, file))).isFile()) {
                type = 'file';
            }

            result.push({name: file, type: type});

        } catch (error) {}
    }

    result.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));

    console.table(result);
}