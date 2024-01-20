import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Pages/Home";
import AddProjects from "./Pages/Projects/AddProjects";
import EditProjects from "./Pages/Projects/EditProjects";
import Projects from './Pages/Projects';
import AddTasks from "./Pages/Tasks/AddTasks";
import Tasks from "./Pages/Tasks";
import EditTasks from "./Pages/Tasks/EditTasks";
import  Search  from "./Pages/Search";
import ChangeStatus from "./Pages/ChangeStatus";
import { DashboardLayout } from "./Components/Layout";

const Root = () => {
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

        {/* tasks routes */}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks_view" element={<Tasks />} />
        <Route path="/tasks_add" element={<AddTasks />} />
        <Route path="/tasks_edit" element={<EditTasks />} />
        <Route path="/change_task_status" element={<ChangeStatus />} />
        <Route path="/searchPage" element={<Search />} />

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
