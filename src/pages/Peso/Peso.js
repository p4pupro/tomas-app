import { useEffect, useCallback, useState } from 'react';
import { collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { TablePeso } from '../../components/Table/TablePeso';
import { generateUUID } from '../../utils/utils';
import { motion } from "framer-motion";
import '../../App.css';

const Peso = (props) => {

  const { db } = props;

  const [pesos, setPesos] = useState(null);
  const [sizeIcon, setSizeIcon] = useState('1x');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [weight, setWeight] = useState(1);

  const iconBaby = <FontAwesomeIcon icon={faBaby} size={sizeIcon} />

  const calculateSizeIcon = useCallback(() => {
    if (!weight) return;

    if (weight > 9 && weight <= 12) {
      return '5x';
    } if(weight > 6 && weight <= 9) {
      return '4x';
    } if(weight > 3 && weight <= 6) {
      return '3x';
    } else {
      return'2x';
    }
  }, [weight]);

  useEffect(() => {
    if(db) getPesos(db).then(data => setPesos(data));
  }, [db]);

  useEffect(() => {
    setSizeIcon(calculateSizeIcon());
  }, [weight, calculateSizeIcon]);


      /**
   *  Eliminate peso
   * @param {*} id 
   */
       const handleDelete = async (id) => {
        await deleteDoc(doc(db, "peso-v1", id));
        getPesos(db).then(data => setPesos(data));
      }
    
      /**
       * Set peso doc
       * @param {*} param0 
       */
      const savePeso = async (weight) => {
          const id = generateUUID();
          await setDoc(doc(db, "peso-v1/", id), {
            id, 
            date: new Date().toLocaleDateString("es-ES"),
            weight,
            time: new Date().toLocaleTimeString(),
            timeStamp: Timestamp.now()
          }); 
        getPesos(db).then(data => setPesos(data));
      }
    
      /**
       * Get All Documents order by timeStamp
       * @param {*} db 
       * @returns 
       */
      const getPesos = async (db) => {
        const pesoCol = collection(db, 'peso-v1/');
        const q = query(pesoCol, orderBy("timeStamp", "desc"));
        const pesoDnapshot = await getDocs(q);
        const pesoList = pesoDnapshot.docs.map(doc => doc.data());
        return pesoList;
      }

      const handleChange = (event) => { setWeight(event.target.value) }

      const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(false);
        savePeso(weight);
        setIsSubmitting(false);
        setWeight(1);
      }


    return (
      <>
        <form>   
          
            <h1>Peso</h1>
            <label id="weight-peso" htmlFor="peso">
              { weight === 1 ? `${ weight } Kg` : `${ weight } Kgs` }
            </label>
              <input type="range" name="peso" min="1" max="12" step="0.10" onChange={handleChange} value={weight.toString()} id="weight-input"  /> 
            

            {  
              <div className='space'>
                { iconBaby }
              </div>
            }  
              
         
            
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

        <TablePeso peso={pesos} handleDelete={handleDelete} />
     </>
    );
  }

  export default Peso;