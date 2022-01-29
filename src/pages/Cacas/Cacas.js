import { useEffect, useCallback, useState } from 'react';
import { Formik, Field } from 'formik';
import { collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp, where } from 'firebase/firestore';
import { TableCaca } from '../../components/Table/TableCaca';
import { generateUUID } from '../../utils/generateUUID';
import '../../App.css';

 const Cacas = (props) => {

  const { db } = props;

  const [cacas, setCacas] = useState(null);
  const [average, setAverage] = useState(null);
  const [total, setTotal] = useState(0);


  const averageCacas = useCallback(() => {
    if(!cacas) return;
    const total = cacas.reduce((acc, caca) => {
        return acc + 1;
    }, 0);
    const average = total / cacas.length;
    return average;
  }, [cacas]);


  useEffect(() => {
    if(db) getCacas(db).then(data => setCacas(data));
  }, [db]);

  useEffect(() => {
    if(db) getTotalCacasByDay(db).then(data => setTotal(data));
  }, [db]);

  useEffect(() => {
    setAverage(averageCacas());
  }, [cacas, averageCacas]);

      /**
   *  Eliminate caca
   * @param {*} id 
   */
       const handleDelete = async (id) => {
        await deleteDoc(doc(db, "cacas-v1", id));
        getCacas(db).then(data => setCacas(data));
      }
    
      /**
       * Set doc
       * @param {*} param0 
       */
      const saveCacas = async ({ type }) => {
          const id = generateUUID();
          await setDoc(doc(db, "cacas-v1/", id), {
            id, 
            date: new Date().toLocaleDateString("es-ES"),
            type,
            time: new Date().toLocaleTimeString(),
            timeStamp: Timestamp.now()
          }); 
        getCacas(db).then(data => setCacas(data));
      }
    
      /**
       * Get All Documents order by timeStamp
       * @param {*} db 
       * @returns 
       */
      const getCacas = async (db) => {
        const cacasCol = collection(db, 'cacas-v1/');
        const q = query(cacasCol, orderBy("timeStamp", "desc"));
        const cacaSnapshot = await getDocs(q);
        const cacaList = cacaSnapshot.docs.map(doc => doc.data());
        return cacaList;
      }

      /**
       * get total cacas by day
       * @param {*} db 
       * @return total cacas
       */
      const getTotalCacasByDay = async (db) => {
        const cacasCol = collection(db, 'cacas-v1/');
        const q = query(cacasCol, where("date", "==", new Date().toLocaleDateString("es-ES")));
        const cacaSnapshot = await getDocs(q);
        const cacaList = cacaSnapshot.docs.map(doc => doc.data());
        return cacaList.length;
      }


    return (
      <>
        <Formik
          initialValues={{ type: ''}}
          validate={values => {
            const errors = {};
            if (!values.type) {
              errors.type = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            saveCacas(values);
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
          
            <div className="col-s-12 col-xs-12" role="group" aria-labelledby="radio-tit">
              <div id="radio-tit">Caca</div>
              <label htmlFor="type" className='col-xs-12 col-s-6'>
                Líquida 
                <Field type="radio" name="type" value="liquida"  className="col-xs-6 col-s-6"  /> 
              </label>      
              <label htmlFor="type" className='col-xs-12 col-s-6'>
                Normal 
                <Field type="radio" name="type" value="normal" className="col-xs-6 col-s-6" />
              </label>
              <label htmlFor="type" className='col-xs-12 col-s-6'>
                Pastosa 
                <Field type="radio" name="type" value="pastosa" className="col-xs-6 col-s-6"  /> 
              </label>
              <label htmlFor="type" className='col-xs-12 col-s-6'>
                Dura 
                <Field type="radio" name="type" value="dura" className="col-xs-6 col-s-6"  /> 
              </label>
            </div>

              {errors.type && (
                <span className="error">{errors.type}</span>
              )}
            
            <button type="submit" className="button-register" disabled={isSubmitting}>
              Registrar caca
            </button>
          </form>
        )}
      </Formik>
  
      <TableCaca cacas={cacas} total={total} average={average} handleDelete={handleDelete} />
    </>
    );
  }

  export default Cacas;