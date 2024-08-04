// import React, {useState} from 'react';
//
// // student views a list of assignments and assignment grades 
// // use the URL  /assignments?studentId= &year= &semester=
// // The REST api returns a list of SectionDTO objects
// // Use a value of studentId=3 for now. Until login is implemented in assignment 7.
//
// // display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score

import React, { useState, useEffect } from 'react';

const AssignmentsStudentView = () => {
    const [assignments, setAssignments] = useState([]);
    const studentId = 3;
    const year = 2024;
    const semester = 'Spring';

    useEffect(() => {
        // Fetch assignments from the backend REST API
        fetch(`http://localhost:8080/assignments?studentId=${studentId}&year=${year}&semester=${semester}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => setAssignments(data))
            .catch(error => console.error('There was an error fetching the assignments!', error));
    }, []);

    return (
        <>
            <h3>Assignments</h3>
            <table>
                <thead>
                <tr>
                    <th>Course Id</th>
                    <th>Assignment Title</th>
                    <th>Assignment DueDate</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {assignments.map((assignment, index) => (
                    <tr key={index}>
                        <td>{assignment.courseId}</td>
                        <td>{assignment.title}</td>
                        <td>{assignment.dueDate}</td>
                        <td>{assignment.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default AssignmentsStudentView;
