import React,{useState} from "react";
import { ButtonGroup, Modal, ModalBody, Row,Col,Form, FormGroup, Input, Label,Card, CardHeader, CardTitle, CardBody, CardFooter, Button  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSearch, faPlus,faPrint, faFileExport, faUsers, faCopy, faTrash, faFilePdf, faCoins, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'  
import { customStyles, customs } from '../../../helpers/customStyles'




const page =[{"value":'codigo',"label":'codigo'},
             {"value":'nombres',"label":'nombres'},
             {"value":'carrera',"label":'carrera'}             
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }

const SearchAlumnos = ({getComponent}) => {
    const dispatch = useDispatch()    
    const { total, indicador, modalView }= useSelector(state => state.alumnos)
    const [prop, setProp] = useState('nombres');
    const [value, setValue] = useState("");
    const [view, setview] = useState(false);

    
    
    const changeSelect = (pky) => {        
      const { value } = pky
      setProp(value)
    };

    const changeHandler = event => {    
        const { name, value } = event.target               
        setValue(value)
    }
    
    const submitHandle = event => {       
        event.preventDefault()  
        let iok = {}               
        iok.value = value
        iok.prop  = prop
        dispatch(crudActions.GET_SEARCH('ALUMNOS_DATA','alumnos',iok))              
     }  
    

  
    const onBorrar = () => {            
      dispatch(crudActions.GET_DELETE('ALUMNOS_DATA','alumnos',indicador,'lista'))      
      dispatch({type:'ALUMNOS_INDICADOR',value:0})
      setview(false)

    };

    const viewArticulo = () => {        
      let est = modalView === true ? false : true;             
      dispatch({type:'ALUMNOS_VIEW',view:est}) 
      dispatch(crudActions.GET_ITEM('ALUMNOS_ITEM','alumnos',indicador))
    };   

    const toggleModalView = () => {        
      setview(!view)                  
    };
    
    return ( 
      <>             
      <Card> 
      <Row>
        <Col md={1} >
          <div className="circule">
          <FontAwesomeIcon icon={faUsers} />  
          </div>        
        </Col>
        <Col md={4} className="cards">
        <ButtonGroup>
          <Button className={indicador !== 0 ? "btl bg-defaults text-white disabled": " btl bg-defaults text-white"}  onClick={()=> getComponent('new',1)}><FontAwesomeIcon icon={faPlus}/> </Button>                 
          <Button className={indicador === 0 ? "bts bg-default text-white disabled": "bts bg-default text-white"} onClick={()=> getComponent('edit',indicador)}>
            <FontAwesomeIcon icon={faFileExport} /></Button>                                              
          <Button className={indicador === 0 ? "btr bg-default text-white disabled": "btr bg-default text-white"} onClick={()=> viewArticulo()}>
            <FontAwesomeIcon icon={faFilePdf} /> </Button>               
        </ButtonGroup>
        </Col>

        <Col md={1} className="cards text-right">
          <Select                 
                styles={customs}                                              
                defaultValue={page[0]}
                name="prop"    
                id="prop"                    
                options={page}      
                isClearable={false}                          
                value={defaultVal(page,prop)}    
                onChange={ (e) => changeSelect(e)}                                             
          />
        </Col> 

        <Col md={4} className="cards">
          <Form onSubmit={ submitHandle}> 
            <FormGroup row>                                                          
              <Col md={11}>
                <Input 
                    type="text" 
                    name="value"                                 
                    id="value"  
                    value={ value || '' }  
                    onChange={ (e) => {setValue(e.target.value)}} />   
                    {
                      value ? 
                      <Button className="volatil" onClick={(e) => {setValue('')}}>
                        <FontAwesomeIcon icon={faTimes}   />
                      </Button>
                      : null
                    } 
              </Col>
              <Col md={1}>
                <Button className="btn-primary btn-search">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>  
              </Col>              
          </FormGroup>       
          </Form>               
        </Col> 
        <Col md={2}> 
        <p className="mt-3 ml-3" >{ total || 0 } ALUMNOS</p>          
        </Col>
      </Row>  


      </Card>  
      <Modal isOpen={view} toggle={toggleModalView} className="deleteBody">  
          <ModalBody className="deleteConte">
          <Row>
              <Col md="12" >
              <p className="deletePe">desea borra el registro ?</p>  
              </Col>              
            </Row>
            <Row className="mt-3">
              <Col md="6" className="text-center">
              <Button className="btn-danger deleteCol"  onClick={() => toggleModalView()} >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              </Col>
              <Col md="6" className="text-center">
              <Button className="btn-success deleteCol"  onClick={() => onBorrar()} >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
              </Col>
            </Row>
          </ModalBody>
      </Modal>
    </>    
     
                         
    );
};
export default SearchAlumnos;
