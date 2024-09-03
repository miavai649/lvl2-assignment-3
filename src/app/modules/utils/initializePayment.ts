import axios from "axios";
import config from "../../config";
import CustomAppError from "../errors/CustomAppError";
import httpStatus from "http-status";
import { Types } from "mongoose";

export interface TransactionData {
  bookingId: Types.ObjectId;
  transactionId: string;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

// Todo: mush change the local change

export const initializePayment = async (payload: TransactionData) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: payload.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?status=success`,
      fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
      cancel_url: "https://cleancarz.vercel.app",
      amount: payload.price,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: payload.customerName,
      cus_email: payload.customerEmail,
      cus_add1: payload.customerAddress,
      cus_add2: payload.customerAddress,
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1206",
      cus_country: "Bangladesh",
      cus_phone: payload.customerPhone,
      type: "json",
    });
    return response.data;
  } catch (error) {
    throw new CustomAppError(httpStatus.BAD_GATEWAY, "Failed to pay");
  }
};
