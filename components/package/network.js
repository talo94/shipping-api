const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", (req, res) => {
  controller
    .getAllPackages()
    .then((response) => {
      res.status(200).send({ data: response });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.get("/:guideNumber", (req, res) => {
  const guideNumber = req.params.guideNumber || "";
  controller
    .getByGuideNumber(guideNumber)
    .then((response) => {
      res.status(200).send({ data: response });
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
});

router.post("/", (req, res) => {
  const newPackage = req.body;
  controller
    .addPackage(newPackage)
    .then((response) => {
      res.status(201).send({ data: response });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

router.patch("/:guideNumber", (req, res) => {
  controller
    .updateStatus(req.params.guideNumber, req.body)
    .then((response) => {
      res.status(200).send({ data: response });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.delete("/:guideNumber", (req, res) => {
  const guideNumber = req.params.guideNumber;
  controller
    .deletePackage(guideNumber)
    .then(() => {
      res.status(200).send({ data: "Usuario eliminado" });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

module.exports = router;
