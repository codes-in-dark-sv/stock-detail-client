import Head from 'next/head'
import {requestStockList} from "../actions/apiUsage";
import CompanyList from "../components/Stock";
import CompanyGrid from "../components/Layout/companyGrid";
import {TopBar} from "../components/Layout/topBar";

const  ListOfCompanies =({data})=> {
  return (
    <>
    <Head>
      <title>
        {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
    </Head>
    <TopBar />
    <CompanyGrid />
    <CompanyList data={data}/>
    </>
  )
}

export async function getStaticProps(context) {
      const data = await requestStockList();
      return {
        props: { data : data }
      }
}

export default ListOfCompanies;