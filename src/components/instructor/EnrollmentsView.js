import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {SERVER_URL} from '../../Constants';
import { TextField } from '@mui/material';

// instructor view list of students enrolled in a section 
// use location to get section no passed from InstructorSectionsView
// fetch the enrollments using URL /sections/{secNo}/enrollments
// display table with columns
//   'enrollment id', 'student id', 'name', 'email', 'grade'
//  grade column is an input field
//  hint:  <input type="text" name="grade" value={e.grade} onChange={onGradeChange} />

const EnrollmentsView = (props) => {
    const [enrollments, setEnrollments] = useState([]);
    const [message, setMessage] = useState('');

    const location = useLocation();
    const { s } = location.state;

    const fetchEnrollments = async () => {
        if (!s) return;
        try {
            const response = await fetch(`${SERVER_URL}/sections/${s.secNo}/enrollments`);
            if (response.ok) {
                const data = await response.json();
                setEnrollments(data);
            } else {
                const rc = await response.json();
                setMessage(rc.message);
            }
        } catch (err) {
            setMessage("Network error " + err);
        }
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const handleGradeChange = (value, enrollmentId) => {

        const updatedEnrollments = enrollments.map((e) => {
            if (e.enrollmentId === enrollmentId) {
                return { ...e, grade: value };
            }
            return e;
        });
        setEnrollments(updatedEnrollments);
    };

    const saveGrades = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/enrollments`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(enrollments),
            });
    
            if (response.ok) {
                setMessage('Grades saved successfully');
            } else {
                const rc = await response.json();
                setMessage("Save failed "+rc.message);
            }
        } catch (err) {
            setMessage("Network error " + err);
        }
    };

    const headers = ['enrollment id', 'student id', 'name', 'email', 'grade'];

    return (
        <div>
            <h3>{message}</h3>
            {enrollments.length > 0 && (
                <>
                    <h3>{s.courseId}-{s.secNo} Enrollments</h3>
                    <table className="Center">
                        <thead>
                            <tr>
                                {headers.map((header, idx) => (
                                    <th key={idx}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.map((enrollment) => (
                                <tr key={enrollment.enrollmentId}>
                                    <td>{enrollment.enrollmentId}</td>
                                    <td>{enrollment.studentId}</td>
                                    <td>{enrollment.name}</td>
                                    <td>{enrollment.email}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="grade"
                                            value={enrollment.grade}
                                            onChange={(e) => handleGradeChange(e.target.value, enrollment.enrollmentId)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <a onClick={saveGrades} style={{color: 'blue', textDecoration: 'none', cursor: 'pointer'}}>SAVE GRADES</a>
                </>
            )}
        </div>
    );

}

export default EnrollmentsView;
