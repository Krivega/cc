"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

var plugin_exports = {};
__export(plugin_exports, {
  cloudPlugin: () => cloudPlugin,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_debug = __toESM(require("debug"));
var import_fs = __toESM(require("fs"));
var import_util2 = require("util");
var import_ws = __toESM(require("ws"));

var import_chalk = __toESM(require("chalk"));
var import_util = __toESM(require("util"));
var log = (...args) => console.log(import_util.default.format(...args));
var format = import_util.default.format;
var withWarning = (msg) => import_chalk.default.bgYellow.black(" WARNING ") + " " + msg;
var warn = (...args) => log(withWarning(import_util.default.format(...args)));
var cyan = import_chalk.default.cyan;
var blue = import_chalk.default.blueBright;
var red = import_chalk.default.red;
var green = import_chalk.default.greenBright;
var gray = import_chalk.default.gray;
var white = import_chalk.default.white;
var magenta = import_chalk.default.magenta;
var bold = import_chalk.default.bold;
var dim = import_chalk.default.dim;

var Event = ((Event2) => {
  Event2["RUN_CANCELLED"] = "run:cancelled";
  Event2["RUN_RESULT"] = "run:result";
  Event2["TEST_AFTER_RUN"] = "test:after:run";
  Event2["TEST_BEFORE_RUN"] = "test:before:run";
  Event2["AFTER_SCREENSHOT"] = "after:screenshot";
  Event2["AFTER_SPEC"] = "after:spec";
  return Event2;
})(Event || {});
var allEvents = Object.values(Event);

var import_events = __toESM(require("events"));

var _debug = (0, import_debug.default)("cc:plugin");
async function cloudPlugin(on, config) {
  function debug(...args) {
    if (config.env.cc_debug_enabled) {
      _debug((0, import_util2.format)(...args));
    }
  }
  if (!config.env.cc_marker) {
    warn(
      `Cc plugin is not installed properly - missing required variables in ${dim(
        "cypress.env"
      )}. Please refer to: self`
    );
  }
  let ws = null;
  function sendToWS(message) {
    if (ws) {
      ws.send(JSON.stringify(message));
    }
  }
  if (config.env.cc_ws) {
    debug("setting port to %s", config.env.cc_ws);
    await new Promise((resolve) => {
      ws = new import_ws.default(`ws://localhost:${config.env.cc_ws}`);
      ws.on("open", () => {
        resolve(null);
      });
    });
  }
  on("after:screenshot", (details) => {
    sendToWS({
      type: "after:screenshot",
      payload: details
    });
  });
  on("task", {
    "cc:test:after:run": (test) => {
      debug("cc:test:after:run task received %o", test);
      sendToWS({
        type: "test:after:run",
        payload: test
      });
      return null;
    },
    "cc:test:before:run": (test) => {
      debug("cc:test:before:run task received %o", test);
      sendToWS({
        type: "test:before:run",
        payload: test
      });
      return null;
    }
  });
  on("before:spec", (spec) => {
    debug("before:spec task received %o", spec);
    sendToWS({ type: "before:spec", payload: { spec } });
  });
  on("after:spec", (spec, results) => {
    debug("after:spec task received %o", spec);
    sendToWS({
      type: "after:spec",
      payload: {
        spec,
        results
      }
    });
  });
  debug("cc plugin loaded");
  if (config.env.cc_temp_file) {
    debug("dumping config to '%s'", config.env.cc_temp_file);
    import_fs.default.writeFileSync(config.env.cc_temp_file, JSON.stringify(config));
    debug("config is availabe at '%s'", config.env.cc_temp_file);
  }
  return config;
}
var plugin_default = cloudPlugin;
0 && (module.exports = {
  cloudPlugin
});
