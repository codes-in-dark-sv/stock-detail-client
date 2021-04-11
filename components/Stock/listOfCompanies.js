import React, { useEffect , useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Router from "next/router";
import {TablePagination,TableRow,
  FormControl, InputLabel,OutlinedInput,InputAdornment, Box, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {addStock} from "./../../actions/company"
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

const  CompanyList = ({companyData, saved, reload}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [query, setQuery] = useState("");
  const [data, setData] = useState(companyData);

  const saveData = (fullData) =>{
    const stock_detail = {
      companyShortName:fullData.companyShortName,
      rank : fullData.rank,
      ticker:fullData.ticker,
      surprisePercent:fullData.surprisePercent
    }
    addStock(stock_detail).then((response)=>{
      saved.add(stock_detail.rank)
      reload(true)
    }).catch((err)=> console.log(err));
  }

  const displayAction = (row)=>{
    
    switch(saved.has(row.rank)){
      case false : return <Button variant="contained" className={classes.btnStyle}  onClick={()=>{saveData(row)}} style={{background:"#00BFFF"}}>Save Data</Button>
      case true: return <Button variant="contained" className={classes.btnStyle}  onClick={()=>{Router.push("/view")}} style={{background:"#3333FF"}}>View</Button>
    }
  }

  const displaySearchBar = () =>{
    return(
        <TableRow color="primary">
           <TableCell
              key="title"
              align="left"
              style={{fontSize:20,minWidth: 400 }}
            >
            <b>Stock Details table</b>
          </TableCell>
        <TableCell style={{minWidth:600}}>
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={query}
                  placeholder="Search by Company Name"
                  onChange={(e)=>setQuery(e.target.value)}
                  startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                  labelWidth={50}
                />
              </FormControl>
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

  },[data,saved])

  useEffect(()=>{
    var fromAll = companyData;
    if(fromAll.length!=0)
      setData(fromAll.filter((temp)=>{
          return temp.companyShortName.toLowerCase().indexOf(query.toLowerCase())!=-1 }))
  },[query])

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
                              {displayAction(row)}
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