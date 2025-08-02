import { Router } from "express"
import {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
} from '../controllers/company.controller.js'

const router = Router()

router.route('/select').get(getAllCompanies)
router.route('/select/:id').get(getCompanyById)
router.route('/create').post(createCompany)
router.route('/update').post(updateCompany)
router.route('/delete/:id').get(deleteCompany)

export default router