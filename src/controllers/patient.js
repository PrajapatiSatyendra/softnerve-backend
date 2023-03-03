const Patients = require('../models/patient');

exports.getPatients = async (req, res, next) => {
    try {
      const patients = await Patients.find();
      if (!patients) {
        throw new Error("Something went wrong.");
      }

      res
        .status(200)
        .json({ message: "Patients fetched successfully", data: patients });
    } catch (error) {
      next(error);
    }
    
};
exports.getPatientById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const patient = await Patients.findById(id);
    console.log(patient);
    if (!patient) {
      throw new Error("Something went wrong.");
    }

    res
      .status(200)
      .json({ message: "Patient fetched successfully", data: patient });
  } catch (error) {
    next(error);
  }
};

exports.addPatient = async (req, res, next) => { 
    try {
        const { name, email,phoneNumber, address, pinCode } = req.body;
        if (!(name && email && phoneNumber && address && pinCode)) {
          const error = new Error("Bad request.");
          error.statusCode = 400;
          throw error;
        }
        
         const post = new Patients({
           name,
           email,
           phoneNumber,
           address,
           pinCode,
         });
        const patient = await post.save();
        if (! patient) {
            throw new Error("Something went wrong.");
        } 
        res
          .status(201)
          .json({ message: "Patient added successfully", data: patient});
    } catch (error) {
        next(error);
    }
};

exports.updatePatient = async (req, res, next) => {
    try {
         const { patientId } = req.params;
         const { name, email, phoneNumber, address, pinCode } = req.body;

        if (!(name && email && phoneNumber && address && pinCode)) {
          const error = new Error("Bad request.");
          error.statusCode = 400;
          throw error;
        }
        
         const patient = await Patients.findById(patientId);
         if (!patient) {
           const error = new Error("Patient with this id does not exists.");
           error.statusCode = 404;
           throw error;
        }
        

         const updatedPatient = await Patients.findByIdAndUpdate(
           patientId,
           { name, email, phoneNumber, address, pinCode },
           { new: true }
         );
         if (!updatedPatient) {
           throw new Error("Something went wrong.");
         }

         res
           .status(201)
           .json({ message: "Updated successfully", data: updatedPatient });
    } catch (error) {
        next(error);
    }
 };

exports.deletePatient = async (req, res, next) => {
     try {
         const { patientId } = req.params;
       
         const patient = await Patients.findById(patientId);
         if (!patient) {
           const error = new Error("Patient with this id does not exists.");
           error.statusCode = 404;
           throw error;
        }
        

         const deletedPatient = await Patients.findByIdAndDelete(patientId);
         if (!deletedPatient) {
           throw new Error("Something went wrong.");
         }

        res
          .status(200)
          .json({ message: "Patient Deleted successfully" });
    } catch (error) {
        next(error);
    }
};

