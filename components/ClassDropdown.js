import React, { useState } from 'react';
import styles from './styles/ClassDropdown.module.css'; // Import the CSS module

const ClassDropdown = ({ classNames, onSelect }) => {
  const [selectedClass, setSelectedClass] = useState('');

  const handleChange = (event) => {
    const newClass = event.target.value;
    setSelectedClass(newClass);
    onSelect(newClass);
  };

  return (
    <div className={styles.dropdownContainer}>
      <select className={styles.dropdown} value={selectedClass} onChange={handleChange}>
        <option value="">Select a class</option>
        {classNames.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassDropdown;
