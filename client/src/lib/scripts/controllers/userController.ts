import api from "../config/axios";


// === GET routes === //

export const getUser = async () => {
  try {
    const auth = { withCredentials: true };
    await api.get('/api/account', auth);
  } catch (err) {
    console.error(err);
  }
};

export const getAllUsers = async () => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get('/api/account/all', auth);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
