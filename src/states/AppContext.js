import React, {createContext, useReducer} from 'react'
import reducer from './Reducer'

export const AppContext = createContext();

const initialState = 
    {
        isAuthenticated:true,
        experience:[],
        currentUser: {},
    }

export  const AppProvider=(props)=>{
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>

    );
}