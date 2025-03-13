sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
  (Controller, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sync6.cl1.cartproject.controller.CartView", {
      onInit() {},
      onDisplay() {
        var oTable = this.getView().byId("cartTable");
        var aIndex = oTable.getSelectedIndices();
        var oContext = oTable.getContextByIndex(aIndex[0]);
        var oData = oContext.getObject();

        this.getView().byId("Shop").setValue(oData.Shop);
        this.getView().byId("CustomId").setValue(oData.CustomId);
        this.getView().byId("CartNo").setValue(oData.CartNo);
        this.getView().byId("Matnr").setValue(oData.Matnr);
        this.getView().byId("Maktx").setValue(oData.Maktx);
        this.getView().byId("Amount").setValue(oData.Amount);
        this.getView().byId("Waers").setValue(oData.Waers);
        this.getView().byId("GoodsCnt").setValue(oData.GoodsCnt);
        this.getView().byId("Kind").setValue(oData.Kind);
      },

      onClear() {
        this.getView().byId("Shop").setValue("");
        this.getView().byId("CustomId").setValue("");
        this.getView().byId("CartNo").setValue("");
        this.getView().byId("Matnr").setValue("");
        this.getView().byId("Maktx").setValue("");
        this.getView().byId("Amount").setValue("");
        this.getView().byId("Waers").setValue("");
        this.getView().byId("GoodsCnt").setValue("");
        this.getView().byId("Kind").setValue("");
      },

      onSearch() {
        // Set variables
        var vMaktx = this.getView().byId("IMaktx").getValue();
        var vCustomId = this.getView().byId("ICustomId").getValue();

        var oTable = this.getView().byId("cartTable");
        // 검색을 해주는 개체 (Filter 사용 가능)
        var oBinding = oTable.getBinding("rows");

        var oFilter = null; // 검색어를 구성해주는 개체
        var aFilter = []; // 검색어를 담는 배열

        // Set filters
        if (vMaktx != "") {
          oFilter = new Filter({
            path: "Maktx",
            operator: FilterOperator.Contains,
            value1: vMaktx,
          });

          aFilter.push(oFilter);
          oFilter = null;
        }

        oBinding.filter(aFilter);

        if (vCustomId != "") {
          oFilter = new Filter({
            path: "CustomId",
            operator: FilterOperator.EQ,
            value1: vCustomId,
          });

          aFilter.push(oFilter);
          oFilter = null;
        }

        oBinding.filter(aFilter);
      },
      onCreate() {
        var oModel = this.getView().getModel();

        let oCreate = {
          Shop: this.getView().byId("Shop").getValue(),
          CustomId: this.getView().byId("CustomId").getValue(),
          CartNo: parseInt(this.getView().byId("CartNo").getValue()),
          Matnr: this.getView().byId("Matnr").getValue(),
          Maktx: this.getView().byId("Maktx").getValue(),
          Amount: this.getView().byId("Amount").getValue(),
          Waers: this.getView().byId("Waers").getValue(),
          GoodsCnt: parseInt(this.getView().byId("GoodsCnt").getValue()),
          Kind: this.getView().byId("Kind").getValue(),
        };

        oModel.create("/ShoppingSet", oCreate, {
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
        var vCartNo = parseInt(this.getView().byId("CartNo").getValue());
        var vGoodsCnt = parseInt(this.getView().byId("GoodsCnt").getValue());

        let oUpdate = {
          Shop: this.getView().byId("Shop").getValue(),
          CustomId: this.getView().byId("CustomId").getValue(),
          CartNo: vCartNo,
          Matnr: this.getView().byId("Matnr").getValue(),
          Maktx: this.getView().byId("Maktx").getValue(),
          Amount: this.getView().byId("Amount").getValue(),
          Waers: this.getView().byId("Waers").getValue(),
          GoodsCnt: vGoodsCnt,
          Kind: this.getView().byId("Kind").getValue(),
        };

        oModel.update(
          "/ShoppingSet(Shop='" + oUpdate.Shop + "'," + "CustomId='" + oUpdate.CustomId + "')",

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
          oTable = this.getView().byId("cartTable"),
          aIndex = oTable.getSelectedIndices(),
          oContext = oTable.getContextByIndex(aIndex[0]),
          oData = oContext.getObject();

        oModel.remove("/ShoppingSet(Shop='" + oData.Shop + "'," + "CustomId='" + oData.CustomId + "')", {
          method: "DELETE",
          success: function () {
            oModel.refresh();
            MessageToast.show("Delete success!!");
          },
          error: function () {
            MessageToast.show("Delete Error!!");
          },
        });
      },
    });
  }
);
