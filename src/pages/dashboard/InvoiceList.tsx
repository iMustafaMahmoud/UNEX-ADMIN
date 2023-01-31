import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
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
import Page from '../../components/shared/Page';
import Label from '../../components/shared/Label';
import Iconify from '../../components/shared/Iconify';
import Scrollbar from '../../components/shared/Scrollbar';
import HeaderBreadcrumbs from '../../components/shared/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
import axiosInstance from 'src/utils/axios';
import { InvoiceTableRow } from 'src/sections/@dashboard/invoice/list';
import ChangeStatusModal from 'src/sections/@dashboard/invoice/ChangeStatus';
 enum ORDER_STATUS {
  Confirmed = 0,
  Processing = 1,
  OutForDelivery = 2,
  Delivered = 3,
  Canceled = 4,
}
const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'العميل', align: 'left' },
  { id: 'clientNumber', label: 'رقم العميل', align: 'left' },
  { id: 'createDate', label: 'التاريخ', align: 'left' },
  { id: 'price', label: 'اجمالي التكلفه', align: 'center', width: 140 },
  { id: 'status', label: 'حالة الطلب', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function InvoiceList() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const[selectedOrder,setSelectedOrder]=useState<string|undefined>(undefined)
  const [modalOpen, setModalOpen] = useState(false);

  const getOrders = async () => {
    const response = await axiosInstance.get('/Order/allorders');
    console.log('getData', response);
    setTableData(response.data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    setSelected,
    onSelectAllRows,
    onSort,
    onSelectRow,
    setPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });
  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const denseHeight = dense ? 56 : 76;

  const getLengthByStatus = (status: number) =>
    tableData.filter((item: any) => item.status === status).length;

  const TABS = [
    { value: 'all', label: 'الكل', color: 'default', count: tableData.length },
    { value: ORDER_STATUS.Confirmed, label: 'جديد', color: 'info', count: getLengthByStatus(0) },
    {
      value: ORDER_STATUS.Processing,
      label: 'قيد التحضير',
      color: 'warning',
      count: getLengthByStatus(1),
    },
    {
      value: ORDER_STATUS.OutForDelivery,
      label: 'خرج للتوصيل',
      color: 'warning',
      count: getLengthByStatus(2),
    },
    {
      value: ORDER_STATUS.Delivered,
      label: 'تم التوصيل',
      color: 'success',
      count: getLengthByStatus(3),
    },
    {
      value: ORDER_STATUS.Canceled,
      label: 'تم الالغاء',
      color: 'error',
      count: getLengthByStatus(4),
    },
  ] as const;

  const changeOrderStatus =async (status: string) => {
   try {
     const response = await axiosInstance.post(`order/changestatus`, {
       orderId: selectedOrder,
       status: status,
     });
   } catch (error) {
     
   }
    await getOrders();
    setModalOpen(false)
    setSelectedOrder(undefined)

  }
  return (
    <Page title="الطلبات">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="الطلبات"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الطلبات', href: PATH_DASHBOARD.orders.root },
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <Scrollbar></Scrollbar>
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={<Label color={tab.color}> {tab.count} </Label>}
                label={tab.label}
              />
            ))}
          </Tabs>

          <Divider />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row: any) => row.id)
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
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />
                  {dataFiltered.map((item, index) => (
                    <InvoiceTableRow
                      key={'index'}
                      row={item}
                      onSelectRow={() => {
                        onSelectRow(String(index));
                      }}
                      selected={false}
                     
                      onEditRow={() => {
                        setSelectedOrder(item?.id as string)
                        setModalOpen(true);
                      }}
                      onViewRow={() => {
                        navigate(`${item?.id}`);
                      }}
                    />
                  ))}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
        <ChangeStatusModal handleClose={() => setModalOpen(false)} open={modalOpen} submit={changeOrderStatus} />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}: {
  tableData: any[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterService: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.invoiceNumber.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.invoiceTo.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.status === filterStatus);
  }

  if (filterService !== 'all') {
    tableData = tableData.filter((item) =>
      item.items.some((c: any) => c.service === filterService)
    );
  }

  if (filterStartDate && filterEndDate) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.createDate.getTime() >= filterStartDate.getTime() &&
        item.createDate.getTime() <= filterEndDate.getTime()
    );
  }

  return tableData;
}
