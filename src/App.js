import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersView from './components/admin/UsersView';
import CoursesView from './components/admin/CoursesView';
import SectionsView from './components/admin/SectionsView';
import { AdminHome, AdminLayout } from './components/admin/AdminLayout';
import { StudentLayout, StudentHome } from './components/student/StudentLayout';
import ScheduleView from './components/student/ScheduleView';
import CourseEnroll from './components/student/CourseEnroll';
import Transcript from './components/student/Transcript';
import StudentAssignmentsView from './components/student/AssignmentsStudentView';
import InstructorLayout from './components/instructor/InstructorLayout';
import InstructorHome from './components/instructor/InstructorHome';
import AssignmentsView from './components/instructor/AssignmentsView';
import EnrollmentsView from './components/instructor/EnrollmentsView';
import InstructorSectionsView from './components/instructor/InstructorSectionsView';
import CourseEnroll from './components/student/CourseEnroll.js';

const StudentComponent = ({ studentId }) => {
  const [refresh, setRefresh] = useState(false);

  const handleEnroll = () => {
    setRefresh(prev => !prev);  // Toggle refresh to trigger re-fetching of schedule
  };

  return (
      <div>
        <Routes>
          <Route path="/" element={<StudentLayout />}>
            <Route index element={<StudentHome />} />
            <Route path="schedule" element={<ScheduleView studentId={studentId} refresh={refresh} />} />
            <Route path="studentAssignments" element={<StudentAssignmentsView />} />
            <Route path="transcript" element={<Transcript />} />
            <Route path="addCourse" element={<CourseEnroll onEnroll={handleEnroll} />} />
          </Route>
        </Routes>
      </div>
  );
};

function App() {
  const userType = 'STUDENT'; // change to INSTRUCTOR or STUDENT for testing.
  const studentId = 3;

  if (userType === 'ADMIN') {
    return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="users" element={<UsersView />} />
                <Route path="courses" element={<CoursesView />} />
                <Route path="sections" element={<SectionsView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
    )
  } else if (userType === 'STUDENT') {
    return (
        <div className="App">
          <BrowserRouter>
            <StudentComponent studentId={studentId} />
          </BrowserRouter>
        </div>
    )
  } else if (userType === 'INSTRUCTOR') {
    return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<InstructorLayout />}>
                <Route index element={<InstructorHome />} />
                <Route path="assignments" element={<AssignmentsView />} />
                <Route path="enrollments" element={<EnrollmentsView />} />
                <Route path="sections" element={<InstructorSectionsView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
    )
  } else {
    return <h1>Unknown user type</h1>
  }
}

export default App;
