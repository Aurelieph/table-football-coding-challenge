import React from 'react';
import MuiAlert from '@mui/material/Alert';
import { Snackbar, Stack } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SnackbarComponent = ({ open, message, onClose }) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert onClose={onClose} severity={'success'} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarComponent;
