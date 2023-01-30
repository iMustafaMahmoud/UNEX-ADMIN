import Dialog from '@mui/material/Dialog';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { UploadMultiFile } from 'src/components/upload';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import axios from 'src/utils/axios';

export interface AddBannerDialogProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: VoidFunction;
}

const AddBannerDialog = (props: AddBannerDialogProps) => {
  const { handleClose, open } = props;

  const [files, setFiles] = useState<any[]>([]);
  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    href: Yup.string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      href: '',
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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: any) => {
    const { href } = values;
    const formData = new FormData();
    formData.append('file', files[0]);
    try {
      await axios.post('/redirections/add', formData, {
        params: { href },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      props.onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box
        width="500px"
        // height="400px"
        style={{ padding: '16px' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems={'center'}
      >
        <UploadMultiFile
          files={files}
          maxFiles={1}
          showPreview={true}
          onRemove={(index) => {
            const newFiles = [...files]
            newFiles.splice(index, 1)
            setFiles([...newFiles]);
          }}
          onDropAccepted={(files: any[]) => {
            setFiles(files);
          }}
          onRemoveAll={() => setFiles([])}
        />

        <Box width="100%">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3, mt: 2 }}>
              الرابط
            </Typography>

            <Stack
              divider={<Divider flexItem sx={{ borderStyle: 'dashed', width: '100%' }} />}
              spacing={3}
            >
              <Stack alignItems="center" spacing={1.5}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
                  <RHFTextField size="medium" name={`href`} fullWidth />
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
                اضافة البانر
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AddBannerDialog;
