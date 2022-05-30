import React, {useEffect} from 'react';
import {
  TableContainer, Table, TableHead,TableRow, TableCell, Paper, TableBody,
  DialogTitle,
  IconButton,
  Dialog, DialogContent,
  Pagination
} from '@mui/material'
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {Form, Header} from '@components'
import {useDispatch, useSelector} from "react-redux";
import {Change, ChangePage, Open, setData, setDataUpdate, Show} from "@redux/homeSlice";


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
  const home = useSelector(state => state.home);
  const dispatch = useDispatch();

  function formatDate(date) {
    const [year, month, day] = date.split('-');
    const dateformat = day + '-' + month + '-' + year;
    return dateformat;
  }

  const handleClose = () => {
    dispatch(Open(false));
    dispatch(Change(true));
  }

  function handleClickUpdate(row) {
    dispatch(setDataUpdate(row));
    dispatch(Show(true));
    dispatch(Open(true));
  }

  function handleClickDelete(id) {
    axios.delete(`http://localhost:3002/user/delete/${id}`,)
      .then((response) => alert(response.data.message))
      .catch((error) => console.log(error));
    dispatch(Change(true));
  }

  useEffect(() => {
    axios.get(`http://localhost:3002/user/getUser/${home.page}`)
      .then((res) => {
        dispatch(setData(res.data.user));
      })
      .catch(err => console.log(err));
  }, [home.page, home.isChange]);

  function handlePagination(event, value) {
    dispatch(ChangePage(value));
  }

  return (
    <>
      <Header />
      {(home.data._totalPage > 1) &&
        <Pagination style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}  count={home.data._totalPage} onChange={handlePagination} color="primary"/>
      }
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
            {home.data.data &&
              home.data.data.map((row) => (
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
            {home.isShow &&
              <>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={home.isOpen}>
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Update Data Form
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Form onClose={handleClose} data={home.dataUpdate} isRegister={false}/>
                  </DialogContent>
                </Dialog>
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Home;