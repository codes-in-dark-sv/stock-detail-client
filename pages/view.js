import Head from 'next/head'
import {getAllStocks} from "../actions/company";
import CompanyList from "../components/Stock/savedStocks";
import { useEffect, useState } from 'react';
import CompanyGrid from "../components/Layout/companyGrid";
import {TopBar} from "../components/Layout/topBar";

const  ListOfCompanies =({data})=> {
  const [myData, setData] = useState(data)
  const [reload, shouldReload] = useState(false);
  useEffect(()=>{

  }, [myData])

  useEffect(()=>{
      console.log("called")
      getAllStocks().then(response=>setData(response.result))
  },[reload])
 
  return (
    <>
    <Head>
      <title>
        {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
    </Head>
    <TopBar />
    <CompanyGrid />
    <CompanyList data={myData} tobe={reload} reload={shouldReload}/>
    </>
  )
}

export async function getStaticProps(context) {
      const data = await getAllStocks();
      return {
        props: { data : data.result }
      }
}

export default ListOfCompanies;