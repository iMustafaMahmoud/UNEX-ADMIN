// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';

import InvoiceToolbar from './InvoiceToolbar';
import Image from 'src/components/shared/Image';
import Label from 'src/components/shared/Label';
import Scrollbar from 'src/components/shared/Scrollbar';
import { useEffect, useState } from 'react';
import { ORDER_STATUS } from '../list/InvoiceTableRow';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  borderBottom: '1px  solid #F4F4F4',
}));

// ----------------------------------------------------------------------

type Props = {
  invoice?: any;
};

export default function InvoiceDetailsSection() {
  const theme = useTheme();
  const [details, setDetails] = useState<any>()
    const getStatus = (status: number) => {
      if (status === ORDER_STATUS.Delivered && 'success') return 'تم التوصيل';
      if (status == ORDER_STATUS.OutForDelivery) return 'خرج للتوصيل';
      if (status == ORDER_STATUS.Processing) return 'قيد التحضير';
      if (status == ORDER_STATUS.Canceled) return 'تم الالغاء';
      else return 'جديد';
    };
  useEffect(() => {
    if (window)
    {
      const Local = window.localStorage.getItem('orderDetails');
      const detailss = JSON.parse(Local as string);
      setDetails(detailss);
      }
  },[window])
 

  


  return (
    <>
      <InvoiceToolbar invoice={details} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image
              disabledEffect
              visibleByDefault
              alt="logo"
              src="/logo/unexLogo.png"
              sx={{ maxWidth: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={
                  (details?.status == ORDER_STATUS.Delivered && 'success') ||
                  (details?.status == (ORDER_STATUS.OutForDelivery || ORDER_STATUS.Processing) &&
                    'warning') ||
                  (details?.status == ORDER_STATUS.Canceled && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {getStatus(details?.status)}
              </Label>

              <Typography variant="h6">{`INV-${
                String(details?.id).split('-')?.[String(details?.id).split('-').length - 1]
              }`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              الاسم
            </Typography>
            <Typography mb="10px" variant="body2">
              {details?.userName}
            </Typography>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              {'رقم الهاتف'}
            </Typography>
            <Typography variant="body2">{details?.phoneNumber}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              {'تاريخ الطلب'}
            </Typography>
            <Typography mb="10px" variant="body2">
              {details?.createdDate.toString().split('T')[0]}
            </Typography>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              {'العنوان'}
            </Typography>
            <Typography variant="body2">{details?.address}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">المنتج</TableCell>
                  <TableCell align="left">الكمية</TableCell>
                  <TableCell align="left">المقاس</TableCell>
                  <TableCell align="left"> اللون</TableCell>
                  <TableCell align="left">كود اللون</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {details?.products?.map((row: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row?.arname}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row?.count}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.size}</TableCell>
                    <TableCell align="left">
                      {
                        <Box
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: row.color,
                          }}
                        />
                      }
                    </TableCell>
                    <TableCell align="left">{row.color}</TableCell>
                  </TableRow>
                ))}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>المجموع الفرعي</Typography>
                  </TableCell>

                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{fCurrency(details?.totalAmount) + 'جم '}</Typography>
                  </TableCell>
                </RowResultStyle>
                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>توصيل</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{'20 جم'}</Typography>
                  </TableCell>
                </RowResultStyle>
             

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography>خدمة</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{fCurrency(0)}</Typography>
                  </TableCell>
                </RowResultStyle>
             

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">الاجمالي</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">
                      {fCurrency(parseInt(details?.totalAmount) + 20)}
                    </Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">ملاحظات :</Typography>
            <Typography variant="body2">شكرا علي ثقتكم ب UNEX</Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'left' }}>
            <Typography variant="subtitle2">لديك اسئلة؟ تواصل معنا علي</Typography>
            <Typography variant="body2">unex.city.active@gmail.com</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
