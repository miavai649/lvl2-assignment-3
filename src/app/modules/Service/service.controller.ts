import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ServiceServices } from "./Service.service";

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
};
