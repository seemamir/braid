import axios from '../../utils/http';

export const fectSavedPosts = (payload, id) =>
  axios.get(`/api/saved-post/${id}/`, payload);

export const deletePostApi = (payload, id) =>
  axios.delete(`/api/post/${id}/`, payload);
