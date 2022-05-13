import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TableBody, TableCell, TableRow} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UpdateForm from "../UpdateForm";

Form.propTypes = {
  tableData: PropTypes.array,
};

Form.defaultProps ={
  tableData: null
}

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

function formatDate(date) {
  const [year, month, day] = date.split('-');
  const dateformat = day + '-' + month + '-' + year;
  return dateformat;
}

function Form({tableData}) {
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  if (!tableData) return;

  function handleClickUpdate(row) {
    setData(row);
    setIsShow(true);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  function handleClickDelete(id) {
    axios.delete(`http://localhost:3002/user/delete/${id}`,)
      .then((response) => alert(response.data.message))
      .catch((error) => console.log(error));
  }

  return (
    <TableBody>
      {
        tableData.map(row => (
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
              <UpdateForm onClose={handleClose} data={data}/>
            </DialogContent>
          </Dialog>
        </>
      }
    </TableBody>
  );
}

export default Form;