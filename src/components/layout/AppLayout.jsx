import React from 'react';
import Header from './Header';
import Title from '../shared/Title';
import ChatList from '../specific/Chatlist.jsx';
import { sampleChats } from '../../constants/sampleData.js';
import { useParams } from 'react-router-dom';
import { Grid} from "@mui/material";
import Profile from '../specific/Profile.jsx';

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;


    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log('Delete Chat', _id, groupChat);
    }


    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid 
            item 
            sm={4} 
            md={3} 
            sx={{ display: { xs: "none", sm: "block" } }} 
            height={"100%"}
            overflow={"auto"}
          >
            <ChatList 
              chats={sampleChats} 
              chatId={chatId} 
              onlineUsers={["1", "2"]}
              handleDeleteChat={handleDeleteChat} 
            />
          </Grid>

          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>

          <Grid 
            item 
            xs={12} 
            sm={8} 
            md={4} 
            lg={3} 
            height={"100%"} 
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile/>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
