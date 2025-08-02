import { Router } from "express"
import {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from '../controllers/dept.controller.js'

const router = Router()

router.route('/select').get(getAllDepartments)
router.route('/select/:id').get(getDepartmentById)
router.route('/create').post(createDepartment)
router.route('/update').post(updateDepartment)
router.route('/delete/:id').get(deleteDepartment)

export default router