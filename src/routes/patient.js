const router = require('express').Router();
const patientControllers = require('../controllers/patient');

router.get('/getPatients', patientControllers.getPatients);
router.get("/getPatientById/:id", patientControllers.getPatientById);
router.post('/addPatient', patientControllers.addPatient);
router.put('/updatePatient/:patientId', patientControllers.updatePatient);
router.delete('/deletePatient/:patientId', patientControllers.deletePatient);

module.exports = router;