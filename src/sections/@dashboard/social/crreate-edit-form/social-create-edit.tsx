/* eslint-disable arrow-body-style */
import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { SocialType } from 'src/@types/social';
import { UpdateSocialInfo } from 'src/redux/slices/socalLinks';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

type Props = {
  currentData?: SocialType;
};

export default function SocialLinksEditForm({ currentData }: Props) {
  const [loadingSend, setLoadingSend] = useState(false);
  const navigate = useNavigate();

  const NewLinksSchema = Yup.object().shape({
    email: Yup.string().email('Not Valid'),
    facebook: Yup.string().url('not valid Url'),
    instagram: Yup.string().url('not valid Url'),
    youtube: Yup.string().url('not valid Url'),
    phoneNumber: Yup.string().min(11, 'Not Valid'),
    whatsapp: Yup.string().min(11, 'Not Valid'),
    address: Yup.string(),
  });

  const defaultValues = useMemo(() => {
    if (currentData) {
      console.log('current data', currentData);
      return {
        email: (currentData.email as string) ?? '',
        phoneNumber: (currentData.phoneNumber as string) ?? '',
        instagram: (currentData.instagram as string) ?? '',
        youtube: (currentData.youtube as string) ?? '',
        whatsapp: (currentData.whatsapp as string) ?? '',
        address: currentData.address ?? '',
        facebook: currentData.facebook ?? '',
      };
    }
  }, [currentData]);

  const methods = useForm<any>({
    resolver: yupResolver(NewLinksSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentData) {
      reset(defaultValues);
    }
  }, [currentData]);
  const onSubmit = async (values: any) => {
    console.log('values', values);
    try {
      await UpdateSocialInfo(values, currentData?.id ?? undefined);
      window.location.reload();
      reset();
      setLoadingSend(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Box sx={{ p: 3 }}>
          <SocialLinkInput headText="رابط Facebook : " name={'facebook'} />
          <SocialLinkInput headText="رابط Instagram : " name={'instagram'} />
          <SocialLinkInput headText="رابط Youtube : " name={'youtube'} />
          <SocialLinkInput headText="رقم whatsapp : " name={'whatsapp'} />
          <SocialLinkInput headText="البريد الالكتروني : " name={'email'} />
          <SocialLinkInput headText="رقم التواصل : " name={'phoneNumber'} />
          <SocialLinkInput headText="العنوان الرئيسي : " name={'address'} />

          <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
        </Box>
        <Stack justifyContent="center" direction="row" spacing={2} sx={{ mt: 3, mb: 3 }}>
          <LoadingButton
            size="large"
            variant="contained"
            loading={loadingSend && isSubmitting}
            type="submit"
            sx={{ width: '30%' }}
          >
            تحديث
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
const SocialLinkInput = ({ headText, name }: { headText: string; name: string }) => {
  return (
    <Stack mt={'10px'}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        {headText}
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Stack alignItems="flex-start" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '50%' }}>
            <RHFTextField size="medium" name={name} fullWidth />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
