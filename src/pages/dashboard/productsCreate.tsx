// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import CategoriesNewEditForm from 'src/sections/@dashboard/categories/create-edit-form/categories-create-edit-form';
import SubCategoriesNewEditForm from 'src/sections/@dashboard/categories/sub-categories/create-edit-form/subcategories-create-edit-form';
import { useParams } from 'react-router';
import ProductssNewEditForm from 'src/sections/@dashboard/products/crreate-edit-form/products-create-edit-form';

// ----------------------------------------------------------------------

export default function ProductsCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();

  return (
    <Page title="Producrs: Create a new Product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add Product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Products', href: PATH_DASHBOARD.products.root },
            { name: 'New Product' },
          ]}
        />
        <ProductssNewEditForm />
      </Container>
    </Page>
  );
}
