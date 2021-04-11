



import {AppBar,Toolbar, Typography} from "@material-ui/core"
export const TopBar = () =>{
      return (
      <AppBar position="fixed">
            <Toolbar>
                  <Typography variant="h6">
                        Quikie Apps
                  </Typography>
            </Toolbar>
      </AppBar>            
      )
}