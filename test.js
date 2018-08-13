const assert = require("assert");
const settingsFactory = require("./public/src/settings-bill-factory.js");

const factory = settingsFactory()

describe("Settings Bill Factory", function() {
    
    it("should take in call values and return it", function () { 
        
        factory.settingCall(5)
      
        assert.equal(5, factory.settingCall())
      
    });

    it("should take in sms values and return it", function () { 
       
        factory.settingSms(2)
     
        assert.equal(2, factory.settingSms())
       
    });

    it("should take in warning values and return it", function () { 
     
        factory.settingWarning(10)
          
        assert.equal(10, factory.settingWarning())
    
    });

    it("should take in critical values return it", function () { 

        factory.settingCritical(20)
      
        assert.equal(20, factory.settingCritical())
    });

it("should take in call and increment with the given settings amount and return the call total", function(){

    factory.settingsBill("call")

    assert.equal(5.00, factory.callTotal())
})

it("should take in 5 calls and increment with the given settings amount and return the call total", function(){

    factory.settingsBill("call")
    factory.settingsBill("call")
    factory.settingsBill("call")
    factory.settingsBill("call")
 

    assert.equal(25.00, factory.callTotal())
})

it("should take in sms and increment with the given settings amount and return the sms total", function(){

    factory.settingsBill("sms")

    assert.equal(2.00, factory.smsTotal())
})

it("should take in 10 sms and increment with the given settings amount and return the sms total", function(){

    factory.settingsBill("sms")
    factory.settingsBill("sms")
    factory.settingsBill("sms")
    factory.settingsBill("sms")
    factory.settingsBill("sms")
    factory.settingsBill("sms")
    factory.settingsBill("sms")
    factory.settingsBill("sms")
    factory.settingsBill("sms")
   

    assert.equal(20.00, factory.smsTotal())
})

it("should return the total of 10 sms and 5 calls", function(){
    
    assert.equal(45.00, factory.settingTotal())
})







});