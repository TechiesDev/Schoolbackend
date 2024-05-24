const schoolData = require("../model/SchoolModel");
const crypto = require("crypto");

const schoolCreate = async (req, res) => {
  try {
    const {school_name,type,email,website,phone,state,district,city,address,zip,logo,status} = req.body;
    const schoolid = crypto.randomInt(100000, 999999);

    const school = await schoolData.create({
      schoolid,
      school_name,
      type,
      email,
      website,
      phone,
      state,
      district,
      city,
      address,
      zip,
      logo,
      status,
    });
    res.status(201).json({ school, message: res.__("create.created_success") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {schoolCreate};