# Projeto de Desenvolvimento de API REST e Videoaulas

Este projeto faz parte da matéria de Certificadora de Competência Comum, do curso de ADS, e tem como objetivo criar uma API REST em JavaScript para fornecer conteúdo educacional por meio de videoaulas.

## Descrição do Projeto

A API REST será desenvolvida em JavaScript, seguindo os princípios RESTful para facilitar a comunicação cliente-servidor. Rotas serão implementadas para operações CRUD (Create, Read, Update, Delete) em recursos específicos, proporcionando uma interface simples e intuitiva para interagir com os dados.

O projeto também incluirá videoaulas hospedadas em uma plataforma de vídeos, cobrindo conceitos relevantes ao curso. Cada vídeo abordará um tópico específico de forma clara e concisa, facilitando a compreensão e aprendizado.

## Tecnologias Utilizadas

- JavaScript
- Node.js
- Express

## Alunos Envolvidos no Projeto:

- Victor Moreira
- Mauricio Junior
- Matheus Kodi
- Leandro Henrique

## Cronograma de Desenvolvimento da API Back-end

### Tema: Gerenciamento de Tarefas (To-Do List)
### Período: 07/Abril até 2/Junho

#### Etapa 1:
- **Data:** 20/04/2024
- **Planejamento e Definição de Requisitos**
  - Revisão dos requisitos do projeto
  - Definição das funcionalidades da To-Do List (criar, visualizar, atualizar, excluir tarefas)
  - Discussão sobre a estrutura de dados necessária
  - **Responsável:** Victor Moreira

#### Etapa 2:
- **Data:** 25/04/2024
- **Configuração do Ambiente de Desenvolvimento**
  - Instalação do Node.js e NPM
  - Configuração do projeto com Express.js
  - Inicialização do repositório Git
  - **Responsável:** Victor Moreira

#### Etapa 3:
- **Data:** 01/05/2024
- **Desenvolvimento dos Endpoints Básicos**
  - Implementação dos endpoints CRUD básicos para gerenciamento de tarefas
  - Teste dos endpoints utilizando ferramentas como Postman ou Insomnia
  - **Responsável:** Leandro Henrique

#### Etapa 4:
- **Data:** 05/05/2024
- **Implementação da Lógica de Negócio**
  - Desenvolvimento das funções para manipulação das tarefas
  - Validação dos dados de entrada
  - Implementação de funcionalidades específicas (por exemplo, marcar uma tarefa como concluída)
  - **Responsável:** 

#### Etapa 5:
- **Data:** 07/05/2024
- **Testes e Depuração**
  - Execução de testes unitários e de integração
  - Identificação e correção de erros (debugging)
  - Revisão da documentação dos endpoints
  - **Responsável:** 

#### Etapa 6:
- **Data:** 09/05/2024
- **Finalização e Documentação**
  - Revisão geral do código-fonte
  - Documentação dos endpoints e da estrutura do projeto
  - Preparação para entrega
  - **Responsável:** Todos

### [Link da nossa playlist no YouTube](https://www.youtube.com/watch?v=Oxa0UASvEws&list=PLCStcRdcNfK4qBGDRSQ1jbDAg9V1chujf&index=1)


# Como instalar e testar o projeto?

## Vamos seguir as seguintes etapas:

### Etapa 1: Pré-requisitos
Antes de começar, você precisa garantir que tem tudo o que precisa instalado no seu computador. Para este projeto, você vai precisar do Node.js e do Git.

1. **Instalar Node.js e NPM:**
   - Acesse o site oficial do Node.js: [nodejs.org](https://nodejs.org/)
   - Clique no botão para baixar a versão recomendada.
   - Siga as instruções de instalação.
   - Para verificar se o Node.js foi instalado corretamente, abra o terminal (ou prompt de comando no Windows) e digite:
     ```sh
     node -v
     npm -v
     ```
     Você deve ver a versão do Node.js e do NPM (Node Package Manager) aparecer.

2. **Instalar Git:**
   - Acesse o site oficial do Git: [git-scm.com](https://git-scm.com/)
   - Baixe a versão mais recente para o seu sistema operacional.
   - Siga as instruções de instalação.
   - Para verificar se o Git foi instalado corretamente, abra o terminal (ou prompt de comando no Windows) e digite:
     ```sh
     git --version
     ```
     Você deve ver a versão do Git aparecer.

### Etapa 2: Clonar o Repositório
Agora que você tem Node.js e Git instalados, o próximo passo é clonar o repositório do projeto para o seu computador.

1. Abra o terminal (ou prompt de comando no Windows).
2. Navegue até o diretório onde você quer salvar o projeto. Por exemplo, se você quer salvar na pasta Documentos, digite:
   ```sh
   cd ~/Documentos
   ```
3. Clone o repositório usando o comando Git:
   ```sh
   git clone https://github.com/zVihugo/Certificadora-de-Compet-ncia.git
   ```

### Etapa 3: Instalar Dependências
Depois de clonar o repositório, você precisa instalar as dependências do projeto. Essas dependências são bibliotecas e pacotes que o projeto precisa para funcionar.

1. Navegue até a pasta do projeto clonado:
   ```sh
   cd Certificadora-de-Compet-ncia
   ```
   
2. Instale as dependências usando o NPM:
   ```sh
   npm install
   ```
   Este comando vai ler o arquivo `package.json` e instalar todas as dependências listadas nele.

### Etapa 4: Rodar o Projeto
Agora que todas as dependências estão instaladas, você pode rodar o projeto para ver como ele funciona.

1. No terminal, ainda na pasta do projeto, inicie o servidor:
   ```sh
   npm run dev app.js
   ```
  Podemos utilizar `npm run dev`, devido a utilização do nodemon em nosso projeto.

2. Abra seu navegador e acesse `http://localhost:3000` (ou a porta que seu projeto está configurado para usar) para ver o projeto em ação.

### Etapa 5: Testar Funcionalidades
Com o servidor rodando, você pode testar as funcionalidades da API. Você pode usar uma ferramenta como o Postman ou o próprio navegador para fazer requisições às rotas que você criou.

Por exemplo, se você criou uma rota para listar tarefas, você pode acessá-la no navegador ou no Postman com:
```sh
http://localhost:3000/tarefas
```

