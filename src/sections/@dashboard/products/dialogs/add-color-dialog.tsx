import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { HexColorPicker } from 'react-colorful';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

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
        width="400px"
        height="400px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <HexColorPicker color={color} onChange={setColor} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button variant="contained" onClick={addColor}>
            Add Color
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddColorDialog;
