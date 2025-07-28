import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    age: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const ageNum = Number(form.age);

    if (
      !Number.isInteger(ageNum) ||
      ageNum < 1 ||
      ageNum > 120
    ) {
      alert('Age must be an integer between 1 and 120');
      return;
    }

    try {
      await axios.post('/auth/register', form);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="gender" placeholder="Gender" onChange={handleChange} required />
      <input
        name="age"
        type="number"
        placeholder="Age"
        onChange={handleChange}
        required
        min={1}
        max={120}
        step={1}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
