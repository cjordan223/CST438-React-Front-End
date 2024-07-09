import React, { useState } from 'react';
import { Dialog,DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

// complete the code.  
// instructor adds an assignment to a section
// use mui Dialog with assignment fields Title and DueDate
// issue a POST using URL /assignments to add the assignment

const AssignmentAdd = (props)  => {

    const[isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [assignment, setAssignment] = useState({id:'', title:'', dueDate:'', secId:''})

    const editOpen = () => {
        setOpen(true);
        setMessage('');
        setAssignment({id: '', title: '', dueDate: '', secId: ''});
    }
    const editClose = () => {
        setOpen(false);
    }

    const editChange = (event) => {
        setAssignment({ ...assignment, [event.target.name]: event.target.value})
    }

    const onSave = () => {
        if (assignment.title==='' || assignment.dueDate==='' || assignment.secId==='') {
            setMessage("Please fill in all fields");
        } else {
            props.save(assignment);
            editClose();
        }
    }

    return (
    <>
        <Button onClick={editOpen}>Add Assignment</Button>
        <Dialog open={isOpen}>
            <DialogTitle> Add Assignment </DialogTitle>
            <DialogContent style={{paddingTop: 20}}>
                <h4>{message}</h4>
                <TextField style={{padding: 10}} fullWidth label="id" name="id" value={assignment.id} onChange={editChange} />
                <TextField style={{padding: 10}} autoFocus fullWidth label="title" name='title' value={assignment.title} onChange={editChange} />
                <TextField style={{padding: 10}} fullWidth label="dueDate" name="dueDate" value={assignment.dueDate} onChange={editChange} />
                <TextField style={{padding: 10}} fullWidth label="secId" name='secId' value={assignment.secId} onChange={editChange} />
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
