/*global QUnit*/

sap.ui.define([
	"sync6cl1a10/final_chart/controller/CdsView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CdsView Controller");

	QUnit.test("I should test the CdsView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
