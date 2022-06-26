import './styles/allexperiences.css'
import React, { useContext, useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'
import axios from 'axios';
import { AppContext } from '../states/AppContext';
import Experience from './Experience';

const LatestExperiences = () => {
    const [state, dispatch] = useContext(AppContext);
    const { myExperiences } = state;
    const [loading, setLoading] = useState(false);
    const url = "/api/experience/list";
  
    useEffect(() => {
      axios
        .get(url)
        .then((resp) => {
          if (resp.status === 200) {
            dispatch({
              type: "LOAD_SHARED_EXPERIENCES",
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
          myExperiences.map((ex) => <Experience key={ex.id} exp={ex} />)
        )}
    </div>
  )
}

export default LatestExperiences