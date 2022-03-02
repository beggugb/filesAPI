import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import { usuarios } from "./usuarios.reducers";
import { alumnos } from "./alumnos.reducers";
import { procesos } from "./procesos.reducers";
import { certificados } from "./certificados.reducers"

const rootReducer = combineReducers({
    usuarios,    
    procesos,
    alumnos,
    certificados,
    toastr: toastrReducer
});

export default rootReducer;