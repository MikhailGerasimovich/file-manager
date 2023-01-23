import * as path from 'path';
import fs from 'fs/promises';
import { dir } from './dispatcher.js';

export const hasAccessTo = async (p) => {//p -  received path
    const normalizePath = makeFullPath(p);

    await fs.access(normalizePath);
    return normalizePath;
}

export const makeFullPath = (p) => {
    if (!p) {
        throw new Error('filename not received');
    }

    if (!p.includes(':')) {
        p = path.join(dir.currentDir, p);
    }

    return path.normalize(p);
}

export const commandHandler = (input) => {
    let args = input.split(" ");
    const reg = /"/g;
    if (reg.test(args)) {
        const regExp = /["] | ["]/;
        args = args.join(" ").split(regExp).map((arg) => arg.replace(reg, ""));
    }

    return args;
}
