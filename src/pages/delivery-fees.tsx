import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Button, Container, TableContainer, TableBody } from '@mui/material';
// routes

// sections
import { useDispatch } from 'src/redux/store';
import AddBannerDialog from 'src/sections/@dashboard/banner/dialogs/add-banner-dialog';
import axiosInstance from 'src/utils/axios';
import { Table } from '@mui/material';
import { TableHeadCustom } from 'src/components/table';
import BannerTableRow from 'src/sections/banners/BannerTableRow';
import ConfirmationDialog from 'src/sections/@dashboard/deleteDialog';
import useSettings from 'src/hooks/useSettings';
import HeaderBreadcrumbs from 'src/components/shared/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/shared/Iconify';
import Page from 'src/components/shared/Page';
import AddDeliveryDialog from 'src/sections/@dashboard/delivery/deliveryDialog';
import DeliveryTableRow from 'src/sections/banners/Delivery';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'url', label: ' المحافظة', align: 'left' },
  { id: 'href', label: 'الرسوم', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function DeliveryFees() {
  const { themeStretch } = useSettings();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

  const [fees, setFees] = useState<
     {
        City: string;
        DeliveryFees: string;
      }[]
    | undefined
  >();

  const [dialogOpen, setDialogOpen] = useState(false);


  const getFees = async () => {
    const response = await axiosInstance.get('/order/getCities');
    setFees(response.data);
  };
  useEffect(() => {
    getFees();
  }, []);
  const { id } = useParams();

  const onDeleteRow = async () => {
    try {
      const response = await axiosInstance.post('/redirections/delete', null, {
        params: {
          id: selectedItem,
        },
      });
      setSelectedItem(undefined);
      setOpen(false);
      getFees();
    } catch (error) {}
  };

  return (
    <Page title={'Delivery Fees'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'رسوم التوصيل '}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: ' رسوم التوصيل', href: PATH_DASHBOARD.delivery.root },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => setDialogOpen(true)}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              اضف محافظة جديد
            </Button>
          }
        />
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={'medium'}>
            <TableHeadCustom order={'desc'} headLabel={TABLE_HEAD} />

            <TableBody>
              {fees?.map((row) => (
                <DeliveryTableRow
                  key={row.City}
                  row={row}
                  onDeleteRow={() => {
                    setSelectedItem(row.City);
                    setOpen(true);
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <AddDeliveryDialog
        open={dialogOpen}
        onSubmit={() => {
          getFees();
          setDialogOpen(false);
        }}
        handleClose={() => setDialogOpen(false)}
      />
      <ConfirmationDialog
        handleClose={() => setOpen(false)}
        open={open}
        submit={() => {
          onDeleteRow();
        }}
      />
    </Page>
  );
}
