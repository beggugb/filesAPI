import React,{useEffect, useCallback, useState} from "react";
import { Modal, ModalBody, FormGroup, Label, Table, Row, Col, Button, Card, CardHeader, CardTitle, CardBody, CardFooter, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions, mailActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImage, faLock, faLockOpen, faEdit,faFilePdf, faCheck, faTrash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'
import Select from 'react-select'  
import Moment from 'react-moment'
import { customStyles, customs } from '../../../helpers/customStyles'
import AlumnoCertificado  from '../../Alumnos/components/AlumnoCertificado'

const page = [{"value":12,"label":"12"},
             {"value":24,"label":"24"},
             {"value":36,"label":"36"}
            ];

            const defaultVal = (options, valor) =>{
              return options.filter(item =>
                  item.value === valor
                )
            
            }  
const TableCertificados = ({getComponent}) => {
   const dispatch = useDispatch() 
   const [pag, setpag] = useState(12);
   const {data,total,pagina,paginas }= useSelector(state => state.certificados)
   const { indicador }= useSelector(state => state.alumnos)
   const [view, setview] = useState(false);
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.GET_DATA('CERTIFICADOS_DATA','certificados',page, num,indicador,indicador))  
    console.log('segui1')
  },[]) 

  const changeSelect = (pky) => {        
    const {value, label} = pky
    setpag(value)
    makeHttpRequestWithPage(1,value)
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  const setIndicador = (pky,est,monto) => {            
    let iok = pky === indicador  ? 0 : pky
    dispatch({type:'CERTIFICADOS_INDICADOR',value:iok,estado:est,indicadorTotal:monto}) 
  };

  const toggleModalView = (item) =>{    
    if(item){
      dispatch({type:'CERTIFICADOS_ITEM',certificado:item}) 
    }    
    setview(!view)     
  }

  return(
    <>    
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Table className="table-simple">
          <thead>
              <tr>  

                  <th width="10%">Código</th>
                  <th width="10%">Módulo</th>
                  <th width="60%">Descripción</th>                  
                  <th width="10%">Imagen</th>                  
                  <th width="10%"></th>
                  
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item, index) => (
                      <tr key={index}>                                                                    
                        <td>{item.codigo}</td>                                                         
                        <td>{item.modulo}</td> 
                        <td>{item.descripcion}</td> 
                        <td>{item.filename}</td>                         
                        <td>
                          <Button
                           className="btn-warning btn-tb"
                           onClick={() => toggleModalView(item)}>
                           <FontAwesomeIcon icon={faImage} />
                          </Button>
                        </td>                        
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
      </CardBody>    
      <CardFooter>     
    <Row>  
    <Col md={6} >
                  <Pagination
                    makeHttpRequestWithPage={ makeHttpRequestWithPage }              
                    paginas={paginas}
                    current= {pagina} 
                    pagina= {pag}
                  />
              </Col>          
              <Col md={4}>                  
              </Col>
              <Col md={2}>   
                <FormGroup row>
                  <Label for="exampleEmail" sm={4}>Mostrar</Label>
                  <Col sm={7}>
                      <Select                 
                        styles={customStyles}                                              
                        defaultValue={page[0]}
                        name="pag"    
                        id="pag"                    
                        options={page}      
                        isClearable={false}                          
                        value={defaultVal(page,pag)}    
                        onChange={ (e) => changeSelect(e)}                                             
                      />
                  </Col>
                  </FormGroup>
              </Col>  
    </Row>  
    </CardFooter> 
        </Card>  
      </Col>
    </Row>  

    <Modal isOpen={view} toggle={toggleModalView}>  
        <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
        </Button>
      <ModalBody >         
        <AlumnoCertificado/>
      </ModalBody>
    </Modal>


</>      
  )

};
export default TableCertificados;
