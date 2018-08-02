var billItemTypeWithSettings = document.querySelector(".billItemTypeWithSettings");
//totals
var callTotalSettings = document.querySelector(".callTotalSettings");
var smsTotalSettings = document.querySelector(".smsTotalSettings");
var totalSettings = document.querySelector(".totalSettings");
var callCostSetting = document.querySelector(".callCostSetting");
var smsCostSetting = document.querySelector(".smsCostSetting");
var warningLevelSetting = document.querySelector(".warningLevelSetting");
var criticalLevelSetting = document.querySelector(".criticalLevelSetting");
var addSettings = document.querySelector(".addSettings");
//get a reference to the 'Update settings' button
var updateSettings = document.querySelector(".updateSettings");
//settings

var settings = SettingsBillFactory();



var warningSetting;
var criticalSetting;

function settingsBillTotal(){

if(criticalLevelSetting.value != settings.critical()){
document.getElementById("setting-button").disabled = false;
}
settings.call(callCostSetting.value);
settings.sms(smsCostSetting.value);
warningSetting = settings.warning(warningLevelSetting.value);
criticalSetting = settings.critical(criticalLevelSetting.value);


}


function radioBillTotalSettings(){

var billItemTypeSettings;
var callSettingTotal = settings.callTotal();
var smsSettingTotal = settings.smsTotal();
var settingTotal = settings.total();
    var checkedRadioBtn = document.querySelector("input[name='billItemTypeWithSettings']:checked");
       if (checkedRadioBtn){
        billItemTypeSettings = checkedRadioBtn.value;
      }

settings.settingsAdd(billItemTypeSettings);

      callTotalSettings.innerHTML = callSettingTotal;
      smsTotalSettings.innerHTML = smsSettingTotal;
      totalSettings.innerHTML = settingTotal;



       if (settingTotal >= criticalSetting){
        document.getElementById("setting-button").disabled = true;
              // adding the danger class will make the text red
              totalSettings.classList.add("danger");
         setTimeout(function(){alert("Bill with settings critical level reached");}, 100);


          }

          else if (settingTotal >= warningSetting){
             totalSettings.classList.add("warning");
             totalSettings.classList.remove("danger");
          }

else {
  totalSettings.classList.remove("danger");
  totalSettings.classList.remove("warning");
}
}

updateSettings.addEventListener('click', settingsBillTotal);
addSettings.addEventListener("click", radioBillTotalSettings);
