import axios from '../../utils/http';

export const fectSavedPosts = id => axios.get(`/api/saved-post/${id}/`);
export const fetchPostsApi = () => axios.get(`/api/post/`);

export const deletePostApi = id => axios.delete(`/api/post/${id}/`);
export const updateProfile = data => axios.patch(`/api/user-profile/${data.id}/`,data);
export const fetchProfile = userID => axios.get(`/api/user-profile?email=${userID}`);
