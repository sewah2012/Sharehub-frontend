import axios from "axios";

// reducer.js
export default function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "SIGNOUT":
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "LOAD_EXPERIENCES":
      return {
        ...state,
        experience: action.payload,
      };
    case "LOAD_CURRENT_USER_DETAILS":
      return{
        ...state,
        currentUserDetails: action.payload
      }

    case "REGISTRATION_COMPLETE": 
      return {
        ...state,
        currentUserDetails: {
          ...state.currentUserDetails,
          registrationCompleted: action.payload
        }
      }

    case "LOAD_POPULAR_EXPERIENCES":
      return {
        ...state,
        popularExperiences: state.experience.filter(ex=>ex.likes.length > 5)

      }
    
    case "LOAD_SHARED_EXPERIENCES": 
      return {
        ...state,
        myExperiences: action.payload
      }

    case "EDIT_EXPERIENCE":
      let updatedX; 
      state.experience.forEach(x => {
       if(x.id===action.payload.id){
        x.title = action.payload.title
        x.details = action.payload.details
        x.experienceType = action.payload.experienceType
       }
        
      });
      return {
        ...state
      }
    
    default:
      return state;
  }
}
