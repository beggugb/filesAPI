import React,{useEffect} from "react";
import {  
  Row,
  Col,
  Card, CardHeader, CardTitle, CardBody, CardFooter, Button
} from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faPlusSquare, faTags, faReceipt, faUsers, faPeopleCarry, faShoppingCart, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../actions'



const Dashboard = () => {
  const dispatch = useDispatch()   

 
  
  const makeHttpRequestWithPage = () =>{
    let iok={
      "dato":1
    }
    dispatch(crudActions.GET_INFORMES('INFORMES_DASHBOARD','consolidado',iok))      
  }
  useEffect(() => {
    /*makeHttpRequestWithPage()*/
    return () => {
      console.log('exit clients view')
    };
  }, []);
  return(
    <div className="content">     
      <div className="main-contenido">
        <Row className="mt-4">
          <Col md={6}>
            <Card>
            <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faTags} /></div>
              <CardTitle className="text-dark">ALUMNOS</CardTitle>
              <p></p>                                    
              </CardHeader>
              <CardBody>
                + 8 ùltimos dias
              </CardBody>
              <CardFooter>
                <Button>IR A ALUMNOS</Button>
                <Button><FontAwesomeIcon icon={faPlusSquare} /></Button>
              </CardFooter>
            </Card>    
          </Col>  
          <Col md={6}>
          <Card>
            <CardHeader>
            <div className="card-icono"><FontAwesomeIcon icon={faUsers} /></div>
              <CardTitle className="text-dark">CERTIFICADOS</CardTitle>                                    
              <p></p> 
              </CardHeader>
              <CardBody>
                + 8 ùltimos dias
              </CardBody>
              <CardFooter>
                <Button>IR A CERTIFICADOS</Button>
                <Button><FontAwesomeIcon icon={faPlusSquare} /></Button>
              </CardFooter>
            </Card>    
          </Col>            
        </Row>
       
      </div>
    </div>    
  )

};
export default Dashboard;
