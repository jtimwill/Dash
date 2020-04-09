import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4001/api/conversation-handler';

export function callConversationHandler(name, current_service, new_service) {
  return axios.get(`/?name=${name}&current_service=${current_service}&new_service=${new_service}`);
};

export function getFirstState(name) {
  return axios.get(`/first-state/?name=${name}`);
};
