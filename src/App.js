import { Suspense, lazy } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'; 
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Layout } from './components/Layout/Layout';
import { Routes, Route, Link } from "react-router-dom";

import { AtomSpinner } from 'react-epic-spinners';
import { ScrollButton } from './components/ScrollButton/ScrollButton';

import { Tomas } from './pages/Tomas/Tomas';

const LazyCacas = lazy(() => import('./pages/Cacas/Cacas'));
const LazyPis = lazy(() => import('./pages/Pis/Pis'));
const LazyPeso = lazy(() => import('./pages/Peso/Peso'));
const LazyAltura = lazy(() => import('./pages/Altura/Altura'));



// import { Cacas } from './pages/Cacas/Cacas';
// import { Pis } from './pages/Pis/Pis';
// import { Peso } from './pages/Peso/Peso';
// import { Altura } from './pages/Altura/Altura';




const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


function App() {

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);



  return (
    <> 
      <ScrollButton/> 
      <Header />
      
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}> <AtomSpinner color="#9933cc" /></div>}>       
        <Routes>
          <Route path="tomas-app/" element={<Layout />}>
            <Route index element={<Tomas db={db}/>} />
              <Route path="cacas" element={<LazyCacas db={db}/>} />
              <Route path="pis" element={<LazyPis db={db}/>} />
              <Route path="peso" element={<LazyPeso db={db}/>} />
              <Route path="altura" element={<LazyAltura db={db}/>} />
              <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
        </Suspense>
       
      <Footer />  
    </>
  );
}

function NoMatch() {
  

  return (
    <>
      <h2>¡Ups! &#128531; ¡Te has equivocado!</h2>
      <p>
        Ir al <Link to="tomas-app/"><b>Inicio</b></Link>
      </p>
    </>
  );
}


export default App;


