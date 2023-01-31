import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// @types

import { TableMoreMenu } from '../../../../components/table';
import Label from 'src/components/shared/Label';
import Iconify from 'src/components/shared/Iconify';
import { Avatar } from '@mui/material';

// ----------------------------------------------------------------------
export enum ORDER_STATUS {
  Confirmed = 0,
  Processing = 1,
  OutForDelivery = 2,
  Delivered = 3,
  Canceled = 4,
}
type Props = {
  row: any;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
};

export default function InvoiceTableRow({
  row,
  selected,
  onViewRow,
  onEditRow,
}: Props) {
  const theme = useTheme();

  const { email, phoneNumber, createdDate, id, totalAmount, status } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
   

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={email} color={createAvatar(email).color} sx={{ mr: 2 }}>
          {createAvatar(email).name}
        </Avatar>

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {email}
          </Typography>

          <Link
            noWrap
            variant="body2"
            onClick={onViewRow}
            sx={{ color: 'text.disabled', cursor: 'pointer' }}
          >
            {`INV-${String(id).split('-')?.[String(id).split('-').length - 1]}`}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{fDate(createdDate)}</TableCell>

      <TableCell align="center">{fCurrency(totalAmount)}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === ORDER_STATUS.Delivered && 'success') ||
            (status === (ORDER_STATUS.OutForDelivery || ORDER_STATUS.Processing) && 'warning') ||
            (status === ORDER_STATUS.Canceled && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
             

              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                مشاهدة
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                تغير الحاله
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
