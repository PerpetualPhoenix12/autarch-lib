
# Autarch Library

  

### A library web application to track your webnovel (and any other media) reading status

  

### Prerequisites

```
nodejs (v10+)
npm
Git CLI
```


### Installation

Ensuring you have the Git CLI installed, [fork](https://help.github.com/en/artiles/fork-a-repo) this repo and clone it onto your system:

```
git clone https://github.com/PerpetualPhoenix12/autarch-lib.git
```
See https://git-scm.com/downloads for the latest Git versions.

## Deployment - Local

To get it working, enter the server directory, install the necessary packages, run the start script:
```
cd server
npm i
npm start
```
This will start the application on port 4000. If you have any applications running on this port, then you can create a `.env` file and specify the `PORT=` value, or just edit the default one in  `server/index.js`

Go to `localhost:4000` in your browser to access the application.

# Login
Default test account:

Username: import@test.com
Password: 1234567

You can create a new account at the provided signup page.

# Using your own Firebase project

If you want to use your own firebase project, follow [this](https://support.google.com/firebase/answer/7015592) tutorial on how to obtain your project's config. Once you've obtained it, replace the `firebaseConfig` in `/client/src/fb.js` with your project's config.

Then you need to `npm i` in the `client` folder and run `npm run build` to update the new firebase config for the app to use:
```
cd client
npm i
npm run build
```

## Built With

*  [VueJS](https://vuejs.org/) - Frontend framework

*  [Vuetify](https://vuetifyjs.com/en/) - Vue component framework

*  [Vuex](https://vuex.vuejs.org/) - State management library

*  [Babel](https://babeljs.io/) - JavaScript compiler from ES6

*  [Express](https://expressjs.com/) - Backend web server

*  [Firestore](https://firebase.google.com/docs/firestore) - NoSQL Database

*  [Webpack](https://webpack.js.org/) - Module bundler

## Authors
*  **Perpetual Phoenix** - [A proud non-kneeler](https://www.reddit.com/r/freefolk/)