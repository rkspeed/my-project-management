import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import User from "./Pages/User";
import EditUser from "./Pages/User/EditUser";
import AddUser from "./Pages/User/AddUser";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Privillages from "./Pages/Privillages";
import AddPrivillages from "./Pages/Privillages/AddPrivillages";
import EditPrivillages from "./Pages/Privillages/EditPrivillages";
import AddProjects from "./Pages/Projects/AddProjects";
import EditProjects from "./Pages/Projects/EditProjects";
import Projects from './Pages/Projects';

import AddTasks from "./Pages/Bugs/AddTasks";
import Bugs from "./Pages/Bugs";
import EditBugs from "./Pages/Bugs/EditBugs";

import ViewSingleBugDeatils from "./Pages/Bugs/ViewSingleBugDetails";

import Teams from "./Pages/Teams";
import AddTeams from "./Pages/Teams/AddTeams";
import EditTeams from "./Pages/Teams/EditTeams";
import  Search  from "./Pages/Search";
import ChangeStatus from "./Pages/ChangeStatus";

import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "./Database/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { DashboardLayout } from "./Components/Layout";
import MemberDashboard from "./Pages/Home/MemberDashboard"

const Root = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
    
    } else {
      // navigate("/Login");
    }
  }, [user, loading]);

  return (
    <div>
     <DashboardLayout/>
     <div style={{marginLeft:261}}>
      <Routes >
        <Route exact path="/" element={<Home />} />
      
        {/* projects routes */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects_view" element={<Projects />} />
        <Route path="/projects_add" element={<AddProjects />} />
        <Route path="/projects_edit" element={<EditProjects />} />

        {/* bugs routes */}
        <Route path="/bugs" element={<Bugs />} />
        <Route path="/bugs_view" element={<Bugs />} />
        <Route path="/bugs_view_single" element={<ViewSingleBugDeatils />} />
        <Route path="/bugs_add" element={<AddTasks />} />
        <Route path="/bugs_edit" element={<EditBugs />} />
        {/* Temas routes */}
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams_view" element={<Teams />} />
        <Route path="/teams_edit" element={<EditTeams />} />
        <Route path="/teams_add" element={<AddTeams />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/searchPage" element={<Search />} />


        <Route path="/member_dashboard" element={<MemberDashboard />} />
        <Route path="/change_bug_status" element={<ChangeStatus />} />
        <Route path="/view_bug" element={<ViewSingleBugDeatils />} />
      </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Root />
    </Router>
  );
};

export default App;
