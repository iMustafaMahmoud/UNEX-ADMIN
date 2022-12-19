import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
// routes

import { EditCategoryPayload } from 'src/@types/categories';
import { useDispatch } from 'src/redux/store';
import { createCategory, editCategory } from 'src/redux/slices/categories';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { FormProvider, RHFTextField } from '../../../../../components/hook-form';
import { createSubCategory, editSubCategory } from 'src/redux/slices/sub-categories';
import { EditSubCategoryPayload } from 'src/@types/sub-categories';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentSubCategory?: EditSubCategoryPayload[];
};

export default function SubCategoriesNewEditForm({ isEdit, currentSubCategory }: Props) {
  const navigate = useNavigate();

  const { id, subCategoryId } = useParams();

  const [loadingSend, setLoadingSend] = useState(false);

  const dispatch = useDispatch();

  const NewUserSchema = Yup.object().shape({
    enName: Yup.string().required(),
    arName: Yup.string(),
  });

  const defaultValues = useMemo(() => {
    if (currentSubCategory?.length) {
      return {
        enName: (currentSubCategory[0]?.enSubCategoryName as string) || '',
        arName: (currentSubCategory[0]?.arSubCateogryName as string) || '',
      };
    }
  }, [currentSubCategory]);

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentSubCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSubCategory]);

  const onSubmit = async (values: any) => {
    if (!currentSubCategory) {
      try {
        await dispatch(
          createSubCategory(id as string, { arName: values.arName, enName: values.enName })
        );
        reset();
        setLoadingSend(false);
        navigate(PATH_DASHBOARD.categories.subCategories(id as string));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await dispatch(
          editSubCategory(id as string, subCategoryId as string, {
            arName: values.arName,
            enName: values.enName,
          })
        );
        reset();
        setLoadingSend(false);
        navigate(PATH_DASHBOARD.categories.subCategories(id as string));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            الاسم بالانجليزية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField size="medium" name={`enName`} fullWidth />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            الاسم بالعربية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField size="medium" name={`arName`} fullWidth />
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
        </Box>
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          type="submit"
        >
          {isEdit ? 'تحديث' : 'انشاء'} & ارسال
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
