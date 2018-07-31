const express = require('express');
const bodyParser = require("body-parser");
const exphbs  = require('express-handlebars');
const settingsBill = require("./src/settings-bill-factory.js")

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.use(express.static('public'));


app.post('/settings', function(req, res){
    var smsCost = req.body.smsCost;
    var callCost = req.body.callCost;
    var warningLevel = req.body.warningLevel;
    var criticalLevel = req.body.criticalLevel;

    var settings = {
      smsCost,
      callCost,
      warningLevel,
      criticalLevel
    };





    app.get('/settings/:costType', function(){
        let costType = req.params.costType;
        console.log(costType)

        let cost = 0;
        //lookup cost for costType
        if (costType === 'sms'){
            cost = settings.smsCost;
        } else if (costType === 'call') {
            cost = settings.callCost;
        }

        req.render('cost', {
            costType,
            cost
        });
    });

    // process data
    globalSetings = settings;

    // note that data can be sent to the template
    res.render('/actions/:type', {settings});

});

let PORT = process.env.PORT || 3007;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
