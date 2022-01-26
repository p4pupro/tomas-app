
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'; 
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Layout } from './components/Layout/Layout';
import { Tomas } from './pages/Tomas/Tomas';
import { Cacas } from './pages/Cacas/Cacas';
import { Pis } from './pages/Pis/Pis';
import { Peso } from './pages/Peso/Peso';
import { Altura } from './pages/Altura/Altura';
import { Routes, Route, Link } from "react-router-dom";


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
      <Header />
        <Routes>
          <Route path="tomas-app/" element={<Layout />}>
            <Route index element={<Tomas db={db}/>} />
              <Route path="cacas" element={<Cacas db={db}/>} />
              <Route path="pis" element={<Pis db={db}/>} />
              <Route path="peso" element={<Peso db={db}/>} />
              <Route path="altura" element={<Altura db={db}/>} />
              {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
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


