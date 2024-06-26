'use client'
import React, { useEffect, useState} from 'react'

import Grid from '@mui/material/Grid';
import CollectionTable from './CollectionTable';
import CollectionGrid from './CollectionGrid';
import ToggleButton from '@mui/material/ToggleButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import styles from "../../page.module.css";

import { fetchCollection } from '@/untils/service';


export default function CollectionPage({params}) {

  const [header, setHeader] = useState('Loading')
  const [view, setView] = useState('list');
  const [apiData, setApiData] = useState([])


  useEffect(() => {
    
    (async () => {
      let {data} = await fetchCollection(params.collectionName)
      setHeader(data[0].collection_name)
      setApiData(data)
    }) ();

  },[])
  
  const handleChange = (event, nextView) =>  (setView(nextView))


  return (
    <div className={styles.main}>
          <Grid container spacing={3}>

          <Grid item xs={11}>
              <h1 className={styles.title}>{header}</h1>
            </Grid>

            <Grid item xs={1}>
                  <ToggleButtonGroup orientation="horizontal" value={view} exclusive sx={{bgcolor:'white'}} onChange={handleChange} >
                    <ToggleButton value="list" aria-label="list"> <ViewListIcon /> </ToggleButton>
                    <ToggleButton value="module" aria-label="module"> <ViewModuleIcon /> </ToggleButton>
                  </ToggleButtonGroup>
            </Grid>
            
            <Grid item xs={12}>
            { view === "list" && <CollectionTable rows={apiData}/> }
            { view !== "list" && <CollectionGrid rows={apiData}/> }
            </Grid>

          </Grid>
    </div>
  );
}
