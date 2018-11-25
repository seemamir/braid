import axios from '../../utils/http';

export const viewPostApi = id => axios.get(`/api/post/${id}/`);
// export const comment = (data) => axios.post(`/api/comment/`);
export const comment = data => axios.post(`/api/comment/`, data);
