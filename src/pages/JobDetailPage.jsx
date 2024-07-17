import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdWorkOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import {  userSelectedJob } from '../store/Slice';
import { getDataById } from '../utils/localStorageHelpers';
function JobDetailPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();
    const {selectedJob,isApplied} = useSelector((state)=>state.Auth)
    const handleApply = () => {
        if(isApplied=== false){
            navigate(`/proposal/${id}`);
        }else{
            alert('You have already applied for this job.');
        }
    };

    useEffect(() => {
        if (!selectedJob && id) {
           let selctedJobresult =  getDataById(id)
            dispatch(userSelectedJob(selctedJobresult));
        }
    }, [dispatch, id, selectedJob]);

    if (!selectedJob) {
        return <div>No job details available. Please go back to the job listings.</div>;
    }

    return (
        <div className='job-detail-page'>
            <div className='job-deatil-conatiner'>
                <p className='job-description'>{selectedJob.description}</p>
                <p className='apply-company-name'>{selectedJob.companyName}</p>
                <p className='job-title'>{selectedJob.title}</p>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <RiMoneyRupeeCircleFill className='ruppe-icon' />
                    <p> {selectedJob.selry}</p>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <MdWorkOutline className='ruppe-icon' />
                    <p> {selectedJob.workMode}</p>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <IoLocationOutline className='ruppe-icon' />
                    <p> {selectedJob.location}</p>
                </div>
                <p>Skill: {selectedJob.skill}</p>
                <div className='job-apply-button'>
                    <button onClick={handleApply}>Apply</button>
                </div>

            </div>

        </div>
    );
}

export default JobDetailPage;
