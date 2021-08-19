import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { CepAPI, LegalNature, Requirement, State } from 'src/@types/apiTypes'


export const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})


export async function getStateList(): Promise<State[]>{
    const stateList = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
    return stateList.data
}

 export async function getAllRequests(): Promise<AxiosResponse<Requirement[]>>{
    return api.get('/empresas')
    .then(res => res.data)
    .catch(err => err)
  }

   export async function companyInfo(id: number): Promise<Requirement> {
    return api.get('/empresas/'+id)
    .then(res => res.data)
    .catch(err => err)
  }

   export async function saveNewCompany(data: any): Promise<any> {
    return api.post('/empresas', data)
    .then(res => res)
    .catch(err => err)
  }

   export async function updateCompany(data: any, id: number): Promise<any>{
    return api.put('/empresas/'+id, data)
    .then(res => res)
    .catch(err => err)
  }

   export async function getRegistrationEntity(): Promise<LegalNature[]>{
    return api.get('/entidade-registro')
    .then(res => res.data)
    .catch(err => err)
  }

   export async function legalNature(): Promise<LegalNature[]>{
    return api.get('/natureza-juridica')
    .then(res => res.data)
    .catch(err => err)
  }

   export async function getCountyList(stateInitials: string): Promise<any[]> {
    return axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateInitials}/municipios`)
    .then(res => res.data)
    .catch(err => err)
  }
  
   export async function getCountyInfo(countyId: string): Promise<string> {
    return axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${countyId}`)
    .then(res => res.data.nome)
    .catch(err => err)
  }

   export async function getAddressInfo(cep: string | number): Promise<CepAPI> {
    return axios.get(`
    http://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.data)
    .catch(err => err)
  }



