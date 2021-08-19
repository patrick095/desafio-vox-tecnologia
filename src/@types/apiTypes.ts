export type Requirement ={
    empresa: {
      co_entidade_registro: string;
      co_natureza_juridica: string;
      ds_nome_fantasia: string;
      endereco:{
        co_cep: string;
        co_municipio: string;
        co_numero: string;
        co_uf: string;
        ds_bairro: string;
        ds_complemento?: string;
        ds_logradouro: string
      }
    },
    solicitante: {
      date_nascimento: string;
      ds_responsavel: string;
      nu_cpf: string;
    }
    id?: number;
}
export type LegalNature = {
    key: number;
    value: string;
}

export type CepAPI = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: number;
    siafi: string;
}
export type State = {
  id: number;
  nome: string;
  sigla: string;
  regiao: { id:number; sigla: string; nome: string; }
}