sap.ui.define([
    "sapui5/demo/restservice/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/Device",
], function (BaseController, JSONModel,MessageToast, Device) {
    "use strict";
    
    return BaseController.extend("sapui5.demo.restservice.controller.Undertakings", {

        onInit: function () {
            var view = this.getView();
            var serverUrl = "http://megaws.azurewebsites.net/api/unit/get";            
             var data = {
                SearchValue: ""
            };
            jQuery.ajax({
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                url: serverUrl,                
                dataType: "json",
                success: function (oData) {
                    var qtd = oData.length;
                    view.setModel(new JSONModel(oData));
                    if(qtd == 1)
                        MessageToast.show(qtd + " item encontrado");
                    else if(qtd < 1)
                        MessageToast.show("Nenhum item encontrado");
                    else                    
                        MessageToast.show(qtd + " itens encontrados");
                },
                error: function () {                    
                    view.setModel(new JSONModel(null));                    
                }
            });
            var statusURL = "http://megaws.azurewebsites.net/api/unit/getallstatus";            
            jQuery.ajax({
                type: "GET",
                contentType: "application/json",                
                url: statusURL,                
                dataType: "json",
                success: function (oData) {
                    var qtd = oData.length;
                    view.setModel(new JSONModel(oData), "StatusCollection");   
                    console.log(oData)               ;
                },
                error: function () {                    
                    view.setModel(new JSONModel(null, "StatusCollection"));                    
                }
            });
        },       

        onListPress: function (oEvent) {
            // The source is the list item that got pressed
            console.log(oEvent);
            this._showObject(oEvent.getSource());
        },

        onNavBack: function () {
            // The history contains a previous entry
            window.history.go(-1);

        },        
       
        _showObject: function (oItem) {
            var oBindingContext = oItem.getBindingContext();
            console.log(oBindingContext);
            this.getRouter().navTo("suplieredit", {
                id: oBindingContext.getPath().substr(1)
            });
        }
    });

});