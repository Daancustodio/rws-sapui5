sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/resource/ResourceModel",
  "sap/ui/model/json/JSONModel",
  "sapui5/demo/restservice/model/AppModel",
  "sap/ui/Device"
	], function (UIComponent, ResourceModel, JSONModel, AppModel, Device) {
  "use strict";

	return UIComponent.extend("sapui5.demo.restservice.Component", {

		
		metadata : {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the resource and application models are set and the router is initialized.
		 * @public
		 * @override
		 */
        init : function () {
           
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);
           
			this.getRouter().initialize();
        },


		/**
		 * In this function, the rootView is initialized and stored.
		 * @public
		 * @override
		 * @returns {sap.ui.mvc.View} the root view of the component
		 */
		createContent : function() {
			// call the base component's createContent function
			var oRootView = UIComponent.prototype.createContent.apply(this, arguments);
			return oRootView;
		}
	});
});