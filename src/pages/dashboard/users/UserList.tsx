import { useEffect, useState } from 'react';
// @mui
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
import { PATH_DASHBOARD } from '../../../routes/paths';

import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// @types
import { User } from '../../../@types/user';
// _mock_
// components
import Page from '../../../components/shared/Page';
import Iconify from '../../../components/shared/Iconify';
import Scrollbar from '../../../components/shared/Scrollbar';
import HeaderBreadcrumbs from '../../../components/shared/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../../components/table';
// sections
import { UserTableToolbar, UserTableRow } from '../../../sections/@dashboard/user/list';
import { UserModal } from './UserModal';
import axiosInstance from 'src/utils/axios';
import ConfirmationDialog from 'src/sections/@dashboard/deleteDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Name', label: 'الاسم', align: 'left' },
  { id: 'email', label: 'الايميل', align: 'left' },
  { id: 'phone', label: 'الموبايل', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();
  const [tableData, setTableData] = useState<{ user: User[] }[]>([]);
  const [filterName, setFilterName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string|undefined>(undefined);
  useEffect(() => {
    fetchUsers().catch(console.error);
  }, []);

  const fetchUsers = async () => {
    const response = await axiosInstance.get('/Administration/getadminusers');
    setTableData(response.data);
  };
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow =async () => {
    try {
      await axiosInstance.post('administration/delete', null, {
        params: {
          userId:selectedUser
        },
      });
      await fetchUsers()
    } catch (error) {
      
    }
    setOpen(false)
    setCurrentUser(undefined)
  };

  const handleEditRow = (user: User) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title="المستخدمين">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="قائمة المستخدمين"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'قائمة المستخدمين', href: PATH_DASHBOARD.user.root },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              اضف مستخدم جديد
            </Button>
          }
        />

        <Card>
          <Divider />
          <UserTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData?.map((row) => row.user[0].id)
                    )
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData?.map((row) => row.user[0].id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.length > 0 &&
                    dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row) => (
                        <UserTableRow
                          key={row.user[0].id}
                          row={row.user[0]}
                          selected={selected.includes(row.user[0].id)}
                          onSelectRow={() => onSelectRow(row.user[0].id)}
                          onDeleteRow={() => {
                            setSelectedUser(row.user[0].id as string);
                            setOpen(true)
                          }}
                          onEditRow={() => handleEditRow(row.user[0])}
                        />
                      ))}

                  <TableEmptyRows
                    height={2.2}
                    emptyRows={emptyRows(page, rowsPerPage, tableData?.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData.length}
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
      <UserModal
        afterSubmit={() => {
          fetchUsers();
          setModalOpen(false);
        }}
        isEdit={currentUser ? true : false}
        currentUser={currentUser}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <ConfirmationDialog
        handleClose={() => setOpen(false)}
        open={open}
        submit={() => {
          handleDeleteRow();
        }}
      />
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
}: {
  tableData: { user: User[] }[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = tableData?.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData?.filter(
      (item: { user: User[] }) =>
        item.user[0].name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
