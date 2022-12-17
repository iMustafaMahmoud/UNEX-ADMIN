import sumBy from 'lodash/sumBy';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
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
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { _invoices } from '../../_mock';
// @types
import { Invoice } from '../../@types/invoice';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import InvoiceAnalytic from '../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@dashboard/invoice/list';
import { useDispatch, useSelector } from 'src/redux/store';
import { deleteCategory, getCategories } from 'src/redux/slices/categories';
import CategoryTableRow from 'src/sections/@dashboard/categories/list/CategoryTableRow';
import { Categories } from 'src/@types/categories';
import { getProducts } from 'src/redux/slices/products';
import ProductsTableRow from 'src/sections/@dashboard/products/list/ProductsTableRow';
import { Product } from 'src/@types/product';
import { Prodcuct } from 'src/@types/products';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

const TABLE_HEAD = [
  { id: 'name', label: 'Product Name', align: 'left' },
  { id: 'price', label: 'Price', align: 'left' },
  { id: 'subCategoryName', label: 'SubCategory Name', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ProuductsList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);

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

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);

  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteCategory(id));
    setSelected([]);
  };

  const handleViewSubCategories = async (id: string) => {
    navigate(PATH_DASHBOARD.categories.subCategories(id));
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = products.filter((row) => !selected.includes(String(row.productId)));
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.categories.edit(id));
  };

  const handleViewRow = (id: string) => {
    navigate(PATH_DASHBOARD.products.view(id));
  };

  const dataFiltered = applySortFilter({
    products,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 56 : 76;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Page title="Products: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Products List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Products', href: PATH_DASHBOARD.products.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.products.add}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Product
            </Button>
          }
        />

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

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={products.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      products.map((row) => String(row.productId))
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
                  rowCount={products.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      products.map((row) => String(row.productId))
                    )
                  }
                />

                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <ProductsTableRow
                        key={row.productId}
                        row={row}
                        selected={selected.includes(String(row.productId))}
                        onSelectRow={() => onSelectRow(String(row.productId))}
                        onViewRow={() => handleViewRow(String(row.productId))}
                        onEditRow={() => handleEditRow(String(row.productId))}
                        onDeleteRow={() => handleDeleteRow(String(row.productId))}
                        onViewSubCategory={() => handleViewSubCategories(String(row.productId))}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, products.length)}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={products.length}
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
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  products,
  comparator,
  filterName,
}: {
  products: Prodcuct[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  if (products.length) {
    const stabilizedThis = products.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    products = stabilizedThis.map((el) => el[0]);

    if (filterName) {
      products = products.filter(
        (item: Record<string, any>) =>
          item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }

  return products;
}
