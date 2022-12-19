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
import { PATH_DASHBOARD } from '../../../../routes/paths';

import { FormProvider, RHFTextField } from '../../../../components/hook-form';

import { EditCategoryPayload } from 'src/@types/categories';
import { useDispatch } from 'src/redux/store';
import { createCategory, editCategory } from 'src/redux/slices/categories';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentCategory?: EditCategoryPayload[];
};

export default function CategoriesNewEditForm({ isEdit, currentCategory }: Props) {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loadingSend, setLoadingSend] = useState(false);

  const dispatch = useDispatch();

  const NewUserSchema = Yup.object().shape({
    enName: Yup.string().required(),
    arName: Yup.string(),
  });

  const defaultValues = useMemo(() => {
    if (currentCategory?.length) {
      return {
        enName: (currentCategory[0]?.enCategoryName as string) || '',
        arName: (currentCategory[0]?.arCateogryName as string) || '',
      };
    }
  }, [currentCategory]);

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
    if (isEdit && currentCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCategory]);

  const onSubmit = async (values: any) => {
    if (!currentCategory) {
      try {
        await dispatch(createCategory({ arName: values.arName, enName: values.enName }));
        reset();
        setLoadingSend(false);
        navigate(PATH_DASHBOARD.categories.root);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await dispatch(
          editCategory(id as string, { arName: values.arName, enName: values.enName })
        );
        reset();
        setLoadingSend(false);
        navigate(PATH_DASHBOARD.categories.root);
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
                <RHFTextField
                  size="medium"
                  name={`enName`}
                 
                  fullWidth
                  // sx={{ maxWidth: { md: 122 } }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            الاسم بالعربية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`arName`}
                  
                  fullWidth
                  // sx={{ maxWidth: { md: 122 } }}
                />
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
