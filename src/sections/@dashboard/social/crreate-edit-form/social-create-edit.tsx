/* eslint-disable arrow-body-style */
import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { useDispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { EditProductPayload } from 'src/@types/products';
import { SocialType } from 'src/@types/social';
import { UpdateSocialInfo } from 'src/redux/slices/socalLinks';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentData?: SocialType;
};

export default function SocialLinksEditForm({ isEdit, currentData }: Props) {

  const [loadingSend, setLoadingSend] = useState(false);


  const NewLinksSchema = Yup.object().shape({
    Email: Yup.string().email('Not Valid'),
    Facebook: Yup.string().url('not valid Url'),
    Instagram: Yup.string().url('not valid Url'),
    Youtube: Yup.string().url('not valid Url'),
    PhoneNumber: Yup.string().min(11, 'Not Valid'),
    Whatsapp: Yup.string().min(11, 'Not Valid'),
    Address: Yup.string(),
  });

  const defaultValues = useMemo(() => {
    if (currentData) {
      return {
        Email: (currentData.Email as string) || '',
        PhoneNumber: (currentData.PhoneNumber as string) || '',
        Instagram: (currentData.Instagram as string) || '',
        Youtube: (currentData.Youtube as string) || '',
        Whatsapp: (currentData.Whatsapp as string) || '',
        Address: currentData.Address || '',
        Facebook: currentData.Facebook || '',
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
    if ( currentData) {
      reset(defaultValues);
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentData]);

  const onSubmit = async (values: any) => {
   try {
     await UpdateSocialInfo(values, currentData?.id ?? undefined);
     reset();
    // navigate(PATH_DASHBOARD.social.root);
     setLoadingSend(false);
   } catch (error) {
     console.error(error);
   }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Box sx={{ p: 3 }}>
          <SocialLinkInput headText="رابط Facebook : " name={'Facebook'} />
          <SocialLinkInput headText="رابط Instagram : " name={'Instagram'} />
          <SocialLinkInput headText="رابط Youtube : " name={'Youtube'} />
          <SocialLinkInput headText="رقم whatsapp : " name={'Whatsapp'} />
          <SocialLinkInput headText="البريد الالكتروني : " name={'ِEmail'} />
          <SocialLinkInput headText="رقم التواصل : " name={'PhoneNumber'} />
          <SocialLinkInput headText="العنوان الرئيسي : " name={'Address'} />

          <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
        </Box>
        <Stack justifyContent="center" direction="row" spacing={2} sx={{ mt: 3,mb:3}}>
          <LoadingButton
            size="large"
            variant="contained"
            loading={loadingSend && isSubmitting}
            type="submit"
            sx={{width:'30%'}}
          >
            تحديث
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
const SocialLinkInput = ({headText,name}:{headText:string,name:string}) => {
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
}