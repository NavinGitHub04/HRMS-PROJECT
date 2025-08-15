// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function SubEmploy() {
//   const [product, setProduct] = useState([]);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [newSubEmploy, setNewSubEmploy] = useState({
//     PK_SubCatID: '',
//     FK_HR_EmpCatID: '',
//     Name: '',
//   });
//   const [editSubEmployId, setEditSubEmployId] = useState(null);

//   useEffect(() => {
//     fetchSubEmploy();
//   }, []);

//   const fetchSubEmploy = async () => {
//     try {
//       setLoading(true);
//       setError(false);
//       const response = await axios.get('/api/v1/empSubCat/select');
//       setProduct(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//     }
//   };

//   const deleteSubEmploy = async (id) => {
//     try {
//       await axios.get(`/api/v1/empSubCat/delete/${id}`);
//       fetchSubEmploy();
//     } catch (error) {
//       console.error('Error deleting SubEmploy:', error.response?.data || error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     setNewSubEmploy({
//       ...newSubEmploy,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const startEditSubEmploy = (subEmploy) => {
//     setEditSubEmployId(subEmploy.PK_SubCatID);
//     setNewSubEmploy({
//       PK_SubCatID: subEmploy.PK_SubCatID,
//       FK_HR_EmpCatID: subEmploy.FK_HR_EmpCatID,
//       Name: subEmploy.Name,
//     });
//   };

//   const addSubEmploy = async () => {
//     if (!newSubEmploy.PK_SubCatID || !newSubEmploy.Name) {
//       alert('Please fill in SubEmploy ID and Name');
//       return;
//     }
//     try {
//       await axios.post('/api/v1/empSubCat/create', {
//         id: Number(newSubEmploy.PK_SubCatID),
//         employId: Number(newSubEmploy.FK_HR_EmpCatID),
//         name: newSubEmploy.Name,
//       });
//       setNewSubEmploy({ PK_SubCatID: '', FK_HR_EmpCatID: '', Name: '' });
//       fetchSubEmploy();
//     } catch (error) {
//       console.error('Error adding SubDEmploy:', error.response?.data || error.message);
//     }
//   };

//   const updateSubEmploy = async () => {
//     if (!newSubEmploy.PK_SubCatID) {
//       alert('No SubEmploy selected for update!');
//       return;
//     }
//     try {
//       await axios.post('//api/v1/empSubCat/update', {
//         id: Number(newSubEmploy.PK_SubCatID),
//         employId: Number(newSubEmploy.FK_HR_EmpCatID),
//         name: newSubEmploy.Name,
//       });
//       setNewSubEmploy({ PK_SubCatID: '', FK_HR_EmpCatID: '', Name: '' });
//       setEditSubEmployId(null);
//       fetchSubEmploy();
//     } catch (error) {
//       console.error('Error updating SubEmploy:', error.response?.data || error.message);
//     }
//   };

//   if (error) return <h1>Something went wrong</h1>;
//   if (loading) return <h1>Loading...</h1>;

//   return (
//     <>
//       <div style={{ margin: '20px' }}>
//         <h3>{editSubEmployId ? 'Edit SubEmploy' : 'Add New SubEmploy'}</h3>

//         <input
//           type="text"
//           name="PK_SubCatID"
//           placeholder="SubEmploy ID"
//           value={newSubEmploy.PK_SubCatID}
//           onChange={handleInputChange}
//           disabled={!!editSubEmployId}
//           style={{ marginRight: '10px' }}
//         />

//         <input
//           type="text"
//           name="Name"
//           placeholder="SubEmploy Name"
//           value={newSubEmploy.Name}
//           onChange={handleInputChange}
//           style={{ marginRight: '10px' }}
//         />

//         <input
//           type="text"
//           name="FK_HR_EmployID"
//           placeholder="Employ ID"
//           value={newSubEmploy.FK_HR_EmpCatID}
//           onChange={handleInputChange}
//           style={{ marginRight: '10px' }}
//         />

//         {editSubEmployId ? (
//           <>
//             <button
//               onClick={updateSubEmploy}
//               className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
//               style={{ marginRight: '10px' }}
//             >
//               Update SubEmploy
//             </button>
//             <button
//               onClick={() => {
//                 setEditSubEmployId(null);
//                 setNewSubEmploy({ PK_SubCatID: '', FK_HR_EmpCatID: '', Name: '' });
//               }}
//               className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={addSubEmploy}
//             className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
//           >
//             Add SubEmploy
//           </button>
//         )}
//       </div>

//       <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <thead style={{ textAlign: 'left' }}>
//           <tr>
//             <th colSpan="5">subEmploy List: {product.length}</th>
//           </tr>
//           <tr>
//             <th>SubEmploy ID</th>
//             <th>Name</th>
//             <th>Employ ID</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {product.map((employ, index) => (
//             <tr key={index}>
//               <td>{employ.PK_SubCatID}</td>
//               <td>{employ.Name}</td>
//               <td>{employ.FK_HR_EmpCatID}</td>
//               <td>
//                 <button
//                   onClick={() => startEditSubEmploy(employ)}
//                   className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
//                 >
//                   Edit
//                 </button>
//               </td>
//               <td>
//                 <button
//                   onClick={() => deleteSubEmploy(employ.PK_SubCatID)}
//                   className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default SubEmploy;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubEmploy() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newSubEmploy, setNewSubEmploy] = useState({
    PK_SubCatID: '',
    FK_HR_EmpCatID: '',
    Name: '',
  });
  const [editSubEmployId, setEditSubEmployId] = useState(null);

  useEffect(() => {
    fetchSubEmploy();
  }, []);

  const fetchSubEmploy = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/v1/empSubCat/select');
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteSubEmploy = async (id) => {
    try {
      await axios.get(`/api/v1/empSubCat/delete/${id}`);
      fetchSubEmploy();
    } catch (error) {
      console.error('Error deleting SubEmploy:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewSubEmploy({
      ...newSubEmploy,
      [e.target.name]: e.target.value,
    });
  };

  const startEditSubEmploy = (subEmploy) => {
    setEditSubEmployId(subEmploy.PK_SubCatID);
    setNewSubEmploy({
      PK_SubCatID: subEmploy.PK_SubCatID,
      FK_HR_EmpCatID: subEmploy.FK_HR_EmpCatID,
      Name: subEmploy.Name,
    });
  };

  const addSubEmploy = async () => {
    if (!newSubEmploy.PK_SubCatID || !newSubEmploy.Name) {
      alert('Please fill in SubEmploy ID and Name');
      return;
    }
    try {
      await axios.post('/api/v1/empSubCat/create', {
        id: Number(newSubEmploy.PK_SubCatID),
        empCatId: Number(newSubEmploy.FK_HR_EmpCatID),
        name: newSubEmploy.Name,
      });
      setNewSubEmploy({ PK_SubCatID: '', FK_HR_EmpCatID: '', Name: '' });
      fetchSubEmploy();
    } catch (error) {
      console.error('Error adding SubEmploy:', error.response?.data || error.message);
    }
  };

  const updateSubEmploy = async () => {
    if (!newSubEmploy.PK_SubCatID) {
      alert('No SubEmploy selected for update!');
      return;
    }
    try {
      await axios.post('/api/v1/empSubCat/update', {
        id: Number(newSubEmploy.PK_SubCatID),
        empCatId: Number(newSubEmploy.FK_HR_EmpCatID),
        name: newSubEmploy.Name,
      });
      setNewSubEmploy({ PK_SubCatID: '', FK_HR_EmpCatID: '', Name: '' });
      setEditSubEmployId(null);
      fetchSubEmploy();
    } catch (error) {
      console.error('Error updating SubEmploy:', error.response?.data || error.message);
    }
  };

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className='m-4'>
        <h3>{editSubEmployId ? 'Edit SubEmploy' : 'Add New SubEmploy'}</h3>

        <input
          type="text"
          name="PK_SubCatID"
          placeholder="SubEmploy ID"
          value={newSubEmploy.PK_SubCatID}
          onChange={handleInputChange}
          disabled={!!editSubEmployId}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
           bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />

        <input
          type="text"
          name="Name"
          placeholder="SubEmploy Name"
          value={newSubEmploy.Name}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
           bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />

        <input
          type="text"
          name="FK_HR_EmpCatID"
          placeholder="Employee Category ID"
          value={newSubEmploy.FK_HR_EmpCatID}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
           bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />

        {editSubEmployId ? (
          <>
            <button
              onClick={updateSubEmploy}
              className="mr-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
            >
              Update SubEmploy
            </button>
            <button
              onClick={() => {
                setEditSubEmployId(null);
                setNewSubEmploy({ PK_SubCatID: '', FK_HR_EmpCatID: '', Name: '' });
              }}
              className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addSubEmploy}
            className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
          >
            Add SubEmploy
          </button>
        )}
      </div>

      <table border="1" cellPadding="10" className="border border-collapse w-full">
        <thead className='text-left'>
          <tr>
            <th colSpan="5">SubEmploy List: {product.length}</th>
          </tr>
          <tr>
            <th>SubEmploy ID</th>
            <th>Name</th>
            <th>Employee Category ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((employ, index) => (
            <tr key={index}>
              <td>{employ.PK_SubCatID}</td>
              <td>{employ.Name}</td>
              <td>{employ.FK_HR_EmpCatID}</td>
              <td>
                <button
                  onClick={() => startEditSubEmploy(employ)}
                  className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteSubEmploy(employ.PK_SubCatID)}
                  className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SubEmploy;
