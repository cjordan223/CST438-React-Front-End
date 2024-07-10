import React, { useState, useEffect } from 'react';

const CourseEnroll = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/sections/open')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch sections');
                }
                return response.json();
            })
            .then(data => {
                console.log('Sections data:', data);
                setSections(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching sections:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const enrollInSection = (sectionNo) => {
        fetch(`http://localhost:8080/enrollments/sections/${sectionNo}?studentId=3`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
            .then(data => {
                alert('Enrolled successfully!');
                setError(null);  // Clear any previous error
            })
            .catch(error => {
                console.error('Error enrolling in section:', error);
                setError(error.message);
            });
    };

    if (loading) {
        return <p>Loading sections...</p>;
    }

    return (
        <div>
            <h3>Course Enrollment</h3>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <ul>
                {sections.length > 0 ? (
                    sections.map((section) => (
                        <li key={section.secNo}>
                            {section.courseId} - {section.title} - {section.instructorName}
                            <button onClick={() => enrollInSection(section.secNo)}>Enroll</button>
                        </li>
                    ))
                ) : (
                    <p>No sections available for enrollment</p>
                )}
            </ul>
        </div>
    );
};

export default CourseEnroll;
