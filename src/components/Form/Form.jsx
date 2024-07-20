import React, { useState } from 'react';
import './Form.css';
import Input from '../input/Input';
import { useDispatch } from 'react-redux';
import { setUserData, setUserRole } from '../../store/Slice';
import { useNavigate } from 'react-router-dom';

const RegisterOptions = [
  { name: 'username', label: 'User Name', type: 'text', placeholder: 'User Name' },
  { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Last Name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' }
];

const LoginOptions = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' }
];

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoggedIn) {
      if (!formData.username) {
        newErrors.username = 'User Name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last Name is required';
      }
      if (!formData.role) {
        newErrors.role = 'Role is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setFormData({
      username: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    });
    setErrors({});
  };

  const handleRegister = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailExists = existingUsers.some(user => user.email === formData.email);

    if (isEmailExists) {
      setErrors({ email: 'Email already registered' });
      return;
    }

    const newUserData = {
      username: formData.username,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      userLogged: false,
      data: []
    };
    existingUsers.push(newUserData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setIsLoggedIn(true);
    handleClear();
  };

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.email === formData.email);
    const newErrors = {};

    if (!user) {
      newErrors.email = 'Invalid email';
    } else if (user.password !== formData.password) {
      newErrors.password = 'Invalid password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userIndex = storedUsers.findIndex(user => user.email === formData.email && user.password === formData.password);

    if (userIndex !== -1) {
      storedUsers[userIndex].userLogged = true;
      localStorage.setItem('users', JSON.stringify(storedUsers));

      const loggedUsers = JSON.parse(localStorage.getItem('loggedUsers')) || {};
      loggedUsers["data"] = storedUsers[userIndex];
      localStorage.setItem('loggedUsers', JSON.stringify(loggedUsers));

      dispatch(setUserData(loggedUsers));
      dispatch(setUserRole(loggedUsers.data.role));
      handleClear();
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isLoggedIn) {
        handleLogin();
      } else {
        handleRegister();
      }
    }
  };

  const toggleLoginRegister = () => {
    setIsLoggedIn(prevState => !prevState);
    handleClear();
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className="form">
        {isLoggedIn ? (
          <>
            {LoginOptions.map((field) => (
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
            ))}
            <div className="button-div">
              <button type="submit" className="form-button">Login</button>
            </div>
          </>
        ) : (
          <>
            {RegisterOptions.map((field) => (
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
            ))}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="">Select Role</option>
                {['Freelancer', 'Hirer'].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.role && <span className="error">{errors.role}</span>}
            </div>
            <div className="button-div">
              <button type="submit" className="form-button">Register</button>
            </div>
          </>
        )}
        {isLoggedIn ? (
          <div>
            Don't have an account? <button type="button" onClick={toggleLoginRegister} className="form-register-link">Register</button>
          </div>
        ) : (
          <div>
            Already have an account? <button type="button" onClick={toggleLoginRegister} className="form-login-link">Login</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
