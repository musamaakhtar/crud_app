# Crud_App 


The main purpose of this repository is to show a good end-to-end project setup and workflow for writing a Mongoose Node.js Express code in TypeScript complete with middleware, models and routes.

This example comes with a complete REST API to handle Authentication and CRUD features on Users.

## Tech Stack

**Server:** Node, Express, typescript, ts-node

**DataBase:** mongoose

## Run Locally

Clone the project

```bash
  git clone https://github.com/AroojAshiq/test.git
```

Go to the project directory

```bash
  cd task
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`JWT_SECRET`
`NODE_ENV`
`MONGODB_URI`


### Configuring TypeScript compilation

TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.

```json

{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

