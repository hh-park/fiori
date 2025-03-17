sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
  (Controller, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sync6.cl1.a10.finaltest.controller.CartView", {
      onInit() {},
      onSearch() {
        // variables
        var vRemark = this.getView().byId("IRemark").getValue();
        var vBelnr = this.getView().byId("IBelnr").getValue();

        var oTable = this.getView().byId("infoTable");
        var oBinding = oTable.getBinding("rows");
        var oFilter = null;
        var aFilter = [];

        // filtering
        if (vRemark != "") {
          oFilter = new Filter({
            path: "Remark",
            operator: FilterOperator.Contains,
            value1: vRemark,
          });

          aFilter.push(oFilter);
          oFilter = null;
        }
        oBinding.filter(aFilter);

        if (vBelnr != "") {
          oFilter = new Filter({
            path: "Belnr",
            operator: FilterOperator.EQ,
            value1: vBelnr.padStart(10, "0"),
          });

          aFilter.push(oFilter);
          oFilter = null;
        }
        oBinding.filter(aFilter);
      },
      onDisplay() {
        var oTable = this.getView().byId("infoTable");
        var aIndex = oTable.getSelectedIndices(); // index in array
        var oContext = oTable.getContextByIndex(aIndex[0]); // read table
        var oData = oContext.getObject(); // objectify

        this.getView().byId("Ryear").setValue(oData.Ryear);
        this.getView().byId("Rbukrs").setValue(oData.Rbukrs);
        this.getView().byId("Belnr").setValue(oData.Belnr);
        this.getView().byId("Racct").setValue(oData.Racct);
        this.getView().byId("Txt50").setValue(oData.Txt50);
        this.getView().byId("Remark").setValue(oData.Remark);
        this.getView().byId("Hsl").setValue(oData.Hsl);
        this.getView().byId("Rtcur").setValue(oData.Rtcur);
        this.getView().byId("PostYn").setValue(oData.PostYn);
      },
      onClear() {
        this.getView().byId("Ryear").setValue("");
        this.getView().byId("Rbukrs").setValue("");
        this.getView().byId("Belnr").setValue("");
        this.getView().byId("Racct").setValue("");
        this.getView().byId("Txt50").setValue("");
        this.getView().byId("Remark").setValue("");
        this.getView().byId("Hsl").setValue("");
        this.getView().byId("Rtcur").setValue("");
        this.getView().byId("PostYn").setValue("");
      },
      onCreate() {
        var oModel = this.getView().getModel();
        let oCreate = {
          Ryear: this.getView().byId("Ryear").getValue(),
          Rbukrs: this.getView().byId("Rbukrs").getValue(),
          Belnr: this.getView().byId("Belnr").getValue().padStart(10, "0"),
          Racct: this.getView().byId("Racct").getValue(),
          Txt50: this.getView().byId("Txt50").getValue(),
          Remark: this.getView().byId("Remark").getValue(),
          Hsl: this.getView().byId("Hsl").getValue(),
          Rtcur: this.getView().byId("Rtcur").getValue(),
          PostYn: this.getView().byId("PostYn").getValue(),
        };

        oModel.create("/InfoSet", oCreate, {
          method: "POST",
          success: function () {
            oModel.refresh();
            MessageToast.show("Create success!");
          },
          error: function () {
            MessageToast.show("Create failed");
          },
        });
      },
      onUpdate() {
        var oModel = this.getView().getModel();
        let oUpdate = {
          Ryear: this.getView().byId("Ryear").getValue(),
          Rbukrs: this.getView().byId("Rbukrs").getValue(),
          Belnr: this.getView().byId("Belnr").getValue().padStart(10, "0"),
          Racct: this.getView().byId("Racct").getValue(),
          Txt50: this.getView().byId("Txt50").getValue(),
          Remark: this.getView().byId("Remark").getValue(),
          Hsl: this.getView().byId("Hsl").getValue(),
          Rtcur: this.getView().byId("Rtcur").getValue(),
          PostYn: this.getView().byId("PostYn").getValue(),
        };

        oModel.update(
          "/InfoSet(Ryear='" + oUpdate.Ryear + "',Rbukrs='" + oUpdate.Rbukrs + "',Belnr='" + oUpdate.Belnr + "')",
          oUpdate,
          {
            method: "MERGE",
            success: function () {
              oModel.refresh();
              MessageToast.show("Update success!");
            },
            error: function () {
              MessageToast.show("Update failed");
            },
          }
        );
      },
      onDelete() {
        let oModel = this.getView().getModel(),
          oTable = this.getView().byId("infoTable"),
          aIndex = oTable.getSelectedIndices(),
          oContext = oTable.getContextByIndex(aIndex[0]),
          oData = oContext.getObject();

        oModel.remove(
          "/InfoSet(Ryear='" +
            oData.Ryear +
            "',Rbukrs='" +
            oData.Rbukrs +
            "',Belnr='" +
            oData.Belnr.padStart(10, "0") +
            "')",
          {
            method: "DELETE",
            success: function () {
              oModel.refresh();
              MessageToast.show("Delete success!!");
            },
            error: function () {
              MessageToast.show("Delete Error!!");
            },
          }
        );
      },
    });
  }
);
