import React, { useEffect, useState } from 'react';
import axios from 'axios';

function formatDateForMySQL(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 
            ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function OrgUnit() {
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [newOrgUnit, setNewOrgUnit] = useState({
        id: '',
        parentUnitid: '',
        name: '',
        createdDate: '',
        modifiedDate: '',
    });

    const [editOrgUnitid, setEditOrgUnitid] = useState(null);

    useEffect(() => {
        fetchOrgUnit();
    }, []);

    const fetchOrgUnit = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get('/api/v1/orgUnit/select');
            setProduct(response.data.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    const deleteOrgUnit = async (id) => {
        try {
            await axios.get(`/api/v1/orgUnit/delete/${id}`);
            fetchOrgUnit();
        } catch (error) {
            console.error('Error deleting OrgUnit:', error.response?.data || error.message);
        }
    };

    const handleInputChange = (e) => {
        setNewOrgUnit({
            ...newOrgUnit,
            [e.target.name]: e.target.value
        });
    };

    const startEditOrgUnit = (OrgUnit) => {
        setEditOrgUnitid(OrgUnit.PK_OrgUnitID);
        setNewOrgUnit({
            id: OrgUnit.PK_OrgUnitID,
            parentUnitid: OrgUnit.ParentUnitID,
            name: OrgUnit.Name,
            createdDate: OrgUnit.CreatedDate ? OrgUnit.CreatedDate.slice(0, 10) : '',
            modifiedDate: OrgUnit.ModifiedDate ? OrgUnit.ModifiedDate.slice(0, 10) : '',
        });
    };

    const addOrgUnit = async () => {
        if (!newOrgUnit.id || !newOrgUnit.parentUnitid) {
            alert('Please fill in at least id and parentUnitid');
            return;
        }
        try {
            await axios.post('/api/v1/orgUnit/create', {
                id: Number(newOrgUnit.id),
                parentUnitId: Number(newOrgUnit.parentUnitid),
                name: newOrgUnit.name,
                createdDate: formatDateForMySQL(newOrgUnit.createdDate) || formatDateForMySQL(new Date()),
                modifiedDate: formatDateForMySQL(newOrgUnit.modifiedDate) || formatDateForMySQL(new Date()),
            });
            setNewOrgUnit({ id: '', parentUnitid: '', name: '', createdDate: '', modifiedDate: '' });
            fetchOrgUnit();
        } catch (error) {
            console.error('Error adding OrgUnit:', error.response?.data || error.message);
        }
    };

    const updateOrgUnit = async () => {
        if (!newOrgUnit.id) {
            alert('No OrgUnit selected for update!');
            return;
        }
        try {
            await axios.post('/api/v1/orgUnit/update', {
                id: Number(newOrgUnit.id),
                parentUnitid: Number(newOrgUnit.parentUnitid),
                name: newOrgUnit.name,
                createdDate: formatDateForMySQL(newOrgUnit.createdDate),
                modifiedDate: formatDateForMySQL(newOrgUnit.modifiedDate) || formatDateForMySQL(new Date()),
            });
            setNewOrgUnit({ id: '', parentUnitid: '', name: '', createdDate: '', modifiedDate: '' });
            setEditOrgUnitid(null);
            fetchOrgUnit();
        } catch (error) {
            console.error('Error updating OrgUnit:', error.response?.data || error.message);
        }
    };

    if (error) return <h1>Something went wrong</h1>;
    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            <div className='m-4'>
                <h3>{editOrgUnitid ? 'Edit OrgUnit' : 'Add New OrgUnit'}</h3>
                <input
                    type="text"
                    name="id"
                    placeholder="Enter OrgUnit id"
                    value={newOrgUnit.id}
                    onChange={handleInputChange}
                    disabled={!!editOrgUnitid}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
                     bg-white bg-opacity-70 border-none border-r-4
                    border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
                    focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="text"
                    name="parentUnitid"
                    placeholder="Enter OrgUnit parentUnitid"
                    value={newOrgUnit.parentUnitid}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
                    bg-white bg-opacity-70 border-none border-r-4
                    border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
                    focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={newOrgUnit.name}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
                     bg-white bg-opacity-70 border-none border-r-4
                    border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
                    focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="date"
                    name="createdDate"
                    placeholder="Enter createdDate"
                    value={newOrgUnit.createdDate}
                    disabled={!!editOrgUnitid}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
                     bg-white bg-opacity-70 border-none border-r-4
                    border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
                    focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="date"
                    name="modifiedDate"
                    placeholder="Enter modifiedDate"
                    value={newOrgUnit.modifiedDate}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
                     bg-white bg-opacity-70 border-none border-r-4
                    border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
                    focus:ring-blue-400 transition duration-200'
                />
                {editOrgUnitid ? (
                    <>
                        <button onClick={updateOrgUnit}
                            className='mr-2 bg-slate-500 hover:bg-slate-400 text-white 
                            font-semibold 
                            pr-2 py-2 px-2 rounded shadow-md'>
                            Update OrgUnit
                        </button>
                        <button
                            onClick={() => {
                                setEditOrgUnitid(null);
                                setNewOrgUnit({ id: '', parentUnitid: '', name: '', createdDate: '', modifiedDate: '' });

                            }}
                            className='bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md'

                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button onClick={addOrgUnit}
                        className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
                        pr-2 py-2 px-2 rounded shadow-md'>Add OrgUnit</button>
                )}
            </div>

            <table border="1" cellPadding="10" className="border border-collapse w-full">
                <thead className='aline-left'>
                    <tr>
                        <th colSpan="6">OrgUnit List: {product.length}</th>
                    </tr>
                    <tr>
                        <th>OrgUnit id</th>
                        <th>parentUnitid</th>
                        <th>name</th>
                        <th>createdDate</th>
                        <th>modifiedDate</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((OrgUnit, index) => (
                        <tr key={index}>
                            <td>{OrgUnit.PK_OrgUnitID}</td>
                            <td>{OrgUnit.ParentUnitID}</td>
                            <td>{OrgUnit.Name}</td>
                            <td>{OrgUnit.CreatedDate}</td>
                            <td>{OrgUnit.ModifiedDate}</td>
                            <td>
                                <button onClick={() => startEditOrgUnit(OrgUnit)}
                                    className='bg-slate-500 hover:bg-slate-400 text-white 
                                    font-semibold 
                                     pr-2 py-2 px-2 rounded shadow-md'>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => deleteOrgUnit(OrgUnit.PK_OrgUnitID)}
                                    className='bg-slate-500 hover:bg-slate-400 text-white 
                                    font-semibold pr-2 py-2 px-2 rounded shadow-md'>
                                    Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default OrgUnit;
