import axios from "../axios";
const getAllOrder = (page) => {
  return axios.get(`/admin/xem-tat-ca-Orderss/${page}`);
};
const getAllOrderBySeller = (page) => {
  return axios.get(`/seller/xem-tat-ca-Orderss/${page}`);
};
const deleteOrder = (OrderssId) => {
  return axios.delete(`/admin/xoa-Orderss/${OrderssId}`);
};
const deleteOrderBySeller = (OrderssId) => {
  return axios.delete(`/seller/xoa-Orderss/${OrderssId}`);
};

const getDetailOrderById = (orderssId) => {
  return axios.post(`/admin/tim-Orderssde/${orderssId}`);
};
const getDetailOrderBySeller = (orderId) => {
  return axios.post(`/seller/tim-Orderssde/${orderId}`);
};
const updateStatusOrder = (data) => {
  return axios.post("/admin/sua-orderss", data);
};
const updateStatusOrderBySeller = (data) => {
  return axios.post("/seller/sua-orderss", data);
};
const searchorderByAdmin = (keysearch) => {
  return axios.get(`/admin/tim-Orderss/${keysearch}`);
};
const searchorderBySeller = (keysearch) => {
  return axios.get(`/seller/tim-Orderss/${keysearch}`);
};

export {
  getAllOrder,
  getAllOrderBySeller,
  deleteOrder,
  deleteOrderBySeller,
  getDetailOrderById,
  updateStatusOrder,
  getDetailOrderBySeller,
  updateStatusOrderBySeller,
  searchorderByAdmin,
  searchorderBySeller,
};
