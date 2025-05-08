import doctorModel from "../models/doctorsModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res
      .status(200)
      .json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    if (!doctors.length) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No doctors found" });
    }
    res.json({ success: true, data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { changeAvailability, doctorList };
