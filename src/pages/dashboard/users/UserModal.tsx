/* eslint-disable arrow-body-style */
import { Modal } from '@mui/material';
import { StyledModalBox } from './styles';
import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';
import { User } from 'src/@types/user';

export const UserModal = ({
  open,
  handleClose,
  isEdit,
  currentUser,
}: {
  open: boolean;
  handleClose(): void;
  isEdit:boolean;
  currentUser:User|undefined;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalBox>
        <UserNewEditForm isEdit={isEdit} currentUser={currentUser} />
      </StyledModalBox>
    </Modal>
  );
};
