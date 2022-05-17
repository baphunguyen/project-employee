import React, {useEffect, useState} from 'react';
import {TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody} from '@mui/material'
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import UpdateForm from "../Component/UpdateForm";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Home(props) {
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [open, setOpen] = useState(false);

  function formatDate(date) {
    const [year, month, day] = date.split('-');
    const dateformat = day + '-' + month + '-' + year;
    return dateformat;
  }

  const handleClose = () => {
    setOpen(false);
  }

  function handleClickUpdate(row) {
    setDataUpdate(row);
    setIsShow(true);
    setOpen(true);
  }

  function handleClickDelete(id) {
    axios.delete(`http://localhost:3002/user/delete/${id}`,)
      .then((response) => alert(response.data.message))
      .catch((error) => console.log(error));
    window.location.reload(false);
  }

  useEffect(() => {
    axios.get('http://localhost:3002/user/getUser')
      .then((res) => {
        setData(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);
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
        <TableBody>
          {
            data.map((row) => (
              <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender === 'male'? 'Nam': 'Nữ'}</TableCell>
                <TableCell>{formatDate(row.dateofbirth)}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <BorderColorIcon color='primary' onClick={() => handleClickUpdate(row)} style={{cursor: 'pointer'}}/> ||
                  <DeleteForeverIcon color='primary' onClick={() => handleClickDelete(row.id)} style={{cursor: "pointer"}}/>
                </TableCell>
              </TableRow>
            ))
          }
          {isShow &&
            <>
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Update Data Form
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <UpdateForm onClose={handleClose} data={dataUpdate}/>
                </DialogContent>
              </Dialog>
            </>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Home;