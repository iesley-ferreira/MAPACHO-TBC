import React from 'react';

const NotFound: React.FC = () => {
  return (
    <section className="py-24 lg:py-40 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto text-center">
          <img className="block mx-auto mb-10" src="/public/assets/404.png" alt="" />
          <h4 className="text-4xl font-bold mb-4">Oops. Essa página não existe.</h4>
          <p className="text-xl text-gray-500 mb-10">
            Algo deu errado, esta página está quebrada.
          </p>
          <a
            className="inline-block text-base font-bold text-yellowGreen-700 hover:text-yellowGreen-600"
            href="/home"
          >
            Voltar para Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
