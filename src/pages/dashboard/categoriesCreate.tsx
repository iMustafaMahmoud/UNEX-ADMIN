// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/shared/Page';
import HeaderBreadcrumbs from '../../components/shared/HeaderBreadcrumbs';
// sections
import CategoriesNewEditForm from 'src/sections/@dashboard/categories/create-edit-form/categories-create-edit-form';

// ----------------------------------------------------------------------

export default function CategoriesCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories: Create a new category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="اضافة فئة"
          links={[
            { name: 'الرئيسية ', href: PATH_DASHBOARD.root },
            { name: 'الفئات', href: PATH_DASHBOARD.categories.root },
            { name: 'فئة جديدة' },
          ]}
        />

        <CategoriesNewEditForm />
      </Container>
    </Page>
  );
}
