import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/job.model.js"

const getAllJobs = asyncHandler( async (req, res) => {
    const result = await model.getAllJobs()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All job details fetched successfully")
    )
})

const getJobById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getJobById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Job details fetched successfully")
    )
})

const createJob = asyncHandler( async (req, res) => {
    const { id, title, description, createdDate, modifiedDate } = req.body
    const result = await model.createJob(id, title, description, createdDate, modifiedDate)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Job created successfully")
    )
})

const updateJob = asyncHandler( async (req, res) => {
    const { id, title, description, modifiedDate } = req.body
    const result = await model.updateJob(id, title, description, modifiedDate)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Job updated successfully")
    )
})

const deleteJob = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteJob(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Job deleted successfully")
    )
})

export {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
}