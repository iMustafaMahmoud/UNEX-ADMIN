/* eslint-disable arrow-body-style */
import { Box, Modal } from '@mui/material';
import { StyledModalBox } from './styles';
import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';
import { User } from 'src/@types/user';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'16px',
  p: 4,
};
export const UserModal = ({
  open,
  handleClose,
  isEdit,
  currentUser,
  afterSubmit,
}: {
  open: boolean;
  handleClose(): void;
  isEdit: boolean;
  currentUser: User | undefined;
  afterSubmit():void
}) => {
  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box sx={style}>
        <UserNewEditForm afterSubmit={afterSubmit} isEdit={isEdit} currentUser={currentUser} />
      </Box>
    </Modal>
  );
};
  