
export const generateUniqSerial = () => {  
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
        const r = Math.floor(Math.random() * 16);  
        return r.toString(16);  
  });  
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
