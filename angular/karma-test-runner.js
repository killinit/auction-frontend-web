Error.stackTraceLimit = Infinity;

// Load the polyfills needed for testing
// (the app has them in vendor.ts)
require('reflect-metadata');
require('zone.js/dist/zone.js');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.setBaseTestProviders(
    browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

Object.assign(global, testing);


// List the spec names
var testContext = require.context('./src', true, /\.spec\.ts/);


// A function to load specs
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

var modules = requireAll(testContext);
