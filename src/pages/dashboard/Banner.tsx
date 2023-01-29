import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { emptyRows } from '../../hooks/useTable';
// @types
// components
import Page from '../../components/shared/Page';
import Iconify from '../../components/shared/Iconify';
import Scrollbar from '../../components/shared/Scrollbar';
import HeaderBreadcrumbs from '../../components/shared/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom } from '../../components/table';
// sections
import { useDispatch } from 'src/redux/store';
import { Info, SizesCount, productById } from 'src/@types/products';
import axios from 'src/utils/axios';
import InfoTableRow from 'src/sections/@dashboard/products/info/InfoTableRow';
import AddColorDialog from 'src/sections/@dashboard/products/dialogs/add-color-dialog';
import AddEditSizeDialog from 'src/sections/@dashboard/products/dialogs/add-size-dialog';
import { DeleteInfo, DeleteItem, UpdateInfo, UpdateItem } from 'src/redux/slices/products';
import AddBannerDialog from 'src/sections/@dashboard/banner/dialogs/add-banner-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'color', label: 'اللون', align: 'left' },
  { id: 'sizes', label: 'المقاس', align: 'left' },
  { id: 'count', label: 'العدد', align: 'left' },
  //   { id: 'subCategoryName', label: 'SubCategory Name', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function Banner() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    setSelected,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [product, setProduct] = useState<productById | null>(null);

  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);

  const [sizeDialogOpen, setSizeDialogOpen] = useState(false);

  const [selectedProductInfoId, setSelectedProductInfoId] = useState('');
  const [selectedProductItem, setSelectedProductItem] = useState<SizesCount>();

  const handleDeleteProductItem = async (itemId: string) => {
    try {
      await dispatch(DeleteItem(itemId));
      await getProductById(id as string);
    } catch {
      alert('SomeThing Went Wrong');
    }
    setSelected([]);
  };

  const handleSubmitProductItem = async (values: any) => {
    try {
      if (selectedProductItem) {
        dispatch(UpdateItem(String(selectedProductItem.itemId), values));
      } else {
        await axios.post(
          `/product/additem`,
          { ...values },
          {
            params: { ProductInfoId: selectedProductInfoId as string },
          }
        );
      }
      await getProductById(id as string);
      setSizeDialogOpen(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleEditProductItem = (item: SizesCount) => {
    setSelectedProductItem(item);
    setSizeDialogOpen(true);
  };
  const handleDeleteProductInfo = async (infoId: string) => {
    try {
      await dispatch(DeleteInfo(infoId));
      await getProductById(id as string);
    } catch {
      alert('SomeThing Went Wrong');
    }

    setSelected([]);
  };

  const denseHeight = dense ? 56 : 76;

  const getProductById = async (id: string) => {
    try {
      const response = await axios.get(`/product/getbyid`, {
        params: { id, admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
      });
      setProduct(response.data[0]);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getProductById(id as string);
  }, []);

  return (
    <Page title={'asasdsad'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`${product?.arName}`}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'روابط البانر', href: PATH_DASHBOARD.banner.root },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => setBannerDialogOpen(true)}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              اضف بانر جديد
            </Button>
          }
        />

        {product && (
          <Box display="flex" mb={'50px'} justifyContent="space-between">
            <Box width="50%" color="red" textAlign="center">
              <Stack direction={'row'} mb={'50px'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={2}>
                  <Typography
                    variant="body1"
                    color="black"
                    sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                  >
                    الفئة الفرعية :
                  </Typography>
                  <Typography
                    variant="body2"
                    color="black"
                    sx={{ wordBreak: 'break-word', width: 'auto' }}
                  >
                    {product.subCategoryArName}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <Typography
                    variant="body1"
                    color="black"
                    sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                  >
                    السعر :
                  </Typography>
                  <Typography variant="body2" color="green" mt={4} mb={4}>
                    {`${product.price} جم `}
                  </Typography>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <Typography
                    variant="body1"
                    color="black"
                    sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                  >
                    نسبة الخصم :
                  </Typography>
                  <Typography variant="body2" color="red" mt={4} mb={4}>
                    % {product.discount}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction={'row'} spacing={2}>
                <Typography variant="body1" color="black" sx={{ fontWeight: 'black' }}>
                  {`الوصف بالعربية : `}{' '}
                </Typography>
                <Typography
                  variant="body2"
                  color="black"
                  sx={{ wordBreak: 'break-word', width: '400px' }}
                >
                  {product.arDescription}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={'20px'}>
                <Typography variant="body1" color="black" sx={{ fontWeight: 'black' }}>
                  الوصف بالانجلزية :{' '}
                </Typography>
                <Typography
                  variant="body2"
                  color="black"
                  sx={{ wordBreak: 'break-word', width: '400px' }}
                >
                  {product.enDescription}
                </Typography>
              </Stack>
            </Box>
            <img height={'375px'} src={product.images[0]} />
          </Box>
        )}

        <Card>
          <Divider />
        </Card>
      </Container>
      <AddBannerDialog open={bannerDialogOpen} handleClose={() => setBannerDialogOpen(false)} />

      <AddEditSizeDialog
        open={sizeDialogOpen}
        productItem={selectedProductItem}
        handleClose={() => {
          setSelectedProductItem(undefined);
          setSelectedProductInfoId('');
          setSizeDialogOpen(false);
        }}
        productInfoId={selectedProductInfoId}
        onSubmit={handleSubmitProductItem}
      />
    </Page>
  );
}
