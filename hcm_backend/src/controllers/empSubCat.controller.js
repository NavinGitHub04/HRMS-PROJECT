import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/empSubCat.model.js"

const getAllEmpSubCategories = asyncHandler( async (req, res) => {
    const result = await model.getAllEmpSubCategories()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All employee sub-category details fetched successfully")
    )
})

const getEmpSubCategoryById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getEmpSubCategoryById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee sub-category details fetched successfully")
    )
})

const createEmpSubCategory = asyncHandler( async (req, res) => {
    const { id, empCatId, name, description } = req.body
    const result = await model.createEmpSubCategory(id, empCatId, name, description)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee sub-category created successfully")
    )
})

const updateEmpSubCategory = asyncHandler( async (req, res) => {
    const { id, name, description } = req.body
    const result = await model.updateEmpSubCategory(id, name, description)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee sub-category updated successfully")
    )
})

const deleteEmpSubCategory = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteEmpSubCategory(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Employee sub-category deleted successfully")
    )
})

export {
    getAllEmpSubCategories,
    getEmpSubCategoryById,
    createEmpSubCategory,
    updateEmpSubCategory,
    deleteEmpSubCategory
}