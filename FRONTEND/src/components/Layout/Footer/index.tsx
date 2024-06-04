import React from 'react'
import { Link } from 'react-router-dom'
import Logo01 from '../../common/Logo/Logo01'
import Logo02 from '../../common/Logo/Logo02'
import { Elo } from './svgComponents/Elo'
import { HiperCard } from './svgComponents/HiperCard'
import { MasterCard } from './svgComponents/MasterCard'
import { Pix } from './svgComponents/Pix'
import { Visa } from './svgComponents/Visa'

const brandSecondaryColor = 'var(--brand-secondary)'

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-50 pb-10">
      <div className="logo-btn py-10">
        <button className="flex w-full justify-center">
          <Logo02 color={brandSecondaryColor} strokeWidth={2} />
          <Logo01 color={brandSecondaryColor} strokeWidth={2} />
        </button>
      </div>
      <div className="localization py-5">
        <div
          className="flex w-full justify-center gap-2 text-lg font-medium py-2"
          style={{ color: 'var(--brand-secondary)' }}
        >
          <i className="ri-map-pin-line"></i>
          <h4>Endereço</h4>
        </div>
        <div
          className="flex flex-col w-full justify-content-center text-center justify-center gap-2 text-base"
          style={{ color: 'var(--text-title)' }}
        >
          <h4>Rua Santa Maria, 251 - Cassino - RS </h4>
          <h4>CEP 96205-170</h4>
        </div>
      </div>
      <div className="contact  py-8">
        <div
          className="flex w-full justify-center gap-2 text-lg font-medium py-2"
          style={{ color: 'var(--brand-secondary)' }}
        >
          <i className="ri-phone-line"></i>
          <h4>Contato</h4>
        </div>
        <div
          className="flex  w-full  text-center justify-evenly  text-base"
          style={{ color: 'var(--text-title)' }}
        >
          <Link to="https://www.instagram.com/mapachotbc/">
            <i className="ri-instagram-line text-3xl"></i>
            <h4>instagram</h4>
          </Link>
          <Link to="https://api.whatsapp.com/send?l=pt-BR&phone=5553991504785">
            <i className="ri-whatsapp-line text-3xl"></i>
            <h4>whatsapp</h4>
          </Link>
          <Link to="https://www.facebook.com/mapachotabacaria">
            <i className="ri-facebook-box-line text-3xl"></i>
            <h4>facebook</h4>
          </Link>
        </div>
      </div>

      <div className="payment  py-8">
        <div
          className="flex w-full justify-center gap-2 text-lg font-medium py-2"
          style={{ color: 'var(--brand-secondary)' }}
        >
          <i className="ri-bank-card-line"></i>
          <h4>Pagamento</h4>
        </div>
        <div
          className="flex flex-col  w-full  text-center justify-evenly  text-base"
          style={{ color: 'var(--text-title)' }}
        >
          <p className="mb-4">6x sem juros em todos os cartões</p>
          <div className="flex  w-full  text-center justify-evenly  text-base">
            <div className="payment-type">
              <Pix />
              {/* <h4>Pix</h4> */}
            </div>
            <div className="payment-type">
              <HiperCard />
              {/* <h4>HiperCard</h4> */}
            </div>
            <div className="payment-type">
              <MasterCard />
              {/* <h4>MasterCard</h4> */}
            </div>
            <div className="payment-type">
              <Elo />
              {/* <h4>Elo</h4> */}
            </div>
            <div className="payment-type">
              <Visa />
              {/* <h4>Visa</h4> */}
            </div>
          </div>
        </div>
      </div>

      <div className="security py-8">
        <div
          className="flex w-full justify-center gap-2 text-lg font-medium py-3"
          style={{ color: 'var(--brand-secondary)' }}
        >
          <i className="ri-lock-2-line"></i>
          <h4>Segurança</h4>
        </div>
        <div className="flex  w-full  text-center justify-evenly  text-base">
          <div className="security-type">
            <img
              className="h-10"
              src="/public/assets/siteSeguro.png"
              alt="siteSeguro"
            />
          </div>
          <div className="security-type">
            <img
              className="h-10"
              src="/public/assets/googleSafeBrowsing.png"
              alt="google"
            />
          </div>
          <div className="security-type">
            <img
              className="h-10"
              src="/public/assets/100Seguro.png"
              alt="100seguro"
            />
          </div>
        </div>
      </div>

      <div className="rights pt-8">
        <div
          className="flex flex-col w-full text-center justify-center gap-2 text-xs font-medium py-2"
          style={{ color: 'var(--brand-secondary)' }}
        >
          <div className="flex w-full justify-center text-sm gap-1 py-3">
            <i className="ri-mail-line"></i>
            <h4>mapachotabacaria@hotmail.com</h4>
          </div>
          <div className="flex w-full justify-center gap-1 py-2">
            <i className="ri-copyright-line"></i>
            <h4>2024 Mapacho Tabacaria. Todos os direitos reservados.</h4>
          </div>
          <div className="flex w-full justify-center gap-1 py-2">
            <h4>
              Desenvolvido por{' '}
              <Link to="https://contate.me/iesleyferreira">
                BruxelasTechnology
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
