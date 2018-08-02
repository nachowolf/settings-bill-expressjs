const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const settingFactory = require("./src/settings-bill-factory");
const factory = settingFactory();
const ejs = require("ejs");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('home');
});

app.use(express.static('public'));


app.post('/settings', function(req, res) {
  var smsCost = req.body.smsCost;
  var callCost = req.body.callCost;
  var warningLevel = req.body.warningLevel;
  var criticalLevel = req.body.criticalLevel;

console.log(smsCost);
console.log(callCost);
console.log(warningLevel);
console.log(criticalLevel);

  var settings = {
    smsCost,
    callCost,
    warningLevel,
    criticalLevel
  };

  // process data
  globalSettings = settings;

  // note that data can be sent to the template
  res.render("home");

});

app.post('/action', function(req, res){
    let addCallOrSms = req.body.billItemTypeWithSettings;

    console.log(addCallOrSms)
    var total = factory.settingsBill(addCallOrSms);
console.log(total);
    // process data
    globalSettings = action

    // note that data can be sent to the template
    res.render('home', {action})
});

// app.get('/settings/:costType', function(){
//     let costType = req.params.costType;
//     console.log(costType)
//
//     let cost = 0;
//     //lookup cost for costType
//     if (costType === 'sms'){
//         cost = settings.smsCost;
//     } else if (costType === 'call') {
//         cost = settings.callCost;
//     }
//
//     req.render('cost', {
//         costType,
//         cost
//     });
// });

let PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
