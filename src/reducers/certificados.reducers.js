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
  
export function certificados(state = initialState, action) {
    switch (action.type) {      
        case "CERTIFICADOS_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "CERTIFICADOS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "CERTIFICADOS_ITEM":
          return {
            ...state,
            item: action.certificado
        };  
        case "CERTIFICADOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
        }; 
        case "CERTIFICADOS_CHANGE":
          return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "CERTIFICADOS_ADD":
        return {
          ...state,
          item: action.response
        };       
      case "CERTIFICADOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          indicador: 0
        };
      case "CERTIFICADOS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  

      case "CERTIFICADOS_RESET_DATA":
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
  