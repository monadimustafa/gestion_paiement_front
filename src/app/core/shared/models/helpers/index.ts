export function getEnumValues(myEnum: any){
    return Object.keys(myEnum).map(key => myEnum[key]).filter(value => typeof value === 'string') as string[];
}