import axios from '../../utils/http';

export const fetchPosts = () => axios.get('api/post/');
