import axios from 'axios';

const getAllOrders = async () => {
  const resp = await axios.get('/api/requests/getAll');
  return resp.data;
};

const updateStatus = async (id, status) => {
  const resp = await axios.patch(`/api/requests/${id}`, {
    status,
  });
  return resp.data;
};

const getUsersRequests = async (id) => {
  const resp = await axios.get(`/api/requests/${id}`);
  return resp.data;
};

export { getAllOrders, updateStatus, getUsersRequests };
