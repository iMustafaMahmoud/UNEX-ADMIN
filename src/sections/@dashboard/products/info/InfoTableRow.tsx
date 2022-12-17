import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  Stack,
  Link,
  MenuItem,
  Box,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import createAvatar from '../../../../utils/createAvatar';
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { Invoice } from '../../../../@types/invoice';
// components
import Label from '../../../../components/Label';
import Avatar from '../../../../components/Avatar';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { Categories } from 'src/@types/categories';
import { Info, Prodcuct } from 'src/@types/products';

// ----------------------------------------------------------------------

type Props = {
  row: Info;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewSubCategory: VoidFunction;
  onAddSize: VoidFunction;
};

export default function InfoTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  onViewSubCategory,
  onAddSize,
}: Props) {
  const theme = useTheme();

  const { color } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const getSizes = () => {
    const sizes = row.countBySize.map((count) => count.size);
    const joinedSizes = sizes.join(', ');
    return joinedSizes;
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Box sx={{ bgcolor: color, width: 30, height: 30 }} />
      </TableCell>

      <TableCell align="left">{getSizes()}</TableCell>

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
                Add sizes
              </MenuItem>
              {/* <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem> */}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
