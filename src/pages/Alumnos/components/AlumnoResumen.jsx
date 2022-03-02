import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from "../../../helpers";
import Barcode from 'react-barcode'
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import Moment from 'react-moment'
import QRCode from "qrcode.react";

const fechaHoy = new Date()
 export class ComponentToPrint extends React.PureComponent {
   
  render() {    
    return (
      <>
    <div className="reporte">     
      <div className="report-header">        
          <Row className="crl">
            <Col md={12}>
             <h6 className="text-center pio"> <b>Kardex Alumno # <b>{this.props.data.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.data.nombres}</h5>
             <h5 className="text-center pio"> Código : {this.props.data.codigo}</h5>             
            </Col>            
          </Row>
      </div>
      <div className="report-body">        
        <Row>
          <Col md={12} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>                          
                  <tr><td><b>Dirección :</b></td>
                      <td>{this.props.data.direccion}</td></tr>          
                  <tr><td><b>Pais :</b></td>
                      <td >{this.props.data.pais}</td>
                  </tr>          

                  <tr><td><b>Ciudad :</b></td>
                      <td >{this.props.data.ciudad}</td>
                  </tr>          

                  <tr><td><b>Contacto :</b></td>
                      <td >{this.props.data.contacto}</td>
                  </tr>

                  <tr><td><b>Email :</b></td>
                      <td >{this.props.data.email}</td>
                  </tr>

                  <tr><td><b>Facultad :</b></td>
                      <td >{this.props.data.facultad}</td>
                  </tr>

                  <tr><td><b>Carrera :</b></td>
                      <td >{this.props.data.carrera}</td>
                  </tr>          
                  <tr><td colSpan="2"><b>Observaciones :</b></td></tr>   
                  <tr><td colSpan="2">{ this.props.data.observaciones }</td></tr>                    
                  <tr>
                    <td colSpan="2" className="text-center">

                    <QRCode 
                      value={this.props.data.codigo}
                      style={{ padding:5, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                    </td>
                  </tr> 
        </tbody>
        </Table>
          </Col>
         
        </Row>
      </div>
      <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {this.props.user.nombres}</p>
            </Col>
            <Col md="6">           
              <p>Fecha Emisión: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
            </Col>
          </Row>          
      </div>
      <div className="report-body"> 
          <img alt="alumno" className="text-center imglg" src={api + '/static/images/foto/lg/'+this.props.data.filename }/> 
      </div>  
      <div className="report-body"> 
      <img alt="alumno" className="text-center imglg" src={api + '/static/images/carnet/lg/'+this.props.data.fci }/> 
      </div>  
      <div className="report-body"> 
      <img alt="alumno" className="text-center imglg" src={api + '/static/images/bachiller/lg/'+this.props.data.fbachiller }/> 
      </div>  
      <div className="report-body"> 
      <img alt="alumno" className="text-center imglg" src={api + '/static/images/egreso/lg/'+this.props.data.fegreso }/> 
      </div>  
      <div className="report-body"> 
      <img alt="alumno" className="text-center imglg" src={api + '/static/images/licenciatura/lg/'+this.props.data.flicenciatura }/> 
      </div>  


    </div>  
    </> 
    );
  }
}


function AlumnoResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.alumnos)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'ALUMNOS_RESET_ITEM'}) 
    };
  }, []);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            data={item}
            user={usuario}
        />
    </div>
     )
}


export default AlumnoResumen