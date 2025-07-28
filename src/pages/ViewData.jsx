// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import '../styles/ViewData.css';

// const ViewData = () => {
//   const [dataList, setDataList] = useState([]);

//   // ✅ Fetch data on mount
//   useEffect(() => {
//     axios.get('/data')
//       .then(res => {
//         console.log("Fetched data:", res.data);
//         setDataList(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching data:", err);
//       });
//   }, []);

//   // ✅ Handle soft delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/data/${id}`);
//       setDataList(prev => prev.filter(d => d.id !== id)); // Remove deleted item from UI
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   return (
//     <div className="view-data-container">
//       <h2 className="heading">Your Data</h2>
//       {dataList.length === 0 ? (
//         <p>No data available.</p>
//       ) : (
//         dataList.map(d => (
//           <div className="data-item" key={d.id}>
//             <strong>{d.type.toUpperCase()}:</strong>
//             <p>{d.content}</p>
//             <button className="delete-button" onClick={() => handleDelete(d.id)}>
//               Delete
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ViewData;

import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../auth/AuthContext';

const ViewData = () => {
  const [dataList, setDataList] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataList(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/data/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataList(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  };

  return (
    <div className="p-4">
      <h2>Your Uploaded Data</h2>
      {dataList.map((item) => (
        <div key={item.id} className="border p-3 my-2 rounded shadow">
          <p><strong>Type:</strong> {item.type}</p>
          {item.type === 'text' && <p>{item.content}</p>}
          {item.type === 'image' && (
            <img src={item.content} alt="user" className="max-w-xs" />
          )}
          {item.type === 'video' && (
            <video src={item.content} controls className="max-w-xs" />
          )}
          <button
            onClick={() => handleDelete(item.id)}
            className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewData;
