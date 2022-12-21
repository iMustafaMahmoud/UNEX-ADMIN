import Dialog from '@mui/material/Dialog';
import { HexColorPicker } from 'react-colorful';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Info } from 'src/@types/products';

export interface AddColorDialogProps {
  open: boolean;
  handleClose: () => void;
  handleAddColor: (color: string) => void;
  selectedProductInfo?:Info
}

const AddColorDialog = (props: AddColorDialogProps) => {
  const { handleClose, open, handleAddColor, selectedProductInfo } = props;
  const [color, setColor] = useState(selectedProductInfo?selectedProductInfo.color:'#aabbcc');

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
