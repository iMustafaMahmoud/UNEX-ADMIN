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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { getProductById } from 'src/redux/slices/products';
// ----------------------------------------------------------------------

export default function ProductsEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();
  const dispatch = useDispatch();

  const currentProduct = useSelector((state) => state.products.currentProduct);

  useEffect(() => {
      dispatch(getProductById(id as string));
      console.log('product effect', currentProduct);

  }, []);

  return (
    <Page title="المنتجات: تعديل منتج جديد">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="تعديل منتج"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'المنتجات', href: PATH_DASHBOARD.products.root },
            { name: 'تعديل ' },
          ]}
        />
        <ProductssNewEditForm currentProduct={currentProduct[0]} isEdit={true} />
      </Container>
    </Page>
  );
}
