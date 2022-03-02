import React,{ useEffect, useCallback, useState } from "react";
import { css } from "@emotion/react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Nav, Button, Modal, ModalBody, NavItem } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { usuarioActions} from "../../actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import MoonLoader from "react-spinners/MoonLoader";


import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import Alumnos from "../../pages/Alumnos/AlumnosView.jsx";



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Admin(){
    const dispatch = useDispatch()
 
    const [itemr,setItemr] = useState([])    
    const modulos = JSON.parse(localStorage.getItem('@userItems'))    
    const { loading }= useSelector(state => state.usuarios)
    const changeModule = useCallback((name, tab, pky) =>{
        let items = [...itemr];
        modulos.map((prop, key)=>{
            let dato = {
                path: prop.path,
                name: prop.name,
                icon: prop.icon,
                component: verificar(prop.component),
                layout: prop.layout
            };
            items.push(dato);
            return null;
        })
        setItemr(items)
    })
    
    const verificar = (component) => {
        switch (component) {
          case "Dashboard":
            return Dashboard;                
          case "Alumnos":
            return Alumnos;                               
          default:
            return null;
        }
      };
    
    const getRoutes = (routes) =>{
        return routes.map((prop, key) =>{
            if(prop.layout === '/admin'){
                return(
                    <Route
                       path={prop.layout + prop.path}
                       component={prop.component}
                       key={key} 
                    />
                );
            }else{
                return null;
            }
        })
    };
    
    const logoutt = () => {    
        dispatch(usuarioActions.logout())  
      };
    
    useEffect(() => {        
        changeModule();
        return () => {
         
        };
    }, []);

return(
    <div className="wrapper">  
      <div className="main-panel" > 
         <Modal isOpen={loading} className="cargas">          
          <ModalBody className="carga">
            <MoonLoader color="#1fa2f2" loading={loading} css={override} size={30} />                
          </ModalBody>
        </Modal>
        <div className="nav-unity" expand="lg">        
        <Nav> 
               
          <NavItem>       
          <NavLink
              to="/admin/dashboard"
              className="nav-link"
              activeClassName="active">            
                  <p className="text-white">
                  Dashboard
                  </p>
            </NavLink>
          </NavItem>      
            {itemr.map((prop, key) => (  
            <NavItem key={key}>  
              <NavLink                
                to={prop.layout + prop.path}
                className="nav-link"
                activeClassName="active"> 
                <p>{prop.name}</p>                    
              </NavLink>
            </NavItem>))}

          <NavItem className="text-center">      
            <Button className="btn btn-danger btn-xs mt-3" onClick={() => {logoutt()}} >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button> 
          </NavItem>     
        </Nav>        
        </div>  
       

        <Switch>   
                {getRoutes(itemr)}
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/alumnos" component={Alumnos} />   
                  
            </Switch> 
            
      </div>        
    </div>    
)    

}
export default Admin;
