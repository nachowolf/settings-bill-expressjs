
module.exports = function () {
  var callSetting = 0
  var smsSetting = 0
  var warningSetting = 0
  var criticalSetting = 0

  var callSettingTotal = 0
  var smsSettingTotal = 0

  var actionList = []

  var settingCall = function (input) {
    if (parseFloat(input) < 0 || parseFloat(input) > 0) {
      callSetting = parseFloat(input)
    }
    return callSetting
  };

  var settingSms = function (input) {
    if (parseFloat(input) < 0 || parseFloat(input) > 0) {
      smsSetting = parseFloat(input)
    }
    return smsSetting
  };

  var settingWarning = function (input) {
    if (parseFloat(input) < 0 || parseFloat(input) > 0) {
      warningSetting = parseFloat(input)
    }
    return warningSetting
  };

  var settingCritical = function (input) {
    if (parseFloat(input) < 0 || parseFloat(input) > 0) {
      criticalSetting = parseFloat(input)
    }
    return criticalSetting
  };

  var settingsBill = function (input) {
    let cost = 0

    if (input === 'call') {
      callSettingTotal += callSetting
      cost = callSetting

    } else if (input === 'sms') {
      smsSettingTotal += smsSetting
      cost = smsSetting
    } else {
      return settingsBill
    }

    actionList.push({
      'type': input,
      'price': 'R' + cost.toFixed(2),
      'date': new Date()

    })



  };

  function actions () {
    return actionList
  };

  function actionFor(actionType) {
    

    if (actionType == " " || actionType == undefined) {
      return actionType
    } else {

      return actionList.filter(list => list.type === actionType)

    };
  }

  var callTotal = function () {
    return callSettingTotal.toFixed(2)

  };

  var smsTotal = function () {
    return smsSettingTotal.toFixed(2)
  };

  var settingTotal = function () {
    var total = callSettingTotal + smsSettingTotal
    
    return total.toFixed(2)

  };

  var settingAlert = function (tot) {
    if (tot >= criticalSetting && tot >= warningSetting) {
       return "critical"
     }

    else if(tot >= warningSetting && tot <= criticalSetting) {
    return "warning"
  }

    else if (tot <= warningSetting && tot <= criticalSetting){
    return " "
  }

  else{
    return " "
  }
}

var buttonStatus = function (input){

  if (input !== "critical") {
    return " "
  }
  else if(input === "critical"){
    return "disabled"
  }
}

  return {
    buttonStatus,
    settingAlert,
    actionFor,
    actions,
    settingCall,
    settingSms,
    settingWarning,
    settingCritical,
    callTotal,
    smsTotal,
    settingTotal,
    settingsBill
  }

};