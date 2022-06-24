import './styles/allexperiences.css'
import React, { useContext, useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import axios from 'axios';
import { AppContext } from '../states/AppContext';
import Experience from './Experience';

const PopularExperiences = () => {
    const [state, dispatch] = useContext(AppContext);
    const { experience } = state;
    const [loading, setLoading] = useState(false);
    const url = "/api/experience/list";
  
    useEffect(() => {

    //    const popularExp = experience
      axios
        .get(url)
        .then((resp) => {
          if (resp.status === 200) {
            dispatch({
              type: "LOAD_EXPERIENCES",
              payload: resp.data,
            });

            
  
            setLoading(false);
  
            console.log(resp.data);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }, []);
  return (
    <div>
         {loading ? (
          <LinearProgress />
        ) : (
          experience.map((ex) => <Experience key={ex.id} experience={ex} />)
        )}
    </div>
  )
}

export default PopularExperiences