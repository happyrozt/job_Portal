import React from 'react';

export default function JobListingCard({ jobsAData, handleClick }) {
  return (
    <div className='home-page-container'>
      <div className='job-list'>
        {typeof jobsAData === 'string' ? (
          <p>{jobsAData}</p>
        ) : jobsAData.length > 0 ? (
          jobsAData.map((job, index) => (
            <div key={index} className='job-item' onClick={() => handleClick(job)}>
              <h2>{job.Title}</h2>
              <p>{job.description}</p>
              <p>Industry: {job['Industry']}</p>
              <p>Location: {job['Location']}</p>
              <p>Work Mode: {job['Work Mode']}</p>
              <p>Skill: {job['Skill']}</p>
              <p>Salary: {job['Salary']}</p>
            </div>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
    </div>
  );
}
