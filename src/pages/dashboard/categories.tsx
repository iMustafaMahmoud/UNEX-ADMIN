import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import Page from '../../components/shared/Page';
import Iconify from '../../components/shared/Iconify';
import Scrollbar from '../../components/shared/Scrollbar';
import HeaderBreadcrumbs from '../../components/shared/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom } from '../../components/table';
import { useDispatch, useSelector } from 'src/redux/store';
import { deleteCategory, getCategories } from 'src/redux/slices/categories';
import CategoryTableRow from 'src/sections/@dashboard/categories/list/CategoryTableRow';
import { Categories } from 'src/@types/categories';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'categoryName', label: 'اسم الفئة', align: 'left' },
  { id: 'id', label: 'رقم التسلسل', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function CategoriesList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.categories);

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


  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteCategory(id));
    setSelected([]);
  };

  const handleViewSubCategories = async (id: string) => {
    navigate(PATH_DASHBOARD.categories.subCategories(id));
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = categories.filter((row) => !selected.includes(String(row.id)));
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.categories.edit(id));
  };

  const handleViewRow = (id: string) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    categories,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 56 : 76;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <Page title="جدول الفئات">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="جدول الفئات"
          links={[
            { name: 'الرئيسيه', href: PATH_DASHBOARD.root },
            { name: 'الفئات', href: PATH_DASHBOARD.categories.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.categories.add}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              اضافه تصنيف
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
                  rowCount={categories.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      categories.map((row) => String(row.id))
                    )
                  }
                />

                <TableBody>
                  {categories
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <CategoryTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(String(row.id))}
                        onSelectRow={() => onSelectRow(String(row.id))}
                        onViewRow={() => handleViewRow(String(row.id))}
                        onEditRow={() => handleEditRow(String(row.id))}
                        onDeleteRow={() => handleDeleteRow(String(row.id))}
                        onViewSubCategory={() => handleViewSubCategories(String(row.id))}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, categories.length)}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={categories.length}
              rowsPerPage={rowsPerPage}
              labelDisplayedRows={(info) =>
                ` ${info.from + '/' + info.to + ' من ' + info.count}`
              }
              labelRowsPerPage="صفوف في الصفحة:"
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  categories,
  comparator,
  filterName,
}: {
  categories: Categories[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  if (categories.length) {
    const stabilizedThis = categories.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    categories = stabilizedThis.map((el) => el[0]);

    if (filterName) {
      categories = categories.filter(
        (item: Record<string, any>) =>
          item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }

  return categories;
}
