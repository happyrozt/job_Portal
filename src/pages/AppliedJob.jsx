import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppliedJobData } from '../store/Slice';
import '../App.css'
import { getUserDataByEmail } from '../utils/localStorageHelpers';

function AppliedJob() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const {logedUserData,appliedJobData} = useSelector((state)=> state.Auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (logedUserData && logedUserData.data && logedUserData.data.email) {
     let getAppliedJobresult = getUserDataByEmail(logedUserData.data.email)
      dispatch(getAppliedJobData(getAppliedJobresult));
    }
  }, [dispatch, logedUserData]);

  useEffect(() => {
    if (appliedJobData) {
      setAppliedJobs(appliedJobData);
    }
  }, [appliedJobData]);

  return (
    <div className='appliedJobContainer'>
      <h2 className='appled-job-title'>Applied Jobs</h2>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job, index) => (
          <div key={index} className='applied-job-item'>
            <h2>{job.Title}</h2>
            <p>{job.Description}</p>
            <p>Industry: {job.Industry}</p>
            <p>Location: {job.Location}</p>
            <p>Work Mode: {job['Work Mode']}</p>
            <p>Skill: {job.Skill}</p>
            <p>Salary: {job.Salary}</p>
            <p>Status : {job.status}</p>
          </div>
        ))
      ) : (
        <p>No applied jobs found.</p>
      )}
    </div>
  );
}

export default AppliedJob;
