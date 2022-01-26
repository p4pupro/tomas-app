import { useEffect, useCallback, useState } from 'react';
import { Formik, Field } from 'formik';
import { collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp, where } from 'firebase/firestore';
import { TablePis } from '../../components/Table/TablePis';
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
        await deleteDoc(doc(db, "pis-v1", id));
        getPis(db).then(data => setPis(data));
      }
    
      /**
       * Set doc
       * @param {*} param0 
       */
      const savePis = async ({ color }) => {
          const id = crypto.randomUUID();
          await setDoc(doc(db, "pis-v1/", id), {
            id, 
            date: new Date().toLocaleDateString("es-ES"),
            color,
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
          initialValues={{ color: ''}}
          validate={values => {
            const errors = {};
            if (!values.color) {
              errors.color = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            savePis(values);
            setSubmitting(false);
          }}
        >
          {({
            errors,
            handleSubmit,
            isSubmitting
          }) => (
          <form onSubmit={handleSubmit}>
          
            <div className="col-s-12 col-xs-12" role="group" aria-labelledby="radio-tit">
              <div id="radio-tit">Orina</div>
              <label htmlFor="color" className='col-xs-12 col-s-6'>
                Transparente 
                <Field type="radio" name="color" value="normal" className="col-xs-6 col-s-6 pis"  /> 
              </label>      
              <label htmlFor="color" className='col-xs-12 col-s-6'>
                Amarilla
                <Field type="radio" name="color" value="yellow" className="col-xs-6 col-s-6 pis" />
              </label>
              
            </div>

              {errors.color && (
                <span className="error">{errors.color}</span>
              )}
            
            <button type="submit" className="button-register" disabled={isSubmitting}>
              Registrar Orina
            </button>
          </form>
        )}
      </Formik>
  
      <TablePis pis={pis} total={total} average={average} handleDelete={handleDelete} />
    </>
    );
  }

  export default Pis;