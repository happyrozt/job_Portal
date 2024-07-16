import './App.css';
import Header from './components/header/Header';
import ClosejobPost from './pages/ClosejobPost';
import CreateJobPost from './pages/CreateJobPost';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SendProposalPage from './pages/SendProposalPage';
import AppliedJob from './pages/AppliedJob';
import ViewProposalPage from './pages/ViewProposalPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/createjobpost"
          element={<ProtectedRoute element={<CreateJobPost />} allowedRoles={['Hirer']} />}
        />
        <Route
          path="/closejobpost"
          element={<ProtectedRoute element={<ClosejobPost />} allowedRoles={['Hirer']} />}
        />
        <Route path="/jobdetail/:id" element={<JobDetailPage />} />
        <Route
          path="/proposal/:id"
          element={<ProtectedRoute element={<SendProposalPage />} allowedRoles={['Freelancer']} />}
        />
        <Route
          path="/applyedjobs"
          element={<ProtectedRoute element={<AppliedJob />} allowedRoles={['Freelancer']} />}
        />
        <Route
          path="/proposals"
          element={<ProtectedRoute element={<ViewProposalPage />} allowedRoles={['Hirer']} />}
        />
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
