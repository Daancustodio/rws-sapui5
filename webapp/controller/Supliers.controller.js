sap.ui.define([
    "sapui5/demo/restservice/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/Device",
], function (BaseController, JSONModel,MessageToast, Device) {
    "use strict";
    
    return BaseController.extend("sapui5.demo.restservice.controller.Supliers", {

        onInit: function () {

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
        onBuscar: function (oEvt) {
            var sQuery = oEvt.getSource().getValue();
            var nodata = [{}];
            if (sQuery && sQuery.length < 3) {
                MessageToast.show("Informe no mínimo 3 caracteres para a busca.");
                return;
            }

            var view = this.getView();
            var serverUrl = "http://megaws.azurewebsites.net/api/businesspartner/get";
            var data = {
                SearchValue: sQuery
            };

            var sData = JSON.stringify(data);
            console.log(sData);
            jQuery.ajax({
                type: "POST",
                contentType: "application/json",
                url: serverUrl,
                data: sData,
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