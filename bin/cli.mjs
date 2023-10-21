#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

import chalk from "chalk";
import cp from "child_process";
import { default as Debug, default as Debug2 } from "debug";
import EventEmitter from "events";
import http from "http";
import HttpTerminator from "lil-http-terminator";
import { createRequire } from "module";
import "source-map-support/register";
import { P, match } from "ts-pattern";
import util from "util";
import * as WebSocket from "ws";
var init_esm_shims = __esm({
  "../../node_modules/tsup/assets/esm_shims.js"() {
    "use strict";
  }
});

var require_extra_typings = __commonJS({
  "bin/lib/@commander-js/extra-typings/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var commander = __require("commander");
    exports = module.exports = {};
    exports.program = new commander.Command();
    exports.Argument = commander.Argument;
    exports.Command = commander.Command;
    exports.CommanderError = commander.CommanderError;
    exports.Help = commander.Help;
    exports.InvalidArgumentError = commander.InvalidArgumentError;
    exports.InvalidOptionArgumentError = commander.InvalidArgumentError;
    exports.Option = commander.Option;
    exports.createCommand = (name) => new commander.Command(name);
    exports.createOption = (flags, description) => new commander.Option(flags, description);
    exports.createArgument = (name, description) => new commander.Argument(name, description);
  }
});

init_esm_shims();

init_esm_shims();
var ValidationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "";
  }
};

init_esm_shims();
var log = (...args) => console.log(util.format(...args));
var info = log;
var format = util.format;
var withError = (msg) => chalk.bgRed.white(" ERROR ") + " " + msg;
var withWarning = (msg) => chalk.bgYellow.black(" WARNING ") + " " + msg;
var warn = (...args) => log(withWarning(util.format(...args)));
var error = (...args) => log(withError(util.format(...args)) + "\n");
var title = (color, ...args) => info("\n  " + chalk[color].bold(util.format(...args)) + "  \n");
var divider = () => console.log("\n" + chalk.gray(Array(100).fill("=").join("")) + "\n");
var spacer = (n = 0) => console.log(Array(n).fill("").join("\n"));
var cyan = chalk.cyan;
var blue = chalk.blueBright;
var red = chalk.red;
var green = chalk.greenBright;
var gray = chalk.gray;
var white = chalk.white;
var magenta = chalk.magenta;
var bold = chalk.bold;
var dim = chalk.dim;

init_esm_shims();

init_esm_shims();

init_esm_shims();
var require2 = createRequire(import.meta.url);

init_esm_shims();
var orginal = cp.spawn;
cp.spawn = function(command, args, options) {
  if (command.match(/Cypress/)) {
    const process2 = orginal(command, args, {
      ...options,
      stdio: ["pipe", "pipe", "pipe"]
    });
    return process2;
  }
  return orginal(command, args, options);
};

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();
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

init_esm_shims();
var _pubsub = null;
var getPubSub = () => {
  if (!_pubsub) {
    _pubsub = new EventEmitter();
  }
  return _pubsub;
};

var debug = Debug("cc:ws");
var server = null;
var wss = null;
var httpTerminator = null;
var getWSSPort = () => match(server?.address()).with({ port: P.number }, (address) => address.port).otherwise(() => 0);
var stopWSS = async () => {
  debug("terminating wss server: %d", getWSSPort());
  if (!httpTerminator) {
    debug("no wss server");
    return;
  }
  const { success, code, message, error: error2 } = await httpTerminator.terminate();
  if (!success) {
    if (code === "TIMED_OUT")
      error2(message);
    if (code === "SERVER_ERROR")
      error2(message, error2);
    if (code === "INTERNAL_ERROR")
      error2(message, error2);
  }
  debug("terminated wss server: %d", getWSSPort());
};
var startWSS = () => {
  if (wss) {
    return;
  }
  server = http.createServer().on("listening", () => {
    if (!server) {
      throw new Error("Server not initialized");
    }
    wss = new WebSocket.WebSocketServer({
      server
    });
    debug("starting wss on port %d", getWSSPort());
    wss.on("connection", function connection(ws) {
      ws.on("message", function incoming(event) {
        const message = JSON.parse(event.toString());
        getPubSub().emit(message.type, message.payload);
      });
    });
  }).listen();
  httpTerminator = HttpTerminator({
    server
  });
};

init_esm_shims();
var debug2 = Debug2("cc:capture");
var _write = process.stdout.write;
var _log = process.log;
var restore = function() {
  process.stdout.write = _write;
  process.log = _log;
};
var stdout = function() {
  debug2("capturing stdout");
  let logs = [];
  const { write } = process.stdout;
  const { log: log2 } = process;
  if (log2) {
    process.log = function(str) {
      logs.push(str);
      return log2.apply(this, arguments);
    };
  }
  process.stdout.write = function(str) {
    logs.push(str);
    return write.apply(this, arguments);
  };
  return {
    toString() {
      return logs.join("");
    },
    data: logs,
    restore,
    reset: () => {
      debug2("resetting captured stdout");
      logs = [];
    }
  };
};
var initialOutput = "";
var capturedOutput = null;
var initCapture = () => capturedOutput = stdout();
var cutInitialOutput = () => {
  if (!capturedOutput)
    throw new Error("capturedOutput is null");
  initialOutput = capturedOutput.toString();
  capturedOutput.reset();
};
var resetCapture = () => {
  if (!capturedOutput)
    throw new Error("capturedOutput is null");
  capturedOutput.reset();
};
var getCapturedOutput = () => {
  if (!capturedOutput)
    throw new Error("capturedOutput is null");
  return capturedOutput.toString();
};
var getInitialOutput = () => initialOutput;

init_esm_shims();
var _runId = void 0;
var setRunId = (runId) => {
  _runId = runId;
};
var _cypressVersion = void 0;
var setCypressVersion = (cypressVersion) => {
  _cypressVersion = cypressVersion;
};
var _ccVersion = void 0;
var setCcVersion = (v) => {
  _ccVersion = v;
};

var cypressPkg = require2("cypress/package.json");
var pkg = require2("@krivega/cc/package.json");
initCapture();
setCypressVersion(cypressPkg.version);
setCcVersion(pkg.version);

import git from "@cypress/commit-info";
import axios, { isAxiosError } from "axios";
import axiosRetry from "axios-retry";
import bluebird from "bluebird";
import { default as commonPathPrefix, default as getCommonPathPrefix } from "common-path-prefix";
import { getBinPath } from "cy2";
import cypress from "cypress";
import { parseISO, parseISO as parseISO2 } from "date-fns";
import { default as Debug10, default as Debug11, default as Debug12, default as Debug13, default as Debug14, default as Debug15, default as Debug16, default as Debug17, default as Debug18, default as Debug19, default as Debug21, default as Debug3, default as Debug4, default as Debug5, default as Debug6, default as Debug7, default as Debug8, default as Debug9, default as debug3, default as debugFn } from "debug";
import execa from "execa";
import { default as fs, default as fs3 } from "fs";
import fs2 from "fs/promises";
import getos from "getos";
import globby from "globby";
import isAbsolute from "is-absolute";
import { default as _, default as _10, default as _11, default as _2, default as _3, default as _4, default as _5, default as _6, default as _7, default as _8, default as _9 } from "lodash";
import { customAlphabet } from "nanoid";
import os, { cpus, freemem, platform, release, totalmem } from "os";
import { join as join2, default as path2, default as path3, default as path4, default as path5 } from "path";
import { default as prettyMS, default as prettyMilliseconds } from "pretty-ms";
import { table } from "table";
import { file } from "tmp-promise";
import { P as P2, P as P3, match as match2, match as match3, match as match4 } from "ts-pattern";
import { promisify } from "util";

init_esm_shims();
function getLegalNotice() {
  return `
Copyright (C) ${(/* @__PURE__ */ new Date()).getFullYear()} cc
`;
}

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();
var isRetriableError = (err) => {
  if (err.code === "ECONNABORTED") {
    return true;
  }
  if (err.code === "ECONNREFUSED") {
    return true;
  }
  if (err.code === "ETIMEDOUT") {
    return true;
  }
  if (!isAxiosError(err)) {
    return false;
  }
  return !!(err?.response?.status && 500 <= err.response.status && err.response.status < 600);
};
var getDelay = (i) => [5 * 1e3, 10 * 1e3, 30 * 1e3][i - 1];
var baseURL = "set baseURL";
var getAPIBaseUrl = () => baseURL ?? "set baseURL";
var setAPIBaseUrl = (url) => baseURL = url ?? "set baseURL";

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();
var createTempFile = async () => {
  const { path: path6 } = await file();
  return path6;
};

init_esm_shims();

init_esm_shims();

init_esm_shims();
var DebugMode = ((DebugMode2) => {
  DebugMode2["None"] = "none";
  DebugMode2["All"] = "all";
  DebugMode2["Cc"] = "cc";
  DebugMode2["Cypress"] = "cypress";
  DebugMode2["CommitInfo"] = "commit-info";
  return DebugMode2;
})(DebugMode || {});

function shouldEnablePluginDebug(param) {
  return match2(param).with(P2.nullish, () => false).with("none", () => false).with(true, () => true).with("all", () => true).with("cc", () => true).with(
    P2.array(P2.string),
    (v) => v.includes("all") || v.includes("cc")
  ).otherwise(() => false);
}
function activateDebug(mode) {
  match2(mode).with(P2.instanceOf(Array), (i) => i.forEach(setDebugMode)).with(true, () => setDebugMode("all")).with(
    P2.union(
      "all",
      "cc",
      "cypress",
      "commit-info"
    ),
    (i) => setDebugMode(i)
  ).otherwise(() => setDebugMode("none"));
}
function setDebugMode(mode) {
  if (mode === "none") {
    return;
  }
  const tokens = new Set(process.env.DEBUG ? process.env.DEBUG.split(",") : []);
  match2(mode).with("all", () => {
    tokens.add("commit-info");
    tokens.add("cc:*");
    tokens.add("cypress:*");
  }).with("cc", () => tokens.add("cc:*")).with("cypress", () => tokens.add("cypress:*")).with("commit-info", () => tokens.add("commit-info")).otherwise(() => {
  });
  debug3.enable(Array.from(tokens).join(","));
}

init_esm_shims();
bluebird.Promise.config({
  cancellation: true
});
var BPromise = bluebird.Promise;
var safe = (fn, ifFaled, ifSucceed) => async (...args) => {
  try {
    const r = await fn(...args);
    ifSucceed();
    return r;
  } catch (e) {
    return ifFaled(e);
  }
};
var sortObjectKeys = (obj) => {
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
};

init_esm_shims();
var getRandomString = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);

var debug4 = Debug3("cc:boot");
function getBootstrapArgs({
  params,
  tempFilePath
}) {
  return _.chain(getCypressCLIParams(params)).thru((opts) => ({
    ...opts,
    env: {
      ...opts.env ?? {},
      cc_marker: true,
      cc_temp_file: tempFilePath,
      cc_debug_enabled: shouldEnablePluginDebug(params.cloudDebug)
    }
  })).tap((opts) => {
    debug4("cypress bootstrap params: %o", opts);
  }).thru((opts) => ({
    ...opts,
    env: sortObjectKeys(opts.env ?? {})
  })).thru(serializeOptions).tap((opts) => {
    debug4("cypress bootstrap serialized params: %o", opts);
  }).thru((args) => {
    return [
      ...args,
      "--spec",
      getRandomString(),
      params.testingType === "component" ? "--component" : "--e2e"
    ];
  }).value();
}
function getCypressCLIParams(params) {
  const result = getCypressRunAPIParams(params);
  const testingType = result.testingType === "component" ? {
    component: true
  } : {};
  return {
    ..._.omit(result, "testingType"),
    ...testingType
  };
}
function serializeOptions(options) {
  return Object.entries(options).flatMap(([key, value]) => {
    const _key = dashed(key);
    if (typeof value === "boolean") {
      return value === true ? [`--${_key}`] : [`--${_key}`, false];
    }
    if (_.isObject(value)) {
      return [`--${_key}`, serializeComplexParam(value)];
    }
    return [`--${_key}`, value.toString()];
  });
}
function serializeComplexParam(param) {
  return JSON.stringify(param);
}
var dashed = (v) => v.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

var debug5 = Debug4("cc:boot");
var bootCypress = async (params) => {
  debug5("booting cypress...");
  const tempFilePath = await createTempFile();
  const cypressBin = await getBinPath(require2.resolve("cypress"));
  debug5("cypress executable location: %s", cypressBin);
  const args = getBootstrapArgs({ tempFilePath, params });
  debug5("booting cypress with args: %o", args);
  const { stdout: stdout2, stderr } = await execCypress(cypressBin, args);
  if (!fs.existsSync(tempFilePath)) {
    throw new Error(
      `Cannot resolve cypress configuration from ${tempFilePath}. Please report the issue.`
    );
  }
  try {
    const f = fs.readFileSync(tempFilePath, "utf-8");
    if (!f) {
      throw new Error("Is @krivega/cc/plugin installed?");
    }
    debug5("cypress config '%s': '%s'", tempFilePath, f);
    return JSON.parse(f);
  } catch (err) {
    debug5("read config temp file failed: %o", err);
    info(bold("Cypress stdout:\n"), stdout2);
    info(bold("Cypress stderr:\n"), stderr);
    throw new ValidationError(`Unable to resolve cypress configuration
- make sure that '@krivega/cc/plugin' is installed
- report the issue together with cypress stdout and stderr
`);
  }
};
async function execCypress(cypressBin, args) {
  let stdout2 = "";
  let stderr = "";
  try {
    await execa(cypressBin, ["run", ...args], {
      stdio: "pipe",
      env: {
        ...process.env,
        CYPRESS_RECORD_KEY: void 0,
        CYPRESS_PROJECT_ID: void 0
      }
    });
  } catch (err) {
    debug5("exec cypress failed (certain failures are expected): %o", err);
    stdout2 = err.stdout;
    stderr = err.stderr;
  }
  return { stdout: stdout2, stderr };
}

init_esm_shims();
var defaultFilenames = [
  "cc.config.js",
  "cc.config.cjs",
  "cc.config.mjs"
];
function getConfigFilePath(projectRoot = null, explicitConfigFilePath) {
  const prefix = projectRoot ?? process.cwd();
  if (_2.isString(explicitConfigFilePath) && isAbsolute(explicitConfigFilePath)) {
    return [explicitConfigFilePath];
  }
  if (_2.isString(explicitConfigFilePath)) {
    return [normalizePath(prefix, explicitConfigFilePath)];
  }
  return defaultFilenames.map((p) => normalizePath(prefix, p));
}
function normalizePath(prefix, filename) {
  return `file://${path2.resolve(prefix, filename)}`;
}

var debug6 = Debug5("cc:config");
var _config = null;
var defaultConfig = {
  e2e: {
    batchSize: 3
  },
  component: {
    batchSize: 5
  },
  cloudServiceUrl: "set baseURL",
  networkHeaders: void 0
};
async function getCcConfig(projectRoot, explicitConfigFilePath) {
  if (_config) {
    return _config;
  }
  const configFilePath = getConfigFilePath(projectRoot, explicitConfigFilePath);
  for (const filepath of configFilePath) {
    const config = match3(await loadConfigFile(filepath)).with({ default: P3.not(P3.nullish) }, (c) => c.default).with(P3.not(P3.nullish), (c) => c).otherwise(() => null);
    if (config) {
      debug6("loaded cc config from '%s'\n%O", filepath, config);
      info(`Using config file: ${dim(filepath)}`);
      _config = {
        ...defaultConfig,
        ...config
      };
      return _config;
    }
  }
  warn(
    "Failed to load config file, falling back to the default config. Attempted locations: %s",
    configFilePath
  );
  _config = defaultConfig;
  return _config;
}
async function loadConfigFile(filepath) {
  try {
    debug6("loading cc config file from '%s'", filepath);
    return await import(filepath);
  } catch (e) {
    debug6("failed loading config file from: %s", e);
    return null;
  }
}
async function getMergedConfig(params) {
  debug6("resolving cypress config");
  const cypressResolvedConfig = await bootCypress(params);
  debug6("cypress resolvedConfig: %O", cypressResolvedConfig);
  const rawE2EPattern = cypressResolvedConfig.rawJson?.e2e?.specPattern;
  let additionalIgnorePattern = [];
  if (params.testingType === "component" && rawE2EPattern) {
    additionalIgnorePattern = rawE2EPattern;
  }
  const result = {
    projectRoot: cypressResolvedConfig?.projectRoot || process.cwd(),
    projectId: params.projectId,
    specPattern: cypressResolvedConfig?.specPattern || "**/*.*",
    excludeSpecPattern: (
      cypressResolvedConfig?.resolved.excludeSpecPattern.value ?? []
    ),
    additionalIgnorePattern,
    resolved: cypressResolvedConfig,
    experimentalCoverageRecording: params.experimentalCoverageRecording
  };
  debug6("merged config: %O", result);
  return result;
}

init_esm_shims();
var debug7 = Debug6("cc:validateParams");
async function resolveCcParams(params) {
  const configFromFile = await getCcConfig(
    params.project,
    params.cloudConfigFile
  );
  debug7("resolving cc params: %o", params);
  debug7("resolving cc config file: %o", configFromFile);
  const cloudServiceUrl = params.cloudServiceUrl ?? process.env.CC_API_URL ?? configFromFile.cloudServiceUrl;
  const recordKey = params.recordKey ?? process.env.CC_RECORD_KEY ?? configFromFile.recordKey;
  const projectId = params.projectId ?? process.env.CC_PROJECT_ID ?? configFromFile.projectId;
  const testingType = params.testingType ?? "e2e";
  let batchSize = params.batchSize;
  if (!batchSize) {
    batchSize = testingType === "e2e" ? configFromFile.e2e.batchSize : configFromFile.component.batchSize;
  }
  return {
    ...params,
    cloudServiceUrl,
    recordKey,
    projectId,
    batchSize,
    testingType
  };
}
var projectIdError = `Cannot resolve projectId. Please use one of the following:
- provide it as a "projectId" property for "run" API method
- set CC_PROJECT_ID environment variable
- set "projectId" in "cc.config.{c}js" file`;
var cloudServiceUrlError = `Cannot resolve cloud service URL. Please use one of the following:
- provide it as a "cloudServiceUrl" property for "run" API method
- set CC_API_URL environment variable
- set "cloudServiceUrl" in "cc.config.{c}js" file`;
var cloudServiceInvalidUrlError = `Invalid cloud service URL provided`;
var recordKeyError = `Cannot resolve record key. Please use one of the following:

- pass it as a CLI flag '-k, --key <record-key>'
- provide it as a "recordKey" property for "run" API method
- set CC_RECORD_KEY environment variable
- set "recordKey" in "cc.config.{c}js" file
`;
async function validateParams(_params) {
  const params = await resolveCcParams(_params);
  debug7("validating cc params: %o", params);
  if (!params.cloudServiceUrl) {
    throw new ValidationError(cloudServiceUrlError);
  }
  if (!params.projectId) {
    throw new ValidationError(projectIdError);
  }
  if (!params.recordKey) {
    throw new ValidationError(recordKeyError);
  }
  validateURL(params.cloudServiceUrl);
  const requiredParameters = [
    "testingType",
    "batchSize",
    "projectId"
  ];
  requiredParameters.forEach((key) => {
    if (typeof params[key] === "undefined") {
      error('Missing required parameter "%s"', key);
      throw new Error("Missing required parameter");
    }
  });
  params.tag = parseTags(params.tag);
  params.autoCancelAfterFailures = getAutoCancelValue(
    params.autoCancelAfterFailures
  );
  debug7("validated cc params: %o", params);
  return params;
}
function getAutoCancelValue(value) {
  if (typeof value === "undefined") {
    return void 0;
  }
  if (typeof value === "boolean") {
    return value ? 1 : false;
  }
  if (typeof value === "number" && value > 0) {
    return value;
  }
  throw new ValidationError(
    `autoCancelAfterFailures: should be a positive integer or "false". Got: "${value}"`
  );
}
function isOffline(params) {
  return params.record === false;
}
function parseTags(tagString) {
  if (!tagString) {
    return [];
  }
  if (Array.isArray(tagString)) {
    return tagString.filter(Boolean);
  }
  return tagString.split(",").map((tag) => tag.trim()).filter(Boolean);
}
function validateURL(url) {
  try {
    new URL(url);
  } catch (err) {
    throw new ValidationError(`${cloudServiceInvalidUrlError}: "${url}"`);
  }
}
function getCypressRunAPIParams(params) {
  return {
    ..._3.pickBy(
      _3.omit(params, [
        "cloudDebug",
        "cloudConfigFile",
        "autoCancelAfterFailures",
        "cloudServiceUrl",
        "batchSize",
        "projectId",
        "key",
        "recordKey",
        "record",
        "group",
        "parallel",
        "tag",
        "ciBuildId",
        "spec",
        "exit",
        "headless",
        "experimentalCoverageRecording"
      ]),
      Boolean
    ),
    record: false,
    env: {
      ...params.env,
      cc_debug_enabled: shouldEnablePluginDebug(params.cloudDebug)
    }
  };
}
function preprocessParams(params) {
  return {
    ...params,
    spec: processSpecParam(params.spec)
  };
}
function processSpecParam(spec) {
  if (!spec) {
    return void 0;
  }
  if (Array.isArray(spec)) {
    return _3.flatten(spec.map((i) => i.split(",")));
  }
  return spec.split(",");
}

init_esm_shims();
function maybePrintErrors(err) {
  if (!err.response?.data || !err.response?.status) {
    return;
  }
  const { message, errors } = err.response.data;
  switch (err.response.status) {
    case 401:
      warn("Received 401 Unauthorized");
      break;
    case 422:
      spacer(1);
      warn(...formatGenericError(message, errors));
      spacer(1);
      break;
    default:
      break;
  }
}
function formatGenericError(message, errors) {
  if (!_4.isString(message)) {
    return ["Unexpected error from the cloud service"];
  }
  if (errors?.length === 0) {
    return [message];
  }
  return [
    message,
    `
${(errors ?? []).map((e) => `  - ${e}`).join("\n")}
`
  ];
}

var debug8 = Debug7("cc:api");
var MAX_RETRIES = 3;
var TIMEOUT_MS = 30 * 1e3;
var _client = null;
async function getClient() {
  if (_client) {
    return _client;
  }
  const ccConfig = await getCcConfig();
  _client = axios.create({
    baseURL: getAPIBaseUrl(),
    timeout: TIMEOUT_MS
  });
  _client.interceptors.request.use((config) => {
    const ccyVerson = _ccVersion ?? "0.0.0";
    const headers = {
      ...config.headers,
      "x-cypress-request-attempt": config["axios-retry"]?.retryCount ?? 0,
      "x-cypress-version": _cypressVersion ?? "0.0.0",
      "x-ccy-version": ccyVerson,
      "User-Agent": `@krivega/cc/${ccyVerson}`
    };
    if (_runId) {
      headers["x-cypress-run-id"] = _runId;
    }
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    if (ccConfig.networkHeaders) {
      const filteredHeaders = _5.omit(ccConfig.networkHeaders, [
        "x-cypress-request-attempt",
        "x-cypress-version",
        "x-ccy-version",
        "x-cypress-run-id",
        "Content-Type"
      ]);
      debug8("using custom network headers: %o", filteredHeaders);
      Object.assign(headers, filteredHeaders);
    }
    const req = {
      ...config,
      headers
    };
    debug8("network request: %o", {
      ..._5.pick(req, "method", "url", "headers"),
      data: Buffer.isBuffer(req.data) ? "buffer" : req.data
    });
    return req;
  });
  axiosRetry(_client, {
    retries: MAX_RETRIES,
    retryCondition: isRetriableError,
    retryDelay: getDelay,
    onRetry,
    shouldResetTimeout: true
  });
  return _client;
}
function onRetry(retryCount, err, config) {
  warn(
    "Network request '%s' failed: '%s'. Next attempt is in %s (%d/%d).",
    `${config.method} ${config.url}`,
    err.message,
    prettyMilliseconds(getDelay(retryCount)),
    retryCount,
    MAX_RETRIES
  );
}
var makeRequest = async (config) => {
  return (await getClient())(config).then((res) => {
    debug8("network response: %o", _5.omit(res, "request", "config"));
    return res;
  }).catch((error2) => {
    maybePrintErrors(error2);
    throw new ValidationError(error2.message);
  });
};

init_esm_shims();
function printWarnings(warnings) {
  warn("Notice from cloud service:");
  warnings.map((w) => {
    spacer(1);
    info(magenta.bold(w.message));
    Object.entries(_6.omit(w, "message")).map(([key, value]) => {
      info("- %s: %s", key, value);
    });
    spacer(1);
  });
}

var createRun = async (payload) => {
  const response = await makeRequest({
    method: "POST",
    url: "/runs",
    data: payload
  });
  if ((response.data.warnings?.length ?? 0) > 0) {
    printWarnings(response.data.warnings);
  }
  return response.data;
};
var createInstance = async ({
  runId,
  groupId,
  machineId,
  platform: platform2
}) => {
  const response = await makeRequest({
    method: "POST",
    url: `runs/${runId}/instances`,
    data: {
      runId,
      groupId,
      machineId,
      platform: platform2
    }
  });
  return response.data;
};
var createBatchedInstances = async (data) => {
  const respone = await makeRequest({
    method: "POST",
    url: `runs/${data.runId}/cy/instances`,
    data
  });
  return respone.data;
};
var setInstanceTests = (instanceId, payload) => makeRequest({
  method: "POST",
  url: `instances/${instanceId}/tests`,
  data: payload
}).then((result) => result.data);
var updateInstanceResults = (instanceId, payload) => makeRequest({
  method: "POST",
  url: `instances/${instanceId}/results`,
  data: payload
}).then((result) => result.data);
var reportInstanceResultsMerged = (instanceId, payload) => makeRequest({
  method: "POST",
  url: `instances/${instanceId}/cy/results`,
  data: payload
}).then((result) => result.data);
var updateInstanceStdout = (instanceId, stdout2) => makeRequest({
  method: "PUT",
  url: `instances/${instanceId}/stdout`,
  data: {
    stdout: stdout2
  }
});

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();
var debug9 = debugFn("cc:ci");
var join = (char, ...pieces) => {
  return _7.chain(pieces).compact().join(char).value();
};
var toCamelObject = (obj, key) => {
  return _7.set(obj, _7.camelCase(key), process.env[key]);
};
var extract = (envKeys) => {
  return _7.transform(envKeys, toCamelObject, {});
};
var isTeamFoundation = () => {
  return process.env.TF_BUILD && process.env.TF_BUILD_BUILDNUMBER;
};
var isAzureCi = () => {
  return process.env.TF_BUILD && process.env.AZURE_HTTP_USER_AGENT;
};
var isAWSCodeBuild = () => {
  return _7.some(process.env, (val, key) => {
    return /^CODEBUILD_/.test(key);
  });
};
var isBamboo = () => {
  return process.env.bamboo_buildNumber;
};
var isCodeshipBasic = () => {
  return process.env.CI_NAME && process.env.CI_NAME === "codeship" && process.env.CODESHIP;
};
var isCodeshipPro = () => {
  return process.env.CI_NAME && process.env.CI_NAME === "codeship" && !process.env.CODESHIP;
};
var isConcourse = () => {
  return _7.some(process.env, (val, key) => {
    return /^CONCOURSE_/.test(key);
  });
};
var isGitlab = () => {
  return process.env.GITLAB_CI || process.env.CI_SERVER_NAME && /^GitLab/.test(process.env.CI_SERVER_NAME);
};
var isGoogleCloud = () => {
  return process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;
};
var isJenkins = () => {
  return process.env.JENKINS_URL || process.env.JENKINS_HOME || process.env.JENKINS_VERSION || process.env.HUDSON_URL || process.env.HUDSON_HOME;
};
var isWercker = () => {
  return process.env.WERCKER || process.env.WERCKER_MAIN_PIPELINE_STARTED;
};
var CI_PROVIDERS = {
  appveyor: "APPVEYOR",
  azure: isAzureCi,
  awsCodeBuild: isAWSCodeBuild,
  bamboo: isBamboo,
  bitbucket: "BITBUCKET_BUILD_NUMBER",
  buildkite: "BUILDKITE",
  circle: "CIRCLECI",
  codeshipBasic: isCodeshipBasic,
  codeshipPro: isCodeshipPro,
  concourse: isConcourse,
  codeFresh: "CF_BUILD_ID",
  drone: "DRONE",
  githubActions: "GITHUB_ACTIONS",
  gitlab: isGitlab,
  goCD: "GO_JOB_NAME",
  googleCloud: isGoogleCloud,
  jenkins: isJenkins,
  semaphore: "SEMAPHORE",
  shippable: "SHIPPABLE",
  teamcity: "TEAMCITY_VERSION",
  teamfoundation: isTeamFoundation,
  travis: "TRAVIS",
  wercker: isWercker,
  netlify: "NETLIFY",
  layerci: "LAYERCI"
};
function _detectProviderName() {
  const { env } = process;
  return _7.findKey(CI_PROVIDERS, (value) => {
    if (_7.isString(value)) {
      return env[value];
    }
    if (_7.isFunction(value)) {
      return value();
    }
  });
}
var _providerCiParams = () => {
  return {
    appveyor: extract([
      "APPVEYOR_JOB_ID",
      "APPVEYOR_ACCOUNT_NAME",
      "APPVEYOR_PROJECT_SLUG",
      "APPVEYOR_BUILD_NUMBER",
      "APPVEYOR_BUILD_VERSION",
      "APPVEYOR_PULL_REQUEST_NUMBER",
      "APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH"
    ]),
    azure: extract([
      "BUILD_BUILDID",
      "BUILD_BUILDNUMBER",
      "BUILD_CONTAINERID",
      "BUILD_REPOSITORY_URI"
    ]),
    awsCodeBuild: extract([
      "CODEBUILD_BUILD_ID",
      "CODEBUILD_BUILD_NUMBER",
      "CODEBUILD_RESOLVED_SOURCE_VERSION",
      "CODEBUILD_SOURCE_REPO_URL",
      "CODEBUILD_SOURCE_VERSION"
    ]),
    bamboo: extract([
      "bamboo_buildNumber",
      "bamboo_buildResultsUrl",
      "bamboo_planRepository_repositoryUrl",
      "bamboo_buildKey"
    ]),
    bitbucket: extract([
      "BITBUCKET_REPO_SLUG",
      "BITBUCKET_REPO_OWNER",
      "BITBUCKET_BUILD_NUMBER",
      "BITBUCKET_PARALLEL_STEP",
      "BITBUCKET_STEP_RUN_NUMBER",
      "BITBUCKET_PR_ID",
      "BITBUCKET_PR_DESTINATION_BRANCH",
      "BITBUCKET_PR_DESTINATION_COMMIT"
    ]),
    buildkite: extract([
      "BUILDKITE_REPO",
      "BUILDKITE_SOURCE",
      "BUILDKITE_JOB_ID",
      "BUILDKITE_BUILD_ID",
      "BUILDKITE_BUILD_URL",
      "BUILDKITE_BUILD_NUMBER",
      "BUILDKITE_PULL_REQUEST",
      "BUILDKITE_PULL_REQUEST_REPO",
      "BUILDKITE_PULL_REQUEST_BASE_BRANCH"
    ]),
    circle: extract([
      "CIRCLE_JOB",
      "CIRCLE_BUILD_NUM",
      "CIRCLE_BUILD_URL",
      "CIRCLE_PR_NUMBER",
      "CIRCLE_PR_REPONAME",
      "CIRCLE_PR_USERNAME",
      "CIRCLE_COMPARE_URL",
      "CIRCLE_WORKFLOW_ID",
      "CIRCLE_PULL_REQUEST",
      "CIRCLE_REPOSITORY_URL",
      "CI_PULL_REQUEST"
    ]),
    codeshipBasic: extract([
      "CI_BUILD_ID",
      "CI_REPO_NAME",
      "CI_BUILD_URL",
      "CI_PROJECT_ID",
      "CI_BUILD_NUMBER",
      "CI_PULL_REQUEST"
    ]),
    codeshipPro: extract(["CI_BUILD_ID", "CI_REPO_NAME", "CI_PROJECT_ID"]),
    concourse: extract([
      "BUILD_ID",
      "BUILD_NAME",
      "BUILD_JOB_NAME",
      "BUILD_PIPELINE_NAME",
      "BUILD_TEAM_NAME",
      "ATC_EXTERNAL_URL"
    ]),
    codeFresh: extract([
      "CF_BUILD_ID",
      "CF_BUILD_URL",
      "CF_CURRENT_ATTEMPT",
      "CF_STEP_NAME",
      "CF_PIPELINE_NAME",
      "CF_PIPELINE_TRIGGER_ID",
      "CF_PULL_REQUEST_ID",
      "CF_PULL_REQUEST_IS_FORK",
      "CF_PULL_REQUEST_NUMBER",
      "CF_PULL_REQUEST_TARGET"
    ]),
    drone: extract([
      "DRONE_JOB_NUMBER",
      "DRONE_BUILD_LINK",
      "DRONE_BUILD_NUMBER",
      "DRONE_PULL_REQUEST"
    ]),
    githubActions: extract([
      "GITHUB_WORKFLOW",
      "GITHUB_ACTION",
      "GITHUB_EVENT_NAME",
      "GITHUB_RUN_ID",
      "GITHUB_RUN_ATTEMPT",
      "GITHUB_REPOSITORY"
    ]),
    gitlab: extract([
      "CI_PIPELINE_ID",
      "CI_PIPELINE_URL",
      "CI_BUILD_ID",
      "CI_JOB_ID",
      "CI_JOB_URL",
      "CI_JOB_NAME",
      "GITLAB_HOST",
      "CI_PROJECT_ID",
      "CI_PROJECT_URL",
      "CI_REPOSITORY_URL",
      "CI_ENVIRONMENT_URL",
      "CI_DEFAULT_BRANCH"
    ]),
    goCD: extract([
      "GO_SERVER_URL",
      "GO_ENVIRONMENT_NAME",
      "GO_PIPELINE_NAME",
      "GO_PIPELINE_COUNTER",
      "GO_PIPELINE_LABEL",
      "GO_STAGE_NAME",
      "GO_STAGE_COUNTER",
      "GO_JOB_NAME",
      "GO_TRIGGER_USER",
      "GO_REVISION",
      "GO_TO_REVISION",
      "GO_FROM_REVISION",
      "GO_MATERIAL_HAS_CHANGED"
    ]),
    googleCloud: extract([
      "BUILD_ID",
      "PROJECT_ID",
      "REPO_NAME",
      "BRANCH_NAME",
      "TAG_NAME",
      "COMMIT_SHA",
      "SHORT_SHA"
    ]),
    jenkins: extract(["BUILD_ID", "BUILD_URL", "BUILD_NUMBER", "ghprbPullId"]),
    semaphore: extract([
      "SEMAPHORE_BRANCH_ID",
      "SEMAPHORE_BUILD_NUMBER",
      "SEMAPHORE_CURRENT_JOB",
      "SEMAPHORE_CURRENT_THREAD",
      "SEMAPHORE_EXECUTABLE_UUID",
      "SEMAPHORE_GIT_BRANCH",
      "SEMAPHORE_GIT_DIR",
      "SEMAPHORE_GIT_REF",
      "SEMAPHORE_GIT_REF_TYPE",
      "SEMAPHORE_GIT_REPO_SLUG",
      "SEMAPHORE_GIT_SHA",
      "SEMAPHORE_GIT_URL",
      "SEMAPHORE_JOB_COUNT",
      "SEMAPHORE_JOB_ID",
      "SEMAPHORE_JOB_NAME",
      "SEMAPHORE_JOB_UUID",
      "SEMAPHORE_PIPELINE_ID",
      "SEMAPHORE_PLATFORM",
      "SEMAPHORE_PROJECT_DIR",
      "SEMAPHORE_PROJECT_HASH_ID",
      "SEMAPHORE_PROJECT_ID",
      "SEMAPHORE_PROJECT_NAME",
      "SEMAPHORE_PROJECT_UUID",
      "SEMAPHORE_REPO_SLUG",
      "SEMAPHORE_TRIGGER_SOURCE",
      "SEMAPHORE_WORKFLOW_ID",
      "PULL_REQUEST_NUMBER"
    ]),
    shippable: extract([
      "SHIPPABLE_BUILD_ID",
      "SHIPPABLE_BUILD_NUMBER",
      "SHIPPABLE_COMMIT_RANGE",
      "SHIPPABLE_CONTAINER_NAME",
      "SHIPPABLE_JOB_ID",
      "SHIPPABLE_JOB_NUMBER",
      "SHIPPABLE_REPO_SLUG",
      "IS_FORK",
      "IS_GIT_TAG",
      "IS_PRERELEASE",
      "IS_RELEASE",
      "REPOSITORY_URL",
      "REPO_FULL_NAME",
      "REPO_NAME",
      "BUILD_URL",
      "BASE_BRANCH",
      "HEAD_BRANCH",
      "IS_PULL_REQUEST",
      "PULL_REQUEST",
      "PULL_REQUEST_BASE_BRANCH",
      "PULL_REQUEST_REPO_FULL_NAME"
    ]),
    teamcity: null,
    teamfoundation: extract([
      "BUILD_BUILDID",
      "BUILD_BUILDNUMBER",
      "BUILD_CONTAINERID"
    ]),
    travis: extract([
      "TRAVIS_JOB_ID",
      "TRAVIS_BUILD_ID",
      "TRAVIS_BUILD_WEB_URL",
      "TRAVIS_REPO_SLUG",
      "TRAVIS_JOB_NUMBER",
      "TRAVIS_EVENT_TYPE",
      "TRAVIS_COMMIT_RANGE",
      "TRAVIS_BUILD_NUMBER",
      "TRAVIS_PULL_REQUEST",
      "TRAVIS_PULL_REQUEST_BRANCH",
      "TRAVIS_PULL_REQUEST_SHA"
    ]),
    wercker: null,
    netlify: extract([
      "BUILD_ID",
      "CONTEXT",
      "URL",
      "DEPLOY_URL",
      "DEPLOY_PRIME_URL",
      "DEPLOY_ID"
    ]),
    layerci: extract([
      "LAYERCI_JOB_ID",
      "LAYERCI_RUNNER_ID",
      "RETRY_INDEX",
      "LAYERCI_PULL_REQUEST",
      "LAYERCI_REPO_NAME",
      "LAYERCI_REPO_OWNER",
      "LAYERCI_BRANCH",
      "GIT_TAG"
    ])
  };
};
var _providerCommitParams = () => {
  const { env } = process;
  return {
    appveyor: {
      sha: env.APPVEYOR_REPO_COMMIT,
      branch: env.APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH || env.APPVEYOR_REPO_BRANCH,
      message: join(
        "\n",
        env.APPVEYOR_REPO_COMMIT_MESSAGE,
        env.APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED
      ),
      authorName: env.APPVEYOR_REPO_COMMIT_AUTHOR,
      authorEmail: env.APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL
    },
    awsCodeBuild: {
      sha: env.CODEBUILD_RESOLVED_SOURCE_VERSION,
      remoteOrigin: env.CODEBUILD_SOURCE_REPO_URL
    },
    azure: {
      sha: env.BUILD_SOURCEVERSION,
      branch: env.BUILD_SOURCEBRANCHNAME,
      message: env.BUILD_SOURCEVERSIONMESSAGE,
      authorName: env.BUILD_SOURCEVERSIONAUTHOR,
      authorEmail: env.BUILD_REQUESTEDFOREMAIL
    },
    bamboo: {
      sha: env.bamboo_planRepository_revision,
      branch: env.bamboo_planRepository_branch,
      authorName: env.bamboo_planRepository_username,
      remoteOrigin: env.bamboo_planRepository_repositoryURL
    },
    bitbucket: {
      sha: env.BITBUCKET_COMMIT,
      branch: env.BITBUCKET_BRANCH
    },
    buildkite: {
      sha: env.BUILDKITE_COMMIT,
      branch: env.BUILDKITE_BRANCH,
      message: env.BUILDKITE_MESSAGE,
      authorName: env.BUILDKITE_BUILD_CREATOR,
      authorEmail: env.BUILDKITE_BUILD_CREATOR_EMAIL,
      remoteOrigin: env.BUILDKITE_REPO,
      defaultBranch: env.BUILDKITE_PIPELINE_DEFAULT_BRANCH
    },
    circle: {
      sha: env.CIRCLE_SHA1,
      branch: env.CIRCLE_BRANCH,
      authorName: env.CIRCLE_USERNAME,
      remoteOrigin: env.CIRCLE_REPOSITORY_URL
    },
    codeshipBasic: {
      sha: env.CI_COMMIT_ID,
      branch: env.CI_BRANCH,
      message: env.CI_COMMIT_MESSAGE,
      authorName: env.CI_COMMITTER_NAME,
      authorEmail: env.CI_COMMITTER_EMAIL
    },
    codeshipPro: {
      sha: env.CI_COMMIT_ID,
      branch: env.CI_BRANCH,
      message: env.CI_COMMIT_MESSAGE,
      authorName: env.CI_COMMITTER_NAME,
      authorEmail: env.CI_COMMITTER_EMAIL
    },
    codeFresh: {
      sha: env.CF_REVISION,
      branch: env.CF_BRANCH,
      message: env.CF_COMMIT_MESSAGE,
      authorName: env.CF_COMMIT_AUTHOR
    },
    drone: {
      sha: env.DRONE_COMMIT_SHA,
      branch: env.DRONE_SOURCE_BRANCH,
      message: env.DRONE_COMMIT_MESSAGE,
      authorName: env.DRONE_COMMIT_AUTHOR,
      authorEmail: env.DRONE_COMMIT_AUTHOR_EMAIL,
      remoteOrigin: env.DRONE_GIT_HTTP_URL,
      defaultBranch: env.DRONE_REPO_BRANCH
    },
    githubActions: {
      sha: env.GITHUB_SHA,
      branch: env.GH_BRANCH || env.GITHUB_REF,
      defaultBranch: env.GITHUB_BASE_REF,
      remoteBranch: env.GITHUB_HEAD_REF,
      runAttempt: env.GITHUB_RUN_ATTEMPT
    },
    gitlab: {
      sha: env.CI_COMMIT_SHA,
      branch: env.CI_COMMIT_REF_NAME,
      message: env.CI_COMMIT_MESSAGE,
      authorName: env.GITLAB_USER_NAME,
      authorEmail: env.GITLAB_USER_EMAIL,
      remoteOrigin: env.CI_REPOSITORY_URL,
      defaultBranch: env.CI_DEFAULT_BRANCH
    },
    googleCloud: {
      sha: env.COMMIT_SHA,
      branch: env.BRANCH_NAME
    },
    jenkins: {
      sha: env.GIT_COMMIT,
      branch: env.GIT_BRANCH
    },
    semaphore: {
      sha: env.SEMAPHORE_GIT_SHA,
      branch: env.SEMAPHORE_GIT_BRANCH,
      remoteOrigin: env.SEMAPHORE_GIT_REPO_SLUG
    },
    shippable: {
      sha: env.COMMIT,
      branch: env.BRANCH,
      message: env.COMMIT_MESSAGE,
      authorName: env.COMMITTER
    },
    snap: null,
    teamcity: null,
    teamfoundation: {
      sha: env.BUILD_SOURCEVERSION,
      branch: env.BUILD_SOURCEBRANCHNAME,
      message: env.BUILD_SOURCEVERSIONMESSAGE,
      authorName: env.BUILD_SOURCEVERSIONAUTHOR
    },
    travis: {
      sha: env.TRAVIS_PULL_REQUEST_SHA || env.TRAVIS_COMMIT,
      branch: env.TRAVIS_PULL_REQUEST_BRANCH || env.TRAVIS_BRANCH,
      message: env.TRAVIS_COMMIT_MESSAGE
    },
    wercker: null,
    netlify: {
      sha: env.COMMIT_REF,
      branch: env.BRANCH,
      remoteOrigin: env.REPOSITORY_URL
    },
    layerci: {
      sha: env.GIT_COMMIT,
      branch: env.LAYERCI_BRANCH,
      message: env.GIT_COMMIT_TITLE
    }
  };
};
var _get = (fn) => {
  const providerName = getCiProvider();
  if (!providerName)
    return {};
  return _7.chain(fn()).get(providerName).value();
};
function checkForCiBuildFromCi(ciProvider) {
  if (ciProvider && detectableCiBuildIdProviders().includes(ciProvider))
    return true;
  throw new ValidationError(
    `Could not determine CI build ID from the environment. Please provide a unique CI build ID using the --ci-build-id CLI flag or 'ciBuildId' parameter for 'run' method.`
  );
}
function detectableCiBuildIdProviders() {
  return _7.chain(_providerCiParams()).omitBy(_7.isNull).keys().value();
}
function getCiProvider() {
  return _detectProviderName() || null;
}
function getCiParams() {
  return _get(_providerCiParams);
}
function getCommitParams() {
  return _get(_providerCommitParams);
}
function getCI(ciBuildId) {
  const params = getCiParams();
  const provider = getCiProvider();
  if (!ciBuildId)
    checkForCiBuildFromCi(provider);
  debug9("detected CI provider: %s", provider);
  debug9("detected CI params: %O", params);
  return {
    params,
    provider
  };
}
function getCommitDefaults(existingInfo) {
  debug9("git commit existing info");
  debug9(existingInfo);
  const commitParamsObj = getCommitParams();
  debug9("commit info from provider environment variables: %O", commitParamsObj);
  const combined = _7.transform(
    existingInfo,
    (memo, value, key) => {
      return memo[key] = _7.defaultTo(value || commitParamsObj[key], null);
    }
  );
  debug9("combined git and environment variables from provider");
  debug9(combined);
  return combined;
}

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();
var SpecAfterResult = class _SpecAfterResult {
  /**
   * Combine standalone attempts and screenshots into standard result
   * @param specResult - spec:after results
   * @param executionState - ccy execution state
   * @returns unified results, including attempts and screenshot details
   */
  static getSpecAfterStandard(specAfterResults, executionState) {
    return {
      error: specAfterResults.error,
      hooks: null,
      reporter: specAfterResults.reporter,
      reporterStats: specAfterResults.reporterStats,
      spec: _SpecAfterResult.getSpecStandard(specAfterResults.spec),
      tests: _SpecAfterResult.getTestStandard(
        specAfterResults,
        executionState.getAttemptsData()
      ),
      video: specAfterResults.video,
      stats: _SpecAfterResult.getStatsStandard(specAfterResults.stats),
      screenshots: _SpecAfterResult.getScreenshotsStandard(
        specAfterResults.screenshots,
        executionState.getScreenshotsData()
      )
    };
  }
  static getAttemptError(err) {
    if (!err) {
      return null;
    }
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      codeFrame: err.codeFrame
    };
  }
  static getAttemptVideoTimestamp(attemptStartedAtMs, specStartedAtMs) {
    return Math.max(attemptStartedAtMs - specStartedAtMs, 0);
  }
  static getSpecStartedAt(stats) {
    if ("startedAt" in stats) {
      return parseISO(stats.startedAt);
    }
    if ("wallClockStartedAt" in stats) {
      return parseISO(stats.wallClockStartedAt);
    }
    warn("Cannot determine spec start date from stats: %o", stats);
    return new Date();
  }
  static getDummyTestAttemptError(attemptState) {
    return match4(attemptState).with("failed", () => ({
      name: "Error",
      message: "[@krivega/cc] Could not get cypress attempt error details",
      stack: "",
      codeFrame: null
    })).with("skipped", () => ({
      name: "Error",
      message: "The test was skipped because of a hook failure",
      stack: "",
      codeFrame: null
    })).otherwise(() => null);
  }
  static getTestAttemptStandard(mochaAttempt, cypressAttempt, specStartedAt) {
    if (!mochaAttempt) {
      const error2 = "error" in cypressAttempt ? cypressAttempt.error : null;
      const duration = "wallClockDuration" in cypressAttempt ? cypressAttempt.wallClockDuration : null;
      return {
        state: cypressAttempt.state,
        error: error2 ? error2 : _SpecAfterResult.getDummyTestAttemptError(cypressAttempt.state),
        timings: "timings" in cypressAttempt ? cypressAttempt.timings : null,
        wallClockStartedAt: "wallClockStartedAt" in cypressAttempt ? cypressAttempt.wallClockStartedAt : ( new Date()).toISOString(),
        wallClockDuration: duration ? duration : 0,
        failedFromHookId: "failedFromHookId" in cypressAttempt ? cypressAttempt.failedFromHookId : null,
        videoTimestamp: "videoTimestamp" in cypressAttempt ? cypressAttempt.videoTimestamp : 0
      };
    }
    return {
      state: cypressAttempt.state,
      error: "error" in cypressAttempt ? cypressAttempt.error : _SpecAfterResult.getAttemptError(mochaAttempt.err),
      timings: "timings" in cypressAttempt ? cypressAttempt.timings : mochaAttempt.timings,
      wallClockStartedAt: mochaAttempt.wallClockStartedAt ?? ( new Date()).toISOString(),
      wallClockDuration: mochaAttempt.duration ?? -1,
      failedFromHookId: "failedFromHookId" in cypressAttempt ? cypressAttempt.failedFromHookId : null,
      videoTimestamp: "videoTimestamp" in cypressAttempt ? cypressAttempt.videoTimestamp : _SpecAfterResult.getAttemptVideoTimestamp(
        parseISO(mochaAttempt.wallClockStartedAt).getTime(),
        specStartedAt.getTime()
      )
    };
  }
  static getTestStandard(specAfterResults, attempts) {
    const standardTestList = (specAfterResults.tests ?? []).map((test, i) => {
      const mochaAttempts = attempts.filter(
        (attempt) => attempt.fullTitle === test.title.join(" ")
      );
      const standardAttempts = (test.attempts ?? []).map(
        (cypressAttempt, j) => {
          const mochaAttempt = mochaAttempts.find(
            (ma) => ma.currentRetry === j
          );
          return _SpecAfterResult.getTestAttemptStandard(
            mochaAttempt ?? null,
            cypressAttempt,
            _SpecAfterResult.getSpecStartedAt(specAfterResults.stats)
          );
        }
      );
      return {
        body: "body" in test ? test.body : mochaAttempts[0]?.body ?? "",
        testId: "testId" in test ? test.testId : mochaAttempts[0]?.id ?? `r${i}`,
        title: test.title,
        displayError: test.displayError,
        state: test.state,
        attempts: standardAttempts
      };
    });
    return standardTestList;
  }
  static getSpecStandard(spec) {
    return {
      name: spec.name,
      relative: spec.relative,
      absolute: spec.absolute,
      fileExtension: spec.fileExtension,
      baseName: "baseName" in spec ? spec.baseName : "",
      fileName: "fileName" in spec ? spec.fileName : "",
      relativeToCommonRoot: "relativeToCommonRoot" in spec ? spec.relativeToCommonRoot : "",
      specFileExtension: "specFileExtension" in spec ? spec.specFileExtension : "",
      specType: "specType" in spec ? spec.specType : ""
    };
  }
  static getStatsStandard(stats) {
    const result = {
      skipped: stats.skipped,
      suites: stats.suites,
      tests: stats.tests,
      passes: stats.passes,
      pending: stats.pending,
      failures: stats.failures,
      wallClockStartedAt: "wallClockStartedAt" in stats ? stats.wallClockStartedAt : stats.startedAt,
      wallClockEndedAt: "wallClockEndedAt" in stats ? stats.wallClockEndedAt : stats.endedAt,
      wallClockDuration: "wallClockDuration" in stats ? stats.wallClockDuration : stats.duration ?? 0
    };
    result.tests = result.passes + result.failures + result.pending + result.skipped;
    return result;
  }
  static getScreenshotsStandard(specAfterScreenshots, screenshotEvents) {
    if (!specAfterScreenshots.length) {
      return [];
    }
    return specAfterScreenshots.map((specScreenshot) => {
      const es = screenshotEvents.find(
        (screenshot) => screenshot.path === specScreenshot.path
      );
      if (!es) {
        warn(
          'Could not find details for screenshot at path "%s", skipping...',
          specScreenshot.path
        );
      }
      return {
        height: specScreenshot.height,
        width: specScreenshot.width,
        name: specScreenshot.name ?? es?.name ?? null,
        path: specScreenshot.path,
        takenAt: specScreenshot.takenAt,
        testAttemptIndex: "testAttemptIndex" in specScreenshot ? specScreenshot.testAttemptIndex : es?.testAttemptIndex ?? -1,
        testId: "testId" in specScreenshot ? specScreenshot.testId : es?.testId ?? "unknown",
        screenshotId: "screenshotId" in specScreenshot ? specScreenshot.screenshotId : getRandomString()
      };
    });
  }
};

var ModuleAPIResults = class _ModuleAPIResults {
  static getRunScreenshots(run2) {
    if ("screenshots" in run2) {
      return run2.screenshots;
    }
    return (run2.tests ?? []).flatMap(
      (t) => t.attempts.flatMap((a) => a.screenshots)
    );
  }
  static getTests(run2, executionState) {
    const tests = run2.tests ?? [];
    return tests.map((test, i) => {
      const mochaAttempts = executionState.getAttemptsData().filter((attempt) => attempt.fullTitle === test.title.join(" "));
      const testId = "testId" in test ? test.testId : mochaAttempts[0]?.id ?? `r${i}`;
      const runScreenshotPaths = _ModuleAPIResults.getRunScreenshots(run2).map(
        (i2) => i2.path
      );
      const testScreenshots = executionState.getScreenshotsData().filter((s) => runScreenshotPaths.includes(s.path)).filter((s) => s.testId === testId);
      const standardAttempts = (test.attempts ?? []).map(
        (cypressAttempt, j) => {
          const mochaAttempt = mochaAttempts.find(
            (ma) => ma.currentRetry === j
          );
          const attemptScreenshots = testScreenshots.filter(
            (t) => t.testAttemptIndex === j
          );
          return _ModuleAPIResults.getTestAttempt(
            mochaAttempt ?? null,
            cypressAttempt,
            attemptScreenshots,
            SpecAfterResult.getSpecStartedAt(run2.stats)
          );
        }
      );
      return {
        body: "body" in test ? test.body : mochaAttempts[0]?.body ?? "",
        testId,
        title: test.title,
        displayError: test.displayError,
        state: test.state,
        attempts: standardAttempts
      };
    });
  }
  /**
   * Convert version-specific attempt to a standard test attempt
   */
  static getTestAttempt(mochaAttempt, cypressAttempt, screenshots, specStartedAt) {
    if (!mochaAttempt) {
      return {
        state: cypressAttempt.state,
        error: "error" in cypressAttempt ? cypressAttempt.error : SpecAfterResult.getDummyTestAttemptError(cypressAttempt.state),
        startedAt: "startedAt" in cypressAttempt ? cypressAttempt.startedAt : ( new Date()).toISOString(),
        duration: "duration" in cypressAttempt ? cypressAttempt.duration : 0,
        videoTimestamp: "videoTimestamp" in cypressAttempt ? cypressAttempt.videoTimestamp : 0,
        screenshots: "screenshots" in cypressAttempt ? cypressAttempt.screenshots : screenshots
      };
    }
    return {
      state: cypressAttempt.state,
      error: "error" in cypressAttempt ? cypressAttempt.error : SpecAfterResult.getAttemptError(mochaAttempt.err),
      startedAt: "startedAt" in cypressAttempt ? cypressAttempt.startedAt : mochaAttempt.wallClockStartedAt ?? ( new Date()).toISOString(),
      duration: "duration" in cypressAttempt ? cypressAttempt.duration : mochaAttempt.duration ?? -1,
      videoTimestamp: "videoTimestamp" in cypressAttempt ? cypressAttempt.videoTimestamp : SpecAfterResult.getAttemptVideoTimestamp(
        parseISO2(mochaAttempt.wallClockStartedAt).getTime(),
        specStartedAt.getTime()
      ),
      screenshots: "screenshots" in cypressAttempt ? cypressAttempt.screenshots : screenshots
    };
  }
  static getRun(run2, executionState) {
    return {
      ...run2,
      tests: _ModuleAPIResults.getTests(run2, executionState),
      spec: SpecAfterResult.getSpecStandard(run2.spec),
      hooks: null,
      shouldUploadVideo: "shouldUploadVideo" in run2 ? run2.shouldUploadVideo : true
    };
  }
  /**
   * Converts different Cypress versions to standard form
   */
  static getStandardResult(result, executionState) {
    if (result.runs.length !== 1) {
      throw new Error("Expected single run");
    }
    const run2 = result.runs[0];
    const stats = SpecAfterResult.getStatsStandard(run2.stats);
    return {
      ...result,
      runs: [_ModuleAPIResults.getRun(run2, executionState)],
      totalSuites: 1,
      totalDuration: stats.wallClockDuration,
      totalTests: stats.tests,
      totalFailed: stats.failures,
      totalPassed: stats.passes,
      totalPending: stats.pending,
      totalSkipped: stats.skipped,
      startedTestsAt: stats.wallClockStartedAt,
      endedTestsAt: stats.wallClockEndedAt,
      status: "finished"
    };
  }
  static isFailureResult(result) {
    return "status" in result && result.status === "failed";
  }
  static {
    this.isSuccessResult = (result) => {
      if ("status" in result) {
        return result.status === "finished";
      }
      return true;
    };
  }
  static getEmptyResult(config) {
    return {
      status: "finished",
      totalDuration: 0,
      totalSuites: 0,
      totalPending: 0,
      totalFailed: 0,
      totalSkipped: 0,
      totalPassed: 0,
      totalTests: 0,
      startedTestsAt: ( new Date()).toISOString(),
      endedTestsAt: ( new Date()).toISOString(),
      runs: [],
      config
    };
  }
};

var debug10 = Debug8("cc:cypress");
function runBareCypress(params = {}) {
  const p = {
    ...params,
    ciBuildId: void 0,
    tag: void 0,
    parallel: void 0,
    record: false,
    group: void 0,
    spec: _8.flatten(params.spec).join(",")
  };
  debug10("Running bare Cypress with params %o", p);
  return cypress.run(p);
}
async function runSpecFile({ spec }, cypressRunOptions) {
  const runAPIOptions = getCypressRunAPIParams(cypressRunOptions);
  const options = {
    ...runAPIOptions,
    config: {
      ...runAPIOptions.config,
      trashAssetsBeforeRuns: false
    },
    env: {
      ...runAPIOptions.env,
      cc_ws: getWSSPort(),
      cc_marker: true
    },
    spec
  };
  debug10("running cypress with options %o", options);
  const result = await cypress.run(options);
  if (ModuleAPIResults.isFailureResult(result)) {
    warn('Cypress runner failed with message: "%s"', result.message);
    warn(
      "The following spec files will be marked as failed: %s",
      spec.split(",").map((i) => `
 - ${i}`).join("")
    );
  }
  debug10("cypress run result %o", result);
  return result;
}
var runSpecFileSafe = (spec, cypressRunOptions) => safe(
  runSpecFile,
  (error2) => {
    const message = `Cypress runnner crashed with an error:
${error2.message}
${error2.stack}}`;
    debug10("cypress run exception %o", error2);
    warn('Cypress runner crashed: "%s"', message);
    warn(
      "The following spec files will be marked as failed: %s",
      spec.spec.split(",").map((i) => `
 - ${i}`).join("")
    );
    return {
      status: "failed",
      failures: 1,
      message
    };
  },
  () => {
  }
)(spec, cypressRunOptions);

init_esm_shims();
var isCc = () => !!process.env.CC_ENFORCE_IS_CC || getAPIBaseUrl() === "set baseURL";

init_esm_shims();
var getGitInfo = async (projectRoot) => {
  const commitInfo = await git.commitInfo(projectRoot);
  return getCommitDefaults({
    branch: commitInfo.branch,
    remoteOrigin: commitInfo.remote,
    authorEmail: commitInfo.email,
    authorName: commitInfo.author,
    message: commitInfo.message,
    sha: commitInfo.sha
  });
};

init_esm_shims();

init_esm_shims();

init_esm_shims();
var getCoverageFilePath = async (coverageFile = "./.nyc_output/out.json") => {
  const path6 = join2(process.cwd(), coverageFile);
  try {
    await fs2.access(path6);
    return {
      path: path6,
      error: false
    };
  } catch (error2) {
    return {
      path: path6,
      error: error2
    };
  }
};

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();
var emptyStats = {
  totalDuration: 0,
  totalSuites: 0,
  totalPending: 0,
  totalFailed: 0,
  totalSkipped: 0,
  totalPassed: 0,
  totalTests: 0
};
var getDummyFailedTest = (start, error2) => ({
  title: ["Unknown"],
  state: "failed",
  body: "// This test is automatically generated due to execution failure",
  displayError: error2,
  attempts: [
    {
      state: "failed",
      startedAt: start,
      duration: 0,
      videoTimestamp: 0,
      screenshots: [],
      error: {
        name: "CypressExecutionError",
        message: error2,
        stack: "",
        codeFrame: null
      }
    }
  ]
});
function getFailedFakeInstanceResult(configState, {
  specs,
  error: error2
}) {
  const start = ( new Date()).toISOString();
  const end = ( new Date()).toISOString();
  return {
    config: configState.getConfig() ?? {},
    status: "finished",
    startedTestsAt: ( new Date()).toISOString(),
    endedTestsAt: ( new Date()).toISOString(),
    totalDuration: 0,
    totalSuites: 1,
    totalFailed: 1,
    totalPassed: 0,
    totalPending: 0,
    totalSkipped: 0,
    totalTests: 1,
    browserName: "unknown",
    browserVersion: "unknown",
    browserPath: "unknown",
    osName: "unknown",
    osVersion: "unknown",
    cypressVersion: "unknown",
    runs: specs.map((s) => ({
      stats: {
        suites: 1,
        tests: 1,
        passes: 0,
        pending: 0,
        skipped: 0,
        failures: 1,
        startedAt: start,
        endedAt: end,
        duration: 0
      },
      reporter: "spec",
      reporterStats: {
        suites: 1,
        tests: 1,
        passes: 0,
        pending: 0,
        failures: 1,
        start,
        end,
        duration: 0
      },
      hooks: [],
      error: error2,
      video: null,
      spec: {
        name: s,
        relative: s,
        absolute: s,
        relativeToCommonRoot: s,
        baseName: s,
        specType: "integration",
        fileExtension: "js",
        fileName: s,
        specFileExtension: "js"
      },
      tests: [getDummyFailedTest(start, error2)],
      shouldUploadVideo: false,
      skippedSpec: false
    }))
  };
}

var summarizeExecution = (input, config) => {
  if (!input.length) {
    return ModuleAPIResults.getEmptyResult(config);
  }
  const overall = input.reduce(
    (acc, {
      totalDuration,
      totalFailed,
      totalPassed,
      totalPending,
      totalSkipped,
      totalTests,
      totalSuites
    }) => ({
      totalDuration: acc.totalDuration + totalDuration,
      totalSuites: acc.totalSuites + totalSuites,
      totalPending: acc.totalPending + totalPending,
      totalFailed: acc.totalFailed + totalFailed,
      totalSkipped: acc.totalSkipped + totalSkipped,
      totalPassed: acc.totalPassed + totalPassed,
      totalTests: acc.totalTests + totalTests
    }),
    emptyStats
  );
  const firstResult = input[0];
  const startItems = input.map((i) => i.startedTestsAt).sort();
  const endItems = input.map((i) => i.endedTestsAt).sort();
  const runs = input.map((i) => i.runs).flat();
  return {
    ...overall,
    runs,
    startedTestsAt: _9.first(startItems),
    endedTestsAt: _9.last(endItems),
    ..._9.pick(
      firstResult,
      "browserName",
      "browserVersion",
      "browserPath",
      "osName",
      "osVersion",
      "cypressVersion",
      "config"
    ),
    status: "finished"
  };
};

init_esm_shims();
var failureIcon = red("\u2716");
var successIcon = green("\u2714");
var summaryTable = (r) => {
  const overallSpecCount = r.runs.length;
  const failedSpecsCount = _10.sum(
    r.runs.filter((v) => v.stats.failures + v.stats.skipped > 0).map(() => 1)
  );
  const hasFailed = failedSpecsCount > 0;
  const verdict = hasFailed ? red(`${failedSpecsCount} of ${overallSpecCount} failed`) : overallSpecCount > 0 ? "All specs passed!" : "No specs executed";
  const specs = r.runs.map((r2) => r2.spec.relative);
  const commonPath = getCommonPath(specs);
  const data = r.runs.map((r2) => [
    r2.stats.failures + r2.stats.skipped > 0 ? failureIcon : successIcon,
    stripCommonPath(r2.spec.relative, commonPath),
    gray(prettyMS(r2.stats.duration ?? 0)),
    white(r2.stats.tests ?? 0),
    r2.stats.passes ? green(r2.stats.passes) : gray("-"),
    r2.stats.failures ? red(r2.stats.failures) : gray("-"),
    r2.stats.pending ? cyan(r2.stats.pending) : gray("-"),
    r2.stats.skipped ? red(r2.stats.skipped) : gray("-")
  ]);
  return table(
    [
      [
        "",
        gray("Spec"),
        "",
        gray("Tests"),
        gray("Passing"),
        gray("Failing"),
        gray("Pending"),
        gray("Skipped")
      ],
      ...data,
      [
        hasFailed ? failureIcon : successIcon,
        verdict,
        gray(prettyMS(r.totalDuration ?? 0)),
        overallSpecCount > 0 ? white(r.totalTests ?? 0) : gray("-"),
        r.totalPassed ? green(r.totalPassed) : gray("-"),
        r.totalFailed ? red(r.totalFailed) : gray("-"),
        r.totalPending ? cyan(r.totalPending) : gray("-"),
        r.totalSkipped ? red(r.totalSkipped) : gray("-")
      ]
    ],
    {
      border,
      columnDefault: {
        width: 8
      },
      columns: [
        { alignment: "left", width: 2 },
        { alignment: "left", width: 30 },
        { alignment: "right" },
        { alignment: "right" },
        { alignment: "right" },
        { alignment: "right" },
        { alignment: "right" },
        { alignment: "right" }
      ],
      drawHorizontalLine: (lineIndex, rowCount) => {
        return lineIndex === 1 || lineIndex === 0 || lineIndex === rowCount - 1 || lineIndex === rowCount;
      },
      drawVerticalLine: (lineIndex, rowCount) => {
        return lineIndex === 0 || rowCount === lineIndex;
      }
    }
  );
};
var border = _10.mapValues(
  {
    topBody: `\u2500`,
    topJoin: `\u252C`,
    topLeft: `  \u250C`,
    topRight: `\u2510`,
    bottomBody: `\u2500`,
    bottomJoin: `\u2534`,
    bottomLeft: `  \u2514`,
    bottomRight: `\u2518`,
    bodyLeft: `  \u2502`,
    bodyRight: `\u2502`,
    bodyJoin: `\u2502`,
    joinBody: `\u2500`,
    joinLeft: `  \u251C`,
    joinRight: `\u2524`,
    joinJoin: `\u253C`
  },
  (v) => gray(v)
);
function getCommonPath(specs) {
  if (specs.length === 0) {
    return "";
  }
  if (specs.length === 1) {
    return path3.dirname(specs[0]) + path3.sep;
  }
  return getCommonPathPrefix(specs);
}
function stripCommonPath(spec, commonPath) {
  return spec.replace(commonPath, "");
}

init_esm_shims();

init_esm_shims();

init_esm_shims();
var readFile = fs3.promises.readFile;
var debug11 = Debug9("cc:upload");
function uploadVideo(file2, url) {
  return uploadFile(file2, url, "video/mp4");
}
function uploadImage(file2, url) {
  return uploadFile(file2, url, "image/png");
}
function uploadJson(file2, url) {
  return uploadFile(file2, url, "application/json");
}
async function uploadFile(file2, url, type) {
  debug11('uploading file "%s" to "%s"', file2, url);
  const f = await readFile(file2);
  await makeRequest({
    url,
    method: "PUT",
    data: f,
    headers: {
      "Content-Type": type,
      "Content-Disposition": `inline`
    }
  });
}

var debug12 = Debug10("cc:artifacts");
async function uploadArtifacts({
  executionState,
  videoPath,
  videoUploadUrl,
  screenshots,
  screenshotUploadUrls,
  coverageFilePath,
  coverageUploadUrl
}) {
  debug12("uploading artifacts: %o", {
    videoPath,
    videoUploadUrl,
    screenshots,
    screenshotUploadUrls,
    coverageFilePath,
    coverageUploadUrl
  });
  const totalUploads = (videoPath ? 1 : 0) + screenshots.length + (coverageUploadUrl ? 1 : 0);
  if (totalUploads === 0) {
    return;
  }
  if (videoUploadUrl && videoPath) {
    await safe(
      uploadVideo,
      (e) => {
        debug12("failed uploading video %s. Error: %o", videoPath, e);
        executionState.addWarning(
          `Failed uploading video ${videoPath}.
${dim(e)}`
        );
      },
      () => debug12("success uploading", videoPath)
    )(videoPath, videoUploadUrl);
  }
  if (screenshotUploadUrls && screenshotUploadUrls.length) {
    await Promise.all(
      screenshots.map((screenshot) => {
        const url = screenshotUploadUrls.find(
          (urls) => urls.screenshotId === screenshot.screenshotId
        )?.uploadUrl;
        if (!url) {
          debug12(
            "No upload url for screenshot %o, screenshotUploadUrls: %o",
            screenshot,
            screenshotUploadUrls
          );
          executionState.addWarning(
            `No upload URL for screenshot ${screenshot.path}`
          );
          return Promise.resolve();
        }
        return safe(
          uploadImage,
          (e) => {
            debug12(
              "failed uploading screenshot %s. Error: %o",
              screenshot.path,
              e
            );
            executionState.addWarning(
              `Failed uploading screenshot ${screenshot.path}.
${dim(e)}`
            );
          },
          () => debug12("success uploading", screenshot.path)
        )(screenshot.path, url);
      })
    );
  }
  if (coverageUploadUrl && coverageFilePath) {
    await safe(
      uploadJson,
      (e) => {
        debug12(
          "failed uploading coverage file %s. Error: %o",
          coverageFilePath,
          e
        );
        executionState.addWarning(
          `Failed uploading coverage file ${coverageFilePath}.
${dim(e)}`
        );
      },
      () => debug12("success uploading", coverageFilePath)
    )(coverageFilePath, coverageUploadUrl);
  }
}
var uploadStdoutSafe = safe(
  updateInstanceStdout,
  () => {
  },
  () => {
  }
);

init_esm_shims();

init_esm_shims();
var state = {
  cancellationReason: null
};
var setCancellationReason = (reason) => {
  if (state.cancellationReason) {
    return;
  }
  state.cancellationReason = reason;
  getPubSub().emit("run:cancelled", reason);
};

init_esm_shims();
var debug13 = Debug11("cc:results");
var getInstanceResultPayload = (runResult, coverageFilePath) => {
  debug13("generating instance result payload from %o", runResult);
  return {
    stats: StandardResultsToAPIResults.getStats(runResult.stats),
    reporterStats: runResult.reporterStats,
    exception: runResult.error ?? null,
    video: !!runResult.video,
    screenshots: StandardResultsToAPIResults.getAllScreenshots(runResult),
    hasCoverage: !!coverageFilePath,
    tests: (runResult.tests ?? []).map(
      StandardResultsToAPIResults.getTestForResults
    )
  };
};
var getInstanceTestsPayload = (runResult, config) => {
  return {
    config: {
      ...config.getConfig(),
      videoUploadOnPasses: config.getConfig()?.videoUploadOnPasses ?? true
    },
    tests: (runResult.tests ?? []).map(
      StandardResultsToAPIResults.getTestForSetTests
    ),
    hooks: runResult.hooks
  };
};
var StandardResultsToAPIResults = class _StandardResultsToAPIResults {
  static getTestAttempt(attempt) {
    return {
      state: attempt.state,
      error: attempt.error,
      wallClockStartedAt: attempt.startedAt,
      wallClockDuration: attempt.duration,
      videoTimestamp: attempt.videoTimestamp
    };
  }
  static getTestForResults(test, index) {
    return {
      displayError: test.displayError,
      state: test.state,
      attempts: (test.attempts ?? []).map(
        _StandardResultsToAPIResults.getTestAttempt
      ),
      clientId: `r${index}`
    };
  }
  static getTestForSetTests(test, index) {
    return {
      body: "redacted",
      title: test.title,
      clientId: `r${index}`
    };
  }
  static getAllScreenshots(run2) {
    return (run2.tests ?? []).flatMap(
      (t, i) => t.attempts.flatMap(
        (a, j) => a.screenshots.map((s) => ({
          ...s,
          testId: `r${i}`,
          testAttemptIndex: j,
          screenshotId: getRandomString()
        }))
      )
    );
  }
  static getStats(stats) {
    return {
      ...stats,
      wallClockDuration: stats.duration,
      wallClockStartedAt: stats.startedAt,
      wallClockEndedAt: stats.endedAt
    };
  }
};

var debug14 = Debug12("cc:results");
async function getReportResultsTask(instanceId, executionState, configState, stdout2, coverageFilePath) {
  const results = executionState.getInstanceResults(configState, instanceId);
  const run2 = results.runs[0];
  if (!run2) {
    throw new Error("No run found in Cypress results");
  }
  const instanceResults = getInstanceResultPayload(run2, coverageFilePath);
  const instanceTests = getInstanceTestsPayload(run2, configState);
  const { videoUploadUrl, screenshotUploadUrls, coverageUploadUrl, cloud } = await reportResults(instanceId, instanceTests, instanceResults);
  if (cloud?.shouldCancel) {
    debug14("instance %s should cancel", instanceId);
    setCancellationReason(cloud.shouldCancel);
  }
  debug14("instance %s artifact upload instructions %o", instanceId, {
    videoUploadUrl,
    screenshotUploadUrls,
    coverageUploadUrl
  });
  return Promise.all([
    uploadArtifacts({
      executionState,
      videoUploadUrl,
      videoPath: run2.video,
      screenshotUploadUrls,
      screenshots: instanceResults.screenshots,
      coverageUploadUrl,
      coverageFilePath
    }),
    uploadStdoutSafe(instanceId, getInitialOutput() + stdout2)
  ]);
}
async function reportResults(instanceId, instanceTests, instanceResults) {
  debug14("reporting instance %s results...", instanceId);
  if (isCc()) {
    return reportInstanceResultsMerged(instanceId, {
      tests: instanceTests,
      results: instanceResults
    });
  }
  await setInstanceTests(instanceId, instanceTests);
  return updateInstanceResults(instanceId, instanceResults);
}

var debug15 = Debug13("cc:reportTask");
var reportTasks = [];
var createReportTask = (configState, executionState, instanceId) => {
  const instance = executionState.getInstance(instanceId);
  if (!instance) {
    error("Cannot find execution state for instance %s", instanceId);
    return;
  }
  if (instance.reportStartedAt) {
    debug15("Report task already created for instance %s", instanceId);
    return;
  }
  instance.reportStartedAt = new Date();
  debug15("Creating report task for instanceId %s", instanceId);
  reportTasks.push(
    getReportResultsTask(
      instanceId,
      executionState,
      configState,
      instance.output ?? "no output captured",
      instance.coverageFilePath
    ).catch(error)
  );
};
var createReportTaskSpec = (configState, executionState, spec) => {
  const i = executionState.getSpec(spec);
  if (!i) {
    error("Cannot find execution state for spec %s", spec);
    return;
  }
  debug15("Creating report task for spec %s", spec);
  return createReportTask(configState, executionState, i.instanceId);
};

var debug16 = Debug14("cc:runner");
async function runTillDone(executionState, configState, {
  runId,
  groupId,
  machineId,
  platform: platform2,
  specs: allSpecs
}, params) {
  let hasMore = true;
  while (hasMore) {
    const newTasks = await runBatch(executionState, configState, {
      runMeta: {
        runId,
        groupId,
        machineId,
        platform: platform2
      },
      allSpecs,
      params
    });
    if (!newTasks.length) {
      debug16("No more tasks to run. Uploads queue: %d", reportTasks.length);
      hasMore = false;
      break;
    }
    newTasks.forEach(
      (t) => createReportTask(configState, executionState, t.instanceId)
    );
  }
}
async function runBatch(executionState, configState, {
  runMeta,
  params,
  allSpecs
}) {
  let batch = {
    specs: [],
    claimedInstances: 0,
    totalInstances: 0
  };
  if (isCc()) {
    debug16("Getting batched tasks: %d", params.batchSize);
    batch = await createBatchedInstances({
      ...runMeta,
      batchSize: params.batchSize
    });
    debug16("Got batched tasks: %o", batch);
  } else {
    const response = await createInstance(runMeta);
    if (response.spec !== null && response.instanceId !== null) {
      batch.specs.push({
        spec: response.spec,
        instanceId: response.instanceId
      });
    }
    batch.claimedInstances = response.claimedInstances;
    batch.totalInstances = response.totalInstances;
  }
  if (batch.specs.length === 0) {
    return [];
  }
  batch.specs.forEach((i) => executionState.initInstance(i));
  divider();
  info(
    "Running: %s (%d/%d)",
    batch.specs.map((s) => s.spec).join(", "),
    batch.claimedInstances,
    batch.totalInstances
  );
  const batchedResult = await runSpecFileSafe(
    {
      spec: batch.specs.map((bs) => getSpecAbsolutePath(allSpecs, bs.spec)).join(",")
    },
    params
  );
  title("blue", "Reporting results and artifacts in background...");
  const output = getCapturedOutput();
  batch.specs.forEach((spec) => {
    executionState.setInstanceOutput(spec.instanceId, output);
    const singleSpecResult = getSingleSpecRunResult(spec.spec, batchedResult);
    if (!singleSpecResult) {
      return;
    }
    getPubSub().emit("run:result", {
      specRelative: spec.spec,
      instanceId: spec.instanceId,
      runResult: singleSpecResult
    });
  });
  resetCapture();
  return batch.specs;
}
function getSingleSpecRunResult(specRelative, batchedResult) {
  if (!ModuleAPIResults.isSuccessResult(batchedResult)) {
    return;
  }
  const run2 = batchedResult.runs.find((r) => r.spec.relative === specRelative);
  if (!run2) {
    return;
  }
  return {
    ...batchedResult,
    runs: [run2]
  };
}
function getSpecAbsolutePath(allSpecs, relative) {
  const absolutePath = allSpecs.find((i) => i.relative === relative)?.absolute;
  if (!absolutePath) {
    warn(
      'Cannot find absolute path for spec. Spec: "%s", candidates: %o',
      relative,
      allSpecs
    );
    throw new Error(`Cannot find absolute path for spec`);
  }
  return absolutePath;
}

var cancellable = null;
function onRunCancelled(reason) {
  warn(
    `Run cancelled: %s. Waiting for uploads to complete and stopping execution...`,
    reason
  );
  cancellable?.cancel();
}
async function runTillDoneOrCancelled(...args) {
  return new Promise((_resolve, _reject) => {
    cancellable = new BPromise((resolve, reject, onCancel) => {
      if (!onCancel) {
        _reject(new Error("BlueBird is misconfigured: onCancel is undefined"));
        return;
      }
      onCancel(() => _resolve(void 0));
      runTillDone(...args).then(
        () => {
          resolve();
          _resolve(void 0);
        },
        (error2) => {
          reject();
          _reject(error2);
        }
      );
    });
    getPubSub().addListener("run:cancelled", onRunCancelled);
  }).finally(() => {
    getPubSub().removeListener("run:cancelled", onRunCancelled);
  });
}

var debug17 = Debug15("cc:events");
function handleScreenshotEvent(screenshot, executionState) {
  const data = {
    ...screenshot,
    testId: executionState.getCurrentTestID(),
    height: screenshot.dimensions.height,
    width: screenshot.dimensions.width
  };
  executionState.addScreenshotsData(data);
}
function handleTestBefore(testAttempt, executionState) {
  const parsed = JSON.parse(testAttempt);
  executionState.setCurrentTestID(parsed.id);
}
function handleTestAfter(testAttempt, executionState) {
  const test = JSON.parse(testAttempt);
  executionState.addAttemptsData(test);
}
async function handleSpecAfter({
  executionState,
  configState,
  spec,
  results,
  experimentalCoverageRecording = false
}) {
  debug17("after:spec %s %o", spec.relative, results);
  executionState.setSpecAfter(
    spec.relative,
    SpecAfterResult.getSpecAfterStandard(results, executionState)
  );
  executionState.setSpecOutput(spec.relative, getCapturedOutput());
  const config = configState.getConfig();
  if (experimentalCoverageRecording) {
    const config2 = configState.getConfig();
    const { path: path6, error: error2 } = await getCoverageFilePath(
      config2?.env?.coverageFile
    );
    if (!error2) {
      executionState.setSpecCoverage(spec.relative, path6);
    } else {
      executionState.addWarning(
        `Error reading coverage file "${path6}". Coverage recording will be skipped.
${dim(
          error2
        )}`
      );
    }
  }
  createReportTaskSpec(configState, executionState, spec.relative);
}

var debug18 = Debug16("cc:events");
function listenToEvents(configState, executionState, experimentalCoverageRecording = false) {
  getPubSub().on(
    "run:result",
    ({
      instanceId,
      runResult,
      specRelative
    }) => {
      debug18("%s %s: %o", "run:result", instanceId, runResult);
      executionState.setInstanceResult(
        instanceId,
        ModuleAPIResults.getStandardResult(runResult, executionState)
      );
    }
  );
  getPubSub().on("test:after:run", (payload) => {
    debug18("%s %o", "test:after:run", payload);
    handleTestAfter(payload, executionState);
  });
  getPubSub().on("test:before:run", (payload) => {
    debug18("%s %o", "test:before:run", payload);
    handleTestBefore(payload, executionState);
  });
  getPubSub().on(
    "after:screenshot",
    (screenshot) => {
      debug18("%s %o", "after:screenshot", screenshot);
      handleScreenshotEvent(screenshot, executionState);
    }
  );
  getPubSub().on(
    "after:spec",
    async ({
      spec,
      results
    }) => {
      await handleSpecAfter({
        spec,
        results,
        executionState,
        configState,
        experimentalCoverageRecording
      });
    }
  );
}

init_esm_shims();

init_esm_shims();
var debug19 = Debug17("cc:browser");
function guessBrowser(browser, availableBrowsers = []) {
  debug19(
    "guessing browser from '%s', available browsers: %o",
    browser,
    availableBrowsers
  );
  let result = availableBrowsers.find((b) => b.name === browser);
  if (result) {
    debug19("identified browser by name: %o", result);
    return {
      browserName: result.displayName,
      browserVersion: result.version
    };
  }
  result = availableBrowsers.find((b) => b.path === browser);
  if (result) {
    debug19("identified browser by path: %o", result);
    return {
      browserName: result.displayName ?? result.name,
      browserVersion: result.version
    };
  }
  warn("Unable to identify browser name and version");
  return {
    browserName: "unknown",
    browserVersion: "unknown"
  };
}

init_esm_shims();
var debug20 = Debug18("cc:platform");
var getOsVersion = async () => {
  if (platform() === "linux") {
    try {
      const linuxOs = await promisify(getos)();
      if ("dist" in linuxOs && "release" in linuxOs) {
        return [linuxOs.dist, linuxOs.release].join(" - ");
      } else {
        return release();
      }
    } catch {
      return release();
    }
  }
  return release();
};
var getPlatformInfo = async () => {
  const osVersion = await getOsVersion();
  const result = {
    osName: platform(),
    osVersion,
    osCpus: cpus(),
    osMemory: {
      free: freemem(),
      total: totalmem()
    }
  };
  debug20("platform info: %o", result);
  return result;
};

async function getPlatform({
  browser,
  config
}) {
  return {
    ...await getPlatformInfo(),
    ...guessBrowser(browser ?? "electron", config.resolved?.browsers)
  };
}

init_esm_shims();
async function shutdown() {
  await stopWSS();
}

init_esm_shims();

init_esm_shims();

init_esm_shims();

init_esm_shims();
function toArray(val) {
  return val ? typeof val === "string" ? [val] : val : [];
}
function toPosix(file2, sep = path4.sep) {
  return file2.split(sep).join(path4.posix.sep);
}

var debug21 = Debug19("cc:specs");
async function findSpecs({
  projectRoot,
  testingType,
  specPattern,
  configSpecPattern,
  excludeSpecPattern,
  additionalIgnorePattern
}) {
  configSpecPattern = toArray(configSpecPattern);
  specPattern = toArray(specPattern);
  excludeSpecPattern = toArray(excludeSpecPattern) || [];
  additionalIgnorePattern = toArray(additionalIgnorePattern) || [];
  debug21("exploring spec files for execution %O", {
    testingType,
    projectRoot,
    specPattern,
    configSpecPattern,
    excludeSpecPattern,
    additionalIgnorePattern
  });
  if (!specPattern || !configSpecPattern) {
    throw Error("Could not find glob patterns for exploring specs");
  }
  let specAbsolutePaths = await getFilesByGlob(projectRoot, specPattern, {
    absolute: true,
    ignore: [...excludeSpecPattern, ...additionalIgnorePattern]
  });
  if (!_11.isEqual(specPattern, configSpecPattern)) {
    const defaultSpecAbsolutePaths = await getFilesByGlob(
      projectRoot,
      configSpecPattern,
      {
        absolute: true,
        ignore: [...excludeSpecPattern, ...additionalIgnorePattern]
      }
    );
    specAbsolutePaths = _11.intersection(
      specAbsolutePaths,
      defaultSpecAbsolutePaths
    );
  }
  return matchedSpecs({
    projectRoot,
    testingType,
    specAbsolutePaths,
    specPattern
  });
}
async function getFilesByGlob(projectRoot, glob, globOptions) {
  const workingDirectoryPrefix = path5.join(projectRoot, path5.sep);
  const globs = [].concat(glob).map(
    (globPattern) => globPattern.startsWith("./") ? globPattern.replace("./", "") : globPattern
  ).map((globPattern) => {
    if (globPattern.startsWith(workingDirectoryPrefix)) {
      return globPattern.replace(workingDirectoryPrefix, "");
    }
    return globPattern;
  });
  if (os.platform() === "win32") {
    debug21("updating glob patterns to POSIX");
    for (const i in globs) {
      const cur = globs[i];
      if (!cur)
        throw new Error("undefined glob received");
      globs[i] = toPosix(cur);
    }
  }
  try {
    debug21("globbing pattern(s): %o", globs);
    debug21("within directory: %s", projectRoot);
    return matchGlobs(globs, {
      onlyFiles: true,
      absolute: true,
      cwd: projectRoot,
      ...globOptions,
      ignore: (globOptions?.ignore ?? []).concat("**/node_modules/**")
    });
  } catch (e) {
    debug21("error in getFilesByGlob %o", e);
    return [];
  }
}
var matchGlobs = async (globs, globbyOptions) => {
  return await globby(globs, globbyOptions);
};
function matchedSpecs({
  projectRoot,
  testingType,
  specAbsolutePaths
}) {
  debug21("found specs %o", specAbsolutePaths);
  let commonRoot = "";
  if (specAbsolutePaths.length === 1) {
    commonRoot = path5.dirname(specAbsolutePaths[0]);
  } else {
    commonRoot = commonPathPrefix(specAbsolutePaths);
  }
  return specAbsolutePaths.map(
    (absolute) => transformSpec({
      projectRoot,
      absolute,
      testingType,
      commonRoot,
      platform: os.platform(),
      sep: path5.sep
    })
  );
}
function transformSpec({
  projectRoot,
  absolute,
  testingType,
  commonRoot,
  platform: platform2,
  sep
}) {
  if (platform2 === "win32") {
    absolute = toPosix(absolute, sep);
    projectRoot = toPosix(projectRoot, sep);
  }
  const relative = path5.relative(projectRoot, absolute);
  const parsedFile = path5.parse(absolute);
  const fileExtension = path5.extname(absolute);
  const specFileExtension = [".spec", ".test", "-spec", "-test", ".cy"].map((ext) => ext + fileExtension).find((ext) => absolute.endsWith(ext)) || fileExtension;
  const parts = absolute.split(projectRoot);
  let name = parts[parts.length - 1] || "";
  if (name.startsWith("/")) {
    name = name.slice(1);
  }
  const LEADING_SLASH = /^\/|/g;
  const relativeToCommonRoot = absolute.replace(commonRoot, "").replace(LEADING_SLASH, "");
  return {
    fileExtension,
    baseName: parsedFile.base,
    fileName: parsedFile.base.replace(specFileExtension, ""),
    specFileExtension,
    relativeToCommonRoot,
    specType: testingType === "component" ? "component" : "integration",
    name,
    relative,
    absolute
  };
}

var getSpecFiles = async ({
  config,
  params
}) => {
  const specPattern = getSpecPattern(config.specPattern, params.spec);
  const specs = await findSpecs({
    projectRoot: params.project ?? config.projectRoot,
    testingType: params.testingType,
    specPattern,
    configSpecPattern: config.specPattern,
    excludeSpecPattern: config.excludeSpecPattern,
    additionalIgnorePattern: config.additionalIgnorePattern
  });
  if (specs.length === 0) {
    warn(
      "Found no spec files. Was looking for spec files that match both configSpecPattern and specPattern relative to projectRoot. Configuration: %O",
      {
        projectRoot: config.projectRoot,
        specPattern,
        configSpecPattern: config.specPattern,
        excludeSpecPattern: [
          config.excludeSpecPattern,
          config.additionalIgnorePattern
        ].flat(2),
        testingType: params.testingType
      }
    );
  }
  return { specs, specPattern };
};
function getSpecPattern(configPattern, explicit) {
  return explicit || configPattern;
}

init_esm_shims();

init_esm_shims();
var ConfigState = class {
  constructor() {
    this._config = void 0;
  }
  setConfig(c) {
    this._config = c;
  }
  getConfig() {
    return this._config;
  }
};

init_esm_shims();

init_esm_shims();
var SpecAfterToModuleAPIMapper = class _SpecAfterToModuleAPIMapper {
  static getTestAttempt(attempt, screenshots) {
    return {
      ...attempt,
      duration: attempt.wallClockDuration,
      startedAt: attempt.wallClockStartedAt,
      screenshots
    };
  }
  static getTest(t, screenshots) {
    return {
      ...t,
      attempts: t.attempts.map(
        (a, i) => _SpecAfterToModuleAPIMapper.getTestAttempt(
          a,
          screenshots.filter(
            (s) => s.testId === t.testId && s.testAttemptIndex === i
          )
        )
      )
    };
  }
  static convert(specAfterResult, configState) {
    const stats = {
      duration: specAfterResult.stats.wallClockDuration,
      endedAt: specAfterResult.stats.wallClockEndedAt,
      startedAt: specAfterResult.stats.wallClockStartedAt,
      failures: specAfterResult.stats.failures ?? 0,
      passes: specAfterResult.stats.passes ?? 0,
      pending: specAfterResult.stats.pending ?? 0,
      skipped: specAfterResult.stats.skipped ?? 0,
      suites: specAfterResult.stats.suites ?? 0,
      tests: specAfterResult.stats.tests ?? 0
    };
    return {
      status: "finished",
      config: configState.getConfig(),
      totalDuration: stats.duration,
      totalSuites: stats.suites,
      totalTests: stats.tests,
      totalFailed: stats.failures,
      totalPassed: stats.passes,
      totalPending: stats.pending,
      totalSkipped: stats.skipped ?? 0,
      startedTestsAt: stats.startedAt,
      endedTestsAt: stats.endedAt,
      runs: [
        {
          stats,
          reporter: specAfterResult.reporter,
          reporterStats: specAfterResult.reporterStats ?? null,
          spec: specAfterResult.spec,
          error: specAfterResult.error,
          video: specAfterResult.video,
          shouldUploadVideo: true,
          hooks: specAfterResult.hooks,
          tests: (specAfterResult.tests ?? []).map(
            (t) => _SpecAfterToModuleAPIMapper.getTest(t, specAfterResult.screenshots)
          )
        }
      ]
    };
  }
  static backfillException(result) {
    return {
      ...result,
      runs: result.runs.map(_SpecAfterToModuleAPIMapper.backfillExceptionRun)
    };
  }
  static backfillExceptionRun(run2) {
    if (!run2.error) {
      return run2;
    }
    return {
      ...run2,
      tests: [getFakeTestFromException(run2.error, run2.stats)]
    };
  }
};
function getFakeTestFromException(error2, stats) {
  return {
    title: ["Unknown"],
    body: "",
    displayError: error2.split("\n")[0],
    state: "failed",
    attempts: [
      {
        state: "failed",
        duration: 0,
        error: {
          name: "Error",
          message: error2.split("\n")[0],
          stack: error2,
          codeFrame: null
        },
        screenshots: [],
        startedAt: stats.startedAt,
        videoTimestamp: 0
      }
    ]
  };
}

import chalk2 from "chalk";
import { default as Debug20, default as Debug22 } from "debug";
import _12 from "lodash";
import assert from "node:assert";
import plur from "plur";
var debug22 = Debug20("cc:state");
var ExecutionState = class {
  constructor() {
    this.warnings = new Set();
    this.attemptsData = [];
    this.screenshotsData = [];
    this.state = {};
  }
  getWarnings() {
    return this.warnings;
  }
  addWarning(warning) {
    this.warnings.add(warning);
  }
  getResults(configState) {
    return Object.values(this.state).map(
      (i) => this.getInstanceResults(configState, i.instanceId)
    );
  }
  getInstance(instanceId) {
    return this.state[instanceId];
  }
  getSpec(spec) {
    return Object.values(this.state).find((i) => i.spec === spec);
  }
  initInstance({
    instanceId,
    spec
  }) {
    debug22('Init execution state for "%s"', spec);
    this.state[instanceId] = {
      instanceId,
      spec,
      createdAt: new Date()
    };
  }
  setSpecBefore(spec) {
    const i = this.getSpec(spec);
    if (!i) {
      warn('Cannot find execution state for spec "%s"', spec);
      return;
    }
    i.specBefore = new Date();
  }
  setSpecCoverage(spec, coverageFilePath) {
    const i = this.getSpec(spec);
    if (!i) {
      warn('Cannot find execution state for spec "%s"', spec);
      return;
    }
    debug22("Experimental: coverageFilePath was set");
    i.coverageFilePath = coverageFilePath;
  }
  setSpecAfter(spec, results) {
    const i = this.getSpec(spec);
    if (!i) {
      warn('Cannot find execution state for spec "%s"', spec);
      return;
    }
    i.specAfter = new Date();
    i.specAfterResults = results;
  }
  setSpecOutput(spec, output) {
    const i = this.getSpec(spec);
    if (!i) {
      warn('Cannot find execution state for spec "%s"', spec);
      return;
    }
    this.setInstanceOutput(i.instanceId, output);
  }
  setInstanceOutput(instanceId, output) {
    const i = this.state[instanceId];
    if (!i) {
      warn('Cannot find execution state for instance "%s"', instanceId);
      return;
    }
    if (i.output) {
      debug22('Instance "%s" already has output', instanceId);
      return;
    }
    i.output = output;
  }
  setInstanceResult(instanceId, runResults) {
    const i = this.state[instanceId];
    if (!i) {
      warn('Cannot find execution state for instance "%s"', instanceId);
      return;
    }
    i.runResults = {
      ...runResults,
      status: "finished"
    };
    i.runResultsReportedAt = new Date();
  }
  getInstanceResults(configState, instanceId) {
    const i = this.getInstance(instanceId);
    if (!i) {
      error('Cannot find execution state for instance "%s"', instanceId);
      return getFailedFakeInstanceResult(configState, {
        specs: ["unknown"],
        error: `[cc] Error while processing cypress results for instance ${instanceId}. See the console output for details.`
      });
    }
    if (i.specAfterResults) {
      debug22('Using spec:after results for %s "%s"', instanceId, i.spec);
      return SpecAfterToModuleAPIMapper.backfillException(
        SpecAfterToModuleAPIMapper.convert(i.specAfterResults, configState)
      );
    }
    if (i.runResults) {
      debug22('Using runResults for %s "%s"', instanceId, i.spec);
      return SpecAfterToModuleAPIMapper.backfillException(i.runResults);
    }
    debug22('No results detected for "%s"', i.spec);
    return getFailedFakeInstanceResult(configState, {
      specs: [i.spec],
      error: `No results detected for the spec file. That usually happens because of cypress crash. See the console output for details.`
    });
  }
  addAttemptsData(attemptDetails) {
    this.attemptsData.push(attemptDetails);
  }
  getAttemptsData() {
    return this.attemptsData;
  }
  addScreenshotsData(screenshotsData) {
    this.screenshotsData.push(screenshotsData);
  }
  getScreenshotsData() {
    return this.screenshotsData;
  }
  setCurrentTestID(testID) {
    this.currentTestID = testID;
  }
  getCurrentTestID() {
    return this.currentTestID;
  }
};

init_esm_shims();
function printWarnings2(executionState) {
  const warnings = Array.from(executionState.getWarnings());
  if (warnings.length > 0) {
    warn(
      `${warnings.length} ${plur(
        "Warning",
        warnings.length
      )} encountered during the execution:
${warnings.map(
        (w, i) => `
${chalk2.yellow(`[${i + 1}/${warnings.length}]`)} ${w}`
      ).join("\n")}`
    );
  }
}

var debug23 = Debug21("cc:run");
async function run(params = {}) {
  const executionState = new ExecutionState();
  const configState = new ConfigState();
  activateDebug(params.cloudDebug);
  debug23("run params %o", params);
  params = preprocessParams(params);
  debug23("params after preprocess %o", params);
  if (isOffline(params)) {
    info(`Skipping cloud orchestration because --record is set to false`);
    return runBareCypress(params);
  }
  const validatedParams = await validateParams(params);
  setAPIBaseUrl(validatedParams.cloudServiceUrl);
  if (!isCc()) {
    console.log(getLegalNotice());
  }
  const {
    recordKey,
    projectId,
    group,
    parallel,
    ciBuildId,
    tag,
    testingType,
    batchSize,
    autoCancelAfterFailures,
    experimentalCoverageRecording
  } = validatedParams;
  const config = await getMergedConfig(validatedParams);
  configState.setConfig(config?.resolved);
  const { specs, specPattern } = await getSpecFiles({
    config,
    params: validatedParams
  });
  if (specs.length === 0) {
    return;
  }
  const platform2 = await getPlatform({
    config,
    browser: validatedParams.browser
  });
  info(`@krivega/cc version: ${dim(_ccVersion)}`);
  info(`Cypress version: ${dim(_cypressVersion)}`);
  info("Discovered %d spec files", specs.length);
  info(
    `Tags: ${tag.length > 0 ? tag.join(",") : false}; Group: ${group ?? false}; Parallel: ${parallel ?? false}; Batch Size: ${batchSize}`
  );
  info("Connecting to cloud orchestration service...");
  const run2 = await createRun({
    ci: getCI(ciBuildId),
    specs: specs.map((spec) => spec.relative),
    commit: await getGitInfo(config.projectRoot),
    group,
    platform: platform2,
    parallel: parallel ?? false,
    ciBuildId,
    projectId,
    recordKey,
    specPattern: [specPattern].flat(2),
    tags: tag,
    testingType,
    batchSize,
    autoCancelAfterFailures,
    coverageEnabled: experimentalCoverageRecording
  });
  setRunId(run2.runId);
  info("\u{1F3A5} Run URL:", bold(run2.runUrl));
  cutInitialOutput();
  await startWSS();
  listenToEvents(
    configState,
    executionState,
    config.experimentalCoverageRecording
  );
  await runTillDoneOrCancelled(
    executionState,
    configState,
    {
      runId: run2.runId,
      groupId: run2.groupId,
      machineId: run2.machineId,
      platform: platform2,
      specs
    },
    validatedParams
  );
  divider();
  await Promise.allSettled(reportTasks);
  const _summary = summarizeExecution(
    executionState.getResults(configState),
    config
  );
  title("white", "Cloud Run Finished");
  console.log(summaryTable(_summary));
  printWarnings2(executionState);
  info("\n\u{1F3C1} Recorded Run:", bold(run2.runUrl));
  await shutdown();
  spacer();
  return {
    ..._summary,
    runUrl: run2.runUrl
  };
}

init_esm_shims();

init_esm_shims();

init_esm_shims();
var nestedObjectsInCurlyBracesRe = /\{(.+?)\}/g;
var nestedArraysInSquareBracketsRe = /\[(.+?)\]/g;
var everythingAfterFirstEqualRe = /=(.*)/;
var sanitizeAndConvertNestedArgs = (str, argName) => {
  if (!str) {
    return;
  }
  assert(_12.isString(argName) && argName.trim() !== "");
  try {
    if (typeof str === "object") {
      return str;
    }
    const parsed = tryJSONParse(str);
    if (parsed) {
      return parsed;
    }
    return _12.chain(str).replace(nestedObjectsInCurlyBracesRe, commasToPipes).replace(nestedArraysInSquareBracketsRe, commasToPipes).split(",").map((pair) => {
      return pair.split(everythingAfterFirstEqualRe);
    }).fromPairs().mapValues(JSONOrCoerce).value();
  } catch (err) {
    error("could not parse CLI option '%s' value: %s", argName, str);
    error("error %o", err);
    return void 0;
  }
};
var tryJSONParse = (str) => {
  try {
    return JSON.parse(str) === Infinity ? null : JSON.parse(str);
  } catch (err) {
    return null;
  }
};
var commasToPipes = (match5) => {
  return match5.split(",").join("|");
};
var pipesToCommas = (str) => {
  return str.split("|").join(",");
};
var JSONOrCoerce = (str) => {
  const parsed = tryJSONParse(str);
  if (parsed) {
    return parsed;
  }
  str = pipesToCommas(str);
  const parsed2 = tryJSONParse(str);
  if (parsed2) {
    return parsed2;
  }
  return coerce(str);
};
var coerce = (value) => {
  const num = _12.toNumber(value);
  if (_12.invoke(num, "toString") === value) {
    return num;
  }
  const bool = toBoolean(value);
  if (_12.invoke(bool, "toString") === value) {
    return bool;
  }
  const obj = tryJSONParse(value);
  if (obj && typeof obj === "object") {
    return obj;
  }
  const arr = _12.toArray(value);
  if (_12.invoke(arr, "toString") === value) {
    return arr;
  }
  return value;
};
var toBoolean = (value) => {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return value;
  }
};

init_esm_shims();
var import_extra_typings = __toESM(require_extra_typings());
var createProgram = (command = new import_extra_typings.Command()) => command.name("@krivega/cc").description(
  `
Run Cypress tests on CI using https://cc.dev or https://sorry-cypress.dev as an orchestration and reporting service

${getLegalNotice()}
      `
).option(
  "-b, --browser <browser-name-or-path>",
  "runs Cypress in the browser with the given name; if a filesystem path is supplied, Cypress will attempt to use the browser at that path"
).option(
  "--ci-build-id <id>",
  "the unique identifier for a run, this value is automatically detected for most CI providers"
).addOption(
  new import_extra_typings.Option("--component", "runs Cypress component test").default(false).implies({
    e2e: false
  })
).option(
  "-c, --config <config>",
  "sets Cypress configuration values. separate multiple values with a comma. overrides any value in cypress.config.{js,ts,mjs,cjs}"
).option(
  "-e, --env <env>",
  "sets environment variables. separate multiple values with a comma. overrides any value in cypress.config.{js,ts,mjs,cjs} or cypress.env.json"
).option(
  "-C, --config-file <config-file>",
  'specify Cypress config file, path to script file where Cypress configuration values are set. defaults to "cypress.config.{js,ts,mjs,cjs}"'
).addOption(new import_extra_typings.Option("--e2e", "runs end to end tests").default(true)).option("--group <name>", "a named group for recorded runs in Cc").addOption(
  new import_extra_typings.Option(
    "-k, --key <record-key>",
    "your secret Record Key obtained from Cc. you can omit this if you set a CC_RECORD_KEY environment variable"
  ).env("CC_RECORD_KEY")
).option(
  "--parallel",
  "enables concurrent runs and automatic load balancing of specs across multiple machines or processes",
  false
).addOption(
  new import_extra_typings.Option(
    "-p, --port <number>",
    "runs Cypress on a specific port. overrides any value in cypress.config.{js,ts,mjs,cjs}"
  ).argParser((i) => parseInt(i, 10))
).option(
  "-P, --project <project-path>",
  "path to your Cypress project root location - defaults to the current working directory"
).option("-q, --quiet", "suppress verbose output from Cypress").addOption(
  new import_extra_typings.Option(
    "--record [bool]",
    "records the run and sends test results, screenshots and videos to Cc"
  ).default(true).argParser((i) => i === "false" ? false : true)
).option(
  "-r, --reporter <reporter>",
  'use a specific mocha reporter for Cypress, pass a path to use a custom reporter, defaults to "spec"'
).option(
  "-o, --reporter-options <reporter-options>",
  'options for the mocha reporter. defaults to "null"'
).addOption(
  new import_extra_typings.Option(
    "-s, --spec <spec-pattern>",
    'define specific glob pattern for running the spec file(s), Defaults to the "specMatch" entry from the "cypress.config.{js,ts,mjs,cjs}" file'
  ).argParser(parseCommaSeparatedList)
).option(
  "-t, --tag <tag>",
  "comma-separated tag(s) for recorded runs in Cc",
  parseCommaSeparatedList
).addOption(
  new import_extra_typings.Option(
    "--auto-cancel-after-failures <number | false>",
    "Automatically abort the run after the specified number of failed tests. Overrides the default project settings. If set, must be a positive integer or 'false' to disable (Cc-only)"
  ).argParser(parseAutoCancelFailures)
).addOption(
  new import_extra_typings.Option("--headed [bool]", "Run cypress in headed mode").default(false).argParser((i) => i === "false" ? false : true)
).addOption(
  new import_extra_typings.Option(
    "--cloud-config-file <path>",
    "Specify the config file for @krivega/cc, defaults to 'cc.config.js' and will be searched in the project root, unless an aboslue path is provided"
  ).default(void 0)
).addOption(
  new import_extra_typings.Option(
    `--cloud-debug [true | string]`,
    `Enable debug mode for @krivega/cc, this will print out logs for troubleshooting. Values: [true | ${Object.values(
      DebugMode
    ).join(
      " | "
    )}]. Use comma to separate multiple values, e.g. --cloud-debug commit-info,cc`
  ).argParser(parseCommaSeparatedList).default(void 0)
).addOption(
  new import_extra_typings.Option(
    `--experimental-coverage-recording [bool]`,
    `Enable recording coverage results, specify the "coverageFile" Cypress environment variable for a custom coverage file, default is "./.nyc_output/out.json"`
  ).default(void 0).argParser((i) => i === "false" ? false : true)
);
var program = createProgram();
function parseCommaSeparatedList(value, previous = []) {
  if (value) {
    return previous.concat(value.split(",").map((t) => t.trim()));
  }
  return previous;
}
function parseAutoCancelFailures(value) {
  if (value === "false") {
    return false;
  }
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue) || parsedValue < 1) {
    throw new Error(
      "Invalid argument provided. Must be a positive integer or 'false'."
    );
  }
  return parsedValue;
}

var debug24 = Debug22("cc:cli");
function parseCLIOptions(_program = program, ...args) {
  const opts = _program.parse(...args).opts();
  activateDebug(opts.cloudDebug);
  debug24("parsed CLI flags %o", opts);
  const { e2e, component } = opts;
  if (e2e && component) {
    _program.error("Cannot use both e2e and component options");
  }
  return getRunParametersFromCLI(opts);
}
function getRunParametersFromCLI(cliOptions) {
  const { component, e2e, ...restOptions } = cliOptions;
  const testingType = component ? "component" : "e2e";
  const result = {
    ...restOptions,
    config: sanitizeAndConvertNestedArgs(cliOptions.config, "config"),
    env: sanitizeAndConvertNestedArgs(cliOptions.env, "env"),
    reporterOptions: sanitizeAndConvertNestedArgs(
      cliOptions.reporterOptions,
      "reporterOptions"
    ),
    testingType,
    recordKey: cliOptions.key
  };
  debug24("parsed run params: %o", result);
  return result;
}

async function main() {
  return run(parseCLIOptions());
}
main().then((result) => {
  if (!result) {
    process.exit(1);
  }
  if (result.status === "failed") {
    process.exit(1);
  }
  const overallFailed = result.totalFailed + result.totalSkipped;
  if (overallFailed > 0) {
    process.exit(overallFailed);
  }
  process.exit(0);
}).catch((err) => {
  if (err instanceof ValidationError) {
    program.error(withError(err.toString()));
  } else {
    console.error(err);
  }
  process.exit(1);
});
