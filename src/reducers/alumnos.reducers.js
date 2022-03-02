const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    modalView: false,
    indicador:0,
    items:[],
    item:{      
      codigo:'',
      tipo:'personal',
      nit:'',
      nombres: '',      
      direccion:'',   
      filename:'default.png',
      fci:'default.png',
      fbachiller:'default.png',
      fegreso:'default.png',   
      flicenciatura:'default.png',   
      pais:'',
      ciudad:'',
      email:'',
      web:'',
      telefono:'',
      observaciones:'',
      carrera:'',
      facultad:'',
      esado:''         
    }    
  };
  
export function alumnos(state = initialState, action) {
    switch (action.type) {      
        case "ALUMNOS_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "ALUMNOS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "ALUMNOS_ITEM":
          return {
            ...state,
            item: action.response.alumnos,
            items:action.response.certificados
        };  
        case "ALUMNOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
        }; 
        case "ALUMNOS_CHANGE":
          return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "ALUMNOS_ADD":
        return {
          ...state,
          item: action.response
        };       
      case "ALUMNOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          indicador: 0
        };
      case "ALUMNOS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  

      case "ALUMNOS_RESET_DATA":
          return {
            ...state,            
            data: [],            
            pagina: 0,
            paginas: 0,
            total: 0,
            indicador:0
          };  
        
      default:
        return state;
    }
  }
  