
export const generateUniqSerial = () => {  
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
        const r = Math.floor(Math.random() * 16);  
        return r.toString(16);  
  });  
}


export const formatDate = (date) => {
    if(!date) return null;
  
    const array = date.split('-');
    const formatted = array[2] + '/' + array[1]+ '/' + array[0];
    return formatted;
}


export const opositeTit = (tit) => {
    if(!tit) return;
    const result = tit === 'izquierda' ? 'Derecha' : 'Izquierda';
    return result;
}

export const capitalize = (text) => {
    if(!text) return;
    const result = text.charAt(0).toUpperCase() + text.slice(1);
    return result;
}
