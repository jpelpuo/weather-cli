import axios from 'axios';
import chalk from 'chalk';

export const validateApiKey = async apiKey => {
    if (!apiKey || apiKey.length !== 32) {
        console.error(chalk.greenBright(`API Key for OpenWeatherMap has not been set up`));
        console.warn(`Please use ${chalk.yellowBright('weather config --apiKey')} to save your API Key`);
        return false;
    }

    return true;
};

export const validateCityId = async cityId => {
    if (!Number.isInteger(cityId) || cityId < 1) {
        console.error(chalk.redBright(`City ID for OpenWeather Service is invlaid. Only numbers are allowed`))
        console.warn(`Please use ${chalk.greenBright('weather config --cityId')} to save your default City ID or use the command flag ${chalk.greenBright('--cityId [-c]')} to specify your City ID`);
        return false;
    }

    return true;
};

export const validateUnits = async units => {
    const unitTypes = ['k', 'K', 'c', 'C', 'f', 'F'];
    if(!units || unitTypes.indexOf(units[0]) < 0){
        console.error(chalk.redBright(`Temperature units for OpenWeather Service is invalid`));
        console.warn(`Allowed values are: ${chalk.greenBright('Celsius')}, ${chalk.greenBright('Kelvin')}, ${chalk.greenBright('Fahrenheit')}`);
        return false;
    }
    return true;
}

const getApiUrl = (baseUri, apiKey, cityId, units) => {
    let url = `${baseUri}?id=${cityId}`;
    if(units[0] === 'c' || units[0] === 'C'){
        url += '&units=metric';
    }else if(units[0] === 'f' || units[0] === 'F'){
        url += '&units=imperial';
    }
    url += `&APPID=${apiKey.trim()}`;
    return url;
}

export const getCurrentWeather = async (apiKey, cityId, units) => {
    const baseUri = 'http://api.openweathermap.org/data/2.5/weather';
    const url = getApiUrl(baseUri, apiKey, cityId, units);
    return await axios({
        method: 'get',
        url: url
    });
};

export const getWeatherForecast = async (apiKey, cityId, units) => {
    const baseUri = 'http://api.openweathermap.org/data/2.5/forecast';
    const url = getApiUrl(baseUri, apiKey, cityId, units);
    return await axios({
        method: 'get',
        url: url
    })
}