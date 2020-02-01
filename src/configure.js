import Conf from 'conf'
import { validateApiKey, validateCityId, validateUnits } from './utils'


export const configKey = "weather-cli";

export const configure = async (args) => {
    const config = new Conf();
    let currentConfigObject = config.get(configKey);
    currentConfigObject = currentConfigObject || {};

    let apiKey = args.apiKey || args.apikey || args['api-key'] || args.key || args.k;

    if (!apiKey) {
        apiKey = currentConfigObject.apiKey;
    }

    if (!validateApiKey(apiKey)) {
        return;
    }

    let cityId = args.city || args.cityId || args.cityID || args.cityid || args['city-id'] || args.c;

    if (!cityId) {
        cityId = currentConfigObject || 4862034;
        cityId = Number(cityId);
    }

    if (!validateCityId(cityId)) {
        return;
    }

    let units = args.units || args.unit || args.u || args['units'];

    if (!units) {
        units = currentConfigObject.units || 'Kelvin';
    }

    if (!validateUnits(units)) {
        return;
    }

    config.set(configKey, { apiKey: apiKey, cityId: cityId, units: units })
};