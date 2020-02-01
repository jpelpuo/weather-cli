export async function version(){
    const packageJSON = require('../package.json');
    console.log(packageJSON.version);
}