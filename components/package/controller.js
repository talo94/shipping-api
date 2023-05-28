const { socket } = require("../../socket");
const store = require("./store");

const EnumStatus = {
  ADDED: "En sucursal",
  IN_WAREHOUSE: "En bodega",
  IN_ROUTE: "En ruta",
  DELIVERED: "Entregado",
};

const DEFAULT_LOCATION = {
  lat: 19.429995,
  lng: -99.215664,
};

const addPackage = (package) => {
  return new Promise(async (resolve, reject) => {
    if (
      !package.guideNumber ||
      !package.origin ||
      !package.destination ||
      !package.weight
    ) {
      return reject("Los datos son incorrectos");
    }

    const newPackage = {
      guideNumber: package.guideNumber,
      origin: package.origin,
      destination: package.destination,
      weight: package.weight,
      date: new Date(),
      statusList: [
        {
          type: EnumStatus.ADDED,
          date: new Date(),
          location: {
            lat: statusList.lat || DEFAULT_LOCATION.lat,
            lng: statusList.lng || DEFAULT_LOCATION.lng,
          },
        },
      ],
    };
    store
      .addPackage(newPackage)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getAllPackages = () => {
  return new Promise((resolve, reject) => {
    resolve(store.getAllPackages());
  });
};

const getByGuideNumber = (guideNumber) => {
  return new Promise((resolve, reject) => {
    resolve(store.getByGuideNumber(guideNumber));
  });
};

const updateStatus = (guideNumber, status) => {
  return new Promise(async (resolve, reject) => {
    if (!guideNumber || !status.lat || !status.lng || !status.type) {
      return reject("Los datos son incorrectos");
    }
    const newStatus = {
      type: status.type,
      date: new Date(),
      location: {
        lat: status.lat,
        lng: status.lng,
      },
    };

    store
      .updateStatus(guideNumber, newStatus)
      .then((response) => {
        socket.io.emit(`newStatus-${guideNumber}`, response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deletePackage = (guideNumber) => {
  return new Promise((resolve, reject) => {
    if (!guideNumber) {
      return reject("Los datos son incorrectos");
    }
    store
      .deletePackage(guideNumber)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  addPackage,
  getAllPackages,
  updateStatus,
  getByGuideNumber,
  deletePackage,
};
