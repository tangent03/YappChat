import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import {Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon} from '@mui/icons-material' 
import { useNavigate, useSearchParams } from 'react-router-dom'
import {Link} from "../components/styles/StyledComponents"
import AvatarCard from '../components/shared/AvatarCard'
import {sampleChats, sampleUsers} from '../constants/sampleData';
import UserItem from '../components/shared/UserItem'
import { bgGradient } from '../constants/color'




const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))

const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))
const isAddMember = false;  
const Groups = () => {

  const chatId=useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [groupName,setGroupName] = useState("");
  const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false) 

  
  const handleMobile = () => {
   setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  }

  const navigateBack = () => {
    navigate("/");
  }


  const updateGroupName = () => {
    setIsEdit(false);
  }
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);

  }


const closeConfirmDeleteHandler = () => {
  setConfirmDeleteDialog(false);

}
 const openAddMemberHandler = () => {

 }

const deleteHandler = () => {

  closeConfirmDeleteHandler();
}

const removeMemberHandler = (id) => {
  console.log("Remove Member",id);
}

  useEffect(() => {
   if(chatId) {
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
   }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  },[chatId]);


  const IconBtns = <>

    <Box  sx={{display:{xs:"block",sm:"none",position:"fixed",top:"1rem",right:"1rem"}}}>
      <IconButton onClick={handleMobile}>
        <MenuIcon/>
      </IconButton>
    </Box>

    <Tooltip title="Back">
      <IconButton 
      sx={{
        position:"absolute",
        top:"2rem",
        left:"2rem",
        bgcolor:"rgba(0,0,0,0.8)",
        color:"white",
        ":hover":{
          bgcolor:"rgba(0,0,0,0.7)",
        }
      }}
      onClick={navigateBack}>
        <KeyboardBackspaceIcon/>
      </IconButton>
    </Tooltip>
  </>




  const GroupName = <Stack 
                      direction={"row"} 
                      alignItems={"center"} 
                      justifyContent={"center"}
                      spacing={"1rem"}
                      padding={"3rem"}
                      >
    {
      isEdit? <>
                <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)}/>
                <IconButton onClick={updateGroupName}>
                  <DoneIcon/>
                </IconButton>
            </> 
      :
       <>
        <Typography variant='h4'>{groupName}</Typography>
        <IconButton onClick={()=>setIsEdit(true)}>
          <EditIcon/>
        
        </IconButton>
       </>
    }
  </Stack>


const ButtonGroup = (

<Stack  
  direction={{
    sm:"row",
    xs:"column-reverse",
  }}
  spacing={"1rem"}
  p={{
    sm:"1rem",
    xs:"0",
    md:"1rem 4rem",
  }}
  >

<Button size="large" color='error' variant='outlined' startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
<Button size="large" variant='contained' startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member</Button>

</Stack>)

  return (
    <Grid container height={"100vh"}>
      <Grid item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          backgroundImage:bgGradient,
        }}>
           <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId}/>
      </Grid>
      <Grid item xs={12}
       sm={8} 
       sx={{
        display:"flex",
        alignItems:"center",
        position: "relative",
        backgroundColor:"#f5f5f5",
        padding:"1rem 3rem",
        flexDirection: "column",
      }}>
{IconBtns}

{
  groupName && <>
    {GroupName}

    <Typography variant='body1' margin={"2rem"} alignSelf={"flex-start"}>Members</Typography>

    <Stack 
      maxWidth={"45rem"}
      width={"100%"}
      boxSizing={"border-box"}
      padding={{
        sm:"1rem",
        xs:"0",
        md:"1rem 4rem",
      }}
      spacing={"2rem"}
      height={"50vh"}
      overflow={"auto"}

    >
      {
        sampleUsers.map((i) => (
          <UserItem user={i} key={i._id} isAdded styling={{
            boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
            padding:"1rem 2rem",
            borderRadius:"1rem",
          }}
          handler={removeMemberHandler}/>
        ))
      }
    </Stack>
    {ButtonGroup}
  </>
}
</Grid>

  {
    isAddMember && (
      <Suspense fallback={<Backdrop open/>}>
        <AddMemberDialog open={isAddMember} handleClose={()=>setIsAddMember(false)}/>
      </Suspense>
    )
  }


  {
    confirmDeleteDialog && (
    <Suspense fallback={<Backdrop open/>}>
      <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler}
      deleteHandler={deleteHandler}/>
    </Suspense>
    )
  }



    <Drawer
    sx={{
      display:{xs:"block",sm:"none"},
      
    }} open={isMobileMenuOpen} onClose={handleMobileClose}><GroupsList w={"50vw"}/></Drawer>
    </Grid>
  )
};





const GroupsList = ({w="100%", myGroups=[], chatId}) => {

  
  return (
    <Stack spacing={2} width={w} sx={{
      backgroundImage:bgGradient,
      height:"100vh",
      overflow:"auto",
    }}> {/* Added spacing for better visibility */}
      {myGroups.length > 0 ? 
        myGroups.map((group) => {
 
          return (
            <GroupListItem 
              group={group} 
              chatId={chatId} 
              key={group._id}
            />
          );
        })
        : 
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      }
    </Stack>
  );
};





const GroupListItem = memo(({group, chatId}) => {
  const {name, avatar, _id} = group;
  
  return (
    <Link 
      to={`?group=${_id}`}
      onClick={(e) => {
        if(chatId === _id) {
          e.preventDefault();
        }
      }}
      style={{ textDecoration: 'none' }} // Added for better visibility
    >
      <Stack 
        direction={"row"} 
        alignItems={"center"} 
        spacing={"1rem"}
        sx={{
          p: 2,
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <AvatarCard avatar={avatar}/>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups
