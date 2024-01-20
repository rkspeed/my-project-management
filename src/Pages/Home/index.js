import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import API from "./../../API";
import { db } from "./../../Database/Firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import GetBugRate from "./GetBugRate";
import BugCompleted from "./BugCompleted";

const Home = () => {
  const navigate = useNavigate();
  const [bugsData, setBugsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [projectsDataTemp, setProjectsDataTemp] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    getBugsList();
    getProjectList();
  }, []);

  useEffect(() => {
    setProjectsDataTemp(projectsData)
  }, [projectsData]);

  const getBugsList = async () => {
    const querySnapshot = await getDocs(collection(db, "bugs"));

    setBugsData(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        reportedDate: doc.data().reportedDate,
        assignedTo: doc.data().assignedTo,
        status: doc.data().status,
      }))
    );
  };
  const getProjectList = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));

    setProjectsData(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        client_name: doc.data().client_name,
        project_name: doc.data().project_name,
        org_name: doc.data().org_name,
        duration: doc.data().duration,
        started_date: doc.data().started_date,
      }))
    );
  };

  const searchText = (e) => {
    setQuery(e.target.value);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/searchPage", {
        state: { searchKey: query },
      });
    }
  };

  const getStatusColor =(s)=>{
    if(s == 'Completed'){
      return 'text-c-green';
    }else if(s == 'Inprogress'){
      return 'text-c-red';
    }else{
      return 'text-c-purple';
    }
 
  }

  return (
    <>
      <div style={{ padding: 20 }}>
        <div
          className="collapse navbar-collapse"
          style={{ display: "block", marginBottom: "20px" }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <div className="main-search">
                <div className="input-group">
                  <input
                    type="text"
                    id="m-search"
                    className="form-control"
                    placeholder="Search bug title. . ."
                    onChange={(e) => searchText(e)}
                    value={query}
                    onKeyDown={(e) => {
                      _handleKeyDown(e);
                    }}
                  />
                  <a
                    href="javascript:"
                    className="input-group-append search-close"
                  >
                    <i className="feather icon-x input-group-text"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <button
            style={{
              backgroundColor: "#04277a",
              padding: 10,
              color: "white",
              float: "right",
              marginRight: 48,
            }}
            onClick={() => navigate("/change_bug_status")}
          >
            Change Bug Status 
          </button>
        </div>
        <div>
          {<GetBugRate bugsData={bugsData} projectsData={projectsData} textValue1="Bug" textValue2="Project"/>}
        </div>

        {<BugCompleted bugsData={bugsData} />}
        <div className="col-xl-8 col-md-12 m-b-30">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link"
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                All Bugs Reported
              </a>
            </li>
          </ul>
          <div
            className="tab-content"
            id="myTabContent"
            style={{ padding: "0px 10px" }}
          >
            <div
              className="tab-pane fade active show"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Activity</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {bugsData.map((item) => (
                    <tr>
                      <td>
                        <h6 className="m-0">{item.assignedTo}</h6>
                      </td>
                      <td>
                        <h6 className="m-0">{item.title}</h6>
                      </td>
                      <td>
                        <h6 className="m-0">{item.reportedDate}</h6>
                      </td>
                      <td>
                        <h6 className={`m-0 ${getStatusColor(item.status)}`}>{item.status}</h6>
                      </td>
                      <td className="text-right">
                        <i className= {`fas fa-circle  f-10 ${getStatusColor(item.status)}`}></i>
                       
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Home;
