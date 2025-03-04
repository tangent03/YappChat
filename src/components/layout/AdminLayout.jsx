import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessagesIcon } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom'
import { grayColor, matBlack } from '../../constants/color'


const Link = styled(LinkComponent)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    &:hover {
        color: rgba(0,0,0,0.58);
    }
`



const adminTabs = [
    {
    name:"Dashboard",
    path:"/admin/dashboard",
    icon:<DashboardIcon/>
    },
    {
    name:"Users",
    path:"/admin/users",
    icon:<ManageAccountsIcon/>
    },
    {
    name:"Chats",
    path:"/admin/chats",
    icon:<GroupsIcon/>
    },
    {
    name:"Messages",
    path:"/admin/messages",
    icon:<MessagesIcon/>
    },
]


const Sidebar = ({w ="100%"}) => {

    const location = useLocation();
    const logoutHandler = () => {
        console.log("logged out")
    }
    return (
        <Stack width={w} direction={"column"} spacing={"3rem"} p={"3rem"}>
            <Typography variant='h5' textTransform={"uppercase"}>Admin</Typography>

            <Stack spacing={"1rem"}>
                {
                    adminTabs.map((tab) => (
                        <Link key={tab.path} to={tab.path} 
                        sx={
                            location.pathname === tab.path && {
                                bgcolor: matBlack,
                                color: "white",
                                "&:hover":{
                                    bgcolor: {color:"white"},
                                }
                            }
                        }>
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                            {tab.icon}
                            <Typography>{tab.name}</Typography>
                            </Stack>
                        </Link>
                    ))
                }

                <Link onClick={logoutHandler}>
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                            <ExitToAppIcon/>
                            <Typography fontSize={"1.2rem"}>Logout</Typography>
                            </Stack>
                </Link>

            </Stack>
        </Stack>
    )
}

const isAdmin = true;
const AdminLayout = ({children}) => {

    const [isMobile,setIsMobile] = useState(false);
    const handleMobile = () => setIsMobile(!isMobile);
    const handleClose = () => setIsMobile(false);

    if(!isAdmin) return <Navigate to="/admin"/>

  return (
    <Grid container minHeight={"100vh"}>

        <Box
        sx={{
            display:{xs:"block", md:"none"},
            position:"fixed",
            right:"1rem",
            top:"1rem",
        }}>
            <IconButton onClick={handleMobile}>
                    {
                        isMobile? <CloseIcon/> : <MenuIcon/>
                    }
            </IconButton>
        </Box>
        <Grid 
        item 
        sm={4} 
        md={3}
        sx={{display:{xs:"none",md:"block"}}}
        >
           
            <Sidebar/>

        </Grid>

        <Grid 
        item
        xs={12}
        lg={9}
        md={8}
        sx={{
            bgcolor:grayColor,
        }}
        >
            {children}
        </Grid>

        <Drawer open={isMobile} onClose={handleClose}>
            <Sidebar w="50vw"/>
        </Drawer>
    </Grid>
  )
}

export default AdminLayout
