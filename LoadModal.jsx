
import * as React from 'react';
import {Box, Typography, Modal, Stack} from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoadModal({open, handleClose}) {
  

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="subtitle1" component="h2">
           Your request is being processed.. 
          </Typography>
          <Stack gap={2} mt={2}
          sx={{justifyContent:'center', alignItems: 'center'}}>
            <div className='rotateimg'>
                <HourglassTopIcon fontSize='large'></HourglassTopIcon>
            </div>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
