import { Router } from "express"
import {
    getAllEmpCategories,
    getEmpCategoryById,
    createEmpCategory,
    updateEmpCategory,
    deleteEmpCategory
} from '../controllers/empCat.controller.js'

const router = Router()

router.route('/select').get(getAllEmpCategories)
router.route('/select/:id').get(getEmpCategoryById)
router.route('/create').post(createEmpCategory)
router.route('/update').post(updateEmpCategory)
router.route('/delete/:id').get(deleteEmpCategory)

export default router