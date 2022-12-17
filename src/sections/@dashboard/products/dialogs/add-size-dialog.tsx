import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@mui/material';

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
import { Size } from 'src/@types/products';

export interface AddSizeDialogProps {
  open: boolean;
  productInfoId: string;
  handleClose: () => void;
  handleAddSize?: (color: string) => void;
}

const AddSizeDialog = (props: AddSizeDialogProps) => {
  const { handleClose, open, handleAddSize, productInfoId } = props;
  const [color, setColor] = useState('#aabbcc');

  const addColor = async () => {
    // await handleAddSize(color);
    handleClose();
  };

  const navigate = useNavigate();

  const { id, subCategoryId } = useParams();

  const [loadingSend, setLoadingSend] = useState(false);

  const dispatch = useDispatch();

  const NewUserSchema = Yup.object().shape({
    Size: Yup.string().required(),
    Count: Yup.number().required(),
  });

  const defaultValues = useMemo(() => {
    return {
      Size: '',
      Count: 0,
    };
  }, []);

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: any) => {
    try {
      await axios.post(
        `/product/additem`,
        { ...values },
        {
          params: { ProductInfoId: productInfoId as string },
        }
      );
    } catch (error) {
      console.log({ error });
    }
    handleClose();
    // await getProductById(id as string);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box width="400px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
                Size:
              </Typography>

              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-start" spacing={1.5}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
                    <RHFSelect name="Size" label="Size" placeholder="Size">
                      {' '}
                      <option value="" />{' '}
                      {Object.values(Size)?.map((size) => (
                        <option key={size} value={size}>
                          {' '}
                          {size}{' '}
                        </option>
                      ))}{' '}
                    </RHFSelect>
                  </Stack>
                </Stack>
              </Stack>

              <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 3 }}>
                Count:
              </Typography>

              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-start" spacing={1.5}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
                    <RHFTextField
                      size="medium"
                      name={`Count`}
                      label="Count"
                      fullWidth
                      type="number"
                      // sx={{ maxWidth: { md: 122 } }}
                    />
                  </Stack>
                </Stack>
              </Stack>

              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
            </Box>
          </Card>

          <Stack justifyContent="center" direction="row" spacing={2} sx={{ mt: 3, mb: 2 }}>
            <LoadingButton
              size="large"
              variant="contained"
              loading={loadingSend && isSubmitting}
              type="submit"
            >
              {'Create'} & Send
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default AddSizeDialog;
