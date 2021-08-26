# Requisitos da aplicação

## Cadastro de carro

**RF**
- [x] Deve ser possível cadastrar um carro.

**RN**
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O Carro deve ser cadastrado inicialmente com disponibilidade.
- * [] Para cadastrar o carro, o usuário deve ser um administrador.

## Listagem de carros

**RF**
- [] Deve ser possível listar todos os carros disponíveis.
- [] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- [] Não é necessário que o usuário esteja logado na aplicação.

## Cadastro de especificação do carro

**RF**
- [] Deve ser possível cadastrar uma especificação para um carro.
- [] Deve ser possível listar todas as especificações
- [] Deve ser possível listar todos os carros.

**RN** 
- [] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

## Cadastro de imagens do carro

**RF**
- [] Deve ser possível cadastrar a imagem do carro.
- [] Deve ser possível listar todos os carros.

**RNF**
- [] utilizar o multer para upload dos arquivos

**RN**
- [] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [] Para cadastrar imagens, o usuário deve ser um administrador.

## Aluguel de carro

**RF**
- [] Deve ser possível realizar um aluguel de carro.

**RN**
- [] O aluguel deve ter duração mínima de 24 horas.
- [] Não deve ser possível realizar um aluguel caso o usuário esteja com aluguel em aberto.
- [] Não deve ser possível realizar um aluguel caso já exista um aluguel em aberto para o carro.
