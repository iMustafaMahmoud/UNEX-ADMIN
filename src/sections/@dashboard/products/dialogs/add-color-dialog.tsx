import Dialog from '@mui/material/Dialog';
import { HexColorPicker } from 'react-colorful';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { RHFTextField } from 'src/components/hook-form';

export interface AddColorDialogProps {
  open: boolean;
  handleClose: () => void;
  handleAddColor: (color: string) => void;
}

const AddColorDialog = (props: AddColorDialogProps) => {
  const { handleClose, open, handleAddColor } = props;
  const [color, setColor] = useState('#aabbcc');

  const addColor = async () => {
    await handleAddColor(color);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box
        width="350px"
        height="400px"
        style={{padding:'16px'}}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={'center'}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <HexColorPicker style={{width:'300px'}} color={color} onChange={setColor} />
        </Box>
        <TextField sx={{width:'300px',marginBottom:'16px'}}  value={color} onChange={(e)=>setColor(e.target.value)} />
       
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button fullWidth variant="contained" onClick={addColor}>
            اضافة اللون
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddColorDialog;
