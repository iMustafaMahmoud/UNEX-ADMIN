import sumBy from 'lodash/sumBy';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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
import { SubCategories } from 'src/@types/sub-categories';
import { deleteSubCategory, getSubCategories } from 'src/redux/slices/sub-categories';
import SubCategoryTableRow from 'src/sections/@dashboard/categories/sub-categories/list/SubCategoriesTableRow';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

const TABLE_HEAD = [{ id: 'name', label: 'SubCategory Name', align: 'left' }, { id: '' }];

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
    <Page title="SubCategories: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="SubCategories List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'SubCategories',
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
              New SubCategory
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
            {Boolean(subCategories) && (
              <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
                {selected.length > 0 && (
                  <TableSelectedActions
                    dense={dense}
                    numSelected={selected.length}
                    rowCount={subCategories.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        subCategories.map((row) => String(row.id))
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
                      </Stack>
                    }
                  />
                )}

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
