import React from "react"
import {BrowserRouter, Route,Routes} from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import UserLayout from "./components/Layout/UserLayout";
import ProfileUser from "./components/pages/ProfileUser";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import OurPods from "./components/Pods/OurPods";
import SearchPods from "./components/Pods/SearchPods";
import ProfileLogIn from "./components/pages/ProfileLogIn"
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RoleRoute from "./components/Layout/RoleRoute";
import OwnerDashboard from "./components/pages/OwnerDashboard";
import AdminDashboard from "./components/pages/AdminDashboard";
function App() {
  return (
    <SearchProvider>
   <BrowserRouter>
    <Routes>
     <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  
      <Route path="/" element={<UserLayout/>}>
       <Route index element={<Home/>}/>
      <Route path="about" element={<AboutUs/>}/> 
        <Route path="pods" element={<OurPods/>}/>
        <Route path="searchpods" element={<SearchPods/>}/> 
        <Route path="profile" element={<ProfileLogIn/>}/>
        <Route path="profileUser" element={<ProfileUser/>}/> 
         <Route element={
                        <RoleRoute
                            allowedRoles={["owner"]}
                        />
                    }>

                        <Route
                            path="/owner/dashboard"
                            element={<OwnerDashboard />}
                        />

                    </Route>


                    {/* ADMIN */}

                    <Route element={
                        <RoleRoute
                            allowedRoles={["admin"]}
                        />
                    }>

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                    </Route>  
      </Route>    
    </Routes>
   </BrowserRouter>
   </SearchProvider>
  )
}

export default App
