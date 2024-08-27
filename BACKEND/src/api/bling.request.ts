import { QueryType } from '../types/Query.type';
import axiosRequest from './requests.axios';

const BASE_URL = 'https://www.bling.com.br';

type BlingRequestTypes = {
  url: '/Api/v3/oauth/token' | '/Api/v3/produtos' | '/Api/v3/produtos/variacoes' | string;
  credentials?: string;
  method: 'post' | 'get' | 'delete' | 'put';
  data?:
    | {
        grant_type: 'authorization_code';
        code: string;
      }
    | {
        grant_type: 'refresh_token';
        refresh_token: string;
      }
    | {
        numero: number;
        numeroLoja: string;
        data: string;
        dataSaida: string;
        dataPrevista: string;
        contato: {
          id: number;
          tipoPessoa: string;
          numeroDocumento: string;
        };
        loja: {
          id: number;
        };
        numeroPedidoCompra: string;
        outrasDespesas: number;
        observacoes: string;
        observacoesInternas: string;
        desconto: {
          valor: number;
          unidade: string;
        };
        categoria: {
          id: number;
        };
        tributacao: {
          totalICMS: number;
          totalIPI: number;
        };
        itens: {
          codigo: string;
          unidade: string;
          quantidade: number;
          desconto: number;
          valor: number;
          aliquotaIPI: number;
          descricao: string;
          descricaoDetalhada: string;
          produto: {
            id: number;
          };
          comissao: {
            base: number;
            aliquota: number;
            valor: number;
          };
        }[];
        parcelas: {
          id: number;
          dataVencimento: string;
          valor: number;
          observacoes: string;
          formaPagamento: {
            id: number;
          };
        }[];
        transporte: {
          fretePorConta: number;
          frete: number;
          quantidadeVolumes: number;
          pesoBruto: number;
          prazoEntrega: number;
          contato: {
            id: number;
            nome: string;
          };
          etiqueta: {
            nome: string;
            endereco: string;
            numero: string;
            complemento: string;
            municipio: string;
            uf: string;
            cep: string;
            bairro: string;
            nomePais: string;
          };
          volumes: {
            id: number;
            servico: string;
            codigoRastreamento: string;
          }[];
        };
        vendedor: {
          id: number;
        };
        intermediador: {
          cnpj: string;
          nomeUsuario: string;
        };
        taxas: {
          taxaComissao: number;
          custoFrete: number;
          valorBase: number;
        };
      };

  token?: string;
  query?: QueryType;
};

const blingRequestAxios = async ({
  url,
  credentials,
  data,
  token,
  method,
  query,
}: BlingRequestTypes) =>
  axiosRequest({
    BASE_URL,
    method,
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token ? `Bearer ${token}` : `Basic ${credentials}`,
      Accept: 'application/json',
    },
    data,
    query,
  });

// ================== BLING_TOKEN =============================== //

const getToken = async (credentials: string, AUTHORIZATION_CODE: string) =>
  blingRequestAxios({
    url: '/Api/v3/oauth/token',
    method: 'post',
    credentials,
    data: { code: AUTHORIZATION_CODE, grant_type: 'authorization_code' },
  });

const refreshToken = async (credentials: string, refresh_token: string) =>
  blingRequestAxios({
    url: '/Api/v3/oauth/token',
    method: 'post',
    credentials,
    data: { refresh_token, grant_type: 'refresh_token' },
  });

// ================== BLING_PRODUCTS =========================== //

const getAllProducts = async (token: string, query?: QueryType) =>
  blingRequestAxios({
    url: '/Api/v3/produtos',
    method: 'get',
    token,
    query,
  });

// ================== BLING_PRODUCTS_VARIATIONS =========================== //
const getProductsByVariation = async (token: string, fatherProduct: string) => {
  return blingRequestAxios({
    url: `Api/v3/produtos/${fatherProduct}`,
    method: 'get',
    token,
  });
};

// ================== BLING_CATEGORIES =========================== //

const getAllCategories = async (token: string, query?: QueryType) =>
  blingRequestAxios({
    url: '/Api/v3/categorias/produtos',
    method: 'get',
    token,
    query,
  });

const checkProductInStock = async (token: string, productIds: string[]) => {
  const idsQuery = productIds.map((id) => `idsProdutos%5B%5D=${id}`).join('&');
  const url = `/Api/v3/estoques/saldos?${idsQuery}`;

  const response = await blingRequestAxios({
    url,
    method: 'get',
    token,
  });

  console.log('RESPONSE CHECKPRODUCTINSTOCK STATUS:', response.status);
  console.log('RESPONSE CHECKPRODUCTINSTOCK:', response);

  return {
    status: 200,
    stockData: response.data.data,
  };
};

const createSalesOrder = async (token: string, salesOrderData: any) => {
  console.log('CHAMOU SALES ORDER DATA:');

  const newSaleOrder = await blingRequestAxios({
    url: '/Api/v3/pedidos/vendas',
    method: 'post',
    token,
    data: salesOrderData,
  });
  console.log('NEW SALES ORDER BLING REQUEST:', newSaleOrder);
  return newSaleOrder;
};
// ================== EXPORTS =========================== //

const bling_request = {
  getToken,
  refreshToken,
  getAllProducts,
  getProductsByVariation,
  getAllCategories,
  createSalesOrder,
  checkProductInStock,
};

export default bling_request;
