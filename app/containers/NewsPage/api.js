import axios from '../../utils/http';

export const fectSavedPosts = id => axios.get(`/api/saved-post/${id}/`);
export const fetchPostsApi = () => axios.get(`/api/post/`);

export const deletePostApi = id => axios.delete(`/api/post/${id}/`);
