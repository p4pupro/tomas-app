
import { Formik, Field } from 'formik';
import { useEffect, Suspense, lazy, useCallback, useState } from 'react';

import { collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { generateUniqSerial, opositeTit, capitalize } from '../../utils/utils';
import { motion } from "framer-motion";
import '../../App.css';

const LazyTable = lazy(() => import('../../components/Table/Table'));


export const Tomas = (props) => {

    const { db } = props;
    const iconBaby = <FontAwesomeIcon icon={faBaby} size="3x" />
    const iconRemeber = <FontAwesomeIcon icon={faExclamationCircle} size="2x" />

    const [tomas, setTomas] = useState(null);
    const [average, setAverage] = useState(null);
    const [lastTit, setLastTit] = useState(null);
    const [avgTits, setAvgTits] = useState(null);
    const [isTomaActive, setIsTomaActive] = useState(false);
    const [tomaId, setTomaId] = useState(null);
    const [tomaTime, setTomaTime] = useState(null);



     /**
   * Get All Documents order by date and time
   * @returns 
   */
    const getTomas = useCallback(async () => {
      if (!db) return;
      const tomasCol = collection(db, 'tomas-v1/');
      // const q = query(tomasCol, orderBy("dateEnd", "desc"), orderBy("timeStampEnd", "desc"));
      const q = query(tomasCol, orderBy("timeStampStart", "desc"));
      const tomaSnapshot = await getDocs(q);
      const tomaList = tomaSnapshot.docs.map(doc => doc.data());
      return tomaList;
    }, [db]);

 
    /**
    * Calculate average of tits
    * @returns averageTits
    */
    const averageTits = useCallback(async () => { 
      if(!tomas) return;
      const withTimestamp = tomas.filter(toma => toma.timeStampEnd > 0);
      const leftTits = withTimestamp.filter(toma => toma.tit === 'izquierdo');
      const rightTits = withTimestamp.filter(toma => toma.tit === 'derecho');
      const totalLeftTits = leftTits.length;
      const totalRightTits = rightTits.length;
      const sumTotal = totalLeftTits + totalRightTits;
      const percentLeft = totalLeftTits / sumTotal * 100;
      const percentRight = totalRightTits / sumTotal * 100;
      const result = [percentLeft, percentRight];
      return result;
    }, [tomas]);

    /**
     * Calculate average
     * @returns average
     */
    const averageTomas = useCallback(async () => {
      if(!tomas) return 0;
      const withTimestamp = tomas.filter(toma => toma.timeStampEnd > 0);
      const total = withTimestamp.length;
      const tomasRest = withTimestamp.map(toma => toma.timeStampEnd.toMillis() - toma.timeStampStart.toMillis());
      const tomasSum = tomasRest.reduce((acc, cur) => acc + cur);
      const resultDate = new Date(Math.abs(tomasSum) / total);
      return resultDate.toLocaleTimeString();
    }, [tomas]);


    useEffect(() => {
      getTomas().then(data => setTomas(data));
    }, [getTomas]);
    
    useEffect(() => {
      averageTomas().then(avg => setAverage(avg));
    }, [tomas, averageTomas]);
    
    useEffect(() => {
      averageTits().then(avgTits => setAvgTits(avgTits));
    }, [tomas, averageTits]);
    
    useEffect(() => {
      if (!isTomaActive && tomas) setLastTit(tomas[0].tit);
    }, [isTomaActive, tomas]);
    
    useEffect(() => {
      if (isTomaActive) setTomaTime(new Date().toLocaleTimeString());
      if (!isTomaActive) setTomaTime(null);
    }, [isTomaActive]);
    
    
    useEffect(() => {
      if (!isTomaActive && tomas) tomas[tomas.length -1].tomaTime = tomaTime;
    }, [isTomaActive, tomas, tomaTime]);

      /**
   *  Eliminate toma
   * @param {*} id 
   */
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tomas-v1", id));
    getTomas(db).then(data => setTomas(data));
  }

  /**
   * Set doc
   * @param {*} param0 
   */
  const writeTomaData = async ({tit}) => {
    if (!isTomaActive) {
      const id = generateUniqSerial();
      setTomaId(id);
      await setDoc(doc(db, "tomas-v1/", id), {
        id, 
        dateStart: new Date().toLocaleDateString("es-ES"),
        dateEnd: '',
        timeStart: new Date().toLocaleTimeString(),
        timeEnd: '',
        timeStampStart: Timestamp.now(),
        timeStampEnd: '',
        tit,
      });
    } else {
      const tomaRef = doc(db, "tomas-v1/", tomaId);
      await updateDoc(tomaRef, {
        dateEnd: new Date().toLocaleDateString("es-ES"),
        timeEnd: new Date().toLocaleTimeString(),
        timeStampEnd: Timestamp.now(),
      });
    }
    getTomas(db).then(data => setTomas(data));
  }

 
return (
    <>
          <Formik
            initialValues={{ tit: ''}}
            validate={values => {
              const errors = {};
              if (!values.tit) {
                errors.tit = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              writeTomaData(values);
              setSubmitting(false);
              setIsTomaActive(!isTomaActive);
              console.log(isTomaActive, !isTomaActive, !!isTomaActive);
              isTomaActive && resetForm();
            }}
      >
        {({
          errors,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
           
            <div className="col-s-12 col-xs-12" style={{ width: '100%'}} role="group" aria-labelledby="radio-tit">
            <h1 className='tomas-title'>Pecho</h1> 

            { !isTomaActive && (
              iconRemeber,
                <div className='col-xs-12 col-s-12 turn-tit'>
                  <span>
                    El último pecho fue 
                    <b className='error'>{ ` ${capitalize(lastTit)} ` } </b> 
                    te toca el <b className='now'>{ ` ${opositeTit(lastTit)}` }</b>
                  </span>
              </div>
              )
            }
            <span className='radio-btns'>
              <label htmlFor="tit">
                Izquierdo
                
                <Field type="radio" name="tit" value="izquierdo"/>
                </label>
              <label htmlFor="tit">
                Derecho 
                
                <Field type="radio" name="tit" value="derecho"/> 
                </label>
            </span >

            <div>
              { tomaTime && (<span className='timer'>{ tomaTime }</span>) } 
            </div>


            { isTomaActive && ( 
                <div className='space'>
                  { iconBaby }
                </div>
              )
            }

            </div>
              {errors.tit && (
                <span className="error">{errors.tit}</span>
              )}
            
            <motion.button
              type="submit" 
              className="button-register"
              disabled={isSubmitting}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >  {isTomaActive ? 'Finalizar' : 'Empezar'}
            </motion.button>
          </form>
        )}
      </Formik>
      
      <Suspense fallback={<h1>Cargando...</h1>}>         
        <LazyTable tomas={tomas} average={average} handleDelete={handleDelete} />
      </Suspense>
    </>
    )
}