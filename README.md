# Requisitos da aplicação

## Cadastro de carro

**RF**
- [x] Deve ser possível cadastrar um carro.

**RN**
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O Carro deve ser cadastrado inicialmente com disponibilidade.
- [x] Para cadastrar o carro, o usuário deve ser um administrador.

## Listagem de carros

**RF**
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pelo id da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- [x] Não é necessário que o usuário esteja logado na aplicação.

## Cadastro de especificação do carro

**RF**
- [x] Deve ser possível cadastrar uma especificação para um carro.

**RN** 
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

## Cadastro de imagens do carro

**RF**
- [x] Deve ser possível cadastrar a imagem do carro.

**RNF**
- [x] utilizar o multer para upload dos arquivos

**RN**
- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [x] Para cadastrar imagens, o usuário deve ser um administrador.
- [x] Não deve ser possível cadastrar imagens para um carro não cadastrado.
- [x] Deve remover as imagens antigas ao cadastrar as novas imagens

## Aluguel de carro

**RF**
- [] Deve ser possível realizar um aluguel de carro.

**RN**
- [] O aluguel deve ter duração mínima de 24 horas.
- [] Não deve ser possível realizar um aluguel caso o usuário esteja com aluguel em aberto.
- [] Não deve ser possível realizar um aluguel caso já exista um aluguel em aberto para o carro.
