import './App.css';
import { Formik, Field } from 'formik';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, query, orderBy, deleteDoc, doc } from 'firebase/firestore' 
import { useEffect, useState } from 'react';
import { generateUniqSerial, formatDate } from './utils/utils';
import { Footer } from './components/Footer/Footer';
import { Table } from './components/Table/Table';
import { Header } from './components/Header/Header';

const firebaseConfig = {
  apiKey: "AIzaSyBgi7l7PQHzg1UwxvBi1TnKPeURYkGDfAw",
  authDomain: "tomas-v1.firebaseapp.com",
  databaseURL: "https://tomas-v1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tomas-v1",
  storageBucket: "tomas-v1.appspot.com",
  messagingSenderId: "81567280190",
  appId: "1:81567280190:web:a71917fb1556d508d3b56f"
};


function App() {

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [tomas, setTomas] = useState(null);

  useEffect(() => {
    getTomas(db).then(data => setTomas(data));
  }, []);


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
  const writeTomaData = async ({date, time, tit, action}) => {
    const id = generateUniqSerial();
    const dateFormated = formatDate(date);
    const splited = dateFormated ? 
      dateFormated.split('/') : 
      new Date().toLocaleDateString("es-ES").split('/');
    const timestamp = new Date(splited[2],splited[1],splited[0]).getTime();
    
    await setDoc(doc(db, "tomas-v1", id), {
      id, 
      date: dateFormated || new Date().toLocaleDateString("es-ES"), 
      time:  time ? time + ':25' : new Date().toLocaleTimeString(),
      timestamp,
      tit, 
      action
    });
    getTomas(db).then(data => setTomas(data));
  }

  /**
   * Get All Documents order by date and time
   * @param {*} db 
   * @returns 
   */
  const getTomas = async (db) => {
    const tomasCol = collection(db, 'tomas-v1/');
    const q = query(tomasCol, orderBy("date", "desc"), orderBy("timestamp", "desc"));
    const tomaSnapshot = await getDocs(q);
    const tomaList = tomaSnapshot.docs.map(doc => doc.data());
    return tomaList;
  }
  

  return (
    <>
      <Header />
    <div className="row">
      <div className="col-12 col-s-12">
        <div className="aside">
          <Formik
            initialValues={{ date: '', time: '', tit: '', action: '' }}
            validate={values => {
              const errors = {};
              if (!values.tit) {
                errors.tit = 'Required';
              } else if (!values.action) {
                errors.action = 'Required'
              } else {
                // no hay errores
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              writeTomaData(values);
              setSubmitting(false);
              resetForm();
            }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <label className="date">Fecha</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
                errors={errors}
              />
              {errors.date && touched.date && (
                  <span className="error">{errors.date}</span>
                )}
              <label className="time">Hora</label>
              <input
                type="time"
                name="time"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.time}
                errors={errors}
              />
                {errors.time && touched.time && (
                  <span className="error">{errors.time}</span>
                )}

            </div>
            
            <div className="col-s-12 col-xs-12" role="group" aria-labelledby="radio-tit">
            <div id="radio-tit">Teta</div>      
              <label htmlFor="tit" className='col-xs-12 col-s-6'>
              Izquierda 
              <Field type="radio" name="tit" value="izquierda" className="col-xs-6 col-s-6" />
             
              </label>
              <label htmlFor="tit" className='col-xs-12 col-s-6'>
              Derecha 
              <Field type="radio" name="tit" value="derecha" className="col-xs-6 col-s-6"  /> 
             </label>
            </div>
              {errors.tit && (
                <span className="error">{errors.tit}</span>
              )}
            
            
            <div className="col-s-12 col-xs-12" role="group" aria-labelledby="radio-action">
            <div id="radio-action">Acción</div>
              <label htmlFor="action" className='col-xs-12 col-s-6'>
              Empieza
                <Field type="radio" name="action" value="empieza" className="col-xs-6 col-s-6" />
                  
              </label>
              <label htmlFor="action" className='col-xs-12 col-s-6 '>
              Termina
                <Field type="radio" name="action" value="termina" className="col-xs-6 col-s-6 "/>
                  
              </label>
              </div>
              {errors.action && (
                <span className="error">{errors.action}</span>
              )}
            <button type="submit" className="button-register" disabled={isSubmitting}>
              Registrar
            </button>
          </form>
        )}
      </Formik>
        </div>

        <Table tomas={tomas} handleDelete={handleDelete} />
        <Footer />
      </div>
    </div>
      
  </>
  );
}

export default App;


