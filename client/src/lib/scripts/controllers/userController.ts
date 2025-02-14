import api from "../config/axios";


// === GET routes === //

export const getUser = async () => {
  try {
    const auth = { withCredentials: true };
    await api.get('/api/users', auth);
  } catch (err) {
    console.error(err);
  }
};

export const getAllUsers = async () => {
  try {
    const auth = { withCredentials: true };
    const res = await api.get('/api/users/all', auth);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// === POST routes === //

export const loginUser = async (loginInfo: { username: string, password: string }) => {
  try {
    const auth = { withCredentials: true };
    await api.post('/api/users/login', loginInfo, auth);
  } catch (err) {
    console.error(err);
  }
};
