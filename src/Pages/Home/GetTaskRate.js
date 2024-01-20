const GetTaskRate = ({ bugsData,projectsData,textValue1,textValue2 }) => {
  return (
    <div className="pcoded-main-container" style={{ marginLeft: 0,minHeight:10 }}>
      <div className="pcoded-wrapper">
        <div className="pcoded-content">
          <div className="pcoded-inner-content">
            <div className="main-body">
              <div className="page-wrapper">
                <div className="row">
                    {/* Show All bug count */}
                  <div className="col-md-6 col-xl-4">
                    <div className="card daily-sales">
                      <div className="card-block">
                        <h6 className="mb-4">All {textValue1} Count</h6>
                        <div className="row d-flex align-items-center">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                              <i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>
                              {bugsData.length}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    {/* Show All Project count */}
                    <div className="col-md-6 col-xl-4">
                    <div className="card daily-sales">
                      <div className="card-block">
                        <h6 className="mb-4">All {textValue2} Count</h6>
                        <div className="row d-flex align-items-center">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                              <i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>
                              {projectsData.length}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetTaskRate;
