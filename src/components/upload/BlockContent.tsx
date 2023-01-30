// @mui
import { Box, Typography, Stack, CircularProgress } from '@mui/material';
// assets
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent({loading}:{loading?:boolean}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      {!loading ? (
        <>
          <UploadIllustration sx={{ width: 220 }} />

          <Box sx={{ p: 3 }}>
            <Typography gutterBottom variant="h5">
              إفلات أو تحديد ملف
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              &nbsp; {`  قم بإسقاط الملفات هنا أو انقر`}{' '}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: 'primary.main', textDecoration: 'underline' }}
              >
                تصفح
              </Typography>
              &nbsp;عبر جهازك
            </Typography>
          </Box>
        </>
      ) : (
        <Stack alignItems={'center'} justifyContent={'center'}>
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
}
