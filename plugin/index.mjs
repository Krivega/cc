import Debug from "debug";
import fs from "fs";
import { format as format2 } from "util";
import WebSocket from "ws";

import chalk from "chalk";
import util from "util";
var log = (...args) => console.log(util.format(...args));
var format = util.format;
var withWarning = (msg) => chalk.bgYellow.black(" WARNING ") + " " + msg;
var warn = (...args) => log(withWarning(util.format(...args)));
var cyan = chalk.cyan;
var blue = chalk.blueBright;
var red = chalk.red;
var green = chalk.greenBright;
var gray = chalk.gray;
var white = chalk.white;
var magenta = chalk.magenta;
var bold = chalk.bold;
var dim = chalk.dim;

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


var _debug = Debug("cc:plugin");
async function cloudPlugin(on, config) {
  function debug(...args) {
    if (config.env.cc_debug_enabled) {
      _debug(format2(...args));
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
      ws = new WebSocket(`ws://localhost:${config.env.cc_ws}`);
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
    fs.writeFileSync(config.env.cc_temp_file, JSON.stringify(config));
    debug("config is availabe at '%s'", config.env.cc_temp_file);
  }
  return config;
}
var plugin_default = cloudPlugin;
export {
  cloudPlugin,
  plugin_default as default
};
