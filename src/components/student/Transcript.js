import React, { useState, useEffect } from 'react';

const Transcript = () => {
    const studentId = 3;  
    const [transcript, setTranscript] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(`Fetching transcript for student ID: ${studentId}`);
        fetch(`http://localhost:8080/transcripts?studentId=${studentId}`)
            .then(response => {
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error('Failed to fetch transcript');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setTranscript(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching transcript:', error);
                setError(error);
                setLoading(false);
            });
    }, [studentId]);

    if (loading) {
        return <p>Loading transcript...</p>;
    }

    if (error) {
        return <p>Error loading transcript: {error.message}</p>;
    }

    return (
        <div>
            <h3>Transcript</h3>
            <table>
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Course ID</th>
                    <th>Section ID</th>
                    <th>Title</th>
                    <th>Credits</th>
                    <th>Grade</th>
                </tr>
                </thead>
                <tbody>
                {transcript.map((enrollment) => (
                    <tr key={enrollment.enrollmentId}>
                        <td>{enrollment.year}</td>
                        <td>{enrollment.semester}</td>
                        <td>{enrollment.courseId}</td>
                        <td>{enrollment.sectionId}</td>
                        <td>{enrollment.title}</td>
                        <td>{enrollment.credits}</td>
                        <td>{enrollment.grade || 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transcript;
