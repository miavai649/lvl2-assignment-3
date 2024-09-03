import catchAsync from "../utils/catchAsync";
import { PaymentServices } from "./payment.service";

const confirmationController = catchAsync(async (req, res) => {
  const result = await PaymentServices.confirmationService(req.query);

  res.send(result);
});

export const paymentController = {
  confirmationController,
};
