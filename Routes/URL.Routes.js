const express = require("express");
const {
  createSortUrl,
  redirectToUrl,
  urlAlalytics,
} = require("../Controllers/URL_controller");
const router = express.Router();

router.post("/create/sort/url", createSortUrl);
router.get("/redirect/url/:id", redirectToUrl);
router.get("/get/analytics/:id", urlAlalytics);

module.exports = router;
