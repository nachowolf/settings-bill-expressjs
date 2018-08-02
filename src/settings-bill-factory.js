module.exports = function(){
  var callSetting = 0;
  var smsSetting = 0;
  var warningSetting = 0;
  var criticalSetting = 0;

  var callSettingTotal = 0;
  var smsSettingTotal = 0;

  var settingCall = function(input){
     if(parseFloat(input) < 0 || parseFloat(input) > 0){
     callSetting = parseFloat(input);
   }
   return callSetting;
 };

  var settingSms = function(input){
    if (parseFloat(input) < 0 || parseFloat(input) > 0) {
      smsSetting = parseFloat(input);
    }
    return smsSetting;
  };

var settingWarning = function(input){
  if (parseFloat(input) < 0 || parseFloat(input) > 0) {
  warningSetting = parseFloat(input);
}
  return warningSetting;
};

var settingCritical = function(input){
  if (parseFloat(input) < 0 || parseFloat(input) > 0) {
  criticalSetting = parseFloat(input);
}
  return criticalSetting;
};

var settingsBill = function(input){
  if (input === "call"){
      callSettingTotal += callSetting;
  }
  else if (input === "sms"){
      smsSettingTotal += smsSetting;
  }
};

var callTotal = function(){
  return callSettingTotal.toFixed(2);
};

var smsTotal = function(){
  return smsSettingTotal.toFixed(2);
};

var settingTotal = function(){
  var total = callSettingTotal + smsSettingTotal;
  return total.toFixed(2);

};


return{
  settingCall,
  settingSms,
  settingWarning,
  settingCritical,
  callTotal,
  smsTotal,
  settingTotal,
  settingsBill
};

};
