
import React from 'react';
import Grid from '@mui/material/Grid';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import SidePanelFixed from '../AppBarComponent/SidePanelFixed'; 

const CustLayout = ({ children }) => {
  return (
    <>
    <AppBarComponent />
    <Grid container mt={'4.4rem'}>
      <Grid item sx={{ display: { xs: 'none', md: 'flex'  } , height: '100vh'}} >
      <SidePanelFixed />
      </Grid>
      <Grid item  xs sx={{overflow : 'auto'}} height={'100vh'}>
        {children}
      </Grid>
    </Grid>
    </>
  );
};

export default CustLayout;
