/* eslint-disable arrow-body-style */
import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem, Box } from '@mui/material';
import Iconify from '../../../../components/shared/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { Info, SizesCount } from 'src/@types/products';

// ----------------------------------------------------------------------

type Props = {
  row: Info;
  infoItem?: SizesCount;
  selected: boolean;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onAddSize?: VoidFunction;
};

export default function InfoTableRow({ row, selected, infoItem, onAddSize, onEditRow, onDeleteRow }: Props) {
  const { color, countBySize } = row;

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
        {!infoItem && (
          <Box
            sx={{
              bgcolor: color,
              width: 30,
              height: 30,
              borderRadius: '50%',
              border: '1px solid grey',
            }}
          />
        )}
      </TableCell>
      <TableCell align="left">{countBySize.length == 0 ? '---' : infoItem?.size}</TableCell>
      <TableCell align="left">{countBySize.length == 0 ? '---' : infoItem?.count}</TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
            {onAddSize!==undefined&&  <MenuItem
                onClick={() => {
                  onAddSize();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                اضف مقاس جديد
              </MenuItem>}
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                تعديل
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                مسح
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
