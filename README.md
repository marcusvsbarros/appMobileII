# Nome do Projeto

**Descrição**: Este projeto é uma aplicação desenvolvida com React Native que visa facilitar a interação com informações como endereço e dados pessoais. Ele permite ao usuário inserir informações, buscar dados de endereço via CEP e visualizar esses dados em um modal. O sistema também inclui funcionalidades de validação, como a verificação do CEP e a limpeza de campos inseridos.

## Funcionalidades

- **Cadastro de Dados Pessoais**: O usuário pode inserir nome, CPF, e-mail e endereço (CEP, rua, bairro, cidade e estado).
- **Busca por CEP**: Utiliza a API [ViaCEP](https://viacep.com.br/) para buscar o endereço automaticamente a partir do CEP informado.
- **Visualização de Dados**: Ao preencher os dados, o usuário pode visualizar as informações inseridas em um modal.
- **Limpeza de Campos**: Há uma opção para limpar todos os campos de entrada, facilitando a reinicialização do processo.

## Tecnologias Utilizadas

- **React Native**: Biblioteca principal para o desenvolvimento da interface mobile.
- **React Native Paper**: Utilizado para componentes de interface de usuário como botões, inputs e listas.
- **Fetch API**: Para buscar dados do CEP via API externa (ViaCEP).
- **Hooks do React**: Usados para gerenciar o estado da aplicação e interações do usuário.

## Instalação

### 1. Clonar o Repositório

Primeiro, clone o repositório para o seu computador:

```bash
git clone https://github.com/usuario/nome-repositorio.git
