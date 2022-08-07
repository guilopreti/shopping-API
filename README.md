# Projeto Shopping API Aula M4

Neste projeto foi desenvolvido um serviço back-end responsável por simular um sistema de compras, com um cadastro e gerenciamento de usuários, criação e listagem de produtos, utilização de carrinhos e efetuação de compras.

Deploy do API: https://api-userskz-aulas-m4.herokuapp.com/

## Endpoints do serviço:

POST /users - Criação de usuário.

GET /users - Lista todos os usuários, necessário autenticação por token.

GET /users/me - Retorna os dados de um usuário, necessário autenticação por token.

PATCH /users/me/updatePassword - Atualiza a senha de um usuário, necessário autenticação por token.

DELETE /users/me - Deleta um usuário do banco, necessário autenticação por token.

POST /users/login - Retorna um token de acesso após verificar email e senha.

POST /products - Cria um produto.

GET /products - Lista todos os produtos.

POST /cart - Adiciona um produto no carrinho, necessário autenticação por token.

DELETE /cart/<product_id> - Retira um produto do carrinho, necessário autenticação por token.

POST /buy - Efetua uma compra, necessário autenticação por token.
