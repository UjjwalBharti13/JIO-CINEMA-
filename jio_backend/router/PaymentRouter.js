import express from "express";


const PaymentRouter = express.Router();

import  {
      getPaymentController,
      updatePremiumAccessController,
}  from "../controller/PaymentController.js";


PaymentRouter.post("/order",getPaymentController);
PaymentRouter.post("/update-premium-access",updatePremiumAccessController);

export default PaymentRouter;


