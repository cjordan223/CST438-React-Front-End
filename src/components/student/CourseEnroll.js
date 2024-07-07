import React, { useState, useEffect } from 'react';

const CourseEnroll = () => {
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/sections/open')
            .then(response => response.json())
            .then(data => {
                setSections(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const enrollInSection = (sectionNo) => {
        fetch(`http://localhost:8080/enrollments/sections/${sectionNo}?studentId=3`, {
            method: 'POST',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to enroll in section');
                }
                return response.json();
            })
            .then(data => {
                alert('Enrolled successfully!');
                setSelectedSection(null);
            })
            .catch(error => {
                setError(error);
                alert('Failed to enroll in section');
            });
    };

    if (loading) {
        return <p>Loading sections...</p>;
    }

    if (error) {
        return <p>Error loading sections: {error.message}</p>;
    }

    return (
        <div>
            <h3>Course Enrollment</h3>
            <ul>
                {sections.map((section) => (
                    <li key={section.secNo}>
                        {section.courseId} - {section.title} - {section.instructorName}
                        <button onClick={() => enrollInSection(section.secNo)}>Enroll</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseEnroll;
