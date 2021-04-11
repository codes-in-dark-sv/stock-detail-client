const unirest = require("unirest");

export const requestStockList = () =>{
      return unirest
            .get(`https://${process.env.NEXT_APP_PUBLIC_RAPID_API_HOST}/market/get-earnings`)
            .query({
                  "region": "US",
                  "startDate": "1585155600000",
                  "endDate": "1589475600000",
                  "size": process.env.NEXT_APP_PUBLIC_RAPID_API_COUNT
            })
            .headers({
                  "x-rapidapi-key": process.env.NEXT_APP_PUBLIC_RAPID_API_KEY,
                  "x-rapidapi-host": process.env.NEXT_APP_PUBLIC_RAPID_API_HOST,
                  "useQueryString": true
            }).then((response) => {
                  console.log("Running inside ")
            console.log(response.body)
            return response.body.finance.result
            }).catch((err)=>{
                  return []  
            })
    }
