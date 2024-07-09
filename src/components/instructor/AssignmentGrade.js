import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { Dialog,DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { SERVER_URL } from '../../Constants';

// instructor enters students' grades for an assignment
// fetch the grades using the URL /assignment/{id}/grades
// REST api returns a list of GradeDTO objects
// display the list as a table with columns 'gradeId', 'student name', 'student email', 'score' 
// score column is an input field 
//  <input type="text" name="score" value={g.score} onChange={onChange} />
 

const AssignmentGrade = (props) => {

    const { assignment, onSave } = props;

    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [grades, setGrades] = useState([]);

    const editOpen = () => {
        setOpen(true);
        setMessage('');
        fetchAssignmentGrades();
    }

    const editClose = () => {
        setOpen(false);
    }

    const fetchAssignmentGrades = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments/${assignment.id}/grades`);
            if (response.ok) {
                const gradeData = await response.json();
                setGrades(gradeData);
            } else {
                const json = await response.json();
                setMessage('Response error: ' + json.message);
            }
        } catch (err) {
            setMessage('Network error: ' + err);
        }
    }

    useEffect(() => {
        if (isOpen) {
            fetchAssignmentGrades();
        }
    }, [isOpen, assignment.id]);

    const editChange = (event, index) => {
        const { name, value } = event.target;
        const newGrades = [...grades];
        newGrades[index] = {
            ...newGrades[index],
            [name]: value
        };
        setGrades(newGrades);
    }

    const handleSave = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/grades`, {
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

    const headers = ['gradeId', 'student name', 'student email', 'score'];

    return (
        <>
            <Button onClick={editOpen}>Grade</Button>
            <Dialog open={isOpen} onClose={editClose}>
                <DialogTitle>Grade Assignment</DialogTitle>
                <DialogContent style={{ paddingTop: 20 }}>
                    <h4>{message}</h4>
                    <table className="Center">
                        <thead>
                            <tr>
                                {headers.map((header, idx) => (
                                    <th key={idx}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((g, index) => (
                                <tr key={g.gradeId}>
                                    <td>{g.gradeId}</td>
                                    <td>{g.studentName}</td>
                                    <td>{g.studentEmail}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="score"
                                            value={g.score}
                                            onChange={(e) => editChange(e, index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={editClose} color="secondary">Close</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

export default AssignmentGrade;