sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("sync6.cl1.uitable.controller.AirView", {
      onInit() {
        var AirlineSRV = {
          // Service ID : AirlineSRV

          //   EntitySet : AirlineSet
          AirlineSet: [
            {
              Carrid: "AA",
              Carrname: "American Airline",
              Url: "http://www.aa.com.",
            },
            {
              Carrid: "LH",
              Carrname: "Lufthanza",
              Url: "http://www.lh.com.",
            },
            {
              Carrid: "KA",
              Carrname: "Korean Airline",
              Url: "http://www.ka.com.",
            },
          ],
        };

        var oModel = new JSONModel(AirlineSRV);
        this.getView().setModel(oModel);

        var oModel2 = new JSONModel("json/airline.json");
        this.getView().setModel(oModel2, "ason");
      },
    });
  }
);
