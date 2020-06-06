const handlebars = require('express-handlebars');
const path = __dirname + '../views/';
const hbs = handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir:path + "layouts",
    partialsDir: + 'partials'
});

module.exports = hbs;