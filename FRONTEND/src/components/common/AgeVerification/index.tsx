import React, { useEffect, useState } from 'react';

const AgeVerification: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean>(() => {
    return localStorage.getItem('ageVerified') === 'true';
  });

  useEffect(() => {
    if (isVerified) {
      localStorage.setItem('ageVerified', 'true');
    }
  }, [isVerified]);

  const handleYesClick = () => {
    setIsVerified(true);
  };

  const handleNoClick = () => {
    alert('Você precisa ser maior de 18 anos para acessar este site.');
    window.location.href = 'https://www.google.com';
  };

  if (isVerified) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[90]">
      <div className="absolute inset-0 bg-black opacity-[88%]"></div>
      <div className="relative p-8 rounded-lg text-center">
        <h2 className="text-white text-3xl md:text-4xl mb-4 uppercase">
          Confirme sua idade
        </h2>
        <p className="text-white text-xl mb-4 font-semibold">Você tem mais de 18 anos?</p>
        <div className="flex justify-center gap-8 py-4">
          <button
            onClick={handleYesClick}
            className="px-4 py-2 w-24 font-semibold bg-gradient-to-r from-green-400 to-green-700 text-white rounded"
          >
            Sim
          </button>
          <button
            onClick={handleNoClick}
            className="px-4 py-2 w-24 font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white rounded"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification;
