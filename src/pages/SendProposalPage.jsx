import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "../App.css";


import Input from '../components/input/Input';
import { sendProposal, setAppliedJobData, userSelectedJob } from '../store/Slice';
import { addProposalDataToUser, setuserAppliedJobData } from '../utils/localStorageHelpers';

const inputFields = [
  { label: 'Name', type: 'text', placeholder: 'Name', name: 'name' },
  { label: 'Education', type: 'text', placeholder: 'Education', name: 'education' },
  { label: 'Experience', type: 'text', placeholder: 'Experience', name: 'experience' }
];

function SendProposalPage() {
  const { id } = useParams();
  const { selectedJob, logedUserData } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState({ resume: '', personalInfo: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    experience: "",
    error: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    education: "",
    experience: "",
    resumeFile: ""
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setErrors(prevErrors => ({
        ...prevErrors,
        resumeFile: 'Only PDF files are allowed.'
      }));
      setResumeFile(null);
    } else {
      setResumeFile(file);
      setErrors(prevErrors => ({
        ...prevErrors,
        resumeFile: ''
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: value.trim() === "" ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, education, experience } = formData;

    const validationErrors = {};
    inputFields.forEach(field => {
      if (!formData[field.name].trim()) {
        validationErrors[field.name] = `${field.label} is required`;
      }
    });

    if (!resumeFile) {
      validationErrors.resumeFile = 'Resume is required';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const hirerEmail = selectedJob.email;
    const proposalData = {
      name,
      education,
      experience,
      resume: resumeFile.name,
      personalInfo: proposal.personalInfo,
      appledFor: selectedJob.title,
      status: "Pending",
      id: selectedJob.id,
      email: logedUserData.data.email
    };
    let payload = { hirerEmail, proposalData };
    
    let addProposalDataToUserResult = addProposalDataToUser(hirerEmail, proposalData);
    dispatch(sendProposal(addProposalDataToUserResult));
    let appliedJobDataResult = setuserAppliedJobData(logedUserData.data.email, selectedJob);
    dispatch(setAppliedJobData(appliedJobDataResult));
    setFormData({
      name: "",
      education: "",
      experience: "",
      error: ""
    });
    setProposal({ resume: '', personalInfo: '' });
    setResumeFile(null);
    navigate('/applyedjobs');
    console.log('Proposal submitted:', formData);
  };

  useEffect(() => {
    if (!selectedJob && id) {
      let selectedJobResult = getDataById(id);
      dispatch(userSelectedJob(selectedJobResult));
    }
  }, [dispatch, id, selectedJob]);

  if (!selectedJob) {
    return <div>No job details available. Please go back to the job listings.</div>;
  }

  return (
    <div className='send-proposal-page'>
      <p className='proposal-title'>Apply for {selectedJob.Title}</p>
      <form onSubmit={handleSubmit} className='proposal-form'>
        {inputFields.map(field => (
          <div className='send-proposal-input-div'>
             <Input
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            error={errors[field.name]}
          
          />
          </div>
       
        ))}
        <div className='resume-div'>
          <label>Upload Resume</label>
          <input type='file' onChange={handleFileChange} />
          {errors.resumeFile && <span className="error">{errors.resumeFile}</span>}
        </div>
        <div className='proposal-send-button'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SendProposalPage;
