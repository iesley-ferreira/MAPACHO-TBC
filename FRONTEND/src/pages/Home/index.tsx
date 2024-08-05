import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BannerCarousel from '../../components/Layout/BannerCarousel';
import BrandsCarousel from '../../components/UI/BrandsCarousel';
import CategoryCard from '../../components/common/CategoryCard';
import {
  clearFilteredProducts,
  setDisableButtonShowMore,
  setNewCategoryNames,
  setPage,
  setSearchValue,
  setSelectedCategory,
} from '../../store/ducks/products/actions';
import { RootState } from '../../store/ducks/rootReducer';
import CategoryImg from './categoryImg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formattedCategories } = useSelector((state: RootState) => state.categories);

  const handleCategoryClick = (categoryId: number) => {
    const categoryName = formattedCategories.find(
      (category) => category.id === categoryId.toString(),
    )?.description;

    navigate(
      `/categoria/${categoryName}?idCategoria=${categoryId.toString()}&idSubCategoria=${
        formattedCategories.find((category) => category.id === categoryId.toString())
          ?.subcategories[0].id
      }`,
    );
    dispatch(setDisableButtonShowMore(false));
    dispatch(setSearchValue(null));
    const firstSubcategoryOfCategory = formattedCategories.find(
      (category) => category.id === categoryId.toString(),
    )?.subcategories[0];
    dispatch(setSelectedCategory(firstSubcategoryOfCategory?.id.toString() ?? null));
    dispatch(
      setNewCategoryNames({
        newCategoryName: categoryName ?? null,
        newSubCategoryName: firstSubcategoryOfCategory?.description,
      }),
    );
    dispatch(clearFilteredProducts());
    dispatch(setPage(1));
  };

  const mostPopularCategories = [
    {
      id: 2709995,
      description: 'Bongs',
      imageSrc: '/public/assets/images/categories/Bongs/bongs02.webp',
    },
    {
      id: 2709986,
      description: 'Sedas',
      imageSrc: '/public/assets/images/categories/SedaseBlunts/sedaseblunts.jpg',
    },
    {
      id: 2710008,
      description: 'Trituradores',
      imageSrc: '/public/assets/images/categories/Trituradores/trituradores.jpg',
    },
    {
      id: 2710001,
      description: 'Isqueiros e Maçaricos',
      imageSrc:
        '/public/assets/images/categories/IsqueiroseMaçaricos/isqueirosemaçaricos.jpg',
    },
    {
      id: 2709969,
      description: 'Piteiras e Filtros',
      imageSrc: '/public/assets/images/categories/Piteirasefiltros/filtros.jpg',
    },
  ];

  return (
    <main className="pb-20">
      <section className="pt-12 ">
        <div className="py-12 md:pb-14">
          <BannerCarousel />
        </div>
        <div className="container flex flex-col items-center mx-auto px-4">
          <div className="text-center w-fit mb-16 md:mb-24 md:mt-10">
            <h1 className="text-center uppercase font-heading text-2xl md:text-4xl text-slate-800 font-bold mb-2">
              Mais populares
            </h1>
            <div className="h-[8px] bg-blueGray-800">
              <div className="h-full w-4/6 bg-yellow-500"></div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center -mx-4 pb-16">
            {mostPopularCategories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.description}
                imageSrc={category.imageSrc}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
          <div className="h-1 bg-blueGray-800 rounded-full">
            <div className="h-full w-1/3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap mb-10 -mx-4 items-end">
            <div className="w-full sm:w-1/2 xl:w-3/5 mb-6 sm:mb-0 px-4">
              <div className="text-center w-fit my-4">
                <h1 className="font-heading uppercase font-bold text-4xl text-slate-800 mb-2">
                  Categorias
                </h1>
                <div className="h-[8px] bg-blueGray-800">
                  <div className="h-full w-4/6 bg-yellow-500 "></div>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 xl:w-auto ml-auto sm:text-right px-4">
              <a
                className="group inline-flex items-center text-xl font-bold text-yellow-500 hover:text-yellow-600"
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
<<<<<<< HEAD
          <div className="flex flex-wrap -mx-4 md:pb-4 items-start">
=======
          <div className="flex flex-wrap -mx-4 items-start md:pb-16">
>>>>>>> 130354f5b3a0e5fb676c88177bca140bc0dd8377
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0 px-4">
              <a className="group block h-full max-h-2/2 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">Novidades</h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <CategoryImg
                  imageUrl="/public/assets/images/categories/Novidades/novidade.jpg"
                  categoryName="novidades"
                />
              </a>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <a className="group block max-h-1/2 mb-6 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">
                    Sedas e Tabacos
                  </h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <CategoryImg
                  imageUrl="/public/assets/images/categories/SedaseBlunts/sedas.jpg"
                  categoryName="sedas"
                  maxHeight="472px"
                />
              </a>
              <a className="group block max-h-1/2 mb-6 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">
                    Tudo para sua sessão
                  </h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <CategoryImg
                  imageUrl="/public/assets/images/categories/sessao.jpg"
                  categoryName="Tudo para sua sessão"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 items-start pb-16">
            <div className="w-full lg:w-1/2 px-4">
              <a className="group block max-h-1/2 mb-6 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">
                    Kits completos
                  </h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <CategoryImg
                  imageUrl="/public/assets/images/categories/kits.jpg"
                  categoryName="sedas"
                  maxHeight="472px"
                />
              </a>
              <a className="group block max-h-1/2 mb-6 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">Cases</h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <CategoryImg
                  imageUrl="/public/assets/images/categories/casecigarro.jpg"
                  categoryName="Tudo para sua sessão"
                  minHeight="422px"
                />
              </a>
            </div>
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0 px-4">
              <a className="group block h-full max-h-2/2 relative" href="#">
                <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                  <h4 className="text-xl font-bold text-slate-200 mb-2">
                    Bandejas e acessórios
                  </h4>
                  <span className="text-yellow-500 font-medium">Comprar agora</span>
                </div>
                <CategoryImg
                  imageUrl="/public/assets/images/categories/bandejaseacessorios.jpg"
                  categoryName="novidades"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="w-full sm:w-1/2 xl:w-3/5 sm:mb-0 px-4">
            <div className="text-center w-fit my-4">
              <h1 className="font-heading uppercase font-bold text-3xl text-slate-800 mb-2">
                Marcas
              </h1>
              <div className="h-[8px] bg-blueGray-800">
                <div className="h-full w-4/6 bg-yellow-500 "></div>
              </div>
            </div>
          </div>
          <div className="flex px-10 flex-wrap -mx-4 items-start">
            <BrandsCarousel />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
