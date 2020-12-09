import ACTION_TYPES from './ActionTypes';

const initialState = {
  data: '',
  error: '',
  nav:1,
  merge:false,
  sectionMerge:false,
  remove:false,
  sectionRemove:false,
  undo:false,
  addCol:false,
  pins1:false,
  coll_id:'',
  checklogin:0,
  pinsRemove:false,
  collSec:false,
  pinsRemove:false,
  secEditPopup:false
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.API_PENDING:
      return {
        ...state
      };
    case ACTION_TYPES.API_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case ACTION_TYPES.API_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ACTION_TYPES.API_NAV1:
       return {nav:1}  
    case ACTION_TYPES.API_NAV2:
       return {nav:2}  
    case ACTION_TYPES.MERGE_POPUP:
       return {merge:!state.merge}  
   case ACTION_TYPES.MERGE_POPUP2:
       return {sectionMerge:!state.sectionMerge}  
       case ACTION_TYPES.REMOVE_POPUP:
        return {remove:!state.remove}  
    case ACTION_TYPES.REMOVE_POPUP2:
        return {sectionRemove:!state.sectionRemove} 
   case ACTION_TYPES.UNDO:
        return {undo:!state.undo}  
        case ACTION_TYPES.PINS_REMOVE:
          return {pinsRemove:!state.pinsRemove} 
   case ACTION_TYPES.SEC_EDIT_POPUP:
            return {secEditPopup:!state.secEditPopup} 
  case ACTION_TYPES.ADD_cOL:
          return {addCol:!state.addCol}  
          case ACTION_TYPES.COLLSEC_POPUP:
          return {collSec:!state.collSec} 
   case ACTION_TYPES.CHECKLOGIN:
            return { ...state, checklogin:1 };
   case ACTION_TYPES.CHECKLOGOUT:
              return { ...state, checklogin:0 };
    default:
      return state;
  }
};

export default apiReducer;