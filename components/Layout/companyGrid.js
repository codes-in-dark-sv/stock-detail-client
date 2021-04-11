import {Grid,Paper, Box} from "@material-ui/core";
import Image from "next/image";
import myStyle from "../Stock/style";
const companies= ["Google", "Amazon",  "Facebook"];


  const CompanyGrid = () =>{
      const classes = myStyle()
      const eachPart = () =>{
            return companies.map((value, index)=>{
            return (
                  <Grid item xs={12} sm={3}>
                        <Paper className={classes.boxDisplay}>
                        <Box p={2} display="flex"> 
                              <Box width="80%">
                                    <h2>{value}</h2>
                              </Box>
                              <Box>
                              <Image
                                    src={`/${index}.png`}
                                    alt="Picture of the author"
                                    width={40}
                                    height={50}
                                    />
      
                              </Box>
                        </Box>
                        <Box display="flex">
                              <Box width="30%">

                              </Box>
                              <Box width="20%" alignItems="center">
                                    <h1>15515</h1>
                              </Box>
                        </Box>
                        
                        </Paper>
                  </Grid>
            )
            })
            
      }

      return (
            <div className={classes.gridPosition}>
                  <Box p={2}>
                        <Grid container spacing={3}>
                              {eachPart()}
                        </Grid>
                  </Box>
            </div>
            
      )
  }
  export default CompanyGrid;