import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/orgUnit.model.js"

const getAllOrgUnits = asyncHandler( async (req, res) => {
    const result = await model.getAllOrgUnits()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All org. unit details fetched successfully")
    )
})

const getOrgUnitById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getOrgUnitById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Org. unit details fetched successfully")
    )
})

const createOrgUnit = asyncHandler( async (req, res) => {
    const { id, parentUnitId, name, description, validFrom, validTo, createdDate, modifiedDate } = req.body
    const result = await model.createOrgUnit(id, parentUnitId, name, description, validFrom, validTo, createdDate, modifiedDate)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Org. Unit created successfully")
    )
})

const updateOrgUnit = asyncHandler( async (req, res) => {
    const { id, name, description, validFrom, validTo, modifiedDate } = req.body
    const result = await model.updateOrgUnit(id, name, description, validFrom, validTo, modifiedDate)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Org. Unit updated successfully")
    )
})

const deleteOrgUnit = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteOrgUnit(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Org. Unit deleted successfully")
    )
})

export {
    getAllOrgUnits,
    getOrgUnitById,
    createOrgUnit,
    updateOrgUnit,
    deleteOrgUnit
}