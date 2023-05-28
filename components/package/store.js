const Model = require("./model");

const getAllPackages = async () => {
  const packages = await Model.find();
  return packages;
};
const addPackage = (package) => {
  const myPackage = new Model(package);
  return myPackage.save();
};

const getByGuideNumber = async (guideNumber) => {
  const package = await Model.find({ guideNumber });
  return package;
};

const deletePackage = (guideNumber) => {
  return Model.deleteOne({ guideNumber });
};

const updateStatus = async (guideNumber, newStatus) => {
  const package = await Model.findOne({ guideNumber: guideNumber });
  package.statusList.push(newStatus);

  return package.save();
};

module.exports = {
  addPackage,
  getAllPackages,
  deletePackage,
  updateStatus,
  getByGuideNumber,
};
