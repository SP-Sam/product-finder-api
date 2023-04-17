# Product Finder API

> O Product Finder é uma aplicação web que utiliza a técnica de Web Scraping (Raspagem de dados) para buscar produtos dos sites Mercado Livre e Buscapé.

### A API do Product Finder está online em `https://productfinder.up.railway.app`

## 🛠️ Tecnologias utilizadas

- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [JSDOM](https://github.com/jsdom/jsdom)
- [winston](https://github.com/winstonjs/winston) (logs personalizados)
- [morgan](https://github.com/expressjs/morgan) (logs de requisições)

## 🌱 Pré-requisitos

- Instale a última versão do [Node](https://nodejs.org/en/);
- Para clonar o repositório instale e configure o [git](https://git-scm.com/).

## ▶️ Executando o projeto localmente

### Abra um terminal e faça o clone do projeto em sua máquina

```bash
git clone https://github.com/SP-Sam/product-finder-api.git

# Se você tem uma chave SSH configurada
git clone git@github.com:SP-Sam/product-finder-api.git
```

### Navegue até o diretório do projeto clonado

```bash
cd product-finder-api
```

### Variáveis de ambiente

> Você precisará ter um editor de texto para continuar

### Na raiz do projeto existe um arquivo `.env.exemple.` renomeie este arquivo para `.env`

### Abra o arquivo com um editor de texto e preencha as variáveis com o seguintes valores

`PORT=3000`

`NODE_ENV=development`

`DATABASE_URL=postgresql://postgres:sPeg1UkamAzgmUB1@db.frnlqmpdcmiuetfnhbwi.supabase.co:5432/postgres`

### Instale as dependências do projeto

```bash
npm install
```

#### Inicie o processo de build do projeto e aguarde até estar finalizado

```bash
npm run build
```

#### Inicie o projeto

```bash
npm start
```

#### Você verá algo parecido com isso no terminal

<img src="./assets/start-api.png" alt="Terminal start">

### Pronto, nosso backend está rodando! Para testar o funcionamento acesse `http://localhost:3000/api/health-check` pelo navegador ou por algum software de requisições como o [Insomnia](https://insomnia.rest/)

## 🚀 Endpoints

Além do endpoint de health check temos mais 2:

`POST /api/product-category`

- Este endpoint espera o seguinte formato de body

  ```bash
  {
    "website": "Mercado Livre" ou "Buscapé",
    "category": "Geladeira" ou "TV" ou "Celular"
  }
  ```

`POST /api/search`

- Este endpoint espera o seguinte formato de body
  ```bash
  {
    "website": "Mercado Livre" ou "Buscapé",
    "searchTerm": "search term"
  }
  ```

## 👨‍💻 Desenvolvedor

<a href="https://www.linkedin.com/in/spsam/">
  <img src="https://avatars.githubusercontent.com/u/72403810?v=4" width="100px" alt="Imagem de Samuel Pereira">
  <br>
  <b>Samuel Pereira</b>
</a>

## 🖋️ Licença

Este projeto é um desafio técnico para um processo seletivo da empresa [Lextart](https://lexartlabs.com/), portanto não possui fins lucrativos e não está licenciado.

[⬆️ Voltar ao topo](#product-finder-api)
<br>
