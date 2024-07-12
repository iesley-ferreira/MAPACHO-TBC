import { FacebookRounded } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo01 from '../../common/Logo/Logo01';
import Logo02 from '../../common/Logo/Logo02';
import { Elo } from './svgComponents/Elo';
import { HiperCard } from './svgComponents/HiperCard';
import { MasterCard } from './svgComponents/MasterCard';
import { Pix } from './svgComponents/Pix';
import { Visa } from './svgComponents/Visa';

const brandSecondaryColor = 'var(--brand-secondary)';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#8d8d8d40] shadow-[rgba(0,_0,_0,_0.4)_90px_30px_90px]">
      <div className="flex flex-col py-8 px-2 lg:p-8">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex flex-col self-center w-full  h-full pb-12 lg:pb-4 md:max-w-1/3">
            <button className="flex w-full h-full justify-center">
              <Logo02 color={brandSecondaryColor} strokeWidth={2} />
              <Logo01 color={brandSecondaryColor} strokeWidth={2} />
            </button>
            <div className="flex flex-col self-center align-center w-full justify-center">
              <div className="localization py-8  w-full justify-center">
                <a href="mailto:"></a>
                <Link
                  to="https://www.google.com/maps/dir//R.+Santa+Maria,+251+-+Rio+Grande,+RS,+96205-170/@-32.1747184,-52.2471941,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x95118558a8ed446b:0xf06c158360d3fdb0!2m2!1d-52.1647928!2d-32.1747451?entry=ttu"
                  className="flex flex-row w-full text-teal-900 justify-content-center text-center justify-center mb-1 gap-2 "
                  style={{ color: 'var(--text-title)' }}
                >
                  <LocationOnIcon
                    style={{ color: '#134e4a' }}
                    sx={{ fontSize: '20px' }}
                  />
                  <h4 className="text-base mt-0.5">
                    Rua Santa Maria, 251 - Cassino - RS
                  </h4>
                </Link>
                <a
                  href="mailto:mapachotabacaria@hotmail.com"
                  className="flex flex-row w-full justify-content-center text-center justify-center mb-1 gap-2 "
                  style={{ color: 'var(--text-title)' }}
                >
                  <div>
                    <MailOutlineIcon
                      style={{ color: '#134e4a' }}
                      sx={{ fontSize: 'medium' }}
                    />
                  </div>
                  <h4>mapachotabacaria@hotmail.com</h4>
                </a>
                <Link
                  to="https://api.whatsapp.com/send?l=pt-BR&phone=5553991504785"
                  className="flex flex-row w-full justify-content-center text-center justify-center gap-2 "
                  style={{ color: 'var(--text-title)' }}
                >
                  <i className="ri-phone-line text-teal-900"></i>
                  <h4 className="text-base mt-0.5">(53) 99150-4785</h4>
                </Link>
              </div>
            </div>
            <div className="flex w-fit gap-10  self-center justify-evenly">
              <Link
                to="https://api.whatsapp.com/send?l=pt-BR&phone=5553991504785"
                className="inline-flex w-12 h-12 mr-3 text-teal-900 hover:text-yellowGreen-700 items-center justify-center rounded-lg shadow-md hover:shadow-none border-2 border-transparent hover:border-yellowGreen-500 transition duration-200"
              >
                <i className="ri-whatsapp-line text-2xl"></i>
              </Link>
              <Link
                to="https://www.instagram.com/mapachotbc/"
                className="inline-flex w-12 h-12 mr-3 text-teal-900 hover:text-yellowGreen-700 items-center justify-center rounded-lg shadow-md hover:shadow-none border-2 border-transparent hover:border-yellowGreen-500 transition duration-200"
              >
                <InstagramIcon />
              </Link>
              <Link
                to="https://www.facebook.com/mapachotabacaria"
                className="inline-flex w-12 h-12 text-teal-900 hover:text-yellowGreen-700 items-center justify-center rounded-lg shadow-md hover:shadow-none border-2 border-transparent hover:border-yellowGreen-500 transition duration-200"
              >
                <FacebookRounded />
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-full pb-12 lg:pb-0 md:max-w-1/3 self-center">
            <div className="payment pb-8 lg:pb-4 w-full">
              <div
                className="flex w-full justify-center gap-2 text-lg font-medium"
                style={{ color: 'var(--brand-secondary)' }}
              >
                <h4 className="text-xl font-semibold mb-4">Pagamento</h4>
              </div>
              <div
                className="flex flex-col items-center text-center justify-evenly text-base"
                style={{ color: 'var(--text-title)' }}
              >
                <p className="mb-2">6x sem juros em todos os cartões</p>
                <div className="flex w-fit gap-1 lg:gap-4 text-center justify-evenly text-base">
                  <div className="payment-type h-fit">
                    <Pix />
                  </div>
                  <div className="payment-type h-fit">
                    <HiperCard />
                  </div>
                  <div className="payment-type h-fit">
                    <MasterCard />
                  </div>
                  <div className="payment-type h-fit">
                    <Elo />
                  </div>
                  <div className="payment-type h-fit">
                    <Visa />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center security py-4 w-full max-w-1/3">
              <div
                className="flex w-full justify-center gap-2 text-lg font-medium"
                style={{ color: 'var(--brand-secondary)' }}
              >
                <h4 className="text-xl font-semibold mb-4">Segurança</h4>
              </div>
              <div className="flex w-fit gap-8 text-center justify-evenly">
                <div className="security-type">
                  <img
                    className="h-10"
                    src="/public/assets/images/security/siteSeguro.png"
                    alt="siteSeguro"
                  />
                </div>
                <div className="security-type">
                  <img
                    className="h-10"
                    src="/public/assets/images/security/googleSafeBrowsing.png"
                    alt="google"
                  />
                </div>
                <div className="security-type">
                  <img
                    className="h-10"
                    src="/public/assets/images/security/100Seguro.png"
                    alt="100seguro"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center md:max-w-1/3">
            <div className="px-4 w-3/5 mb-6">
              <h5 className="text-xl text-center lg:text-start font-semibold mb-6 text-teal-900">
                Legal
              </h5>
              <ul className="w-full">
                <li className="mb-4 w-full text-center lg:text-start">
                  <a
                    className="inline-block w-full text-md text-[#4b5563] hover:text-[#0d5e53] hover:font-semibold"
                    href="#"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li className="mb-4 w-full text-center lg:text-start">
                  <a
                    className="inline-block w-full text-md text-[#4b5563] hover:text-[#0d5e53] hover:font-semibold"
                    href="#"
                  >
                    Politica de Privacidade
                  </a>
                </li>
                <li className="mb-4 w-full text-center lg:text-start">
                  <a
                    className="inline-block w-full text-md text-[#4b5563] hover:text-[#0d5e53] hover:font-semibold"
                    href="#"
                  >
                    Noticias
                  </a>
                </li>
                <li className="mb-4 w-full text-center lg:text-start">
                  <a
                    className="inline-block w-full text-md text-[#4b5563] hover:text-[#0d5e53] hover:font-semibold"
                    href="#"
                  >
                    Cookie e Uso de Dados
                  </a>
                </li>
                <li className="text-center w-full lg:text-start">
                  <a
                    className="inline-block w-full text-md text-[#4b5563] hover:text-[#0d5e53] hover:font-semibold"
                    href="#"
                  >
                    Sobre Nós
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="rights pt-2">
          <div
            className="flex flex-col md:flex-row w-full text-center justify-center gap-2 text-xs font-medium py-2 md:py-0"
            style={{ color: 'var(--brand-secondary)' }}
          >
            <div className="flex w-full md:w-fit justify-center gap-1 py-2">
              <i className="ri-copyright-line"></i>
              <h4>2024 Mapacho Tabacaria. Todos os direitos reservados.</h4>
            </div>
            <div className="flex w-full md:w-fit justify-center gap-1 py-2">
              <h4>
                Desenvolvido por{' '}
                <Link to="https://contate.me/iesleyferreira">BruxelasTechnology</Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
