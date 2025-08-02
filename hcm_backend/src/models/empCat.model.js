import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllEmpCategories = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_empcat`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getEmpCategoryById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_empcat WHERE PK_CatID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createEmpCategory = async (id, code, name, description, isActive) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_empcat (PK_CatID, Code, Name, Description, IsActive) VALUES (?, ?, ?, ?, ?)`, [id, code, name, description, isActive])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateEmpCategory = async (id, code, name, description, isActive) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_empcat SET Code = ?, Name = ?, Description = ?, IsActive = ? WHERE PK_CatID = ?`, [code, name, description, isActive, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteEmpCategory = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_empcat WHERE PK_CatID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllEmpCategories,
    getEmpCategoryById,
    createEmpCategory,
    updateEmpCategory,
    deleteEmpCategory
}