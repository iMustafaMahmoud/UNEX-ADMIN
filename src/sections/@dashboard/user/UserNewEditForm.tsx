import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// @types
import { User } from '../../../@types/user';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
  currentUser?: User;
  afterSubmit(): void;
};

export default function UserNewEditForm({ isEdit, currentUser, afterSubmit }: Props) {
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('password is required')
      .min(8)
      .matches(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
        'Password must be strong'
      ),
    phoneNumber: Yup.string().min(11).required('Phone number is required'),
    address: Yup.string(),
    city: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      password: currentUser?.password || '',
      address: currentUser?.address || 'Cairo,Egypt',
      city: currentUser?.city || 'Cairo',
    }),
    [currentUser]
  );

  const methods = useForm<User>({
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

  const onSubmit = async (data: User) => {
    try {
      axiosInstance.post('/Administration/createadmin', data);
      afterSubmit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack height={'100%'}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} justifyContent={'space-between'} height={'90%'} spacing={2}>
          <RHFTextField name="name" label="الاسم" />
          <RHFTextField name="email" type={'email'} label="الايميل" />
          <RHFTextField name="phoneNumber" label="رقم الموبايل" />
          <RHFTextField name="password" type={'password'} label="كلمة السر" />
          <Stack alignItems="center" sx={{ mt: 3 }}>
            <LoadingButton
              style={{ width: '250px', height: '50px' }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {!isEdit ? 'انشاء مستخدم' : 'حفظ التعديلات'}
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
