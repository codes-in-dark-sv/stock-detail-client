import { useReducer, useEffect, useState } from "react";
import ListOfCompanies from "./listOfCompanies"
import {Grid,Paper, Box} from "@material-ui/core";
import {getAllStocks} from './../../actions/company';
import Image from "next/image";
import useStyles from "./style";


const companies= ["Google", "Amazon",  "Facebook"];

const UserPage =({data}) =>{
     const [reloadData , setReload] = useState(false);
     const classes = useStyles();
     const [saved, setSaved] = useState(new Set())
     
     useEffect(()=>{
        var temp = new Set()
        getAllStocks()
        .then((response)=>{
            var len = response.result.length;
            for(var i=0; i<len;i++){
                temp.add(response.result[i].rank)
            }
            setSaved(temp)
        })
        .catch((err)=> console.log(err));
       
     },[])
    const handleReload = () =>{
        setReload(!reloadData);
    }
    


      
    useEffect(()=>{
    },[saved])

     return (<div>
            <ListOfCompanies companyData={data} saved = {saved} reload={handleReload}/>
         
         </div>) 
}

export default UserPage;