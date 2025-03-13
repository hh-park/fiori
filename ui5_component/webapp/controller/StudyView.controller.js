sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("sync6.cl1.ui5component.controller.StudyView", {
      onInit() {
        var oData = {
          text: "Confirm",
          width: "150px",
          icon: "sap-icon://flight",
        };

        var oModel = new JSONModel(oData);
        this.getView().setModel(oModel, "btn1");

        var oModel2 = new JSONModel("json/component.json");
        this.getView().setModel(oModel2, "btn2");
      },
    });
  }
);
