// @mui
import { Container } from '@mui/material';
// _mock_
// hooks
import useSettings from '../../hooks/useSettings';
import Page from 'src/components/shared/Page';
import InvoiceDetailsSection from 'src/sections/@dashboard/invoice/details';

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  console.log('HELLLO');
  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <InvoiceDetailsSection />
      </Container>
    </Page>
  );
}
