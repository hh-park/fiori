sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
  (Controller, MessageToast, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sync6.cl1.documentedit.controller.DocuView", {
      onInit() {},

      onClear() {
        this.getView().byId("Bukrs").setValue("");
        this.getView().byId("Gjahr").setValue("");
        this.getView().byId("Blart").setValue("");
        this.getView().byId("Budat").setValue("");
        this.getView().byId("Belnr").setValue("");
        this.getView().byId("Bktxt").setValue("");
        this.getView().byId("Waers").setValue("");
        this.getView().byId("Wrbtr").setValue("");
      },

      onSearch() {
        // Get Search keyword
        var vBktxt = this.getView().byId("IBktxt").getValue();
        var vBlart = this.getView().byId("IBlart").getValue();

        // Get Table object
        var oTable = this.getView().byId("docuTable");
        // 검색을 해주는 개체 (Filter 사용 가능)
        var oBinding = oTable.getBinding("rows");

        var oFilter = null; // 검색어를 구성해주는 개체
        var aFilter = []; // 검색어를 담는 배열

        // filter 구성
        if (vBktxt != "") {
          oFilter = new Filter({
            path: "Bktxt",
            operator: FilterOperator.Contains,
            value1: vBktxt,
          });

          aFilter.push(oFilter); // 구성된 검색어를 배열에 담아줌
          oFilter = null;
        }

        oBinding.filter(aFilter);

        if (vBlart != "") {
          oFilter = new Filter({
            path: "Blart",
            operator: FilterOperator.EQ,
            value1: vBlart.toUpperCase(),
          });

          aFilter.push(oFilter);
          oFilter = null;
        }

        oBinding.filter(aFilter);
      },

      onDisplay() {
        var oTable = this.getView().byId("docuTable");
        // Get selected index (abap에 go_grid->get_selected_rows)
        var aIndex = oTable.getSelectedIndices();
        // (READ TABLE gt_body INTO gs_body INDEX index.랑 같은 맥락)
        var oContext = oTable.getContextByIndex(aIndex[0]);
        var oData = oContext.getObject(); // gs_body

        this.getView().byId("Bukrs").setValue(oData.Bukrs);
        this.getView().byId("Gjahr").setValue(oData.Gjahr);
        this.getView().byId("Blart").setValue(oData.Blart);
        this.getView().byId("Budat").setValue(oData.Budat);
        this.getView().byId("Belnr").setValue(oData.Belnr);
        this.getView().byId("Bktxt").setValue(oData.Bktxt);
        this.getView().byId("Waers").setValue(oData.Waers);
        this.getView().byId("Wrbtr").setValue(oData.Wrbtr);
      },

      onCreate() {
        // GW service 실행개체 (create, read, update, delete)
        var oModel = this.getView().getModel();
        var vWrbtr = this.getView().byId("Wrbtr").getValue().replaceAll(",", "");
        var vBudat = this.getView().byId("Budat").getValue();
        const cBudat = new Date(vBudat).toISOString().split("T")[0];

        let oCreate = {
          Bukrs: this.getView().byId("Bukrs").getValue(),
          Gjahr: this.getView().byId("Gjahr").getValue(),
          Blart: this.getView().byId("Blart").getValue(),
          Budat: cBudat,
          Belnr: this.getView().byId("Belnr").getValue(),
          Bktxt: this.getView().byId("Bktxt").getValue(),
          Waers: this.getView().byId("Waers").getValue(),
          Wrbtr: vWrbtr,
        };

        oModel.create("/FIDocuentSet", oCreate, {
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
        var vWrbtr = this.getView().byId("Wrbtr").getValue().replaceAll(",", "");
        var vBudat = this.getView().byId("Budat").getValue();
        const cBudat = new Date(vBudat).toISOString().split("T")[0];

        let oUpdate = {
          Bukrs: this.getView().byId("Bukrs").getValue(),
          Gjahr: this.getView().byId("Gjahr").getValue(),
          Blart: this.getView().byId("Blart").getValue(),
          Budat: cBudat,
          //   Belnr: this.getView().byId("Belnr").getValue(),
          Belnr: this.getView().byId("Belnr").getValue().toString().padStart(10, "0"),
          Bktxt: this.getView().byId("Bktxt").getValue(),
          Waers: this.getView().byId("Waers").getValue(),
          Wrbtr: vWrbtr,
        };

        oModel.update(
          "/FIDocuentSet(Bukrs='" +
            oUpdate.Bukrs +
            "'," +
            "Gjahr='" +
            oUpdate.Gjahr +
            "'," +
            "Belnr='" +
            oUpdate.Belnr +
            "')",

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

      onDelete: function () {
        let oModel = this.getView().getModel(),
          oTable = this.getView().byId("docuTable"),
          aIndex = oTable.getSelectedIndices(),
          oContext = oTable.getContextByIndex(aIndex[0]),
          oData = oContext.getObject(); // gs_body

        oModel.remove(
          "/FIDocuentSet(Bukrs='" +
            oData.Bukrs +
            "'," +
            "Gjahr='" +
            oData.Gjahr +
            "'," +
            "Belnr='" +
            oData.Belnr.toString().padStart(10, "0") +
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
