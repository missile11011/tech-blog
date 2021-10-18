const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({ helpers });

const sess = {
	secret: "Super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () =>
		console.log(`App running on port http://localhost:${PORT}!`)
	);
});
