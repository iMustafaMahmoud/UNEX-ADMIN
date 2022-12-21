/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import Dialog from '@mui/material/Dialog';

import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { Size, SizesCount } from 'src/@types/products';

export interface AddSizeDialogProps {
  open: boolean;
  productInfoId: string;
  productItem?: SizesCount;
  handleClose: () => void;
  handleAddSize?: (color: string) => void;
  onSubmit(value: any): void;
}

const AddEditSizeDialog = (props: AddSizeDialogProps) => {
  const { handleClose, open } = props;

  const NewUserSchema = Yup.object().shape({
    Size: Yup.string().required(),
    Count: Yup.number().required(),
  });

  const defaultValues = useMemo(() => {
    return {
      Size: props.productItem?.size ? props.productItem?.size : '',
      Count: props.productItem?.count ? props.productItem?.count : 0,
    };
  }, [props.productItem]);

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;
  useEffect(() => {
    if (props.productItem) {
      reset(defaultValues);
    }
  }, [props.productItem]);

  return (
    <Dialog onClose={() => {
      reset({ Count:0,Size:'' });
      handleClose();
    }} open={open}>
      <Box width="400px">
        <FormProvider methods={methods} onSubmit={handleSubmit(props.onSubmit)}>
          <Card>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
                المقاس :
              </Typography>

              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-start" spacing={1.5}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
                    <RHFSelect name="Size">
                      {' '}
                      <option value="" />{' '}
                      {Object.values(Size)?.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}{' '}
                    </RHFSelect>
                  </Stack>
                </Stack>
              </Stack>

              <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 3 }}>
                العدد :
              </Typography>

              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-start" spacing={1.5}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
                    <RHFTextField size="medium" name={`Count`} fullWidth type="number" />
                  </Stack>
                </Stack>
              </Stack>

              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
            </Box>
          </Card>

          <Stack justifyContent="center" direction="row" spacing={2} sx={{ mt: 3, mb: 2 }}>
            <LoadingButton size="large" variant="contained" loading={isSubmitting} type="submit">
              {props.productItem ? 'تحديث' : 'انشاء'} & ارسال
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default AddEditSizeDialog;
