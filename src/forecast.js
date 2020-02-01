import Conf from 'conf'
import Table from 'cli-table3'
import { configKey } from './configure'
import { validateApiKey, validateUnits, validateCityId, getWeatherForecast } from './utils'

export const forecast = async args => {
    const config = new Conf().get(configKey)
    const apiKey = args.apiKey || args.apikey || args.key || args['api-key'] || config.apiKey || args.k;
    if (!validateApiKey(apiKey)) {
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

    const {data} = await getWeatherForecast(apiKey, cityId, units);

    const table = new Table({
        head: ['DateTime', 'Weather', 'Temp'],
        colWidths: [23, 18, 17],
        wordWrap: true
    });

    data.list.forEach(weather =>{
        table.push([
            weather.dt_txt,
            weather.weather[0].description,
            weather.main.temp
        ]);
    });
    console.log(table.toString());
}