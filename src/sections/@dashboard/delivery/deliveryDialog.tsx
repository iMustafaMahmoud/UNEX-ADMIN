import Dialog from '@mui/material/Dialog';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import axios from 'src/utils/axios';
import { RegionDropdown } from 'react-country-region-selector';
import styled from 'styled-components';

export const StyledRegionSelect = styled(RegionDropdown)({
  height: '50px',
  border:'1px solid #f0f0f0',
  fontSize: '14px',
  padding: '6px',
  width: '100% !important',
  borderRadius:'8px'
});
export interface AddDeliveryDialogProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: VoidFunction;
}

const AddDeliveryDialog = (props: AddDeliveryDialogProps) => {
  const { handleClose, open } = props;

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    arCity: Yup.string().required(),
    enCity: Yup.string().required(),
    DeliveryFees: Yup.string().required(),
  });


  const defaultValues = useMemo(
    () => ({
      arCity: '',
      enCity:'',
      DeliveryFees: '',
    }),
    []
  );

  const methods = useForm<any>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    watch
  } = methods;
const values=watch()
  const onSubmit = async (values: any) => {
    try {
      await axios.post('/order/addDeliveryfees', values);
      props.onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box
        width="500px"
        style={{ padding: '16px' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={'center'}
      >
        <Box width="100%">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
              {`المحافظة بالعربية`}
            </Typography>
            <RHFTextField type={'text'} size="medium" id="arCity" name={`arCity`} fullWidth />
            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
              {`المحافظة بالانجليزية`}
            </Typography>
            <RHFTextField type={'text'} size="medium" id="enCity" name={`enCity`} fullWidth />

            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
              الرسوم
            </Typography>

            <Stack
              divider={<Divider flexItem sx={{ borderStyle: 'dashed', width: '100%' }} />}
              spacing={3}
            >
              <Stack alignItems="center" spacing={1.5}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
                  <RHFTextField type={'number'} size="medium" name={`DeliveryFees`} fullWidth />
                </Stack>
              </Stack>
            </Stack>

            <Stack justifyContent="center" direction="row" spacing={2} sx={{ mt: 3 }}>
              <LoadingButton
                size="large"
                variant="contained"
                loading={loadingSend && isSubmitting}
                type="submit"
              >
                اضافة الرسوم
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddDeliveryDialog;
