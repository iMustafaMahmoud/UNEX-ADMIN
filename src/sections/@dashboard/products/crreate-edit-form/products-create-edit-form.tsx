import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { useDispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { SubCategoriesForGetAll } from 'src/@types/sub-categories';
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';
import axios from 'src/utils/axios';
import { createProduct, editProduct } from 'src/redux/slices/products';
import { EditProductPayload } from 'src/@types/products';
import { UploadMultiFile } from 'src/components/upload';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentProduct?: EditProductPayload;
};

export default function ProductssNewEditForm({ isEdit, currentProduct }: Props) {
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
    Discount: Yup.number().required().max(100, 'maximum 100'),
    PhotoUrls: Yup.array(),
  });

  const defaultValues = useMemo(() => {
    if (currentProduct) {
      return {
        EnName: (currentProduct.enName as string) || '',
        ArName: (currentProduct.arName as string) || '',
        subCategoryId: (currentProduct.subCategoryId as string) || '',
        EnDescription: (currentProduct.enDescription as string) || '',
        ArDescription: (currentProduct.arDescription as string) || '',
        Price: currentProduct.price || 0,
        Discount: currentProduct.discount || 0,
        PhotoUrls: currentProduct.images || [],
      };
    }
  }, [currentProduct]);

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
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (values: any) => {
    if (!currentProduct)
    {
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
        const product:EditProductPayload = values
        delete product?.subCategoryId
        await dispatch(editProduct(id as string, product));
        reset();
        setLoadingSend(false);
        navigate(PATH_DASHBOARD.products.root);
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
  const uploadImage = async (file: File) => {
    const form = new FormData()
    form.append('file',file)
    try {
      await axios.post(`/Product/uploadImage`, form, { params: {  } });
     
    } catch (error) {
      console.log({ error });
    }
  }
const [files,setFiles]=useState<any>([])
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        
        <Box sx={{ p: 3 }}>
          <UploadMultiFile files={files} onDropAccepted={(files)=>{console.log(files[0])}} />
          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
            الاسم بالانجليزية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField size="medium" name={`EnName`} fullWidth />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            الاسم بالعربية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField size="medium" name={`ArName`} fullWidth />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            الفئة الفرعية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFSelect disabled={isEdit} name="subCategoryId" placeholder="SubCategory">
                  {' '}
                  <option value="" />{' '}
                  {subCategories?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {' '}
                      {option.name}{' '}
                    </option>
                  ))}{' '}
                </RHFSelect>
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            الوصف بالانجليزية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField
                  size="medium"
                  name={`EnDescription`}
                  fullWidth
                  multiline
                  rows={4}
                  // sx={{ maxWidth: { md: 122 } }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            الوصف بالعربية:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField size="medium" name={`ArDescription`} fullWidth multiline rows={4} />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            السعر الاساسي:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField size="medium" name={`Price`} fullWidth />
              </Stack>
            </Stack>
          </Stack>

          <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
            نسبة الخصم:
          </Typography>

          <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            <Stack alignItems="flex-start" spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
                <RHFTextField size="medium" type={'number'} name={`Discount`} fullWidth />
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
