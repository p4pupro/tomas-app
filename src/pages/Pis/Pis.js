import { useEffect, useCallback, useState } from 'react';
import { Formik, Field } from 'formik';
import { collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp, where } from 'firebase/firestore';
import { TablePis } from '../../components/Table/TablePis';
import { generateUUID } from '../../utils/utils';
import { motion } from "framer-motion";
import '../../App.css';

const Pis = (props) => {

  const { db } = props;

  const [pis, setPis] = useState(null);
  const [average, setAverage] = useState(null);
  const [total, setTotal] = useState(0);

  const averagePis = useCallback(() => {
    if(!pis) return;
    const total = pis.reduce((acc, pis) => {
        return acc + 1;
    }, 0);
    const average = total / pis.length;
    return average;
  }, [pis]);

  useEffect(() => {
    if(db) getPis(db).then(data => setPis(data));
  }, [db]);

  useEffect(() => {
    if(db) getTotalPisByDay(db).then(data => setTotal(data));
  }, [db]);

  useEffect(() => {
    setAverage(averagePis());
  }, [pis, averagePis]);


      /**
   *  Eliminate doc
   * @param {*} id 
   */
       const handleDelete = async (id) => {
        await deleteDoc(doc(db, "pis-v1/", id));
        getPis(db).then(data => setPis(data));
      }
    
      /**
       * Set doc
       * @param {*} param0 
       */
      const savePis = async ({ amount }) => {
          const id = generateUUID();
          await setDoc(doc(db, "pis-v1/", id), {
            id, 
            date: new Date().toLocaleDateString("es-ES"),
            amount,
            time: new Date().toLocaleTimeString(),
            timeStamp: Timestamp.now()
          });
        getPis(db).then(data => setPis(data));  
      }
    
      /**
       * Get All Documents order by timeStamp
       * @param {*} db 
       * @returns 
       */
      const getPis = async (db) => {
        const pisCol = collection(db, 'pis-v1/');
        const q = query(pisCol, orderBy("timeStamp", "desc"));
        const pisDnapshot = await getDocs(q);
        const pisList = pisDnapshot.docs.map(doc => doc.data());
        return pisList;
      }

      /**
       * get pis by day
       * @param {*} db 
       * @return total pis on day
       */
      const getTotalPisByDay = async (db) => {
        const pisCol = collection(db, 'pis-v1/');
        const q = query(pisCol, where("date", "==", new Date().toLocaleDateString("es-ES")));
        const pisSnapshot = await getDocs(q);
        const pisList = pisSnapshot.docs.map(doc => doc.data());
        return pisList.length;
      }


    return (
      <>
        <Formik
          initialValues={{ amount: ''}}
          validate={values => {
            const errors = {};
            if (!values.amount) {
              errors.amount = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values);
            savePis(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({
            errors,
            handleSubmit,
            isSubmitting
          }) => (
          <form onSubmit={handleSubmit}>
          
            <h1 className='tomas-title'>Pis</h1> 
            <span className='radio-btns'>
              <label htmlFor="amount">
              Poco
                
                <Field type="radio" name="amount" value="poco"/>
                </label>
              <label htmlFor="amount">
              Mucho 
                
                <Field type="radio" name="amount" value="mucho"/> 
                </label>
            </span >

              {errors.amount && (
                <span className="error">{errors.amount}</span>
              )}
            
            <motion.button
              type="submit" 
              className="button-register"
              disabled={isSubmitting}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            > Registrar
            </motion.button>
          </form>
        )}
      </Formik>
  
      <TablePis pis={pis} total={total} average={average} handleDelete={handleDelete} />
    </>
    );
  }

  export default Pis;