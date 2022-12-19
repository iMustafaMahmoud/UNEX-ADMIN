import { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import useTable, { emptyRows } from '../../hooks/useTable';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom } from '../../components/table';
import { useDispatch, useSelector } from 'src/redux/store';
import { deleteProduct, getProducts } from 'src/redux/slices/products';
import ProductsTableRow from 'src/sections/@dashboard/products/list/ProductsTableRow';
import { Prodcuct } from 'src/@types/products';

// ----------------------------------------------------------------------



const TABLE_HEAD = [
  { id: 'name', label: 'اسم المنتج', align: 'left' },
  { id: 'price', label: 'السعر', align: 'left' },
  { id: 'discount', label: 'نسبة الخصم', align: 'left' },
  { id: 'subCategoryName', label: 'الفئة الفرعية', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ProuductsList() {

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
    selected,
    setSelected,
    onSelectRow,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });


  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteProduct(id));
    setSelected([]);
  };

  const handleViewSubCategories = async (id: string) => {
    navigate(PATH_DASHBOARD.categories.subCategories(id));
  };

 

  const handleEditRow = (id: string) => {
    
    navigate(PATH_DASHBOARD.products.edit(id));
  };

  const handleViewRow = (id: string) => {
    navigate(PATH_DASHBOARD.products.view(id));
  };



  const denseHeight = dense ? 56 : 76;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Page title="جدول المنتجات">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="جدول المنتجات"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'المنتجات', href: PATH_DASHBOARD.products.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.products.add}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
             اضافه منتج جديد
            </Button>
          }
        />

        <Card>
          <Divider />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
        

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  onSort={onSort}
                 
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
              labelDisplayedRows={(info) => ` ${info.from + '/' + info.to + ' من ' + info.count}`}
              labelRowsPerPage="صفوف في الصفحة:"
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
