import React, {Fragment, useEffect, useState} from 'react';
import LinkForm from './LinkForm';
import { db } from '../firebase';
import { toast } from "react-toastify";

const Link = () => {

const [valueLink, setValueLink] = useState([]);
const [ idActual, setId] = useState('');

    // add or edit
async function addOrEdit (linkObject){
  try {
    if(idActual === ''){
        await  db.collection('links').doc().set(linkObject);
        toast('New link added',{ 
           type: 'success',
           autoClose: 5000
           });       
    } else{
      await db.collection('links').doc(idActual).update(linkObject);
      toast('Link update successfully',{ 
        type: 'info',
        autoClose: 5000
        });
        setId('');
     }
  } catch (error) {
    console.log(error);
  }
}
// Get data from firebase
async function getLinks(){
  try {
    db.collection('links').onSnapshot( (querySnapshot)=>{
        const docs = [];
        querySnapshot.forEach(doc =>{
            // console.log(doc.data())
            docs.push({...doc.data(), id:doc.id});
        });
        setValueLink(docs);
    });
  } catch (error) {
    console.log(error);
  }
}
// delete data
async function deleteLink(id){

  try {
    if(window.confirm('Are you sure you want delete this link?')){
        await  db.collection('links').doc(id).delete();
        toast('Link remove successfully',{
          type: 'success',
          autoClose: 5000
      });
      }else{
          console.log('no se elimina');
      }
  } catch (error) {
    console.log(error);
  }
}
// show links in screen
   useEffect(()=>{
       getLinks();
   },[]);
   return(
    <Fragment>
        <div className="col-md-4 p-2">
          <LinkForm 
          {...{addOrEdit, idActual, valueLink}}
          />
        </div>
        <div className="col-md-8 p-2">
            { valueLink.map(link => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                       <h4>{link.name}</h4>
                       <div>
                        <button className="btn">
                       <i className="material-icons text-danger" onClick={() => deleteLink(link.id)}>close</i>
                       </button>
                       <button className="btn"> 
                       <i className="material-icons " onClick={() => setId(link.id)}>edit</i>
                       </button>
                       </div>
                    </div>
                    <p>{link.description}</p>
                    <a target="_blank" href={link.url} rel="noopener noreferrer">Go to link</a>
                    </div>
                </div>
            ))}

        </div>

    </Fragment>
   );

}
export default Link;