sap.ui.define([
		"sapui5/demo/restservice/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device",		
	], function (BaseController, JSONModel, Device) {
	"use strict";

	return BaseController.extend("sapui5.demo.restservice.controller.Financialindices", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			var  view =  this.getView();
            var serverUrl =  "http://megaws.azurewebsites.net/api/financialindex/getall";
            jQuery.ajax({
                type : "GET",
                contentType : "application/json",
                url :serverUrl,                
                dataType : "json",
                success : function(oData) {                  
				view.setModel(new JSONModel(oData));
				console.log(oData);
                },
                error : function() {
                    jQuery.sap.log.debug("something went wrong while retrieving the data");
                }
			});
            
		},

		/**
		 * Event handler when a table item gets pressed
		 * @param {sap.ui.base.Event} oEvent the table selectionChange event
		 * @public
		 */
		onListPress : function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},
		/**
		 * Navigates back in the browser history, if the entry was created by this app.
		 * If not, it navigates to the Fiori Launchpad home page
		 *
		 * @public
		 */
		
		// TODO - we don't need FLP stuff...
		onNavBack : function () {
				// The history contains a previous entry
				window.history.go(-1);
			
		},
		
		
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject : function (oItem) {
			var oBindingContext = oItem.getBindingContext();
			this.getRouter().navTo("detailfinancialindices", {
				id: oBindingContext.getPath().substr(1)
			});
		}
	});

});