import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Container, TableContainer, TableBody } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
// components
import Page from '../../components/shared/Page';
import Iconify from '../../components/shared/Iconify';
import HeaderBreadcrumbs from '../../components/shared/HeaderBreadcrumbs';
// sections
import { useDispatch } from 'src/redux/store';
import AddBannerDialog from 'src/sections/@dashboard/banner/dialogs/add-banner-dialog';
import axiosInstance from 'src/utils/axios';
import { Table } from '@mui/material';
import { TableHeadCustom } from 'src/components/table';
import BannerTableRow from 'src/sections/banners/BannerTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'url', label: ' البانر', align: 'left' },
  { id: 'href', label: 'الرابط', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function Orders() {
  const { themeStretch } = useSettings();
  const [banners, setBanners] = useState<
    | {
        url: string;
        href: string;
        id: string;
      }[]
    | undefined
  >();

  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);


  const getOrders = async () => {
      const response = await axiosInstance.get('/Order/allorders');
    setBanners(response.data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  const { id } = useParams();
  
  return (
    <Page title={'Banners'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'روابط البانر'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'روابط البانر', href: PATH_DASHBOARD.banner.root },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => setBannerDialogOpen(true)}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              اضف بانر جديد
            </Button>
          }
        />
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={'medium'}>
            <TableHeadCustom order={'desc'} headLabel={TABLE_HEAD} />

            <TableBody>
              {banners?.map((row) => (
                <BannerTableRow key={row.id} row={row} onDeleteRow={() => {}} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <AddBannerDialog
        open={bannerDialogOpen}
        onSubmit={() => {
          getOrders();
          setBannerDialogOpen(false);
        }}
        handleClose={() => setBannerDialogOpen(false)}
      />
    </Page>
  );
}
