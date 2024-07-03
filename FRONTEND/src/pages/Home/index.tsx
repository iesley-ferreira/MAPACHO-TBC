import React from 'react';
import BannerCarousel from '../../components/Layout/BannerCarousel';
import BrandsCarousel from '../../components/UI/BrandsCarousel';

const Home: React.FC = () => {
  return (
    <div>
      <section className="pt-12 md:pt-16 md:pb-20 bg-white ">
        <div className="py-12 md:pb-24">
          <BannerCarousel />
        </div>
        <div className="container mx-auto px-4">
          <h1 className="text-center uppercase font-heading text-4xl text-slate-800 font-bold mb-16">
            Mais populares
          </h1>
          <div className="flex flex-wrap -mx-4 mb-20">
            <div className="w-1/2 md:w-1/3 lg:w-1/5 px-4">
              <a className="group block text-center" href="#">
                <img
                  className="block mb-5 w-full h-40 object-cover"
                  src="/public/assets/images/bongs02.webp"
                  alt=""
                />
                <h6 className="font-bold text-slate-800 group-hover:text-yellow-500">
                  Bongs
                </h6>
              </a>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/5 px-4">
              <a className="group block text-center" href="#">
                <img
                  className="block mb-5 w-full h-40 object-cover"
                  src="/public/assets/images/sedas02.webp"
                  alt=""
                />
                <h6 className="font-bold text-slate-800 group-hover:text-yellow-500">
                  Sedas
                </h6>
              </a>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/5 px-4 hidden md:block">
              <a className="group block text-center" href="#">
                <img
                  className="block mb-5 w-full h-40 object-cover"
                  src="/public/assets/images/grinders.jpg"
                  alt=""
                />
                <h6 className="font-bold text-slate-800 group-hover:text-yellow-500">
                  Trituradores
                </h6>
              </a>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/5 px-4 hidden lg:block">
              <a className="group block text-center" href="#">
                <img
                  className="block mb-5 w-full h-40 object-cover"
                  src="/public/assets/images/categories/lighters02.jpg"
                  alt=""
                />
                <h6 className="font-bold text-slate-800 group-hover:text-yellow-500">
                  Isqueiros
                </h6>
              </a>
            </div>
            <div className="w-1/2 md:w-1/3 lg:w-1/5 px-4 hidden lg:block">
              <a className="group block text-center" href="#">
                <img
                  className="block mb-5 w-full h-40 object-cover"
                  src="/public/assets/images/categories/glassTip.webp"
                  alt=""
                />
                <h6 className="font-bold text-slate-800 group-hover:text-yellow-500">
                  Piteiras
                </h6>
              </a>
            </div>
          </div>
          <div className="h-1 bg-blueGray-800 rounded-full">
            <div className="h-full w-1/3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap mb-10 -mx-4 items-end">
            <div className="w-full sm:w-1/2 xl:w-3/5 mb-6 sm:mb-0 px-4">
              <h1 className="font-heading uppercase font-bold text-4xl text-slate-800">
                Categorias
              </h1>
            </div>
            <div className="w-full sm:w-1/2 xl:w-auto ml-auto sm:text-right px-4">
              <a
                className="group inline-flex items-center text-base font-bold text-yellow-500 hover:text-yellow-600"
                href="#"
              >
                <span className="mr-3">Ver todas categorias</span>
                <span className="animate-bounce">
                  <svg
                    width="11"
                    height="10"
                    viewBox="0 0 11 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.95645 0.757299L9.55611 0.757299M9.55611 0.757299L9.55611 7.35696M9.55611 0.757299L1.07083 9.24258"
                      stroke="#1E293E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 items-start mb-20">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0 px-4">
              <a className="group block h-full relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">Novidades</h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <img
                  className="relative z-0 block w-full object-cover transition-transform duration-500 group-hover:scale-102 transform"
                  src="/public/assets/images/bongs02.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <a className="group block h-full mb-6 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">Sedas</h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <img
                  className="relative z-0 block w-full object-cover transition-transform duration-500 group-hover:scale-102 transform"
                  src="/public/assets/images/sedas02.jpg"
                  alt=""
                />
              </a>
              <a className="group block h-full mb-6 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">Bandejas</h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <img
                  className="relative z-0 block w-full object-cover transition-transform duration-500 group-hover:scale-102 transform"
                  src="/public/assets/images/bandejas02.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="h-1 bg-blueGray-800 rounded-full">
            <div className="h-full w-1/3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </section>
      <section
        x-data="{ showContent: false }"
        className="py-12 md:pt-16 md:pb-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="w-full sm:w-1/2 xl:w-3/5 sm:mb-0 px-4">
            <h1 className="font-heading uppercase font-bold text-3xl text-slate-800">
              Marcas
            </h1>
          </div>
          <div className="flex px-10 flex-wrap -mx-4 items-start">
            <BrandsCarousel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
