import React, { useState } from 'react';
import "../App.css";
import Input from '../components/input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setAllHirerData, setUsersJobData } from '../store/Slice';
import { addUserJobDetail, getUsersWithRoleHirer } from '../utils/localStorageHelpers';
import { useNavigate } from 'react-router-dom';

const inputFields = [
  { label: 'Title', type: 'text', placeholder: 'Title', name: 'Title' },
  { label: 'Company Name', type: 'text', placeholder: 'Company Name', name: 'Company Name' },
  { label: 'Industry', type: 'text', placeholder: 'Industry', name: 'Industry' },
  { label: 'Skill', type: 'text', placeholder: 'Skill', name: 'Skill' },
  { label: 'Location', type: 'text', placeholder: 'Location', name: 'Location' },
  { label: 'Work Mode', type: 'text', placeholder: 'Work Mode', name: 'Work Mode' },
  { label: 'Description', type: 'text', placeholder: 'Description', name: 'Description' },
  { label: 'Salary', type: 'number', placeholder: 'Salary', name: 'Salary' },
];

function CreateJobPost() {
  const logedUserData = useSelector((state) => state.Auth.logedUserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Title: '',
    'Company Name': '',
    'Industry': '',
    'Skill': '',
    'Location': '',
    'Work Mode': '',
    'Description': '',
    'Salary': '',
  });

  const [errors, setErrors] = useState({
    Title: '',
    'Company Name': '',
    'Industry': '',
    'Skill': '',
    'Location': '',
    'Work Mode': '',
    'Description': '',
    'Salary': '',
  });

  const clearState = () => {
    setFormData({
      Title: '',
      'Company Name': '',
      'Industry': '',
      'Skill': '',
      'Location': '',
      'Work Mode': '',
      'Description': '',
      'Salary': '',
    });
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;

    if (fieldName === 'Salary') {
      if (isNaN(value) || parseInt(value) <= 0 || value.trim() === '') {
        setErrors({
          ...errors,
          [fieldName]: 'Salary must be a valid number greater than zero.',
        });
      } else {
        setErrors({
          ...errors,
          [fieldName]: '',
        });
      }
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    } else {
      setErrors({
        ...errors,
        [fieldName]: value.trim() ? '' : `${fieldName} is required and cannot be empty.`,
      });
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = `${key} is required and cannot be empty.`;
        formIsValid = false;
      }
    }

    if (formData['Salary'] && (isNaN(formData['Salary']) || parseInt(formData['Salary']) <= 0 || formData['Salary'].trim() === '')) {
      newErrors['Salary'] = 'Salary must be a valid number greater than zero.';
      formIsValid = false;
    }

    setErrors(newErrors);
    if (formIsValid) {
      const newData = {
        ...formData,
        Salary: `${formData['Salary']} per month`,
        id: generateRandomId(),
        email: logedUserData.data.email,
        status: "active",
      };
      let setUserJobResult = addUserJobDetail(newData);
      dispatch(setUsersJobData(setUserJobResult));
      clearState();
      navigate('/')
      let JobsData = getUsersWithRoleHirer();
      dispatch(setAllHirerData(JobsData));
      alert("Job Post Created");
    }
  };

  return (
    <div className='create-post-container'>
      <form onSubmit={handleSubmit}>
        <div className='create-post-form'>
          {inputFields.map((field, index) => (
            <div key={index} className="form-field">
              <Input
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={(e) => handleInputChange(e, field.name)}
                error={errors[field.name]}
              />
            </div>
          ))}
        </div>
        <div className='create-post-button'>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreateJobPost;
