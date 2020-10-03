import React, {Fragment} from 'react';
import './App.css';
import './firebase';
import 'bootswatch/dist/superhero/bootstrap.min.css';
import Links from './components/Links'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {

/*
SAVE LINKS IN DATABASE USING FIREBASE STORE, REACT AND TOAST
*/
  return (
    <Fragment>
      <div className="container p-4">
         <div className='row'>
            <Links />
            <ToastContainer />
         </div>
         
      </div>
      
    </Fragment>
  );
}

export default App;
