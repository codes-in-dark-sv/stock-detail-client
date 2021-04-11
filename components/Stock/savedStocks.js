import React, { useEffect , useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Router from "next/router";
import {TablePagination,TableRow, Button,Box } from '@material-ui/core';
import {removeStock} from "./../../actions/company"
import useStyles  from './style';

const columns = [
  {
    id: 'companyShortName',
    label: 'Company Name',
    minWidth: 100,
    align: 'left',
  },
  { id: 'ticker', label: 'Identity', align:"center", minWidth: 170 },
  { id: 'surprisePercent',algin:"center", label: 'Share Percent(%)', minWidth: 120 },
  {
    id: 'rank',
    label: 'Ranking',
    minWidth: 120,
    align: 'center',
  },

  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
];

const  CompanyList = ({data, tobe, reload}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const removeData = (row) =>{
    removeStock(row.rank).then((response)=>{
      reload(!tobe)
    }).catch((err)=> console.log(err));
  }



  const displaySearchBar = () =>{
    return(
        <TableRow color="primary">
           <TableCell
              
              style={{fontSize:20,minWidth: 600 }}
            >
          </TableCell>
        <TableCell
        key="title"
        align="left"
       style={{ fontSize:20,minWidth:400}}>
             <b>Saved Data table</b>
        </TableCell>
        <TableCell style={{minWidth:600}}>
          
        </TableCell>
      </TableRow>
        
     
    )
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(()=>{

  },[data])


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if(data){
        return (
          <div>
            <Paper elevation={3} className={classes.searchStyle}>
              {displaySearchBar()}
            </Paper>
            
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">

              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <b>{column.label}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        if(column.id != "action"){
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                        }
                        else{
                          return (
                            <TableCell align={column.align}>
                                    <Button variant="contained" className={classes.btnStyle}  onClick={()=>{removeData(row)}} style={{background:"#3333FF"}}>DELETE</Button>
                            </TableCell>
                          )
                        }
                      })}
                    </TableRow>
                  );
                })}

                
              </TableBody>
              </Table>
            </TableContainer>
            <Box display={"flex"}>
                  <Box width={"50%"}>

                  </Box>
            <Box>
                  <Button variant="contained"  className={classes.btnStyle}  onClick={()=>{Router.push("/home")}} style={{background:"#3333FF"}}>GO BACK</Button>
            </Box>
            </Box>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 30, 50]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        )
  }
  else{
    return <div>
      LOADING....
    </div>
  }
}

export default CompanyList;