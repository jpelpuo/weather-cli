import chalk from 'chalk';

const menus = {
    main : `
    ${chalk.greenBright('weather [command] <options>')}

        ${chalk.blueBright('now')}      | show the weather current weather
        ${chalk.blueBright('help')}     | show help menu for all commands
        ${chalk.blueBright('config')}   | set API Key, default city ID, temperature units
        ${chalk.blueBright('forecast')} | show weather forecast for specific city
        ${chalk.blueBright('version')}  | show version information
    `,
    now : `...//`,
    forecast : `...//`,
    config : `...//`
}

export const help = async args => {
    const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
    console.log(menus[subCmd] || menus.main);
}