const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const settingFactory = require('./public/src/settings-bill-factory')
const factory = settingFactory()
const ejs = require('ejs')

let Moment = require('moment')

const app = express()

// let result = {
//   callCost,
//   smsCost,
//   totalCost,

// }
var callTotal = '0.00';
var smsTotal = '0.00';
var total = '0.00';
var smsCost
var callCost
var warningLevel
var criticalLevel
var alert
var buttonStatus

console.log(alert)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine('handlebars', exphbs({
  defaultLayout: 'main',

  helpers: {
    "timeStamp" :
    function(){
      return Moment(this.date).fromNow()
    },
  }

}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('home', {
    alert,
    callTotal,
    smsTotal,
    total,
    smsCost,
    callCost,
    warningLevel,
    criticalLevel,
    buttonStatus
  })
})

app.use(express.static('public'))


app.post('/settings', function (req, res) {
  smsCost = req.body.smsCost
  callCost = req.body.callCost
  warningLevel = req.body.warningLevel
  criticalLevel = req.body.criticalLevel




  var setSms = factory.settingSms(smsCost)
  var setCall = factory.settingCall(callCost)
  var setWarn = factory.settingWarning(warningLevel)
  var setCrit = factory.settingCritical(criticalLevel)
  alert = factory.settingAlert(total)
  buttonStatus = factory.buttonStatus(alert)


  // process data
  // globalSettings = settings;

  // note that data can be sent to the template
  res.redirect('/')

})

app.post('/action', function (req, res) {
  let added = req.body.billItemTypeWithSettings


  factory.settingsBill(added)



  callTotal = factory.callTotal()
  smsTotal = factory.smsTotal()
  total = factory.settingTotal()
  alert = factory.settingAlert(total)
  buttonStatus = factory.buttonStatus(alert)
  console.log(buttonStatus)
  // note that data can be sent to the template
  res.redirect('/')
})


app.get('/actions', function (req, res) {
  res.render('actions', {
    actions: factory.actions()
  })
})

app.get('/actions/:type', function (req, res) {
  const actionType = req.params.type

  res.render('actions', {
    actions: factory.actionFor(actionType)
  })
})

let PORT = process.env.PORT || 3007

app.listen(PORT, function () {
  console.log('App starting on port', PORT)
})