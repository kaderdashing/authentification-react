import * as api from './apiWithToken';
// import React, { useState } from 'react';

import { client } from './api-client';
function getUser() {
  return api.GET('users');
}
// ici j'appel la route check-account
// const getCustomerId = async (data) => {
//   try {
//     const response = await client('check-account', { data });
//     return response;
//   } catch (error) {
//     console.error('Error fetching customer ID:', error);
//     throw error;
//   }
// };

//idée je vais changer le nom de debouncedValue et on va voir
const getCustomerInfo = async (cusID) => {
  let parsedMessage;

  try {
    // console.log({ cusID: cusID });
    const response = await fetch(
      'https://cadcentraldtpilot01.epicorsaas.com/SaaS511Pilot/api/v2/efx/157541/PortalPublic/GetCustomerInfo',
      {
        method: 'POST',
        headers: {
          'x-api-key': 'bZ9LNk3CiPj8O4pZfFEaSh2LFOJLBSsiLvkuX03BCqQdd',
          Authorization: 'Basic d2VidXNlcjpteVBhc3MyMDIxIQ==',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Custid: cusID })
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    parsedMessage = data?.oMessage;
  } catch (error) {
    console.error('Error fetching customer info:', error);
  }
  return parsedMessage;
};

export { getUser, getCustomerInfo };
