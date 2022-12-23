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
import SubCategoriesNewEditForm from 'src/sections/@dashboard/categories/sub-categories/create-edit-form/subcategories-create-edit-form';
import { getSubCategoryById } from 'src/redux/slices/sub-categories';

// ----------------------------------------------------------------------

export default function SubCategoriesEdit() {
  const { themeStretch } = useSettings();

  const { id, subCategoryId } = useParams();

  const dispatch = useDispatch();

  const currentCategory = useSelector((state) => state.subCategories.currentSubCategory);

  useEffect(() => {
    dispatch(getSubCategoryById(subCategoryId as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title="القئات الفرعية: نعديل الفئة الفرعية">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="تعديل الفئة الفرعية"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الفئات الفرعية', href: PATH_DASHBOARD.categories.subCategories(id as string) },
            { name: 'تعديل الفئة' },
          ]}
        />

        <SubCategoriesNewEditForm isEdit currentSubCategory={currentCategory} />
      </Container>
    </Page>
  );
}
