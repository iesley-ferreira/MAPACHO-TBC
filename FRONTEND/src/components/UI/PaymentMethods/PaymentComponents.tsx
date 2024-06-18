import QRCode from 'qrcode.react';
import React, { useState } from 'react';
// import { PayPalButton } from 'react-paypal-button-v2';

// const PayPalGateway: React.FC = () => (
//   <div className="mt-4">
//     <PayPalButton
//       amount="0.01"
//       // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
//       onSuccess={(details, data) => {
//         alert('Transaction completed by ' + details.payer.name.given_name);

//         // OPTIONAL: Call your server to save the transaction
//         return fetch('/paypal-transaction-complete', {
//           method: 'post',
//           body: JSON.stringify({
//             orderId: data.orderID,
//           }),
//         });
//       }}
//       options={{
//         clientId: 'PRODUCTION_CLIENT_ID',
//       }}
//     />
//   </div>
// );

const PixQRCode: React.FC = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  const generateQRCode = () => {
    setShowQRCode(true);
  };

  return (
    <div className="mt-4 flex w-full justify-center">
      {showQRCode ? (
        <QRCode value="Generated QR Code Value" size={256} />
      ) : (
        <button
          onClick={generateQRCode}
          className="px-4 py-2 text-sm text-white font-heading uppercase bg-gray-800 hover:bg-gray-700 rounded-md"
        >
          Gerar QR code
        </button>
      )}
    </div>
  );
};

export { PixQRCode };
