const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const settingFactory = require("./src/settings-bill-factory");
const factory = settingFactory();
const ejs = require("ejs");

const app = express();

// let result = {
//   callCost,
//   smsCost,
//   totalCost,
 
// }
  var callTotal = "0.00";
  var smsTotal = "0.00";
  var total = "0.00";
  var smsCost;
  var callCost;
  var warningLevel;
  var criticalLevel;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('home', {
    callTotal,
  smsTotal,
   total,
    smsCost,
    callCost,
    warningLevel,
    criticalLevel,
  });
});

app.use(express.static('public'));


app.post('/settings', function(req, res) {
   smsCost = req.body.smsCost;
   callCost = req.body.callCost;
   warningLevel = req.body.warningLevel;
   criticalLevel = req.body.criticalLevel;


  

  var setSms = factory.settingSms(smsCost);
  var setCall = factory.settingCall(callCost);
  var setWarn = factory.settingWarning(warningLevel);
  var setCrit = factory.settingCritical(criticalLevel);


  // process data
  // globalSettings = settings;

  // note that data can be sent to the template
  res.redirect("/");

});

app.post('/action', function(req, res){
    let added = req.body.billItemTypeWithSettings;

  
    var incrementor = factory.settingsBill(added);



   callTotal = factory.callTotal();
   smsTotal = factory.smsTotal();
   total = factory.settingTotal();

    // note that data can be sent to the template
    res.redirect("/")
});


app.get("/actions", function(req, res){
  res.render("actions", {actions: settingsBill.action()})
})


let PORT = process.env.PORT || 3007;

app.listen(PORT, function() {
  console.log('App starting on port', PORT);
});
