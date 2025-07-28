// src/components/RoleDropdown.js
import React from 'react';

const RoleDropdown = ({ currentRole, onChange }) => {
  const roles = ['user', 'manager', 'salesman', 'ceo'];

  return (
    <select value={currentRole} onChange={(e) => onChange(e.target.value)}>
      {roles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
};

export default RoleDropdown;
