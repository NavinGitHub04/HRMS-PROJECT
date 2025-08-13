import React, { useEffect, useState } from 'react';
import axios from 'axios'; Position

function Position() {
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newPosition, setNewPosition] = useState({
        PK_PositionID: '',
        FK_HR_JobID: '',
        FK_HR_OrgUnitID: '',
        Title: '',
        CreatedDate: '',
        ModifiedDate: '',
    });
    const [editPositionId, setEditPositionId] = useState(null);

    useEffect(() => {
        fetchPosition();
    }, []);

    const fetchPosition = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get('/api/v1/position/select');
            setProduct(response.data.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    const deletePosition = async (id) => {
        try {
            await axios.get(`/api/v1/position/delete/${id}`);
            fetchPosition();
        } catch (error) {
            console.error('Error deleting Position:', error.response?.data || error.message);
        }
    };

    const handleInputChange = (e) => {
        setNewPosition({
            ...newPosition,
            [e.target.name]: e.target.value,
        });
    };

    const startEditPosition = (Position) => {
        setEditPositionId(Position.PK_PositionID);
        setNewPosition({
            id: Position.PK_PositionID,
            jobId: Position.FK_HR_JobID,
            orgUnitId: Position.FK_HR_OrgUnitID,
            title: Position.Title,
            createdDate: Position.CreatedDate,
            modifiedDate: Position.ModifiedDate,

        });
    };

    const addPosition = async () => {
        if (!newPosition.PK_PositionID || !newPosition.FK_HR_OrgUnitID) {
            alert('Please fill in at least Position ID and FK_HR_OrgUnitID');
            return;
        }
        try {
            await axios.post('api/v1/position/create', {
                id: Number(newPosition.PK_PositionID),
                jobId: Number(newPosition.FK_HR_JobID),
                orgUnitId: Number(newPosition.FK_HR_OrgUnitID),
                title: newPosition.Title,
                createdDate: new Date().toISOString(),
                modifiedDate: new Date().toISOString(),
            });
            setNewPosition({ id: '', jobId: '', orgUnitId: '', title: '', createdDate: '', modifiedDate: '' });
            fetchPosition();
        } catch (error) {
            console.error('Error adding Position:', error.response?.data || error.message);
        }
    };

    const updatePosition = async () => {
        if (!newPosition.PK_PositionID) {
            alert('No Position selected for update!');
            return;
        }
        try {
            await axios.post('api/v1/position/update', {
                id: Number(newPosition.PK_PositionID),
                jobId: Number(newPosition.FK_HR_OrgUnitID),
                orgUnitId: Number(newPosition.FK_HR_JobID),
                title: newPosition.Title,
                createdDate: newPosition.CreatedDate,
                modifiedDate: new Date().toISOString(),
            });
            setNewPosition({ id: '', jobId: '', orgUnitId: '', title: '', createdDate: '', modifiedDate: '' });
            setEditPositionId(null);
            fetchPosition();
        } catch (error) {
            console.error('Error updating Position:', error.response?.data || error.message);
        }
    };

    if (error) return <h1>Something went wrong</h1>;
    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            <div className='m-4'>
                <h3>{editPositionId ? 'Edit Position' : 'Add New Position'}</h3>
                <input
                    type="text"
                    name="PK_PositionID"
                    placeholder="Enter Position ID"
                    value={newPosition.PK_PositionID}
                    onChange={handleInputChange}
                    disabled={!!editPositionId}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="text"
                    name="FK_HR_OrgUnitID"
                    placeholder="Enter Position FK_HR_OrgUnitID"
                    value={newPosition.FK_HR_OrgUnitID}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="text"
                    name="FK_HR_JobID"
                    placeholder="Enter Company ID"
                    value={newPosition.FK_HR_JobID}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="text"
                    name="Title"
                    placeholder="Enter Title"
                    value={newPosition.Title}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="date"
                    name="CreatedDate"
                    placeholder="Enter CreatedDate"
                    value={newPosition.CreatedDate}
                    disabled={!!editPositionId}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
                />
                <input
                    type="date"
                    name="ModifiedDate"
                    placeholder="Enter ModifiedDate"
                    value={newPosition.ModifiedDate}
                    onChange={handleInputChange}
                    className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
                />

                {editPositionId ? (
                    <>
                        <button
                            onClick={updatePosition}
                            className="mr-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                        >
                            Update Position
                        </button>
                        <button
                            onClick={() => {
                                setEditPositionId(null);
                                setNewPosition({ PK_PositionID: '', FK_HR_JobID: '', FK_HR_OrgUnitID: '', Title: '', CreatedDate: '', ModifiedDate: '' });
                            }}
                            className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={addPosition}
                        className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                    >
                        Add Position
                    </button>
                )}
            </div>

            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead className='text-left'>
                    <tr>
                        <th colSpan="5">Position List: {product.length}</th>
                    </tr>
                    <tr>
                        <th>Position ID</th>
                        <th>OrgUnitID</th>
                        <th>Company ID</th>
                        <th>title</th>
                        <th>CreatedDate</th>
                        <th>modifiedDate</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((Position, index) => (
                        <tr key={index}>
                            <td>{Position.PK_PositionID}</td>
                            <td>{Position.FK_HR_JobID}</td>
                            <td>{Position.FK_HR_OrgUnitID}</td>
                            <td>{Position.Title}</td>
                            <td>{Position.CreatedDate}</td>
                            <td>{Position.ModifiedDate}</td>
                            <td>
                                <button
                                    onClick={() => startEditPosition(Position)}
                                    className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => deletePosition(Position.PK_PositionID)}
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

export default Position;
