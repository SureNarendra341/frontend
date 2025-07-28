import React, { useState } from 'react';
import axios from '../api/axios';

const AddData = () => {
  const [dataType, setDataType] = useState('text');
  const [value, setValue] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/data', { type: dataType, content:value });
      alert('Data added');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={dataType} onChange={e => setDataType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter data" required />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddData;