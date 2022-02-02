
export const generateUniqSerial = () => {  
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
        const r = Math.floor(Math.random() * 16);  
        return r.toString(16);  
  });  
}

// method to generate randomUUID
export const generateUUID = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : ((r & 0x3) | 0x8) ).toString(16);
    });
    return uuid;
}


export const opositeTit = (tit) => {
    if(tit === 'izquierdo') return 'Derecho';
    if(tit === 'derecho') return 'Izquierdo';
    if(!tit || tit !== 'izquierdo' || tit !== 'derecho') return;  
}

export const capitalize = (text) => {
    if(!text) return;
    const result = text.charAt(0).toUpperCase() + text.slice(1);
    return result;
}
