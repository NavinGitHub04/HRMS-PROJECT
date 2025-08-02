import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllEmpSubCategories = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_empsubcat`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getEmpSubCategoryById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_empsubcat WHERE PK_SubCatID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createEmpSubCategory = async (id, empCatId, name, description) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_empsubcat (PK_SubCatID, FK_HR_EmpCatID, Name, Description) VALUES (?, ?, ?, ?)`, [id, empCatId, name, description])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateEmpSubCategory = async (id, name, description) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_empsubcat SET Name = ?, Description = ? WHERE PK_SubCatID = ?`, [name, description, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteEmpSubCategory = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_empsubcat WHERE PK_SubCatID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllEmpSubCategories,
    getEmpSubCategoryById,
    createEmpSubCategory,
    updateEmpSubCategory,
    deleteEmpSubCategory
}