import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faList, faTags, faUsers, faPlusSquare, faPeopleCarry } from "@fortawesome/free-solid-svg-icons";

/** Actions */
import { AlumnoRouter } from '../../routes'
import { crudActions } from '../../actions'
/** Required Components */
import SubMenu from '../../components/subMenu.jsx';
import AlumnoResumen from "./components/AlumnoResumen";
import TableAlumnos from "./components/TableAlumnos";
import SearchAlumno from "./components/SearchAlumno";
import EditAlumno from "./components/EditAlumno";

const AlumnoView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView } = useSelector(state => state.alumnos)  
 
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'ALUMNOS_VIEW',view:est})  
                 
  };

  const getComponent = useCallback((io, key) =>{        
      switch(io){
        case 'data':
          setComponent(<><SearchAlumno getComponent={getComponent}/><TableAlumnos getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'ALUMNOS_RESET_ITEM'}) 
          setComponent(<EditAlumno getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM('ALUMNOS_ITEM','alumnos',key)) 
          setComponent(<EditAlumno getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)
    return () => {
      console.log('exit clients view')
    };
  }, []);

  return(
    <>    
    <div className="content">        
      <div className="main-contenido">             
          {component}          
        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <AlumnoResumen/>
          </ModalBody>
        </Modal>
      </div>
    </div>    
    </>
  )

};
export default AlumnoView;
