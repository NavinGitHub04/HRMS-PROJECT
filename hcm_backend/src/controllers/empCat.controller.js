import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/empCat.model.js"

const getAllEmpCategories = asyncHandler( async (req, res) => {
    const result = await model.getAllEmpCategories()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All employee category details fetched successfully")
    )
})

const getEmpCategoryById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getEmpCategoryById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee category details fetched successfully")
    )
})

const createEmpCategory = asyncHandler( async (req, res) => {
    const { id, code, name, description, isActive } = req.body
    const result = await model.createEmpCategory(id, code, name, description, isActive)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee category created successfully")
    )
})

const updateEmpCategory = asyncHandler( async (req, res) => {
    const { id, code, name, description, isActive } = req.body
    const result = await model.updateEmpCategory(id, code, name, description, isActive)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee category updated successfully")
    )
})

const deleteEmpCategory = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteEmpCategory(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee category deleted successfully")
    )
})

export {
    getAllEmpCategories,
    getEmpCategoryById,
    createEmpCategory,
    updateEmpCategory,
    deleteEmpCategory
}