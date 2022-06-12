import axios from "../axios";
const handleSignUp = (data) => {
  return axios.post("/dang-ky", data);
};
const handleLogin = (data) => {
  return axios.post("/dang-nhap", data);
};
const getUserInfor = () => {
  return axios.get("/xem-tai-khoan");
};

const editUserInfor = (data) => {
  return axios.post(`/sua-thong-tin/`, data);
};

const getAllUser = (currentPage) => {
  return axios.get(`/admin/xem-tat-ca-user/${currentPage}`);
};

const getAllUserByLibrarian = (currentPage) => {
  return axios.get(`/seller/xem-tat-ca-user/${currentPage}`);
};
const deleteUser = (userId) => {
  return axios.delete(`/admin/xoa-user/${userId}`);
};
const deleteUserByLibrarian = (userId) => {
  return axios.delete(`/librarian/xoa-user/${userId}`);
};
const changePassword = (data) => {
  return axios.post(`user/sua-mat-khau`, data);
};
const changeAvatar = (data) => {
  //console.log(image);
  return axios.post("/user/cap-nhat-anh", data);
};
const forgotPassword = (data) => {
  console.log(data);
  return axios.post("/quen-mat-khau", data);
};
const buyBooks = (data) => {
  return axios.post("/user/mua-sach", data);
};
const updateUserRoleByAdmin = (data, userId) => {
  return axios.post(`admin/${userId}`, data);
};
const confirmChangeNewPassword = (token, data) => {
  return axios.post(`/cai-dat-mat-khau-moi/${token}`, data);
};

export {
  handleSignUp,
  handleLogin,
  getUserInfor,
  editUserInfor,
  getAllUser,
  deleteUser,
  changePassword,
  changeAvatar,
  forgotPassword,
  getAllUserByLibrarian,
  deleteUserByLibrarian,
  buyBooks,
  updateUserRoleByAdmin,
  confirmChangeNewPassword,
};
