import axios from '../../utils/http';

export const fetchProfile = userID =>
  axios.get(`/api/user-profile?user=${userID}`);
export const fetchUser = email => axios.get(`/api/user?email=${email}`);
<<<<<<< HEAD
export const createProfile = data => axios.post(`/api/user-profile/`, data);
export const updateProfile = data => axios.patch(`/api/user-profile/`, data);
=======
export const createProfile = data => axios.post(`/api/user-profile`, data);
export const updateProfile = data => axios.patch(`/api/user-profile`, data);
>>>>>>> 5b3234d321a11afd9783827c7030a0ce56ce750d
