# ggscript ![alt text](https://circleci.com/gh/ggscript/ggscript.svg?style=shield&circle-token=:circle-token)
GGScript is an educational platform for teaching users the fundamentals of Phaser and game development theory.  Our mission is to provide an intuitive and seamless experience and provide opportunities for people to hone their coding and game creation skills.

##Table of Contents
* [Team Members](#team-members)
* [Tech Stack, API's and Third-party Tools](#tech-stack)

##Team Members
* [Jason Maier](https://github.com/jason-maier)
* [Jeff Judikins](https://github.com/fej-snikduj)
* [Jing Michelle Li](https://github.com/miteaisgreener)
* [Nikki Galusha](https://github.com/nikkigalusha)

##Tech Stack
* [React](https://facebook.github.io/react/) for rendering views and [Redux](https://github.com/reactjs/redux) for managing state
* [Node.js](https://nodejs.org/en/) and [Express](http://expressjs.com/) for serving static pages and services. 
* [Postgres](http://www.postgresql.org/) for relation database
* [Webpack](https://webpack.github.io/) 

##Starting the app
- [ ] Clone this repo as well as the [GGShell](https://github.com/ggscript/ggshell) repository

- [ ] Run `npm install` within your terminal to download the depndencies for both repos.

- [ ] If this is the first time you are starting GGScript you need to navigate to the `config` file and add your Postgres credentials to the `databaste.credentials.example.js` file and rename it to `databaste.credentials.example.js`.  Repeat the same steps for `auth.example.js` with the Google Auth credentials you can get from Google Developer Console.

- [ ] Within the GGScript repo run `node db/seed.js` to seed your Postgres database and create your initial tables.

- [ ] Within your terminal run `node server/server.js` on both repos.

- [ ] You can now access GGScript from `http://127.0.0.1:3000/`
