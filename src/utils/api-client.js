import { QueryCache } from '@tanstack/react-query';
import * as auth from '../provider-auth';

async function client(endpoint, { data, headers: customHeaders, ...customConfig } = {}) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefinedclient,
    headers: {
      Authorization: undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },
    ...customConfig
  };
  const queryCache = new QueryCache();
  return window
    .fetch(`${import.meta.env.VITE_REACT_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        queryCache.clear();
        await auth.logout();
        // refresh the page for them
        window.location.assign(window.location);
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}
// ses une api en mode déconecter pour l'utiliser faire client() ..... si on pose des data en body c'est en post sinon ses en get il faut bien la comprendre je l'ai utiliser pour l'authentification vous pouvez toujours la changer pour permetre l'utilisation de put ou delite mais je ne crois pas qu'il soit nessaisaire de la modifier
export { client };
