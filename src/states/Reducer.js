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

    // case "LOAD_POPULAR_EXPERIENCES":
    //   return {
    //     ...state,
    //     // latestExperience: state.experience.filter(ex=>ex)

    //   }
   
    
    default:
      return state;
  }
}
