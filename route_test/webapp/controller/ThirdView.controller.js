sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("sync6.cl1.routetest.controller.ThirdView", {
    onInit() {},

    onFirst() {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("RouteFirstView");
    },
  });
});
