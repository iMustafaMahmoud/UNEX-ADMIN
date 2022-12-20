/* eslint-disable arrow-body-style */
import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem, Box } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { Info, SizesCount } from 'src/@types/products';

// ----------------------------------------------------------------------

type Props = {
  row: Info;
  infoItem?: SizesCount;
  selected: boolean;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onAddSize: VoidFunction;
};

export default function InfoTableRow({ row, selected, infoItem, onAddSize }: Props) {

  const { color } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };


  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">
        {!infoItem && <Box sx={{ bgcolor: color, width: 30, height: 30, borderRadius: '50%',border:'1px solid grey' }} />}
      </TableCell>
      <TableCell align="left">{infoItem?.size}</TableCell>
      <TableCell align="left">{infoItem?.count}</TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onAddSize();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                اضف مقاس جديد
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
