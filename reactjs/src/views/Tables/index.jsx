import React, {useEffect} from 'react';
import { makeStyles } from '@mui/styles';

import {Card, CardHeader, Divider, Grid, Pagination, Typography} from '@mui/material';

import Breadcrumb from '../../component/Breadcrumb';
import { gridSpacing } from '../../store/constant';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import * as actionTypes from '../../store/actions';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    paginaton: {
        marginTop: '10px !important'
    }
});

const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    const dateformat = day + '-' + month + '-' + year;
    return dateformat;
}


export default function TableBasic() {
    const classes = useStyles();
    const home = useSelector(state => state.table)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3002/user/getUser/${home.page}`)
          .then((res) => {
              dispatch({
                  type: actionTypes.SET_DATA,
                  data: res.data.user
              });
          })
          .catch(err => console.log(err));
    }, [home.page, home.isChange]);

    const handleClickDelete = (id) => {
        axios.delete(`http://localhost:3002/user/delete/${id}`,)
          .then((response) => alert(response.data.message))
          .catch((error) => console.log(error));
        dispatch({
            type: actionTypes.SET_CHANGE,
            isChange: !home.isChange
        });
    }

    function handlePagination(event, value) {
        dispatch({
            type: actionTypes.SET_CHANGE_PAGE,
            page: value
        });
    }

    return (
        <React.Fragment>
            <Breadcrumb title="Employee Table" />
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                          title={
                              <Typography component="div" className="card-header">
                                  Employee Table
                              </Typography>
                          }
                        />
                        <Divider />
                        <TableContainer>
                            {home.data._totalPage > 1 &&
                              <Pagination className={classes.paginaton} count={home.data._totalPage} color="primary" onChange={handlePagination}/>
                            }
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell>Họ và Tên</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="center">Tuổi</TableCell>
                                        <TableCell align="center">Giới Tính</TableCell>
                                        <TableCell align="center">Ngày sinh</TableCell>
                                        <TableCell align="center">Địa chỉ</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {home.data.data &&
                                        home.data.data.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell>{row.fullname}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell align="center">{row.age}</TableCell>
                                            <TableCell align="center">{row.gender === 'male'? 'Nam': 'Nữ'}</TableCell>
                                            <TableCell align="center">{formatDate(row.dateofbirth)}</TableCell>
                                            <TableCell align="center">{row.address}</TableCell>
                                            <TableCell align="center">
                                                <BorderColorOutlinedIcon color="primary" onClick={() => navigate('/updatedata', {state: row})} style={{cursor: 'pointer'}}/> ||
                                                <DeleteForeverOutlinedIcon color="primary" onClick={() => handleClickDelete(row.id)} style={{cursor: 'pointer'}}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
