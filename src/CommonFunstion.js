import React, { useState, useEffect } from "react";

import { db } from "./Database/Firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const getUserList = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    userName: doc.data().userName,
    email: doc.data().email,
  }));
};

const getBugsList = async () => {
  const querySnapshot = await getDocs(collection(db, "bugs"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    reportedDate: doc.data().reportedDate,
    assignedTo: doc.data().assignedTo,
    status: doc.data().status,
    reportedBy: doc.data().reportedBy,

  }));
};

const getProjectList = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    client_name: doc.data().client_name,
    project_name: doc.data().project_name,
    org_name: doc.data().org_name,
    duration: doc.data().duration,
    started_date: doc.data().started_date,
  }));
};

export { getUserList, getBugsList, getProjectList };
