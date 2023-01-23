import os from 'os'

export const osInfo = (command) => {
    const flag = command.split(' ')[1];
    if (flag === '--EOL' || flag === '--eol') {
        console.log(JSON.stringify(os.EOL));
        return;
    }

    if (flag === '--cpus') {
        const result = os.cpus().map(val => ({ Model: val.model.trim(), Rate: (val.speed / 1000) }))
        console.table(result);
        return;
    }

    if (flag === '--homedir') {
        console.log(os.homedir());
        return;
    }

    if (flag === '--username') {
        console.log(os.userInfo().username);
        return;
    }

    if (flag === '--architecture') {
        console.log(os.arch());
    }
}