import React, {useState, useCallback} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import './ScrollButton.css';
  
export const ScrollButton = () => {
  
  const [visible, setVisible] = useState(false)

  const iconButtonUp = <FontAwesomeIcon icon={faArrowAltCircleUp} size="3x" />
  
  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  }, []);
  
  const scrollToTop = useCallback(() =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  }, []);
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <button id="scrollToTop" onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}} >
     { iconButtonUp }
    </button>
  );
}