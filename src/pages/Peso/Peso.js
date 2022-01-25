import { useEffect, useState } from 'react';
import { collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { TablePeso } from '../../components/Table/TablePeso';
import '../../App.css';

export const Peso = (props) => {

  const { db } = props;

  const [pesos, setPesos] = useState(null);
  const [sizeIcon, setSizeIcon] = useState('1x');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [weight, setWeight] = useState(1);

  const iconBaby = <FontAwesomeIcon icon={faBaby} size={sizeIcon} />

  useEffect(() => {
    if(db) getPesos(db).then(data => setPesos(data));
  }, [db]);

  useEffect(() => {
    const calculateSizeIcon = () => {
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
    }
    setSizeIcon(calculateSizeIcon());
  }, [weight]);


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
          const id = crypto.randomUUID();
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
      }


    return (
      <>
        <form>   
          <div className="col-s-12 col-xs-12" role="group" aria-labelledby="radio-tit">
            <div id="radio-tit">Peso</div>
            <label id="weight-peso" htmlFor="peso" className='col-xs-12 col-s-12'>
              { weight === 1 ? `${ weight } Kg` : `${ weight } Kgs` }
              <input type="range" name="peso" min="1" max="12" step="0.10" onChange={handleChange} value={weight.toString()} id="weight-input" className="col-xs-12 col-s-12"  /> 
            </label>

            {  
              <div className='space'>
                { iconBaby }
              </div>
            }  
              
          </div>
            
          <button type="submit" className="button-register" onClick={handleSubmit} disabled={isSubmitting}>
            Registrar Peso
          </button>
        </form>

        <TablePeso peso={pesos} handleDelete={handleDelete} />
     </>
    );
  }