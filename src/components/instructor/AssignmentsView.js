import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import AssignmentUpdate from './AssignmentUpdate';
import AssignmentAdd from './AssignmentAdd';
import AssignmentGrade from './AssignmentGrade';
import { SERVER_URL } from '../../Constants';

// instructor views assignments for their section
// use location to get the section value 
// 
// GET assignments using the URL /sections/{secId}/assignments
// returns a list of AssignmentDTOs
// display a table with columns 
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

function AssignmentsView(props) {

    const [assignments, setAssignments] = useState([]);

    const [message, setMessage] = useState('');
    const headers = ['Assignment ID', 'Title', 'Due Date', 'Section ID', '', ''];

    const fetchAssignments = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/sections/8/assignments`);
            if (response.ok) {
                const assignments = await response.json();
                setAssignments(assignments);
            } else {
                const json = await response.json();
                setMessage('Response error: ' +json.message);
            }
        } catch (err) {
            setMessage('Network error '+err);
        }
    }

    useEffect( () => {
        fetchAssignments();
    }, []);

    const deleteAlert = (event) => {
        confirmAlert({
            title: 'Confirm delete',
            message: 'Do you really want to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => doDelete(event)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    const doDelete = (event) => {
        const row_index = event.target.parentNode.parentNode.rowIndex -1;
        deleteAssignment(assignments[row_index].id);
    }

    const deleteAssignment = async (id) => {
        try {
            const response = await fetch (`${SERVER_URL}/assignments/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            if (response.ok) {
                setMessage('Assignment deleted');
                fetchAssignments();
            } else {
                const rc = await response.json();
                setMessage("Delete failed " +rc.message);
            } 
        } catch (err) {
            setMessage("Network error: " + err);
        }
    }

    
    const onSave = async (assignment) => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(assignment),
                });
            if (response.ok) {
                setMessage("Course Saved");
                fetchAssignments();
            } else {
                const json = await response.json();
                setMessage('Response error: ' + json.message);
            }
        } catch (err) {
            setMessage('Network error: ' + err);
        }
    }

    const addAssignment = async (assignment) => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(assignment),
                });
            if (response.ok) {
                setMessage("Assignment Added");
                fetchAssignments();
            } else {
                const rc = await response.json();
                setMessage(rc.message);
            }
        } catch (err) {
            setMessage("Network error: " + err);
        }
    }


    return(
        <> 
        <h3> Assignment List </h3>
        <h4>{message}</h4>
        <table className='Center'>
            <thead>
                <tr>
                    {headers.map((h, idx) => <th key={idx}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {assignments.map((assignment) => 
                <tr key={assignment.id}>
                    <td>{assignment.id}</td>
                    <td>{assignment.title}</td>
                    <td>{assignment.dueDate}</td>
                    <td>{assignment.secId}</td>
                    <td><AssignmentGrade assignment={assignment} onSave={onSave} /></td>
                    <td><AssignmentUpdate assignment={assignment} save={onSave}/></td>
                    <td><Button onClick={deleteAlert}>Delete</Button></td>
                </tr>
                )}
            </tbody>
        </table>
        <AssignmentAdd save={addAssignment}/>
        </>
    );
}

export default AssignmentsView;
