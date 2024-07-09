import React, { useState } from 'react';
import { Dialog,DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { SERVER_URL } from '../../Constants';

// instructor enters students' grades for an assignment
// fetch the grades using the URL /assignment/{id}/grades
// REST api returns a list of GradeDTO objects
// display the list as a table with columns 'gradeId', 'student name', 'student email', 'score' 
// score column is an input field 
//  <input type="text" name="score" value={g.score} onChange={onChange} />


const AssignmentGrade = (props) => {
    const[isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [grades, setGrades] = useState([]);

    const editOpen =  () => {
        setOpen(true);
        setMessage('');
    }
    
    const editClose = () => {
        setOpen(false);
    }

    const fetchAssignmentGrades = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments/${props.assignment.id}/grades`);
            if (response.ok) {
                const gradeData = await response.json();
                setGrades(gradeData);
            } else {
                const json = await response.json();
                setMessage('Response error: ' +json.message);
            }
        } catch (err) {
            setMessage('Network error '+err);
        }
    }

    const handleGradeChange = (idx, event) => {
        const { name, value } = event.target;
        const updatedGrades = [...grades];
        updatedGrades[idx][name] = value;
        setGrades(updatedGrades);
    }

    const onSave = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/grades`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(grades),
                });
            if (response.ok) {
                setMessage("Grades Saved");
                fetchAssignmentGrades();
            } else {
                const json = await response.json();
                setMessage('Response error: ' + json.message);
            }
        } catch (err) {
            setMessage('Network error: ' + err);
        }
    }

    return(
        <>
        <Button onClick={editOpen}>Grade</Button>
        <Dialog open={isOpen}>
            <DialogTitle> Grade Assignment </DialogTitle>
            <DialogContent style={{paddingTop: 20}}>
                <h4>{message}</h4>
                <TextField style={{padding: 10}} fullWidth label="Assignment ID" name='id' value={props.assignment?.id || ''} InputProps={{ readOnly: true }} />
                {grades.map((grade, idx) => (
                    <div key={idx}>
                        <TextField style={{padding: 10}} fullWidth label="Grade Id" name="gradeId" value={grade.gradeId} InputProps={{readOnly: true, }} />
                        <TextField style={{padding: 10}} fullWidth label="Student Name" name='studentName' value={grade.studentName} InputProps={{readOnly: true, }} />
                        <TextField style={{padding: 10}} fullWidth label="Student Email" name="dueDate" value={grade.studentEmail} InputProps={{readOnly: true, }} />
                        <input type="text" name="score" value={grade.score} onChange={(e) => handleGradeChange(idx, e)}/>
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={editClose}>Close</Button>
                <Button color='primary' onClick={onSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>      
    );
}

export default AssignmentGrade;