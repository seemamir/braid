import axios from '../../utils/http';

export const viewPostApi = id => axios.get(`/api/post/${id}/`);
export const updatePostApi = (id, payload) =>
  axios.post(`/api/post/${id}/`, payload);
export const comment = data => axios.post(`/api/comment/`, data);
