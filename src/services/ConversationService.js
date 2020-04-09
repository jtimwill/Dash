import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL  || 'https://peaceful-tor-53707.herokuapp.com';

export function callConversationHandler(name, current_service, new_service) {
  return axios.get(`/api/conversation-handler/?name=${name}&current_service=${current_service}&new_service=${new_service}`);
};

export function getFirstState(name) {
  return axios.get(`/api/conversation-handler/first-state/?name=${name}`);
};
