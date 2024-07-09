import React, { useState } from 'react';
import { Dialog,DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { SERVER_URL } from '../../Constants';

// complete the code.  
// instructor adds an assignment to a section
// use mui Dialog with assignment fields Title and DueDate
// issue a POST using URL /assignments to add the assignment

const AssignmentAdd = (props)  => {

    const { section, AssignmentAdd } = props;

    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [assignment, setAssignment] = useState({title: '', dueDate: '', secNo: ''});

    const editOpen = () => {
        setOpen(true);
        setMessage('');
        setAssignment({title: '', dueDate: '', secNo: section.secNo});
    }

    const editClose = () => {
        setOpen(false);
    }

    const editChange = (event) => {
        setAssignment({ ...assignment, [event.target.name]: event.target.value });
    }

    const onSave = async () => {
        if (assignment.title === '' || assignment.dueDate === '' || assignment.secNo === '') {
            setMessage("Please fill in all fields");
        } else {
            try {
                const response = await fetch (`${SERVER_URL}/assignments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(assignment),
                });
                if (response.ok) {
                    const rc = await response.json();
                    setMessage("section added secNo="+rc.secNo);
                } else {
                    const rc = await response.json();
                    setMessage(rc.message);
                }
            } catch (err) {
              setMessage("network error: "+err);
            }
        }
    }

    return (
        <>
            <Button onClick={editOpen}>Add Assignment</Button>
            <Dialog open={isOpen}>
                <DialogTitle>Add Assignment</DialogTitle>
                <DialogContent style={{ paddingTop: 20 }}>
                    <h4>{message}</h4>
                    <TextField style={{ padding: 10 }} autoFocus fullWidth label="Title" name='title' value={assignment.title} onChange={editChange} />
                    <TextField style={{ padding: 10 }} fullWidth label="Due Date" name="dueDate" value={assignment.dueDate} onChange={editChange} />
                    <TextField style={{ padding: 10 }} fullWidth label="Sec No" name='secNo' value={assignment.secNo} onChange={editChange} />
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
