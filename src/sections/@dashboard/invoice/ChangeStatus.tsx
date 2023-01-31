import { Box, Divider, MenuItem, Select, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RHFSelect } from 'src/components/hook-form';
import { useState } from 'react';

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

export default function ChangeStatusModal({
  open,
  handleClose,
  submit,
}: {
  open: boolean;
  handleClose: VoidFunction;
  submit(state: string): void;
}) {
  const [status, setStatus] = useState('1');
  return (
    <div>
      <Modal key="deleteDialog" open={open} onClose={handleClose}>
        <>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              اختر حاله الطلب الجديده
            </Typography>
            <Stack width={'100%'} mt="20px">
              <Select
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
                name="status"
                placeholder="SubCategory"
              >
                <MenuItem style={{ padding: '10px' }} value={'4'}>
                  {'الغاء'}
                </MenuItem>
                
                <MenuItem style={{ padding: '10px' }} value={'1'}>
                  {'قيد التحضير'}
                </MenuItem>
                
                <MenuItem style={{ padding: '10px' }} value={'2'}>
                  {'خرج للتوصيل'}
                </MenuItem>
                
                <MenuItem style={{ padding: '10px' }} value={'3'}>
                  {'تم التوصيل '}
                </MenuItem>
              </Select>
            </Stack>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent="center"
              width="100%"
              spacing={2}
              mt="20px"
            >
              <Button variant="contained" onClick={() => submit(status)}>
                تعديل الحاله
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                الغاء
              </Button>
            </Stack>
          </Box>
        </>
      </Modal>
    </div>
  );
}
