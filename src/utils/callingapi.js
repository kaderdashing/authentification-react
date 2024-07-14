import * as api from './apiWithToken';
import { client } from './api-client';
function getUser() {
  return api.GET('users');
}
// ici j'appel la route check-account
const getCustomerId = async (data) => {
  try {
    const response = await client('check-account', { data });
    return response;
  } catch (error) {
    console.error('Error fetching customer ID:', error);
    throw error;
  }
};
export { getUser, getCustomerId };
