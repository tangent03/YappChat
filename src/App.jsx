import React, { lazy, Suspense } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import AppLayout from './components/layout/AppLayout'; // Import AppLayout




const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Chat = lazy(() => import('./pages/Chat')); // Import Chat directly
const Groups = lazy(() => import('./pages/Groups'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));


let user = true;

// Pre-wrap Chat with AppLayout
const ChatWithLayout = AppLayout()(Chat);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            {/* Use the pre-wrapped ChatWithLayout */}
            <Route path="/chat/:chatId" element={<ChatWithLayout />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect='/'>
                <Login />
              </ProtectRoute>
            }
          />


          <Route path='/admin' element={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/users' element={<UserManagement/>}/>
          <Route path='/admin/chats' element={<ChatManagement/>}/>
          <Route path='/admin/messages' element={<MessageManagement/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;