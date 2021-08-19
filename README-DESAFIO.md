# Desafio Front-end: Abertura de Empresas
Olá, queremos te desafiar a participar do nosso Time Vox. Podemos começar? Seu trabalho será visto pelo nosso time técnico e você receberá ao final um feedback sobre o seu desafio. Interessante?

## O desafio
Construir um sistema de solicitações de abertura de empresa. Veja o mockup e use como base para as telas. 
![mockup](https://i.ibb.co/qdCK3r4/mockup-desafio-front.png)

### Tela inicial
- Listar as solicitações de abertura de empresa, podendo visualizar os principais dados de uma dada empresa, caso clique em 'Visualizar' e caso clique em 'Editar' redirecionar para a página específica.
- Deve-se ainda tem opção para cadastro de solicitações clicando em 'Solicitar Abertura'.

### Tela de Adição/Edição de solicitações
- Nova página com formulário dos dados pessoais, endereço e dados de empresa para preenchimento ou já preenchidas caso seja edição.
- Ao finalizar o preenchimento e estando válido o formulário ao clicar em 'Salvar' deve-se:
  - Salvar a solicitação com o endpoint post da api fake, citada mais abaixo;
  - Exibir modal com mensagem de sucesso;
  - e retornar para a tela inicial listando as solicitações salvas.

### Requisitos do projeto
 - Framework Angular, sendo considerado como versão mínima a 6.
 - Lib UI Bootstrap

### O que vamos avaliar
- Seu código
- Boas práticas
- Organização
- Usabilidade

### Métodos da API
- Para consumir a API fake uma opção é usar o [json-server](https://www.npmjs.com/package/json-server), coloque o arquivo [db.json](db/db.json) que está neste repositório numa pasta `db` do seu projeto. Segue instruções para instalação e uso. Lembre-se de rodar o angular em outro terminal.

```sh
npm install -g json-server
cd db
json-server --watch db.json
```

| Descrição do endpoint           | Método Http | Endpoint                                                                        |
| ------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| Solicitações de abertura salvas | GET         | http://localhost:3000/empresas                                                  |
| Visualizar empresa              | GET         | http://localhost:3000/empresas/:id                                              |
| Salvar solicitação de abertura  | POST        | http://localhost:3000/empresas                                                  |
| Atualizar Empresa               | PUT         | http://localhost:3000/empresas/:id                                              |
| Opções de Natureza Jurídica     | GET         | http://localhost:3000/natureza-juridica                                         |
| Opções de Entidade de registro  | GET         | http://localhost:3000/entidade-registro                                         |
| Lista de Estados                | GET         | https://servicodados.ibge.gov.br/api/v1/localidades/estados/                    |
| Lista de municipios             | GET         | https://servicodados.ibge.gov.br/api/v1/localidades/estados/{idIbge}/municipios |
| Consumo de Endereço pelo CEP    | GET         | http://viacep.com.br/ws/{cep}/json/                                             |


### Itens diferenciais (não obrigatório)
- Usar a listagem dos estados e municípios num combobox e preencher o endereço através do CEP.
- Utilizar as opções de natureza jurídica e entidade de registro a partir do endpoint citado.
- Adicionar feedback visual com um loading (spinner).
- Máscara de texto para campos como cpf e cep.
- Validação de campos obrigatórios e verificação de tamanho.

### Como nos enviar a resolução
- Crie um repositório privado na gitlab.com;
- Desenvolva. Você terá 4 (quatro) dias a partir da data do envio do desafio; 
- Após concluir seu trabalho, publique; 
- É importante adicionar como membro (develop) o usuário `natancardosodev` 
- Crie um arquivo README.md com a explicação de como devemos executar o projeto e com uma descrição do que foi feito; 
- Pronto! Agora é so esperar o nosso feedback... Boa sorte!!
