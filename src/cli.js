import minimist from 'minimist'

export async function cli(args){
    const objArgs = minimist(args.slice(2));
    console.log(objArgs)
}