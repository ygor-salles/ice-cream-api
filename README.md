# ice-cream-api

<h4 align="center">
    :computer: Api para um sistema simplificado de sorveteria
</h4>

<p align="center">
    <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#user-content-clipboard-instruções">Instruções</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#%EF%B8%8F-comandos-básicos-para-as-migrations">Migrations</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-gerar-o-build">Build</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#%EF%B8%8F-collection-das-requisições---insomnia">Requisições</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#-ajustes-e-melhorias">Melhorias</a>
</p>

<div align="center">
    <img src="https://raw.githubusercontent.com/ygor-salles/ice-cream-api/main/assets/modelagem.drawio.png" alt="Modelagem" >
</div>

---

## 💻 Projeto

API em ExpressJS. Aplicação backend simplificada para registro e consulta de informações que envolvem os negócios de uma sorveteria. Contendo autenticação de usuários e tipo de acessos dos usuários para registro das informações.

---

## :rocket: Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [ExpressJS](https://expressjs.com/pt-br/)
- [Typeorm](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Yup](https://www.npmjs.com/package/yup)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Handlebars](https://handlebarsjs.com/)
- [JsonWebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

---

## :clipboard: Instruções

### VARIÁVEIS DE AMBIENTE

- Criar na raiz da pasta do projeto um arquivo `.env` e preencher as informações conforme se encontra no arquivo `.env_example`.

### DOCKER

- Após preenchida as variáveis de ambiente, subir o container do docker pelo terminal com o comando:

```bash
docker-compose up -d
```

### DEPENDÊNCIAS

- No terminal executar o comando para instalar as dependências:

```bash
yarn
```

### MIGRATIONS

- Após todas as dependências instaladas

- Caso queira rodar as migrations juntamente com os seeders, executar diretamente no terminal:

```bash
yarn seed
```

- Caso queira executar apenas as migrations sem nenhum dado previamente cadastrado no banco, executar:

```bash
yarn typeorm migration:run
```

### START

- Finalizado! Basta agora executar a aplicação backend com o seguinte comando:

```bash
yarn dev
```

- A Api estará rodando na porta conforme definido no arquivo .env em PORT, por padrão utilize
  a porta 4000. `http://localhost:4000`

---

## Exemplo de processo para alterações no projeto

- 1 - Estar no ambiente de dev

```bash
git checkout dev
```

- 2 - Atualizar o ambiente de dev (git pull)

```bash
git pull
```

- 3 - Após a atualização criar uma nova branch para alteração, exemplo:

```bash
git checkout -b feature/create-user
```

- 4 - Após as alterações no código, subir as alterações na branch recém criada:

```bash
git add . && git commit -m "feat: create User" && git push origin feature/create-user
```

- 5 - Clicar no primeiro link que estiver no terminal que levará direto para o github.
  Clicar em Create Pull Request, e em seguida se não houver nenhum conflito e após ultima validação das alterações, clicar em Merge request. Com isso a branch de DEV será atualizada com as alterações realizadas.
  E por fim clicar em delete branch, para finalizar a branch que ocorreu a alteração caso esteja finalizado toda aquela demanda.

- 6 - Logo após voltar para a branch dev no VSCode (git checkout dev) e executar o comando para atualizar a DEV
  (git pull). Assim a branch DEV estará atualizada no seu repositório local. E para uma nova demanda, seguir novamente os mesmos passos, criar uma nova branch a partir da dev ...

### Atualizar ambiente de homolog ou prod a partir do ambiente de dev(local)

- Até o momento não foi configurado actions no repositório do projeto para que as migrations e os ambientes de homologação e produção sejam atualizados de forma mais automatizada

- IMPORTANTE: sempre verificar se existe alguma migration nova antes de atualizar ambiente de homolog ou prod, caso exista, alterar a variável de ambiente NODE_ENV para o ambiente desejado e executar a migration no terminal. (Essa execução irá alterar a regra do banco de dados de homolog ou produção, por isso é importante primeiramente testar essas novas migrations no banco de dev(local))

- Após a verificação das migrations, entrar na branch homolog ou prod

```bash
git checkout homolog
```

- Puxar as alterações de dev

```bash
git merge dev
```

- Subir as alterações para a branch

```bash
git push
```

---

## Executar os testes

- Deve-se criar um banco local no container do docker com o nome definido na variavel de ambiente DATABASE_URL_TEST.

- Para executar os testes no sistema operacional windows, deve ser setado dentro de script as seguintes configs no package.json:

```json
"pretest:coverage": "set NODE_ENV=test&&ts-node-dev src/database/seeders/Seeders.ts",
"test:coverage": "set NODE_ENV=test&&jest --coverage --collectCoverageFrom='src/**/*.ts'",
"posttest:coverage": "ts-node-dev src/__tests__/afterAllTests.ts",
"pretest": "set NODE_ENV=test&&ts-node-dev ./src/database/seeders/Seeders.ts",
"test": "set NODE_ENV=test&&jest",
"posttest": "ts-node-dev src/__tests__/afterAllTests.ts",
```

- Para SO linux, deve ser:

```json
"pretest:coverage": "NODE_ENV=test ts-node-dev ./src/database/seeders/Seeders.ts",
"test:coverage": "NODE_ENV=test jest --coverage --collectCoverageFrom='src/**/*.ts'",
"posttest:coverage": "ts-node-dev src/__tests__/afterAllTests.ts",
"pretest": "NODE_ENV=test ts-node-dev ./src/database/seeders/Seeders.ts",
"test": "NODE_ENV=test jest",
"posttest": "ts-node-dev src/__tests__/afterAllTests.ts",
```

- Uma vez criado o banco de testes e definido nas variáveis de ambiente, para executar os testes, basta executar o comando:

```bash
yarn test
```

---

## ⚙️ Comandos básicos para as migrations

- Criar uma migration

```bash
yarn typeorm migration:create -n CreateExample
```

- Rodar as migrations

```bash
yarn typeorm migration:run
```

- Desfazer alterações da migration

```bash
yarn typeorm migration:revert
```

### Rodar a migration em homolog

- 1 - alterar no aquivo .env o NODE_ENV para homolog
- 2 - executar o comando yarn build caso o build não esteja atualizado
- 3 - executar o comando de rodar a migration - $ yarn typeorm migration:run

### Rodar a migration em produção

- 1 - alterar no aquivo .env o NODE_ENV para production
- 2 - executar o comando yarn build caso o build não esteja atualizado
- 3 - executar o comando de rodar a migration - $ yarn typeorm migration:run

---

## 📬 Gerar o build

```bash
yarn build
```

---

## ✈️ Collection das requisições - insomnia

- As collections das requisições backend se econtram na pasta assets desse diretório

---

## 📌 Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Entidade SALES
- [ ] Entidade PURCHASES
- [ ] Entidade COMBINATIONS
