import React, { useState } from 'react';
import { Dialog,DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

// complete the code.  
// instructor adds an assignment to a section
// use mui Dialog with assignment fields Title and DueDate
// issue a POST using URL /assignments to add the assignment

const AssignmentAdd = (props)  => {

    const[isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [assignment, setAssignment] = useState({assignmentId:'', title:'', dueDate:'', sectNo:''})

    const editOpen = () => {
        setOpen(true);
        setMessage('');
        setAssignment(props.assignment);
    }
    const editClose = () => {
        setOpen(false);
    }

    const editChange = (event) => {
        setAssignment({ ...assignment, [event.target.name]: event.target.value})
    }

    const onSave = () => {
        if (assignment.title==='' || assignment.dueDate==='' || assignment.sectNo==='') {
            setMessage("Please fill in all fields");
        } else {
            props.save(assignment);
            editClose();
        }
    }
    
    return (
    <>
        <Button onClick={editOpen}>Edit</Button>
        <Dialog open={isOpen}>
            <DialogTitle> Edit Assignment </DialogTitle>
            <DialogContent style={{paddingTop: 20}}>
                <h4>{message}</h4>
                <TextField style={{padding: 10}} fullWidth label="assignmentId" name="assignmentId" value={assignment.assignmentId} onChange={editChange} />
                <TextField style={{padding: 10}} autoFocus fullWidth label="title" name='title' value={assignment.title} onChange={editChange} />
                <TextField style={{padding: 10}} fullWidth label="dueDate" name="dueDate" value={assignment.dueDate} onChange={editChange} />
                <TextField style={{padding: 10}} fullWidth label="sectNo" name='sectNo' value={assignment.sectNo} onChange={editChange} />
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={editClose}>Close</Button>
                <Button color='primary' onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>
    </>                       
    )
}

export default AssignmentAdd;
