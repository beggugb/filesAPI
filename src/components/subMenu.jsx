import React from "react";
import { Row, Col, Nav, NavItem  } from "reactstrap";
import { Route, Switch, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown, faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const subMenu = ({items,prop}) => {     
  return(
  <>    
    <div className="nav-sunity" expand="lg">     
    <Nav>
    {items.map((item, index) => (
      <NavItem key={index}>  
      <NavLink                
        to={`/admin/${item.link}/`}
        className="nav-link"> 
        <FontAwesomeIcon icon={ item.name === prop ? faChevronDown : faChevronRight } />{' '} {item.name}
      </NavLink>
    </NavItem>             
    ))}
    </Nav>  
    </div>     
  </>         
  )

};
export default subMenu;
