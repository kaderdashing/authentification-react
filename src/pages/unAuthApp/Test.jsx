import React, { useState } from 'react';

const CustomerInfo = () => {
  const [customerInfo, setCustomerInfo] = useState(null);

  const getCustomerInfo = async () => {
    try {
      const response = await fetch(
        'https://cadcentraldtpilot01.epicorsaas.com/SaaS511Pilot/api/v2/efx/157541/PortalPublic/GetCustomerInfo',
        {
          method: 'POST',
          headers: {
            'x-api-key': 'bZ9LNk3CiPj8O4pZfFEaSh2LFOJLBSsiLvkuX03BCqQdd',
            Authorization: 'Basic d2VidXNlcjpteVBhc3MyMDIxIQ==',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ Custid: 'ERI100' })
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const parsedMessage = parseMessage(data.oMessage);
      setCustomerInfo(parsedMessage);
    } catch (error) {
      console.error('Error fetching customer info:', error);
    }
  };

  const parseMessage = (message) => {
    const lines = message.split('\n');
    const result = {};
    lines.forEach((line) => {
      const [key, value] = line.split(': ');
      result[key] = value;
    });
    return result;
  };

  return (
    <div>
      <button onClick={getCustomerInfo}>Get Customer Info</button>
      {customerInfo && (
        <div>
          <h2>Customer Info</h2>
          <table>
            <tbody>
              {Object.entries(customerInfo).map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <strong>{key}</strong>
                  </td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerInfo;
