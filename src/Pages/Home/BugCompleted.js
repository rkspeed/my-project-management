
import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
const BugCompleted = ({bugsData}) => {
    const [completed, setBugsData] = useState(0);
   
    useEffect(()=>{
        const count1 = bugsData.filter(value => value.status === 'Completed').length;
        setBugsData(count1)
    },[bugsData])

  return (
    <div className="col-xl-12 col-md-12 ">
      <div>
        <span style={{ display: "inline-flex" }}>
          <div
            style={{ width: 10, height: 10, backgroundColor: "#cf1616" ,marginTop:8,marginRight:10}}
          ></div>
          Reported Bug : {bugsData.length}
        </span>
        <br />
        <span style={{ display: "inline-flex" }}>
          <div
            style={{ width: 10, height: 10, backgroundColor: "#146a04" ,marginTop:8,marginRight:10}}
          ></div>
          Fixed Bug : {completed}
        </span>
        <br />
      </div>
      <PieChart
        data={[
          { title: "One", value: bugsData.length, color: "#cf1616" },
          { title: "Two", value: completed, color: "#146a04" },
          
        ]}
        style={{ width: "30%", marginLeft: 300 }}
      />
    </div>
  );
};

export default BugCompleted;
