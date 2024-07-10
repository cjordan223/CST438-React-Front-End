import React, { useState, useEffect } from 'react';

const ScheduleView = ({ studentId, refresh }) => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [year, setYear] = useState(2024); // const for testing
    const [semester, setSemester] = useState('Spring'); // const for testing

    const fetchSchedule = () => {
        fetch(`http://localhost:8080/enrollments?studentId=${studentId}&year=${year}&semester=${semester}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch schedule');
                }
                return response.json();
            })
            .then(data => {
                setSchedule(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        console.log("Fetching schedule...");
        fetchSchedule();
    }, [refresh]); // only listen to refresh to trigger refetch

    const dropCourse = (enrollmentId) => {
        fetch(`http://localhost:8080/enrollments/${enrollmentId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                // Remove the dropped course from the schedule
                setSchedule(schedule.filter(enrollment => enrollment.enrollmentId !== enrollmentId));
                alert('Course dropped successfully.');
            })
            .catch(error => {
                // Won't allow enrollment if past date
                const errorMessage = error.message;
                if (errorMessage.includes("drop dead line passed")) {
                    alert("Error: Drop deadline passed.");
                } else {
                    alert(`Error: ${errorMessage}`);
                }
                setError(null);  // Do not set error state to prevent re-render
            });
    };

    if (loading) {
        return <p>Loading schedule...</p>;
    }

    if (error) {
        return <p>Error loading schedule: {error.message}</p>;
    }

    return (
        <div>
            <h3>Schedule</h3>
            <table>
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Course ID</th>
                    <th>Section ID</th>
                    <th>Title</th>
                    <th>Credits</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {schedule.map((enrollment) => (
                    <tr key={enrollment.enrollmentId}>
                        <td>{enrollment.year}</td>
                        <td>{enrollment.semester}</td>
                        <td>{enrollment.courseId}</td>
                        <td>{enrollment.sectionId}</td>
                        <td>{enrollment.title}</td>
                        <td>{enrollment.credits}</td>
                        <td>
                            <button onClick={() => dropCourse(enrollment.enrollmentId)}>Drop</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleView;
