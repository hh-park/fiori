/*global QUnit*/

sap.ui.define([
	"sync6cl1a10/final_test/controller/CartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CartView Controller");

	QUnit.test("I should test the CartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
