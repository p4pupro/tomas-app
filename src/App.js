import './App.css';
import { Formik, Field } from 'formik';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, query, orderBy, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore' 
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import { generateUniqSerial, opositeTit, capitalize } from './utils/utils';
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

  const iconBaby = <FontAwesomeIcon icon={faBaby} size="3x" />

  const [tomas, setTomas] = useState(null);
  const [average, setAverage] = useState(null);
  const [avgTits, setAvgTits] = useState(null);
  const [isTomaActive, setIsTomaActive] = useState(false);
  const [tomaId, setTomaId] = useState(null);
  const [toma, setToma] = useState(null);
  const [tomaTime, setTomaTime] = useState(null);

  useEffect(() => {
    getTomas(db).then(data => setTomas(data));
  }, []);

  useEffect(() => {
    averageTomas().then(avg => setAverage(avg));
  }, [tomas]);


  useEffect(() => {
    if (!isTomaActive && tomas) setAvgTits(tomas[0].tit);
  }, [isTomaActive, tomas]);

   useEffect(() => {
     if (isTomaActive) setTomaTime(new Date().toLocaleTimeString());
     if (!isTomaActive) setTomaTime(null);
   }, [isTomaActive]);


  useEffect(() => {
    if (!isTomaActive && tomas) tomas[tomas.length -1].tomaTime = tomaTime;
  }, [isTomaActive]);


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

  /**
   * Get All Documents order by date and time
   * @param {*} db 
   * @returns 
   */
  const getTomas = async (db) => {
    const tomasCol = collection(db, 'tomas-v1/');
    const q = query(tomasCol, orderBy("dateEnd", "desc"), orderBy("timeStampEnd", "desc"));
    const tomaSnapshot = await getDocs(q);
    const tomaList = tomaSnapshot.docs.map(doc => doc.data());
    return tomaList;
  }

  /**
   * Calculate average
   * @returns average
   */
  const averageTomas = async () => {
    if(!tomas) return 0;
    const withTimestamp = tomas.filter(toma => toma.timeStampEnd > 0);
    const total = withTimestamp.length;
    const tomasRest = withTimestamp.map(toma => toma.timeStampEnd.toMillis() - toma.timeStampStart.toMillis());
    const tomasSum = tomasRest.reduce((acc, cur) => acc + cur);
    const resultDate = new Date(Math.abs(tomasSum) / total);
    return resultDate.toLocaleTimeString();
  }



  /**
   * Calculate average of tits
   * @returns averageTits
   */
  const averageTits = async () => { 
    if(!tomas) return;
    const withTimestamp = tomas.filter(toma => toma.timeStampEnd > 0);
    const leftTits = withTimestamp.filter(toma => toma.tit === 'izquierdo');
    const rightTits = withTimestamp.filter(toma => toma.tit === 'derecho');
    const totalLeftTits = leftTits.length;
    const totalRightTits = rightTits.length;
    const result = totalLeftTits > totalRightTits ? 'izquierdo' : 'derecho';
    return result;
  }
  

  return (
    <>
      <Header />
    <div className="row">
      <div className="col-12 col-s-12">
        <div className="aside">
          <Formik
            initialValues={{ tit: ''}}
            validate={values => {
              const errors = {};
              if (!values.tit) {
                errors.tit = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              writeTomaData(values);
              setSubmitting(false);
              setIsTomaActive(!isTomaActive);
            }}
      >
        {({
          errors,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
           
            <div className="col-s-12 col-xs-12" role="group" aria-labelledby="radio-tit">
            <div id="radio-tit">Pecho</div>      
              <label htmlFor="tit" className='col-xs-12 col-s-6'>
              Izquierdo 
              <Field type="radio" name="tit" value="izquierdo" className="col-xs-6 col-s-6" />
             
              </label>
              <label htmlFor="tit" className='col-xs-12 col-s-6'>
              Derecho 
              <Field type="radio" name="tit" value="derecho" className="col-xs-6 col-s-6"  /> 
             </label>

            <div>
              { tomaTime && (<span className='timer'>{ tomaTime }</span>) } 
            </div>

            { !isTomaActive && (
                <div className='col-xs-12 col-s-12'>
                  <span>
                    El último pecho fue 
                    <b className='error'>{ ` ${capitalize(avgTits)} ` } </b> 
                    te toca el <b className='now'>{ ` ${opositeTit(avgTits)}` }</b>
                  </span>
              </div>
              )
            }
            

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
            
            <button type="submit" className="button-register" disabled={isSubmitting}>
             {isTomaActive ? 'Finalizar Toma' : 'Iniciar Toma'}
            </button>
          </form>
        )}
      </Formik>
        </div>

        <Table tomas={tomas} average={average} handleDelete={handleDelete} />
        <Footer />
      </div>
    </div>
      
  </>
  );
}

export default App;


