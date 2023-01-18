import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import "../../style.css";
import "../../box-style.css";
import { ReduxState } from "../../store/dataSTorage";
import { howUserBehaved } from "../../tracking";
import { DATABASE_API } from "../../api/api";
import Applicants from "../../components/Applicants";

const Home = () => {
  // dispatch actions
  const dispatch = useDispatch();

  // get updated stages from redux
  const stages = useSelector((state: ReduxState) => ({
    stages: state?.stages,
  }));

  // get Applicants asynchronously
  const getApplicantsReq = async () => {
    await axios.get(`${DATABASE_API}/applicants`).then(({ data: res }) => {
      // @ts-ignore
      dispatch({
        type: "loadApplicants",
        payload: res,
      });
    });
  };

  // get Stages asynchronously
  const getStagesReq = async () => {
    await axios.get(`${DATABASE_API}/stages`).then(({ data: res }) => {
      // @ts-ignore
      dispatch({
        type: "loadStages",
        payload: res,
      });
    });
  };

  useEffect(() => {
    // call below requests for the first time
    getApplicantsReq();
    getStagesReq();

    // all stuff should be clear when component is going to switch.
    return () => howUserBehaved();
  }, []);

  return (
    <>
      <div id="body">
        <h1>Awesome Applicant Tracking System</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* @ts-ignore */}
          {stages?.stages?.map((stage, index) => (
            // Key is needed because react does not work well. Maybe they will fix it in next version.
            <React.Fragment key={stage.id}>
              <Applicants stageId={stage.id} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
