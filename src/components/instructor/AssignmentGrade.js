import React, { useState } from 'react';
<<<<<<< HEAD

// instructor enters students' grades for an assignment
// fetch the grades using the URL /assignment/{id}/grades
// REST api returns a list of GradeDTO objects
// display the list as a table with columns 'gradeId', 'student name', 'student email', 'score' 
// score column is an input field 
//  <input type="text" name="score" value={g.score} onChange={onChange} />
 

const AssignmentGrade = (props) => {

 
    return(
        <>
            <h3>Not implemented</h3>
        </>          
=======
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../../Constants';

const AssignmentGrade = (props) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [grades, setGrades] = useState([]);


    const editOpen = () => {
        setOpen(true);
        setMessage('');
        fetchGrades(props.assignment.id);
    };

    const fetchGrades = async (id) => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments/${id}/grades`);
            if (response.ok) {
                const data = await response.json();
                setGrades(data);
            } else {
                const rc = await response.json();
                setMessage(rc.message);
            }
        } catch (err) {
            setMessage("network error "+err);
        }
    }

    const onSave = async () => {
        try {
            const response = await fetch (`${SERVER_URL}/grades`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(grades),
                });
            if (response.ok) {
                setMessage("Grades saved");
            } else {
                const rc = await response.json();
                setMessage(rc.message);
            }
        } catch (err) {
            setMessage("network error "+err);
        }
    }

    const editClose = () => {
        setOpen(false);
        setGrades([]);
        setMessage('');
    };

    const onChange = (e) => {
        const copy_grades = grades.map((x) => x);
        const row_idx = e.target.parentNode.parentNode.rowIndex - 1;
        copy_grades[row_idx] = {...(copy_grades[row_idx]), score: e.target.value};
        setGrades(copy_grades);
    }

    const headers = ['gradeId', 'student name', 'student email', 'score' ];

    return(
        <>
            <Button onClick={editOpen}>Grade</Button>
            <Dialog open={open} >
                <DialogTitle>Grade Assignment</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                    <h4>{message}</h4>
                    <table className="Center" >
                        <thead>
                        <tr>
                            {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                        </tr>
                        </thead>
                        <tbody>
                        {grades.map((g) => (
                            <tr key={g.gradeId}>
                                <td>{g.gradeId}</td>
                                <td>{g.studentName}</td>
                                <td>{g.studentEmail}</td>
                                <td><input type="text"  name="score" value={g.score}  onChange={onChange} /></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={editClose}>Close</Button>
                    <Button color="primary" onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
>>>>>>> c28b34f055829370e6a8f190988dd77687de904c
    );
}

export default AssignmentGrade;
