import { Button } from '@mui/material';
import React, {useState} from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import AssignmentUpdate from './AssignmentUpdate';
import AssignmentAdd from './AssignmentAdd';

// instructor views assignments for their section
// use location to get the section value 
// 
// GET assignments using the URL /sections/{secNo}/assignments
// returns a list of AssignmentDTOs
// display a table with columns 
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

function AssignmentsView(props) {

    const [assignments, setAssignments] = useState([
        {assignmentid: '1', title: 'Homework 1', dueDate: '2024-07-10', sectNo: '1'},
        {assignmentid: '2', title: 'Homework 2', dueDate: '2024-07-11', sectNo: '1'},
        {assignmentid: '3', title: 'Homework 3', dueDate: '2024-07-12', sectNo: '1'}
    ]);

    const [message, setMessage] = useState('');
    const headers = ['Assignment ID', 'Title', 'Due Date', 'Section Number', '', ''];

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
        const assignment_copy = assignments.filter((assignment, idx) => idx!==row_index);
        setAssignments(assignment_copy);
        setMessage("Assignment Deleted");
    }

    const onSave = (assignment) => {
        const assignment_copy = assignments.map((a) => (a.assignmentid===assignment.assignmentid) ? assignment : a );
        setAssignments(assignment_copy);
        setMessage('Assignment Saved!');

    }

    const addAssignment = (assignment) => {
        const assignment_copy = assignments.map((a) => a);
        assignment_copy.push(assignment);
        setAssignments(assignment_copy);
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
                <tr key={assignment.assignmentid}>
                    <td>{assignment.assignmentid}</td>
                    <td>{assignment.title}</td>
                    <td>{assignment.dueDate}</td>
                    <td>{assignment.sectNo}</td>
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
