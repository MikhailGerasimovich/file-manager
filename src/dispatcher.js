import * as os from 'os';
import { r } from './readline.js';
import * as op from './action/index.js';
import { commandHandler } from './pathHandler.js';
import { isValidInput } from './validateInput.js';
import { MESSAGE } from './message.js';

export const dir = {
  currentDir: os.homedir(),
};

export const dispatcher = async (command) => {
    const commandArray = commandHandler(command)
    const action = commandArray[0];

    if (!isValidInput(commandArray)) {
        console.log(MESSAGE.INVALID_INPUT);
        return;
    }

    switch (action) {
        case 'cd': {
            await op.cd(command);
            break;
        }
        case 'ls': {
            await op.ls();
            break;
        }
        case 'up': {
            await op.up(command);
            break;
        }
        case 'cat': {
            await op.cat(command);
            break;
        }
        case 'add': {
            await op.add(command);
            break;
        }
        case 'rn': {
            await op.rn(command);
            break;
        }
        case 'cp': {
            await op.cp(command);
            break;
        }
        case 'mv': {
            await op.mv(command);
            break;
        }
        case 'rm': {
            await op.rm(command);
            break;
        }
        case 'mkdir': {
            await op.mkdir(command);
            break;
        }
        case 'rmdir': {
            await op.rmdir(command);
            break;
        }
        case 'os': {
            op.osInfo(command);
            break;
        }
        case 'hash': {
            await op.hash(command);
            break;
        }
        case 'compress': {
            await op.brotliCompress(command);
            break;
        }
        case 'decompress': {
            await op.brotliDecompress(command);
            break;
        }
        case '.exit': {
            r.close();
            break;
        }
        default: {
            console.log(MESSAGE.INVALID_INPUT);
        }
    }
}