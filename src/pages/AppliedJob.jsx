import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppliedJobData } from '../store/Slice';
import '../App.css'
import { getUserDataByEmail } from '../utils/localStorageHelpers';
import JobListingCard from '../components/card/JobListingCard';

function AppliedJob() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const {logedUserData,appliedJobData,userSearchedData} = useSelector((state)=> state.Auth)
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

      {userSearchedData.length === 0 ? (
     <JobListingCard jobsAData={appliedJobs}  page={"Applied Jobs"}/>
      ) : (
        <JobListingCard jobsAData={userSearchedData}  page={"Applied Jobs"} />
      )}
    </div>
  );
}

export default AppliedJob;
