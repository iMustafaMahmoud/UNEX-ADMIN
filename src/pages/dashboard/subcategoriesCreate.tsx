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

// ----------------------------------------------------------------------

export default function SubCategoriesCreate() {
  const { themeStretch } = useSettings();
  const { id } = useParams();

  return (
    <Page title="SubCategories: Create a new SubCategory">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add SubCategory"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'SubCategories', href: PATH_DASHBOARD.categories.subCategories(id as string) },
            { name: 'New SubCategory' },
          ]}
        />
        <SubCategoriesNewEditForm />
      </Container>
    </Page>
  );
}
