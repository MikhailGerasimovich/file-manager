import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process'

export const r = readline.createInterface(stdin, stdout);

r.on('close', () => {
    process.exit(0);
});

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${process.env.FILE_MANAGER_USER}, goodbye!`);
})

export const inputCommand = async () => {
    return await r.question('>>> ');
}