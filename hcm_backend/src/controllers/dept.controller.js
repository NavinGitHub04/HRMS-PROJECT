import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/dept.model.js"


const getAllDepartments = asyncHandler( async (req, res) => {
    const result = await model.getAllDepartments()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All department details fetched successfully")
    )
})

const getDepartmentById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getDepartmentById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Department details fetched successfully")
    )
})

const createDepartment = asyncHandler( async (req, res) => {
    const { id, name, code, deptId, description, isActive } = req.body
    const result = await model.createDepartment(id, name, code, deptId, description, isActive)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Department created successfully")
    )
})

const updateDepartment = asyncHandler( async (req, res) => {
    const { id, name, code, description, isActive } = req.body
    const result = await model.updateDepartment(id, name, code, description, isActive)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Department updated successfully")
    )
})

const deleteDepartment = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteDepartment(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Department deleted successfully")
    )
})

export {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
}