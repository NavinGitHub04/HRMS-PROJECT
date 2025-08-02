import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllDivision = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_division`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getDivisionById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_division WHERE PK_DivID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createDivision = async (id, companyId, name, description) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_division (PK_DivID, FK_HR_CompanyID, Name, Description) VALUES (?, ?, ?, ?)`, [id, companyId, name, description])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateDivision = async (id, name, description) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_division SET Name = ?, Description = ? WHERE PK_DivID = ?`, [name, description, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteDivision = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_division WHERE PK_DivID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllDivision,
    getDivisionById,
    createDivision,
    updateDivision,
    deleteDivision
}