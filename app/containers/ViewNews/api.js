import axios from '../../utils/http';

export const viewPostApi = id => axios.get(`/api/post/${id}/`);
