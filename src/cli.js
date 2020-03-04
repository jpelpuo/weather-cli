import minimist from 'minimist';
import {version} from './version'
import {help} from './help'
import {now} from './now'
import {forecast} from './forecast'
import {configure} from './configure'

export const cli = async argsArray => {
    const args = minimist(argsArray.slice(2));

    let cmd = args._[0] || 'help';

    if (args.version || args.v) {
        cmd = 'version';
    }

    if (args.help || args.h) {
        cmd = 'help';
    }

    switch (cmd) {
        case 'help':
            help(args);
            break;
        case 'version':
            version();
            break;
        case 'now':
            now(args);
            break;
        case 'forecast':
            forecast(args);
            break;
        case 'config':
            configure(args);
            break;
        default:
            console.error(`${cmd} is not a valid command`);
            break;
    }
}