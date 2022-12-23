import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
// @types
import { User } from '../../../@types/user';
// components
import { CustomFile } from '../../../components/upload';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<User, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
}

type Props = {
  isEdit: boolean;
  currentUser?: User;
};

export default function UserNewEditForm({ isEdit, currentUser }: Props) {

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    phoneNumber: Yup.string().min(11).required('Phone number is required'),
    country: Yup.string().required('country is required'),
    password: Yup.string().required('Company is required').min(8),
    package: Yup.string().required('package is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      country: currentUser?.country || '',
      password: currentUser?.password || '',
      package: currentUser?.Package || '',
    }),
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
 
    console.log('dataaa', data);
  };

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get('/packages');
    })().catch(console.error);
  }, []);

  return (
    <Stack height={'100%'}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        
        <Stack direction={'column'} justifyContent={'space-between'} height={'90%'}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 5,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="email" type={'email'} label="Email Address" />
            <RHFTextField name="phoneNumber" label="Phone Number" />
            <RHFTextField name="password" type={'password'} label="Password" />

          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              style={{ width: '200px', height: '50px' }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {!isEdit ? 'Create User' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
