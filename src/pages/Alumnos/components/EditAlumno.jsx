import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Tab, TabContent, TabPane,CardTitle, CardText, Nav, NavItem, NavLink, Row,Col,Button, FormText, Form, FormFeedback, FormGroup, Input, Label, Card, CardBody } from "reactstrap"
import Select from 'react-select'  
import { crudActions } from '../../../actions'
import { locations, ciudades } from "../../../helpers/locations";
import { custom } from '../../../helpers/customStyles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft   } from "@fortawesome/free-solid-svg-icons";
import AlumnoImagen from './AlumnoImagen'
import AlumnoCarnet from "./AlumnoCarnet";
import AlumnoBachiller from "./AlumnoBachiller";
import AlumnoEgreso from "./AlumnoEgreso"
import AlumnoLicenciatura from "./AlumnoLicenciatura"
import TableCertificados from "../../Certificados/components/TableCertificados"


const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const facultades  = [{"value":"Humanidades","label":"Humanidades"},
                     {"value":"Financieras","label":"Financieras"},
                     {"value":"Ciencias Exactas","label":"Ciencias Exactas"}
                    ];


const carreras    = [{"value":"Informática","label":"Informática"},
                     {"value":"Derecho","label":"Derecho"},];                   
                     
const EditAlumnos = ({getComponent}) => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.alumnos)   
    const [citys, setcitys] = useState([]);
    const [svalid, setsvalid] = useState(['saples']);
    const [taba, settaba] = useState('1');


    const changeHandler = event => {          
        const { name, value } = event.target  
        dispatch(crudActions.SET_CHANGE('ALUMNOS_CHANGE',name,value))  
    }
      
    const changesPaises = event => {                  
      const {value, indice} = event ? event : ''   
      console.log(value)           
      console.log(indice)           
      dispatch(crudActions.SET_CHANGE('ALUMNOS_CHANGE','pais',value))   
      let datc = ciudades.filter(d => (d.indice === indice) )  
      setcitys(datc)
  }
    const changesCiudades = event => {                  
      const {value} = event ? event : ''               
      dispatch(crudActions.SET_CHANGE('ALUMNOS_CHANGE','ciudad',value))   
      
    }

    const changefHandler = event => {                    
      const {label, value }  = event
        dispatch(crudActions.SET_CHANGE('ALUMNOS_CHANGE','facultad',value))          
    }
    const changecHandler = event => {                    
      const {label, value }  = event
        dispatch(crudActions.SET_CHANGE('ALUMNOS_CHANGE','carrera',value))          
    }
  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.SET_UPDATE('ALUMNOS_ADD','alumnos',item,'unit'))            
        }else{
          dispatch(crudActions.SET_ADD('ALUMNOS_ADD','alumnos',item,'unit'))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'ALUMNOS_RESET_ITEM'})        
      };
    }, []); 

     
    return (              
      <>
      <Row>
      <Col>
        <Card>
            <CardBody>
             <Row>
               <Col md="4">
               <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
                 <FontAwesomeIcon icon={faArrowLeft} /> LISTA ALUMNOS
               </Button>
               </Col> 
               <Col md="8">
               <Nav tabs>
                  <NavItem>
                    <NavLink
                      className="active"
                      onClick={() => {settaba('1')}}
                    >
                      Datos Generales
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=""
                      onClick={() => {settaba('2')}}
                    >
                    Documentos
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className=""
                      onClick={() => {settaba('3')}}
                    >
                    Certificados
                    </NavLink>
                  </NavItem>
               </Nav>
               </Col>
              </Row>  
            </CardBody>   
        </Card>       
      </Col>  
      </Row>

      <Row>
        <Col>
        <TabContent activeTab={taba}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
              <Card>        
              <CardBody>
               <Row>
                 <Col md="8" className="cardCo">
                    <Form onSubmit={ submitHandle}>   
                      <Row form>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="codigo">
                              Código
                            </Label>
                            <Input
                              id="codigo"
                              name="codigo"                    
                              type="text"
                              value={item.codigo || ''}
                              onChange={ (e) => changeHandler(e)}                                 
                              onInvalid={(e) => e.target.setCustomValidity('El campo código es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required 
                              
                            />
                          </FormGroup>
                        </Col>                        
                        <Col md={8}>
                          <FormGroup>
                            <Label for="nombres">
                              Nombres
                            </Label>
                            <Input
                              id="nombres"
                              name="nombres"                    
                              type="text"
                              value={item.nombres || ''}
                              onChange={ (e) => changeHandler(e)}
                              onInvalid={(e) => e.target.setCustomValidity('El campo nombres es obligatorio !')}
                              onInput={(e) => e.target.setCustomValidity('')}
                              required  
                           
                            />
                          </FormGroup>
                        </Col>                              
                      </Row>

                      <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Facultad">
                            Facultad
                          </Label>   
                            <Select                                                               
                              defaultValue={facultades[0]}
                              styles={custom} 
                              name="facultad"    
                              id="facultad"                    
                              options={facultades}      
                              isClearable={true}                          
                              value={defaultVal(facultades,item.facultad)}   
                              onChange={ (e) => changefHandler(e)}                                               
                            />                
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="Carrera">
                            Carrera
                          </Label>   
                            <Select                                                               
                              defaultValue={carreras[0]}
                              styles={custom} 
                              name="carrera"    
                              id="carrera"                    
                              options={carreras}      
                              isClearable={true}                          
                              value={defaultVal(carreras,item.carrera)}   
                              onChange={ (e) => changecHandler(e)}                                               
                            />                  
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                          <FormGroup>
                            <Label for="telefono">
                              Teléfono
                            </Label>
                            <Input
                              id="telefono"
                              name="telefono"                    
                              type="text"
                              value={item.telefono || ''}
                              onChange={ (e) => changeHandler(e)}                              
                              placeholder="(591)-000000"
                            />
                          </FormGroup>
                        </Col>            
                      </Row>

                      <FormGroup>
                        <Label for="direccion">
                          Dirección
                        </Label>
                        <Input
                          id="direccion"
                          name="direccion"
                          type="text"
                          value={item.direccion || ''}
                          onChange={ (e) => changeHandler(e)}      
                        />
                      </FormGroup>            
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="Pais">
                            Pais
                          </Label>   
                            <Select                                                               
                              defaultValue={locations[0]}
                              styles={custom} 
                              name="pais"    
                              id="pais"                    
                              options={locations}      
                              isClearable={true}                          
                              value={defaultVal(locations,item.pais)}   
                              onChange={ (e) => changesPaises(e)}                                               
                            />                
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="ciudad">
                            Ciudad
                          </Label>
                          <Select                                                               
                            defaultValue={citys[0]}
                            styles={custom} 
                            name="ciudad"    
                            id="ciudad"                    
                            options={citys}      
                            isClearable={true}                          
                            value={defaultVal(ciudades,item.ciudad)}     
                            onChange={ (e) => changesCiudades(e)}                                             
                          />                   
                        </FormGroup>
                      </Col>                      
                    </Row>
                    <FormGroup>
                      <Label for="observaciones">
                        Observaciones
                      </Label>
                      <Input
                        id="observaciones"
                        name="observaciones"
                        type="text"
                        value={item.observaciones || ''}
                        onChange={ (e) => changeHandler(e)}                
                      />
                    </FormGroup> 

                    <Row form>
                      <Col md={4}>            
                          <Button 
                            type="submit"
                            className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                            <FontAwesomeIcon icon={faSave} />  
                            {' '} {item.id ? " Actualizar" : " Guardar"}
                          </Button>
                      </Col>
                    </Row>              
            </Form>
            </Col>
            <Col md="4" className="cardCo">
              <h6 className="text-center">Imagen NIT</h6>
              <AlumnoImagen/>
            </Col>
          </Row>
        </CardBody>   
      </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col md="6">
              <h6 className="text-center">Imagen Carnet</h6>
                <AlumnoCarnet/>
              </Col>
              <Col md="6">
              <h6 className="text-center">Imagen Bachiller</h6>
                <AlumnoBachiller/> 
              </Col>            
            </Row>
            <Row>
              <Col md="6">
              <h6 className="text-center">Certificado Egreso</h6>
                <AlumnoEgreso/> 
              </Col> 
              <Col md="6">
              <h6 className="text-center">Certificado Licenciatura</h6>
                <AlumnoLicenciatura/> 
              </Col>           
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col md="12">
                <TableCertificados/>
              </Col>            
            </Row>
          </TabPane>
        </TabContent>
        </Col>
      </Row>      
    </>
    );
};
export default EditAlumnos;
