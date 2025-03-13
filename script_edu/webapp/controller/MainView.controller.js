sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
  ],
  (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("sync6.cl1.scriptedu.controller.MainView", {
      onInit() {
        // Make OData
        var oData = {
          // 일반 프로퍼티
          Btntext: "OData text",
          Btnicon: "sap-icon://action",

          // 스트럭쳐
          gs_input: {
            Intext: "OData input",
            Inholder: "OData place holder",
          },
        };

        var gs_change = {
          Btext: "Change width",
          Bicon: "sap-icon://journey-change",
        };

        // Get Model
        var oModel = new JSONModel(oData);
        var oModel2 = new JSONModel(gs_change);
        var oModel3 = new JSONModel("/json/student.json");

        // Bind Model
        this.getView().setModel(oModel); // 뷰에서 해당 oData를 사용할 수 있게 된다.
        this.getView().setModel(oModel2, "btn");
        this.getView().setModel(oModel3, "student");
      },
      onFruits: function () {
        // View에서 입력한 값을 받아옴
        var vWord = this.getView().byId("word").getValue();
        var vFruits;

        // 입력받은 값으로 과일 이름을 출력
        switch (vWord) {
          case "A":
            vFruits = "Apple";
            break;
          case "B":
            vFruits = "Banana";
            break;
          case "C":
            vFruits = "Orange";
            break;

          default:
            vFruits = "Please enter valid code";
            break;
        }
        MessageToast.show(vFruits);
      },
      onAdd: function () {
        var vNum1, vNum2, vResult;

        // View로부터 값을 받아온다
        vNum1 = this.getView().byId("num1").getValue();
        vNum2 = this.getView().byId("num2").getValue();

        vResult = parseInt(vNum1) + parseInt(vNum2);
        this.getView().byId("result").setValue(vResult);

        // MessageToast.show("Result = " + vResult);
      },
      onFor: function () {
        // 배열 선언
        let aData = ["A", "B", "C"];

        for (let i = 0; i < aData.length; i++) {
          console.log("aData[", i, "] = ", aData[i]);
        }

        let aArray = [
          {
            value1: "Jonro",
            value2: "Euljiro",
            value3: "Gwancheol",
          },
          {
            value1: "Gangdong",
            value2: "Songpa",
            value3: "Seocho",
          },
        ];

        for (let i in aArray) {
          console.log(aArray[i]);
        }
      },
      onWidth: function () {
        // UI component로부터 값을 읽어옴옴
        var vWidth = this.getView().byId("word").getValue();

        // 입력받은 값을 메소드에 할당
        this.getView()
          .byId("word")
          .setWidth(vWidth + "px");
      },
      onClear: function () {
        this.getView().byId("word").setValue("");
        this.getView().byId("num1").setValue("");
        this.getView().byId("num2").setValue("");
        this.getView().byId("in1").setValue("");
        this.getView().byId("car").setValue("");
      },
    });
  }
);
