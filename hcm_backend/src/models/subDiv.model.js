import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllSubDivisions = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_subdivision`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getSubDivisionById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_subdivision WHERE PK_SubDivID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createSubDivision = async (id, divisionId, name, description) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_subdivision (PK_SubDivID, FK_HR_DivisionID, Name, Description) VALUES (?, ?, ?, ?)`, [id, divisionId, name, description])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateSubDivision = async (id, name, description) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_subdivision SET Name = ?, Description = ? WHERE PK_SubDivID = ?`, [name, description, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteSubDivision = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_subdivision WHERE PK_SubDivID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllSubDivisions,
    getSubDivisionById,
    createSubDivision,
    updateSubDivision,
    deleteSubDivision
}