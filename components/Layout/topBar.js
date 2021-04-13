



import {AppBar,Toolbar, Typography} from "@material-ui/core"
export const TopBar = () =>{
      return (
      <AppBar position="fixed">
            <Toolbar>
                  <Typography variant="h6">
                        Demo App
                  </Typography>
            </Toolbar>
      </AppBar>            
      )
}
