import React, {useEffect, useState} from 'react';
import {TableContainer, Table, TableHead, TableRow, TableCell, Paper} from '@mui/material'
import Form from "../Form";
import axios from "axios";

function FormList(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3002/user/getUser')
      .then((res) => {
        setData(res.data.data);
      })
      .catch(err => console.log(err));
  }, [data]);
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Họ Và Tên</TableCell>
            <TableCell>Tuổi</TableCell>
            <TableCell>Giới Tính</TableCell>
            <TableCell>Ngày Sinh</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <Form tableData={data}/>
      </Table>
    </TableContainer>
  );
}

export default FormList;