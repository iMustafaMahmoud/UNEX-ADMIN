import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../components/table';
import { useDispatch, useSelector } from 'src/redux/store';
import { SubCategories } from 'src/@types/sub-categories';
import { deleteSubCategory, getSubCategories } from 'src/redux/slices/sub-categories';
import SubCategoryTableRow from 'src/sections/@dashboard/categories/sub-categories/list/SubCategoriesTableRow';

// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'name', label: 'اسم الفئة', align: 'left' },
  { id: '', label: 'رقم التسلسل', align: 'left' },
  { none: '' },
];

// ----------------------------------------------------------------------

export default function SubCategoriesList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const { subCategories } = useSelector((state) => state.subCategories);

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

  const handleDeleteRow = async (subCategoryId: string) => {
    await dispatch(deleteSubCategory(subCategoryId, id as string));
    setSelected([]);
  };

  const handleEditRow = (subCategoryId: string) => {
    navigate(PATH_DASHBOARD.categories.subCategoriesEdit(id as string, subCategoryId));
  };

  const handleViewRow = (id: string) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const dataFiltered = applySortFilter({
    subCategories,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 56 : 76;

  useEffect(() => {
    dispatch(getSubCategories(id as string));
  }, []);

  return (
    <Page title="جدول الفئات الفرعية">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="جدول الفئات الفرعية"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            {
              name: " الفئات الفرعية",
              href: PATH_DASHBOARD.categories.subCategories(id as string),
            },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.categories.subCategoriesAdd(id as string)}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
             فئة فرعية جديدة
            </Button>
          }
        />

        <Card>
          <Divider />

       
          <Scrollbar>
            {Boolean(subCategories) && (
              <TableContainer sx={{ minWidth: 800, position: 'relative' }}>

                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={subCategories.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        subCategories.map((row) => String(row.id))
                      )
                    }
                  />

                  <TableBody>
                    {subCategories
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <SubCategoryTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(String(row.id))}
                          onSelectRow={() => onSelectRow(String(row.id))}
                          onViewRow={() => handleViewRow(String(row.id))}
                          onEditRow={() => handleEditRow(String(row.id))}
                          onDeleteRow={() => handleDeleteRow(String(row.id))}
                          onViewSubCategory={() => console.log('hereee')}
                        />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, subCategories.length)}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={subCategories.length}
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
  subCategories,
  comparator,
  filterName,
}: {
  subCategories: SubCategories[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  if (subCategories.length) {
    const stabilizedThis = subCategories.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    subCategories = stabilizedThis.map((el) => el[0]);

    if (filterName) {
      subCategories = subCategories.filter(
        (item: Record<string, any>) =>
          item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    }
  }

  return subCategories;
}
