# MCServerScanner

## Installation instructions

- Go to the [releases page](https://github.com/iQuickDev/MCServerScanner/releases) and get the latest one
- Read the instructions

## If you want to contribute

### Client

The client is developed using the [Vue 3](https://vuejs.org/) JavaScript progressive framework

#### Running the client
with npm
```bash
cd client
npm run dev
```
with yarn
```bash
cd client
yarn dev
```
All the changes you make to the files will automatically be applied because of hot module reloading

### Server

#### Running the server
```bash
cd server
node .
```
unfortunately the server does not support hot module reloading so you will have to run the command every time you change the code or use a daemon like [nodemon](https://nodemon.io/) to automatically restart
