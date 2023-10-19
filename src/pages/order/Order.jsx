import React, { useEffect, useState } from 'react'
import { getOrders } from '../../api/UserApi';
import { useAsyncList } from "@react-stately/data";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Chip } from "@nextui-org/react";
import { Link } from 'react-router-dom';



export default function Order() {
  const formatPrice = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      let res = await getOrders();
      if (res.success) {
        let temp1 = res.data.filter((order) => order.state !== 'enable');
        setOrder(temp1);
        setLoading(false);
      } else {
        setLoading('404');
      }
    }
    getData();
  }, []);

  async function load() {
    return { items: order }
  }
  async function sort({ items, sortDescriptor }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      }),
    };
  }
  const state = {
    'enable': 'Hiện tại',
    'done': 'Hoàn tất',
    'process': 'Đang xử lý',
    'pending': 'Đang chờ xác nhận',
    'delivery': 'Đang giao hàng',
    'delivered': 'Đã giao hàng',
    'prepare': 'Đang chuẩn bị hàng',
    'cancel': 'Đã hủy',
  }

  const statusColorMap = {
    pending: "warning",
    done: "success",
    enable: "primary",
    cancel:"danger",
    process:"secondary"
  }

  const list = useAsyncList({ load, sort });
  useEffect(() => {
    list.reload()
  }, [order])

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(order.length / rowsPerPage);

  list.items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return order.slice(start, end);
  }, [page, order]);

  return (
    <div>
      <div className='bg-white w-10/12 rounded-lg mx-auto my-10 h-16 drop-shadow-lg flex justify-center items-center'>
        <p className='text-yellow-600 text-xl font-semibold'>ĐƠN HÀNG CỦA BẠN</p>
      </div>

      <Table
        aria-label="Example table with client side sorting"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              color="warning"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="id" allowsSorting>
            MÃ ĐƠN HÀNG
          </TableColumn>
          <TableColumn key="createdDate" allowsSorting>
            NGÀY ĐẶT
          </TableColumn>
          <TableColumn key="userName" allowsSorting>
            NGƯỜI ĐẶT
          </TableColumn>
          <TableColumn key="totalPrice" allowsSorting>
            TỔNG SỐ TIỀN
          </TableColumn>
          <TableColumn key="totalQuantity" allowsSorting>
            SỐ LƯỢNG SẢN PHẨM
          </TableColumn>
          <TableColumn key="state" allowsSorting>
            TRẠNG THÁI
          </TableColumn>
        </TableHeader>
        <TableBody items={list.items} loadingState={list.loadingState} className='flex gap-2'>
          {(row) => (
            <TableRow key={row.id}>
              <TableCell><Link to={`/order-detail/${row.id}`} className='hover:text-yellow-700'>{row.id}</Link></TableCell>
              <TableCell >{row.createdDate}</TableCell>
              <TableCell >{row.userName}</TableCell>
              <TableCell >{formatPrice(row.totalPrice)}</TableCell>
              <TableCell >{row.totalProduct}</TableCell>
              <TableCell >
                <Chip className="capitalize" color={statusColorMap[row.state]} size="sm" variant="flat">
                {state[row.state]}
                </Chip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>


    </div>
  )
}
