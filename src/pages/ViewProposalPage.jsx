import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReceivedProposal } from '../store/Slice';
import "../App.css";
import { getUserProposalByEmail, updateAppliedJobStatus, updateProposalStatus } from '../utils/localStorageHelpers';

function ViewProposalPage() {
  const {logedUserData,receivedProposal} = useSelector((state)=>state.Auth)
  const [parPosalData, setParPosalData] = useState([]);
  const dispatch = useDispatch();
  const hirerEmail = logedUserData.data.email;

  useEffect(() => {
    let getUserRecivedProposalResult = getUserProposalByEmail(logedUserData.data.email)
    dispatch(setReceivedProposal(getUserRecivedProposalResult));
  }, [dispatch, logedUserData]);

  useEffect(() => {
    if (receivedProposal) {
      const activeProposals = receivedProposal.filter(proposal => proposal.status !== 'rejected');
      setParPosalData(activeProposals);
    }
  }, [receivedProposal]);

  const handleUpdateStatus = (id, email, hirerEmail, status) => {
    updateAppliedJobStatus(email, id, status);
    updateProposalStatus(hirerEmail, id, status);
    let getUserRecivedProposalResult = getUserProposalByEmail(logedUserData.data.email)
    dispatch(setReceivedProposal(getUserRecivedProposalResult));
    alert(`Proposal ${status}`);
  };

  return (
    <div className='home-page-container'>
      <div className='job-list'>
        {parPosalData && parPosalData.length > 0 ? (
          parPosalData.map((proposal, index) => (
            <div key={index} className='job-item'>
              <h2>Applied for {proposal.appledFor}</h2>
              <p>Name: {proposal.name}</p>
              <p>Education: {proposal.education}</p>
              <p>Experience: {proposal.experience}</p>
              <p>Email: {proposal.email}</p>
              <p>Status: {proposal.status}</p>
              <div className='proposal-buttons'>
                <button className='accept-button' onClick={() => handleUpdateStatus(proposal.id, proposal.email, hirerEmail, 'accepted')}>
                  Accept
                </button>
                <button className='reject-button' onClick={() => handleUpdateStatus(proposal.id, proposal.email, hirerEmail, 'rejected')}>
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No job proposals for Hirers.</p>
        )}
      </div>
    </div>
    
  );
}

export default ViewProposalPage;
