import {makeStyles, createStyles} from "@material-ui/core/styles"
const useStyles = makeStyles(Theme =>
      createStyles({
      tableHead:{
        minWith:400,
        width:"1500px"
      },
      root: {
        width: '100%',
      },
      boxDisplay:{
        height:170,
      },
      container: {
        maxHeight: 400,
        minHeight: 400,
      },
      btnStyle:{
        borderRadius:"5px",
        color:"white",
        textTransform:"none"
      },
      searchStyle:{
        backgroundColor:"#fafafa"
      },
      gridPosition:{
        marginTop:"60px",
        paddingLeft:"200px",
        paddingBottom:"20px"
      }
    })
)

export default useStyles;