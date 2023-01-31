import * as React from 'react';
import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationDialog({
  open,
  handleClose,
  submit,
}: {
  open: boolean;
  handleClose: VoidFunction;
  submit: VoidFunction;
}) {
  return (
    <div>
      <Modal key="deleteDialog" open={open} onClose={handleClose}>
        <>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              تآكيد الحذف
            </Typography>
            <Typography sx={{ mt: 2 }}>هل انت متآكد من حذف هذا العنصر؟</Typography>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent="center"
              width="100%"
              spacing={2}
              mt="20px"
            >
              
              <Button variant="contained" color="error" onClick={() => submit()}>
                نعم
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleClose();
                }}
              >
                لا
              </Button>
            </Stack>
          </Box>
        </>
      </Modal>
    </div>
  );
}
