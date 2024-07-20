import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogedUserDataByEmail, setAllHirerData, updateJobPoststatus } from '../store/Slice';
import { getUserDataByEmail, getUsersWithRoleHirer, toggleJobStatus } from '../utils/localStorageHelpers';

function ClosejobPost() {
  const {logedUserData,closeJobPageData} = useSelector((state)=>state.Auth)
  const [logedUserJObData, setLogedUserJObData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let closeJobPageData = getUserDataByEmail(logedUserData.data.email)
    dispatch(getUserLogedUserDataByEmail(closeJobPageData))
    setLogedUserJObData(closeJobPageData);
    if (closeJobPageData) {
      setLogedUserJObData(closeJobPageData);
    }
  }, [dispatch, logedUserJObData]);

  useEffect(() => {
    if (closeJobPageData) {
      setLogedUserJObData(closeJobPageData);

    }
  }, [closeJobPageData]);

  const handleStatus = (id, email) => {
    const payLoad = { email, id };
    let JobPostStatus = toggleJobStatus(payLoad)
    dispatch(updateJobPoststatus(JobPostStatus));
    let closeJobPageData = getUserDataByEmail(logedUserData.data.email)
    dispatch(getUserLogedUserDataByEmail(closeJobPageData))
    let JobsData = getUsersWithRoleHirer();
    dispatch(setAllHirerData(JobsData));
    alert("Status Updated")
  };

  return (
    <div className='home-page-container'>
      <div className='job-list'>
        {logedUserJObData && logedUserJObData.length > 0 ? (
          logedUserJObData.map((job, index) => (
            <div key={index} className='job-item'>
              <h2>{job.Title}</h2>
              <p>{job.Description}</p>
              <p>Industry: {job['Industry']}</p>
              <p>Location: {job['Location']}</p>
              <p>Work Mode: {job['Work Mode']}</p>
              <p>Skill: {job['Skill']}</p>
              <p>Salary: {job['Salary']}</p>
              <p>Status: {job.status}</p>
              <div className='job-status-buttondiv'>
              {job.status === "active" ? (
                <button className='close-post-Button' onClick={() => handleStatus(job.id, job.email)}>
                Close Post
              </button>) : (
                <button className='active-post-Button' onClick={() => handleStatus(job.id, job.email)}>
                  Active Post
                </button>
              )}
              </div>
             

            </div>
          ))
        ) : (
          <p>No jobs available for Hirers.</p>
        )}
      </div>
    </div>
  );
}

export default ClosejobPost;
