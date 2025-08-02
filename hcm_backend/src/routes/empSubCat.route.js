import { Router } from "express"
import {
    getAllEmpSubCategories,
    getEmpSubCategoryById,
    createEmpSubCategory,
    updateEmpSubCategory,
    deleteEmpSubCategory
} from '../controllers/empSubCat.controller.js'

const router = Router()

router.route('/select').get(getAllEmpSubCategories)
router.route('/select/:id').get(getEmpSubCategoryById)
router.route('/create').post(createEmpSubCategory)
router.route('/update').post(updateEmpSubCategory)
router.route('/delete/:id').get(deleteEmpSubCategory)

export default router