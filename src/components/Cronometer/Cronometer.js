import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './cronometer.css';

export const Cronometer = forwardRef((props, ref) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useImperativeHandle(ref, () => ({

    toggle() {
        setIsActive(!isActive);
    },

    reset() {
        setSeconds(0);
        setMinutes(0);
        setIsActive(false);
    }

  }));
 

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if(seconds > 59) {
            setMinutes(minutes => minutes + 1);
            setSeconds(0);
        }
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
      <span className='timer'>
        {minutes}' : {seconds}''
      </span>
  );
});