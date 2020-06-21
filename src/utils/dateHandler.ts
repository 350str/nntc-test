export const dateHandler = (timestamp: number): string => {
    const timezone: number = (new Date()).getTimezoneOffset() * 60000;
    const dateToIsos: string = new Date(timestamp - timezone).toISOString();
   
    return dateToIsos.slice(11, 19) + ', ' + dateToIsos.slice(0, 10); 
}