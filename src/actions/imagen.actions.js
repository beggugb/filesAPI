import { crudService } from "../services";
import {toastr} from 'react-redux-toastr'
export const imagenActions = {        
  getData  
};

function getData(xredux, payload, page,num) {  
    return (dispatch) => {
      crudService
        .getData(payload,page,num)
        .then((response) => {                         
          dispatch(resRedux(xredux, response.result));
        })
        .catch((err) => {
                    
        });
    };
  }


export function resRedux(xredux, result) {   
    return {
      type: xredux,
      response: result
    };
  }
  