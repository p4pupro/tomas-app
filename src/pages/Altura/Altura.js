import { useEffect, useCallback, useState } from 'react';
import { collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { TableAltura } from '../../components/Table/TableAltura';
import { generateUUID } from '../../utils/utils';
import { motion } from "framer-motion";
import '../../App.css';

const Altura = (props) => {

  const { db } = props;

  const [alturas, setAlturas] = useState(null);
  const [sizeIcon, setSizeIcon] = useState('1x');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [size, setSize] = useState(40);

  const iconBaby = <FontAwesomeIcon icon={faBaby} size={sizeIcon} />
  

  const calculateSizeIcon = useCallback(() => {
    if (!size) return;

    if (size > 70 && size <= 90) {
      return '5x';
    } if(size > 60 && size <= 70) {
      return '4x';
    } if(size > 50 && size <= 60) {
      return '3x';
    } else {
      return'2x';
    }
  }, [size]);

  useEffect(() => {
    if(db) getAlturas(db).then(data => setAlturas(data));
  }, [db]);

  useEffect(() => {  
    setSizeIcon(calculateSizeIcon());
  }, [size, calculateSizeIcon]);


      /**
   *  Eliminate altura
   * @param {*} id 
   */
       const handleDelete = async (id) => {
        await deleteDoc(doc(db, "altura-v1", id));
        getAlturas(db).then(data => setAlturas(data));
      }
    
      /**
       * Set altura doc
       * @param {*} param0 
       */
      const saveAltura = async (size) => {
          const id = generateUUID();
          await setDoc(doc(db, "altura-v1/", id), {
            id, 
            date: new Date().toLocaleDateString("es-ES"),
            size,
            time: new Date().toLocaleTimeString(),
            timeStamp: Timestamp.now()
          }); 
          getAlturas(db).then(data => setAlturas(data));
      }
    
      /**
       * Get All Documents order by timeStamp
       * @param {*} db 
       * @returns 
       */
      const getAlturas = async (db) => {
        const alturaCol = collection(db, 'altura-v1/');
        const q = query(alturaCol, orderBy("timeStamp", "desc"));
        const alturaDnapshot = await getDocs(q);
        const alturaList = alturaDnapshot.docs.map(doc => doc.data());
        return alturaList;
      }

      const handleChange = (event) => { setSize(event.target.value) }

      const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(false);
        saveAltura(size);
        setIsSubmitting(false);
        setSize(40);
      }


    return (
      <>
          <form>
          
            <div className="col-s-12 col-xs-12" style={{ width: '100%' }} role="group" aria-labelledby="radio-tit">
              <h1 id="radio-tit">Altura</h1>
              <label id="weight-peso" htmlFor="altura">
                { size } Cms
               </label> 
                <input type="range" name="altura" min="40" max="90" step="1" onChange={handleChange} value={size.toString()} id="weight-input"   /> 
              
              
              {  
                <div className='space'>
                  { iconBaby }
                </div>
              }
            </div>

            <motion.button
              type="submit" 
              className="button-register" 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            > Registrar
            </motion.button>
             
          </form>

      <TableAltura alturas={alturas} handleDelete={handleDelete} />
    </>
    );
  }

  export default Altura;