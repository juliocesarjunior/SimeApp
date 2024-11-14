import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from './apiConfig';

type Params = Record<string, any>;
type Action = (data: any, success: boolean) => void;

class ApiRequest {
  static url: string = API_BASE_URL;

  static async getRequest(path: string, params: Params, action: Action): Promise<void> {
    const requestParams = this.setParamsGetRequest(params);
    const fullUrl = `${this.url}/${path}${requestParams}`;
    //console.log(fullUrl)
    try {
      const response: AxiosResponse = await axios.get(fullUrl);
      action(response.data, true); // Chama a função de ação com os dados e sucesso como true
    } catch (error) {
      action(error, false); // Chama a função de ação com o erro e sucesso como false
    }
  }

  // Função para construir a string de parâmetros de consulta
  static setParamsGetRequest(params: Params): string {
    const query = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return query ? `?${query}` : '';
  }
}

export default ApiRequest;
