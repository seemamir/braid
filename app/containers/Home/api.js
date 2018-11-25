import axios from '../../utils/http';

export const fetchPosts = () => axios.get('api/post/');
export const fetchUser = (email) => axios.get(`api/user/?email=${email}`);
