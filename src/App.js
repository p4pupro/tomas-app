import './App.css';
import { Formik, Field } from 'formik';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore' 
import { useEffect, useState } from 'react';
import { Item } from './components/Items/Items';

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


  const handleEdit = async (id) => {
    const tomasRef = doc(db, "tomas-v1", id);
    await updateDoc(tomasRef, {
      time: "12:12"
    });
    getTomas(db).then(data => setTomas(data));
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tomas-v1", id));
    getTomas(db).then(data => setTomas(data));
  }

  const generateUniqSerial = () => {  
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
        const r = Math.floor(Math.random() * 16);  
        return r.toString(16);  
  });  
}


const formatDate = (date) => {
  if(!date) return null;

  const array = date.split('-');
  const formatted = array[2] + '/' + array[1]+ '/' + array[0];
  return formatted;
}

  // Set Document
const writeTomaData = async ({date, time, tit, action}) => {
  
    const id = generateUniqSerial();
    await setDoc(doc(db, "tomas-v1", id), {
      id, 
      date: formatDate(date) || new Date().toLocaleDateString("es-ES"), 
      time: time || new Date().toLocaleTimeString(), 
      tit, 
      action
    });
    getTomas(db).then(data => setTomas(data));
  }

  // Get All Documents
  const getTomas = async (db) => {
    const tomasCol = collection(db, 'tomas-v1/');
    const tomaSnapshot = await getDocs(tomasCol);
    const tomaList = tomaSnapshot.docs.map(doc => doc.data());
    return tomaList;
  }

  const updateDocument = async (date, time, tit, action, id) => {

    console.log(time)
  }


  return (
    <div>
      <div className="header">
        <h1>Tomas App - Registra tus tomas</h1>
      </div>
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
          onSubmit={(values, { setSubmitting }) => {
            writeTomaData(values);
            setSubmitting(false);
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
           <div id="radio-tit">Teta</div>
           <div className="radio-buttons" role="group" aria-labelledby="radio-tit">
            <label>
              <Field type="radio" name="tit" value="izquierda" />
                Izquierda
            </label>
            <label>
              <Field type="radio" name="tit" value="derecha" />
                Derecha
            </label>
            </div>
            {errors.tit && (
              <span className="error">{errors.tit}</span>
            )}
           <div id="radio-start-stop">Acción</div>
           <div className="radio-buttons" role="group" aria-labelledby="radio-start-stop">
            <label>
              <Field type="radio" name="action" value="empieza" />
                Empieza
            </label>
            <label>
              <Field type="radio" name="action" value="termina" />
                Termina
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

        <div className="wrap-table">
          <table>
            {
              tomas ? tomas.map((toma, index) => {
                return (
                  <Item 
                    key={index} 
                    toma={toma} 
                    handleEdit={updateDocument} 
                    handleDelete={handleDelete} 
                  />
                )
              })
              :
              <tbody></tbody>
            }  
          </table>
        </div>
        
      </div>
    </div>
      <div className="footer">
        <span>Tomas app by @p4pupro</span>
      </div>
  </div>
  );
}

export default App;


