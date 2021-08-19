# Desafio Front-end: Abertura de Empresas

## Exercutar o projeto em modo desenvolvimento

Faça um clone do projeto para onde deseja rodar o teste. Dentro da pasta do projeto rode o comando `npm install` para instalar todas as dependências, ao terminar rode o comando `npm start`, ele executa´ra o json-server e o angular simultâneamente e poderá ser acessado pelo link `http://localhost:4200/`. 

## O que foi feito

Como solicitado, foi feito todo o projeto utilizando o framework Angular, em sua versão mais recente. Foi feito duas páginas, "Pedidos de Abertura de empresa" como página inicial e "Solicitar abertura de empresa". Separei o projeto em 4 componentes, header (comum nas duas páginas), modal, home (página inicial) e new-company (pagina para solicitar nova abertura ou editar a solicitação). Foram criado dois service (DataService e ApiService) para salvar qual empresa foi selecionada e os dados do cabeçalho com informações do título da página e comportamento do botão, podendo ser acessada por qualquer um dos componentes e para poder fazer as solicitações para o endpoint do json-server assim como das apis
adicionais que foi disponibilizado para o desafio. No formulário de criação/edição dos requerimentos, coloquei a validação em 03 campos, sendo eles CPF, Cep e Data de nascimento, onde fiz a validação de número de caracteres, validade da data e simbolos permitidos, para que assim não houvesse erros durante o registro, ainda no campo Cep eu coloquei uma verificação a cada vez que ele é alterado e quando contendo 8 digitos se faz uma requisição a api do viacep e preenche os dados do endereço automaticamente, deixando em branco os campos do número (esse ao qual não estava no mockup enviado no desafio, mas adicionei pois achei necessário) e complemento. os campos de natureza jurídica e estado são adicionados opções dinamicamente com as respostas dos endpoints setados.

## considerações

Por fim, gostaria primeiro de agradecer pela oportunidade, foi pouco tempo que tive para me dedicar a esse projeto nesses 04 dias, mas tentei fazer o melhor possível com o tempo que tive, e foi uma ótima experiência, pois como falei na reunião meu conhecimento sobre Angular é básico ainda e além do pouco tempo para fazer o projeto tive que estudar também, desculpe caso encontre alguns erros que posso ter cometido e espero um feedback positivo :)