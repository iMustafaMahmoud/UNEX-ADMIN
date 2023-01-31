import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// hooks
import useSettings from '../../hooks/useSettings';
// components
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import Invoice from '../../sections/@dashboard/invoice/details';
import Page from 'src/components/shared/Page';

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  // const invoice = orders.find((order:any) => order.id === id);

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>

        <Invoice  />
      </Container>
    </Page>
  );
}
