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
import { createSubCategory, editSubCategory } from 'src/redux/slices/sub-categories';
import {
  EditSubCategoryPayload,
  SubCategories,
  SubCategoriesForGetAll,
} from 'src/@types/sub-categories';
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';
import axios from 'src/utils/axios';
import { createProduct } from 'src/redux/slices/products';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentSubCategory?: EditSubCategoryPayload[];
};

export default function ProductssNewEditForm({ isEdit, currentSubCategory }: Props) {
  const navigate = useNavigate();

  const { id, subCategoryId } = useParams();

  const [loadingSend, setLoadingSend] = useState(false);

  const dispatch = useDispatch();

  const [subCategories, setSubCategories] = useState<SubCategoriesForGetAll[]>([]);

  const NewUserSchema = Yup.object().shape({
    EnName: Yup.string().required(),
    ArName: Yup.string().required(),
    subCategoryId: Yup.string().required(),
    EnDescription: Yup.string().required(),
    ArDescription: Yup.string().required(),
    Price: Yup.number().required(),
    Discount: Yup.number().required(),
    PhotoUrls: Yup.array(),
  });

  const defaultValues = useMemo(() => {
    if (currentSubCategory?.length) {
      return {
        enName: (currentSubCategory[0]?.enSubCategoryName as string) || '',
        arName: (currentSubCategory[0]?.arSubCateogryName as string) || '',
        subCategoryId: '',
        EnDescription: '',
        ArDescription: '',
        Price: 0,
        Discount: 0,
        PhotoUrls: [],
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
      const { subCategoryId, ...remaining } = values;
      try {
        await dispatch(createProduct(subCategoryId as string, { ...remaining }));
        reset();
        setLoadingSend(false);
        navigate(PATH_DASHBOARD.products.root);
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

  const getSubCategories = async () => {
    try {
      const response = await axios.get('/subcategory/getAll');
      setSubCategories(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            English Name:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`EnName`}
                  label="English Name"
                  fullWidth
                  // sx={{ maxWidth: { md: 122 } }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            Arabic Name:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`ArName`}
                  label="Arabic Name"
                  fullWidth
                  // sx={{ maxWidth: { md: 122 } }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            SubCategory:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFSelect name="subCategoryId" label="SubCategory" placeholder="SubCategory">
                  {' '}
                  <option value="" />{' '}
                  {subCategories?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {' '}
                      {option.enName}{' '}
                    </option>
                  ))}{' '}
                </RHFSelect>
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            English Description:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`EnDescription`}
                  label="English Description"
                  fullWidth
                  multiline
                  rows={4}
                  // sx={{ maxWidth: { md: 122 } }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            Arabic Description:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`ArDescription`}
                  label="Arabic Descriptions"
                  fullWidth
                  multiline
                  rows={4}
                  // sx={{ maxWidth: { md: 122 } }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            Price:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`Price`}
                  label="Price"
                  fullWidth
                  //   type="number"
                  // sx={{ maxWidth: { md: 122 } }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            Discount:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`Discount`}
                  label="Discount"
                  fullWidth
                  //   type="number"
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
          {isEdit ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
