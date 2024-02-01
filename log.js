var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var proDBName = "DELIVERY-DB";  
var schoolRelationName = "SHIPMENT-TABLE";  
var connToken = "90931774|-31949307860810085|90962953";
var reqid;

$("#ShipmentNo").focus();
$("#Description").prop("disabled", true);
$("#Source").prop("disabled", true);
$("#Destination").prop("disabled", true);
$("#ShippingDate").prop("disabled", true);
$("#ExpectedDeliveryDate").prop("disabled", true);
$("#save").hide(); 
$("#update").hide();
$("#reset").hide();


function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no); 
}


function getShipmentnoAsJsonObj() {
    var ShipmentNo = $("#ShipmentNo").val();  
    var jsonStr = {
        ShipmentNo: ShipmentNo
    };
    return JSON.stringify(jsonStr);
}

function check() {
    var ShipmentNoJsonObj = getShipmentnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, proDBName, schoolRelationName, ShipmentNoJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    $("#Check").hide();
    $("#ShipmentNo").prop("disabled", true);
    $("#Description").prop("disabled", false);
    $("#Source").prop("disabled", false);
    $("#Destination").prop("disabled", false);
    $("#ShippingDate").prop("disabled", false);
    $("#ExpectedDeliveryDate").prop("disabled", false);
    $("#reset").show();
    $("#Description").focus();

    if (resJsonObj.status === 400) {
        $("#save").show();
        $("#update").hide();
    } else if (resJsonObj.status === 200) {
        $("#save").hide();
        $("#update").show();
        reqid=$("#ShipmentNo").val();;
    }
}


function validateData() {
    var ShipmentNo, Description, Source, Destination, ShippingDate, ExpectedDeliveryDate;
    ShipmentNo = $("#ShipmentNo").val();
    Description = $("#Description").val();
    Source = $("#Source").val();
    Destination = $("#Destination").val();
    ShippingDate = $("#ShippingDate").val();
    ExpectedDeliveryDate = $("#ExpectedDeliveryDate").val();
    if (ShipmentNo === "") {
        alert("ShipmentNo is missing");
        $("#ShipmentNo").focus();
        return "";
    }
    if (Description === "") {
        alert("Description is missing");
        $("#Description").focus();
        return "";
    }
    if (Source === "") {
        alert("Source missing");
        $("#Source").focus();
        return "";
    }
    if (Destination === "") {
        alert("Destination is missing");
        $("#Destination").focus();
        return "";
    }
    if (ShippingDate === "") {
        alert("ShippingDate is not Selected");
        $("#ShippingDate").focus();
        return "";
    }
    if (ExpectedDeliveryDate === "") {
        alert("ExpectedDeliveryDate is not selected");
        $("#ExpectedDeliveryDate").focus();
        return "";
    }

    var jsonStrObj = {
        ShipmentNo,
        Description,
        Source,
        Destination,
        ShippingDate,
        ExpectedDeliveryDate
    };
    return JSON.stringify(jsonStrObj);
}

function updateData() {
    var jsonChg = validateData(); 
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, proDBName, schoolRelationName,reqid ); 
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);  
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    Reset();
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, proDBName, schoolRelationName);  
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);  
    resetForm();
    $("#ShipmentNo").focus();
}

function Reset() {
    $("input[type='text']").val("");
    $("input[type='date']").val("");
    $("#ShipmentNo").prop("disabled", false);
    $("#ShipmentNo").focus();
    $("#Description").prop("disabled", true);
    $("#Source").prop("disabled", true);
    $("#Destination").prop("disabled", true);
    $("#ShippingDate").prop("disabled", true);
    $("#ExpectedDeliveryDate").prop("disabled", true);
    $("#save").hide();
    $("#update").hide();
    $("#reset").hide();
    $("#ShipmentNo").focus();
    $("#Check").show();
}
