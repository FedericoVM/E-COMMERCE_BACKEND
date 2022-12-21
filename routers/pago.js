const express = require("express");
const paymentController = require("../controllers/pagoController");
const router = express.Router();

router.post('/pagos', paymentController.checkout);

module.exports = router