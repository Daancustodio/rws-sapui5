sap.ui.define([
		"sapui5/demo/restservice/controller/BaseController",
		"sapui5/demo/restservice/model/types",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast"
	], function (BaseController, formatter, types, JSONModel, MessageToast) {
	"use strict";
	return BaseController.extend("sapui5.demo.restservice.controller.Editundertakings", {

        formatter: formatter,
        types: types,
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			var oRouter, oViewModel;
			oRouter = this.getRouter();
			oViewModel = new sap.ui.model.json.JSONModel({
				"createMode": false
			});
			this.getView().setModel(oViewModel, "viewModel");
			
			oRouter.attachRoutePatternMatched(this._onRouteMatched, this);
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Navigates back to the Master
		 * @function
		 */
		onNavPress : function () {
			this.myNavBack("master");
		},
		
		/**
		 * Saves changes to the remote service
		 * @function
		 */
		onSave: function(){
			
		},
		
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onRouteMatched : function (oEvent) {
			console.log(oEvent);
		},

		/**
		 * Binds the view to the object path.
		 *
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView : function () {
			var oView = this.getView();
			oView.bindElement(this.sObjectPath);
		}
	});
});