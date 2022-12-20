import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { _invoices } from '../../_mock';
// @types
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../components/table';
// sections
import { useDispatch } from 'src/redux/store';
import { deleteCategory } from 'src/redux/slices/categories';
import { Info, Prodcuct, productById } from 'src/@types/products';
import axios from 'src/utils/axios';
import InfoTableRow from 'src/sections/@dashboard/products/info/InfoTableRow';
import AddColorDialog from 'src/sections/@dashboard/products/dialogs/add-color-dialog';
import AddSizeDialog from 'src/sections/@dashboard/products/dialogs/add-size-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'color', label: 'اللون', align: 'left' },
  { id: 'sizes', label: 'المقاس', align: 'left' },
    { id: 'count', label: 'العدد', align: 'left' },
  //   { id: 'subCategoryName', label: 'SubCategory Name', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ProuductsView() {
  const theme = useTheme();

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
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [filterName, setFilterName] = useState('');

  const [product, setProduct] = useState<productById | null>(null);

  const [openAddColorDialog, setOpenAddColorDialog] = useState(false);

  const [openAddSizeDialog, setOpenAddSizeDialog] = useState(false);

  const [productInfoId, setProductInfoId] = useState('');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteCategory(id));
    setSelected([]);
  };

  const handleViewSubCategories = async (id: string) => {
    navigate(PATH_DASHBOARD.categories.subCategories(id));
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = product?.info.filter((row) => !selected.includes(String(row.id)));
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.categories.edit(id));
  };

  const handleViewRow = (id: string) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const addColor = async (color: string) => {
    try {
      await axios.post(
        `/product/addinfo`,
        { color },
        {
          params: { productId: id as string },
        }
      );
    } catch (error) {
      console.log({ error });
    }
    await getProductById(id as string);
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
    <Page title={'المنتجات'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`${product?.arName}`}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'المنتجات', href: PATH_DASHBOARD.products.root },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => setOpenAddColorDialog(true)}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              اضف لون جديد
            </Button>
          }
        />

        {product && (
          <Box display="flex" mb={'50px'} justifyContent="space-between">
            <Box width="50%" color="red" textAlign="center">
              <Stack direction={'row'} spacing={2}>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                >
                  الوصف بالعربية :{' '}
                </Typography>
                <Typography variant="body2" color="black" sx={{ wordBreak: 'break-word' }}>
                  {product.arDescription}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={'20px'}>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                >
                  الوصف بالانجلزية :{' '}
                </Typography>
                <Typography variant="body2" color="black" sx={{ wordBreak: 'break-word' }}>
                  {product.enDescription}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={'20px'}>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                >
                  الفئة الفرعية:{' '}
                </Typography>
                <Typography variant="body2" color="black" sx={{ wordBreak: 'break-word' }}>
                  {product.subCategoryArName}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={'20px'}>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                >
                  السعر :
                </Typography>
                <Typography variant="h5" color="green" mt={4} mb={4}>
                  {`${product.price} جم `}
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={'20px'}>
                <Typography
                  variant="body1"
                  color="black"
                  sx={{ wordBreak: 'break-word', fontWeight: 'black' }}
                >
                  نسبة الخصم :
                </Typography>
                <Typography variant="h5" color="red" mt={4} mb={4}>
                  % {product.discount}
                </Typography>
              </Stack>
            </Box>
            <img height={'375px'} src={product.images[0]} />
          </Box>
        )}

        <Card>
          <Divider />

          {product && product.info && (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                  <Table size={dense ? 'small' : 'medium'}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={product?.info.length}
                      numSelected={selected.length}
                      onSort={onSort}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows(
                          checked,
                          product.info.map((row) => String(row.id))
                        )
                      }
                    />

                    <TableBody>
                      {product?.info
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <>
                            <InfoTableRow
                              key={row.id}
                              row={row}
                              selected={selected.includes(String(row.id))}
                              onEditRow={() => handleEditRow(String(row.id))}
                              onDeleteRow={() => handleDeleteRow(String(row.id))}
                              onAddSize={() => {
                                setProductInfoId(String(row.id));
                                setOpenAddSizeDialog(true);
                              }}
                            />
                            {row.countBySize.map((item) => (
                              <InfoTableRow
                                key={item.size}
                                row={row}
                                infoItem={item}
                                selected={selected.includes(String(row.id))}
                                onEditRow={() => handleEditRow(String(row.id))}
                                onDeleteRow={() => handleDeleteRow(String(row.id))}
                                onAddSize={() => {
                                  setProductInfoId(String(row.id));
                                  setOpenAddSizeDialog(true);
                                }}
                              />
                            ))}
                          </>
                        ))}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(page, rowsPerPage, product.info.length)}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>

              <Box sx={{ position: 'relative' }}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={product?.info.length as number}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={onChangePage}
                  onRowsPerPageChange={onChangeRowsPerPage}
                  labelDisplayedRows={(info) =>
                    ` ${info.from + '/' + info.to + ' من ' + info.count}`
                  }
                  labelRowsPerPage="صفوف في الصفحة:"
                />
              </Box>
            </>
          )}
        </Card>
      </Container>
      <AddColorDialog
        open={openAddColorDialog}
        handleClose={() => setOpenAddColorDialog(false)}
        handleAddColor={addColor}
      />

      <AddSizeDialog
        open={openAddSizeDialog}
        handleClose={() => setOpenAddSizeDialog(false)}
        productInfoId={productInfoId}
      />
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  info,
  comparator,
  filterName,
}: {
  info: Info[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  if (info && info.length) {
    const stabilizedThis = info.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    info = stabilizedThis.map((el) => el[0]);

    if (filterName) {
      info = info.filter(
        (item: Record<string, any>) =>
          item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }

  return info;
}
