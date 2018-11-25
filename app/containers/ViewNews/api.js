import axios from '../../utils/http';

export const viewPostApi = (payload, id) =>
  axios.post(`/api/post/${id}/`, payload, id);
