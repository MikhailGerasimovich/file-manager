export const isValidInput = commandArray => {
    const action = commandArray[0];

    switch (action) {
        case 'ls':
        case 'up':
        case '.exit': {
            if (commandArray.length === 1) {
                return true;
            }
            break;
        }
        case 'cd':
        case 'cat':
        case 'add':
        case 'rm':
        case 'os':
        case 'mkdir':
        case 'rmdir':
        case 'hash': {
            if (commandArray.length === 2) {
                return true;
            }
            break;
        }
        case 'rn':
        case 'cp':
        case 'mv':
        case 'compress':
        case 'decompress': {
            console.log(commandArray);
            if (commandArray.length === 3) {
                return true;
            }
            break;
        }
        default: {
            return false;
        }
    }
}