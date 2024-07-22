import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkFreeLancerJobApplication, setAllHirerData, setSearchedData, setUserData, userSelectedJob } from '../store/Slice';
import { checkFreelancerApplicationStatus, getLoggeduserDatafromlocStr, getUsersWithRoleHirer } from '../utils/localStorageHelpers';
import JobListingCard from '../components/card/JobListingCard';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hirerJobs, setHirerJobs] = useState([]);
 const {jobsData,isUserRole,userSearchedData,logedUserData} = useSelector((state)=>state.Auth)  

  useEffect(() => {
    setHirerJobs([...jobsData].reverse());
    console.log("evry  rnader")
  }, []);

  const handleClick = (clickedData) => {
    if (isUserRole === 'Freelancer') {
      const result =  checkFreelancerApplicationStatus({freelancerEmail:logedUserData.data.email, jobId:clickedData.id} );
       dispatch( checkFreeLancerJobApplication(result))
        dispatch(userSelectedJob(clickedData));
        navigate(`/jobdetail/${clickedData.id}`);
    } else if (isUserRole === null) {
      navigate('/login');
    }
  };

  return (
    <>
        {/* <JobListingCard jobsAData={userSearchedData}  handleClick={handleClick } page={"SearchPage"} /> */}
        {/* <JobListingCard jobsAData={hirerJobs}  handleClick={handleClick } page={"HomePage"} /> */}

      {userSearchedData.length === 0 ? (
      <JobListingCard jobsAData={hirerJobs} handleClick={handleClick } page={"HomePage"}/>
      ) : (
        <JobListingCard jobsAData={userSearchedData}  handleClick={handleClick } page={"SearchPage"} />
      )}
    </>
    // </>

    

  );
}

export default HomePage;
