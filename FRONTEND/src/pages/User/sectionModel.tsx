import React from 'react';

const UserInfo: React.FC = () => {
  return (
    <section className="w-full">
      <div className="container px-4 mx-auto">
        <div className="py-6 h-full overflow-hidden">
          <div className="pb-6 border-b border-coolGray-100">
            <div className="flex flex-wrap items-center justify-between -m-2">
              <div className="w-full md:w-auto p-2">
                <h2 className="text-xl lg:text-2xl font-bold uppercase">
                  Titulo da seção
                </h2>
                <p className="text-xs text-coolGray-500 font-medium">
                  Subtitulo da seção
                </p>
              </div>
            </div>
          </div>
          Inserir o conteúdo do sessão aqui
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
