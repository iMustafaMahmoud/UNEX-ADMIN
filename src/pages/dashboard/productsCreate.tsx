// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { useParams } from 'react-router';
import ProductssNewEditForm from 'src/sections/@dashboard/products/crreate-edit-form/products-create-edit-form';

// ----------------------------------------------------------------------

export default function ProductsCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="المنتجات: اضافة منتج جديد">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="اضاف منتج"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'المنتجات', href: PATH_DASHBOARD.products.root },
            { name: 'جديد' },
          ]}
        />
        <ProductssNewEditForm />
      </Container>
    </Page>
  );
}
