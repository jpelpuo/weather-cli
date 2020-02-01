import Conf from 'conf';
import Table from 'cli-table3';
import { configKey } from './configure';
import { validateApiKey, validateCityId, validateUnits, getCurrentWeather } from './utils';

export const now = async args => {
    const config = new Conf().get(configKey);

    const apiKey = args.apiKey || args.apikey || args.key || args['api-key'] || config.apiKey || args.k;
    if (!validateApiKey) {
        return;
    }

    const cityId =
        args.city ||
        args.cityId ||
        args.cityID ||
        args['city-id'] ||
        args.c ||
        config.cityId;

    if (!validateCityId(cityId)) {
        return;
    }

    const units = args.units || args.unit || args.u || config.units;

    if (!validateUnits(units)) {
        return;
    }

    const { data } = await getCurrentWeather(apiKey, cityId, units);

    const table = new Table({
        head: ['City', 'DateTime', 'Weather', 'Temp'],
        colWidths: [15, 23, 18, 17],
        wordWrap: true
    });
    table.push([
        data.name,
        new Date(data.dt * 1000).toLocaleString(),
        data.weather[0].description,
        data.main.temp
    ]);
    console.log(table.toString());
}