/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sync6c1/payment_chart/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
