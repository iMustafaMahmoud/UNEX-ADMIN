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
import { Info, Prodcuct } from 'src/@types/products';
import axios from 'src/utils/axios';
import InfoTableRow from 'src/sections/@dashboard/products/info/InfoTableRow';
import AddColorDialog from 'src/sections/@dashboard/products/dialogs/add-color-dialog';
import AddSizeDialog from 'src/sections/@dashboard/products/dialogs/add-size-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'color', label: 'Color', align: 'left' },
  { id: 'sizes', label: 'Sizes', align: 'left' },
  //   { id: 'price', label: 'Price', align: 'left' },
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

  const [product, setProduct] = useState<Prodcuct | null>(null);

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

  const dataFiltered = applySortFilter({
    info: product?.info as Info[],
    comparator: getComparator(order, orderBy),
    filterName,
  });

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
    <Page title="Product: Info">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product Info"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Products', href: PATH_DASHBOARD.products.root },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => setOpenAddColorDialog(true)}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Color
            </Button>
          }
        />

        {product && (
          <Box display="flex" mb={20} justifyContent="space-between">
            <img src={product.images[0]} />
            <Box width="50%" color="red" textAlign="center">
              <Typography variant="h2" color="black" mb={4}>
                {product.enName}
              </Typography>
              <Box>
                <Typography variant="body2" color="black" sx={{ wordBreak: 'break-word' }}>
                  ajbdfaskjdhaksjhdaskjdhakjsfhajksfhajsfbaj,bfajbfsmafsbamjbsfambsfmahbfmahbfmhabfmhafbamhfbashmbfmahsfbamhfsbmahbfmahsbfmahbfsamhsbfamhbsfmahsbfmafbmahsfbfasmh
                </Typography>
              </Box>

              <Typography variant="h5" color="green" mt={4} mb={4}>
                EGP {product.price}
              </Typography>

              <Typography variant="h5" color="red" mt={4} mb={4}>
                Discount {product.discount}%
              </Typography>
            </Box>
          </Box>
        )}

        <Card>
          <Divider />

          {/* <InvoiceTableToolbar
              filterName={filterName}
              filterService={filterService}
              filterStartDate={filterStartDate}
              filterEndDate={filterEndDate}
              onFilterName={handleFilterName}
              onFilterService={handleFilterService}
              onFilterStartDate={(newValue) => {
                setFilterStartDate(newValue);
              }}
              onFilterEndDate={(newValue) => {
                setFilterEndDate(newValue);
              }}
              optionsService={SERVICE_OPTIONS}
            /> */}

          {product && product.info && (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                  {selected.length > 0 && (
                    <TableSelectedActions
                      dense={dense}
                      numSelected={selected.length}
                      rowCount={product.info.length}
                      onSelectAllRows={(checked) =>
                        onSelectAllRows(
                          checked,
                          product.info.map((row) => String(row.id))
                        )
                      }
                      actions={
                        <Stack spacing={1} direction="row">
                          <Tooltip title="Sent">
                            <IconButton color="primary">
                              <Iconify icon={'ic:round-send'} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Download">
                            <IconButton color="primary">
                              <Iconify icon={'eva:download-outline'} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Print">
                            <IconButton color="primary">
                              <Iconify icon={'eva:printer-fill'} />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                              <Iconify icon={'eva:trash-2-outline'} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      }
                    />
                  )}

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
                          <InfoTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(String(row.id))}
                            onSelectRow={() => onSelectRow(String(row.id))}
                            onViewRow={() => handleViewRow(String(row.id))}
                            onEditRow={() => handleEditRow(String(row.id))}
                            onDeleteRow={() => handleDeleteRow(String(row.id))}
                            onViewSubCategory={() => handleViewSubCategories(String(row.id))}
                            onAddSize={() => {
                              setProductInfoId(String(row.id));
                              setOpenAddSizeDialog(true);
                            }}
                          />
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
                />

                <FormControlLabel
                  control={<Switch checked={dense} onChange={onChangeDense} />}
                  label="Dense"
                  sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
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
        // handleAddColor={addColor}
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
