require("dotenv").config();
const db = require("mongoose");
const Model = require("./model");
db.Promise = global.Promise;
db.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.09cprqs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("[db] Conectada con éxito"))
  .catch((error) => console.log("[db] Error al conectar", error));

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
