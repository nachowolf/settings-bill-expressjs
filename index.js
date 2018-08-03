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
  }

  var setSms = factory.settingSms(smsCost);
  var setCall = factory.settingCall(callCost);
  var setWarn = factory.settingWarning(warningLevel);
  var setCrit = factory.settingCritical(criticalLevel);


  // process data
  // globalSettings = settings;

  // note that data can be sent to the template
  res.render("home");

});

app.post('/action', function(req, res){
    let added = req.body.billItemTypeWithSettings;

    // console.log(added)
    let incrementor = factory.settingsBill(added);
//     var total = factory.settingTotal();
//     var callsTotal = factory.callTotal()
//     var smssTotal = factory.smsTotal()
//     console.log("call: " + callsTotal);
//     console.log("sms: " + smssTotal);
// console.log("total: " + total);

let result = {
  callCost: factory.callTotal(),
  smsCost: factory.smsTotal(),
  totalCost: factory.settingTotal(),
}
    // note that data can be sent to the template
    res.render('home')
});



let PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
