import { inputCommand as readline } from './src/readline.js';
import { MESSAGE } from './src/message.js';
import { dir, dispatcher } from './src/dispatcher.js';

const start = async () => {
    const [key, value] = process.argv[2].split('=');
    if (key === '--username' && value) {
        process.env.FILE_MANAGER_USER = value;
    } else {
        process.env.FILE_MANAGER_USER = 'Unknown';
    }
    console.log(`Welcome to the File Manager, ${process.env.FILE_MANAGER_USER}!`);

    while (true) {
        try {
            console.log(`You are currently in ${dir.currentDir}`);
            const command = await readline();
            await dispatcher(command);
        } catch (error) {
            console.log(MESSAGE.OPERATION_FAILED);
        }
    }
}

await start();
