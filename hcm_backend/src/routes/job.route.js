import { Router } from "express"
import {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
} from '../controllers/job.controller.js'

const router = Router()

router.route('/select').get(getAllJobs)
router.route('/select/:id').get(getJobById)
router.route('/create').post(createJob)
router.route('/update').post(updateJob)
router.route('/delete/:id').get(deleteJob)

export default router