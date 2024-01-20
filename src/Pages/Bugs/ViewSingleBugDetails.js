import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, storage, auth } from "./../../Database/Firebase";

import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

const ViewSingleBugDeatils = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let editItem = location.state?.editItem;
  const [project, setProject] = useState("select");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [comment, setComment] = useState([]);
  const [bug, setBug] = useState({});
  let userEmail = "rasikadevi";

  useEffect(() => {
    if (editItem) {
      setEditId(editItem.id);

      setBug(editItem);
 
    }
  }, [editItem]);

  useEffect(() => {
    if (editId!="") {
     
      getComments();
    }
  }, [editId]);

  const getComments = async () => {
    const querySnapshot = await getDocs(collection(db, "comments"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      comment: doc.data().comment,
      created_date: doc.data().created_date,
      user: doc.data().user,
      bug_id: doc.data().bug_id,
    }));
    console.log(data,editId);
    setComment(data.filter((i) => i.bug_id == editId));
  };
  const postComment = async () => {
    try {
      const data = {
        bug_id: editItem.id,
        comment: description,
        created_date: new Date().toISOString().slice(0, 10),
        user: userEmail,
      };
      console.log(data);
      await addDoc(collection(db, "comments"), data);

      alert("success");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <section>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-start align-items-center">
                    <div>
                      <h6 className="fw-bold text-primary mb-1">
                        Bug Id: {bug.id}
                      </h6>
                      <p className="text-muted small mb-0">
                        created on - {bug.reportedDate}
                      </p>
                      <span className="badge bg-primary">{bug.status}</span>
                    </div>
                  </div>

                  <p className="mt-3 mb-4 pb-2">{bug.description}</p>
                </div>

                <div
                  className="card-footer py-3 border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-start w-100">
                    <img
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                      alt="avatar"
                      width="50"
                      height="50"
                      style={{ width: 50, height: 50 }}
                    />
                    <div className="form-outline w-100">
                      <textarea
                        className="form-control"
                        id="textAreaExample"
                        rows="4"
                        style={{ backgroundColor: "#fff" }}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      ></textarea>
                      <label className="form-label" for="textAreaExample">
                        Message
                      </label>
                    </div>
                  </div>
                  <div className="float-end mt-2 pt-1">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => postComment()}
                    >
                      Post comment
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {comment.map((cmt) => (
                  <div className="d-flex flex-start" style={{ padding: 10 }} key={cmt.id}>
                     <img
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                      alt="avatar"
                      style={{ width: 50, height: 50 }}
                    />
                 <div>
                     <h6 className="fw-bold mb-1">{cmt.user}</h6>
                  <div className="d-flex align-items-center mb-3">
                         <p className="mb-0">{cmt.created_date}</p>
                         {/* <a href="#!" className="link-muted">
                           <i className="fas fa-pencil-alt ms-2"></i>
                         </a>
                         <a href="#!" className="link-muted">
                           <i className="fas fa-redo-alt ms-2"></i>
                         </a> */}
               </div>
                       <p className="mb-0">
                       {cmt.comment}
                       </p>
                  </div>
                   <hr className="my-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewSingleBugDeatils;
