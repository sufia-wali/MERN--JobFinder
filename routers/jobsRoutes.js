const express = require('express')
const router = new express.Router()

const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats
} = require('../controllers/jobsController.js')

router.post('/', createJob)
router.get('/', getAllJobs)
router.get('/stats', showStats)
router.delete('/:id', deleteJob)
router.patch('/:id', updateJob)

module.exports = router