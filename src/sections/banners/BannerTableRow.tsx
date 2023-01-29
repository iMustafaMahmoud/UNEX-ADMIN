import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, MenuItem } from '@mui/material';
import { TableMoreMenu } from 'src/components/table';
import Iconify from 'src/components/shared/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: {
    url: string;
    href: string;
    id: string;
  };
  onDeleteRow: VoidFunction;
};

export default function BannerTableRow({
  row,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { url, href, id } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell sx={{width:'50% !important'}} align="left">
        <img width={'100%'} height={'200px'} src={url} />
      </TableCell>
      <TableCell  align="left">{href}</TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
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
