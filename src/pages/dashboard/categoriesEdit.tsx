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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { getCategoryById } from 'src/redux/slices/categories';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function CategoriesEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const dispatch = useDispatch();

  const currentCategory = useSelector((state) => state.categories.currentCategory);

  useEffect(() => {
    dispatch(getCategoryById(id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="Categories: Edit category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="تعديل الفئة"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الفئات', href: PATH_DASHBOARD.categories.root },
            { name: 'فئة جديدة' },
          ]}
        />

        <CategoriesNewEditForm isEdit currentCategory={currentCategory} />
      </Container>
    </Page>
  );
}
