import React , { Fragment, useState, useEffect} from 'react';
import { toast } from "react-toastify";
import { db } from '../firebase';



 
const LinkForm = (props) => {

const { addOrEdit,idActual} = props;

const initialStateValues = {
    url: '',
    name: '',
    description: '',
};

const [values, setValues] = useState(initialStateValues);

const handleInputChange = e => {
    const {name,value} =  e.target;
    setValues({...values, [name]: value});
};

const validateUrl = str =>{
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
};
// send form from data
const hundleSubmit = e =>{
    e.preventDefault();

    if(validateUrl(values.url)){
    addOrEdit(values);
    setValues({...initialStateValues});
    } else{
        toast('Link incorrect',{
            type: 'error',
            autoClose: 3000
        });
    }
};
//get id from data
async function getLinkById(id){
   const doc = await db.collection('links').doc(id).get();
   setValues({...doc.data()});
}
// verify if exist data in state
useEffect( () => {
    if(idActual === ''){
        setValues({...initialStateValues});
    } else{
        getLinkById(idActual);
    }
},[idActual]);

 return(
    <Fragment>
        <form className="card card-body" onSubmit={hundleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                type="text"
                className ="form-control" 
                placeholder="https://someurl.com"
                name="url"
                onChange={handleInputChange}
                value={values.url}
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Website name"
                onChange={handleInputChange}
                value={values.name}
                />
            </div>
            <div className="form-group">
                <textarea
                name="description"
                row="3"
                className="form-control"
                placeholder="Write a description"
                onChange={handleInputChange}
                value={values.description}
                ></textarea>
            </div>
            <button className="btn btn-primary d-block">
                { idActual === '' ? 'SAVE' : 'UPDATE'}
            </button>

        </form>
    </Fragment>
 );
}
 
export default LinkForm;