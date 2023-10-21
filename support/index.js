"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// support/index.ts
var import_fast_safe_stringify = __toESM(require("fast-safe-stringify"));
var afterReportedTests = [];
var beforeReportedTests = [];
function pickTestData(test) {
  return {
    async: !!test.async,
    body: test.body,
    duration: test.duration,
    // @ts-ignore
    err: test.err,
    // @ts-ignore
    final: !!test.final,
    // @ts-ignore
    hooks: test.hooks,
    // @ts-ignore
    id: test.id,
    // @ts-ignore
    invocationDetails: test.invocationDetails,
    // @ts-ignore
    order: test.order,
    pending: test.pending,
    retries: test.retries(),
    state: test.state,
    sync: !!test.sync,
    timedOut: test.timedOut,
    // @ts-ignore
    timings: test.timings,
    // @ts-ignore
    type: test.type,
    // @ts-ignore
    wallClockStartedAt: test.wallClockStartedAt,
    title: test.title,
    // @ts-ignore
    currentRetry: test._currentRetry,
    fullTitle: test.fullTitle()
  };
}
function sendTestAfterMetrics(test) {
  if (test.pending || !test.state) {
    return;
  }
  afterReportedTests.push(getTestHash(test));
  cy.task(`cc:test:after:run`, (0, import_fast_safe_stringify.default)(pickTestData(test)), {
    log: false
  });
}
function sendTestBeforeMetrics(test) {
  beforeReportedTests.push(getTestHash(test));
  cy.task(`cc:test:before:run`, (0, import_fast_safe_stringify.default)(pickTestData(test)), {
    log: false
  });
}
function getTestHash(test) {
  return `${test.fullTitle()}-${test._currentRetry}`;
}
function handleAfter(test) {
  if (!afterReportedTests.includes(getTestHash(test))) {
    sendTestAfterMetrics(test);
  }
}
function handleBefore(test) {
  if (!beforeReportedTests.includes(getTestHash(test))) {
    sendTestBeforeMetrics(test);
  }
}
afterEach(() => {
  const currentTest = cy.state("ctx").currentTest;
  if (currentTest) {
    handleAfter(currentTest);
  }
});
beforeEach(() => {
  const currentTest = cy.state("ctx").currentTest;
  if (currentTest) {
    handleBefore(currentTest);
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3VwcG9ydC9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJDeXByZXNzXCIgLz5cbmltcG9ydCBzYWZlU3RyaW5naWZ5IGZyb20gXCJmYXN0LXNhZmUtc3RyaW5naWZ5XCI7XG5cbmNvbnN0IGFmdGVyUmVwb3J0ZWRUZXN0czogc3RyaW5nW10gPSBbXTtcbmNvbnN0IGJlZm9yZVJlcG9ydGVkVGVzdHM6IHN0cmluZ1tdID0gW107XG5cbmZ1bmN0aW9uIHBpY2tUZXN0RGF0YSh0ZXN0OiBNb2NoYS5SdW5uYWJsZSkge1xuICByZXR1cm4ge1xuICAgIGFzeW5jOiAhIXRlc3QuYXN5bmMsXG4gICAgYm9keTogdGVzdC5ib2R5LFxuICAgIGR1cmF0aW9uOiB0ZXN0LmR1cmF0aW9uLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBlcnI6IHRlc3QuZXJyLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmaW5hbDogISF0ZXN0LmZpbmFsLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBob29rczogdGVzdC5ob29rcyxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWQ6IHRlc3QuaWQsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGludm9jYXRpb25EZXRhaWxzOiB0ZXN0Lmludm9jYXRpb25EZXRhaWxzLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBvcmRlcjogdGVzdC5vcmRlcixcbiAgICBwZW5kaW5nOiB0ZXN0LnBlbmRpbmcsXG4gICAgcmV0cmllczogdGVzdC5yZXRyaWVzKCksXG4gICAgc3RhdGU6IHRlc3Quc3RhdGUsXG4gICAgc3luYzogISF0ZXN0LnN5bmMsXG4gICAgdGltZWRPdXQ6IHRlc3QudGltZWRPdXQsXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRpbWluZ3M6IHRlc3QudGltaW5ncyxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdHlwZTogdGVzdC50eXBlLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3YWxsQ2xvY2tTdGFydGVkQXQ6IHRlc3Qud2FsbENsb2NrU3RhcnRlZEF0LFxuICAgIHRpdGxlOiB0ZXN0LnRpdGxlLFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjdXJyZW50UmV0cnk6IHRlc3QuX2N1cnJlbnRSZXRyeSxcbiAgICBmdWxsVGl0bGU6IHRlc3QuZnVsbFRpdGxlKCksXG4gIH07XG59XG5mdW5jdGlvbiBzZW5kVGVzdEFmdGVyTWV0cmljcyh0ZXN0OiBNb2NoYS5SdW5uYWJsZSkge1xuICBpZiAodGVzdC5wZW5kaW5nIHx8ICF0ZXN0LnN0YXRlKSB7XG4gICAgLy8gVGVzdCBpcyBlaXRoZXIgc2tpcHBlZCBvciBoYXNuJ3QgcmFuIHlldC5cbiAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIHRoaXMgYmVjYXVzZSBhbGwgdGVzdHMgd2lsbCBzaG93IHVwIGluIHRoZSBob29rIGV2ZXJ5IHRpbWVcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gQHRzLWlnbm9yZVxuICBhZnRlclJlcG9ydGVkVGVzdHMucHVzaChnZXRUZXN0SGFzaCh0ZXN0KSk7XG4gIGN5LnRhc2soYGN1cnJlbnRzOnRlc3Q6YWZ0ZXI6cnVuYCwgc2FmZVN0cmluZ2lmeShwaWNrVGVzdERhdGEodGVzdCkpLCB7XG4gICAgbG9nOiBmYWxzZSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbmRUZXN0QmVmb3JlTWV0cmljcyh0ZXN0OiBNb2NoYS5SdW5uYWJsZSkge1xuICBiZWZvcmVSZXBvcnRlZFRlc3RzLnB1c2goZ2V0VGVzdEhhc2godGVzdCkpO1xuICBjeS50YXNrKGBjdXJyZW50czp0ZXN0OmJlZm9yZTpydW5gLCBzYWZlU3RyaW5naWZ5KHBpY2tUZXN0RGF0YSh0ZXN0KSksIHtcbiAgICBsb2c6IGZhbHNlLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0VGVzdEhhc2godGVzdDogTW9jaGEuUnVubmFibGUpIHtcbiAgLy8gQHRzLWlnbm9yZVxuICByZXR1cm4gYCR7dGVzdC5mdWxsVGl0bGUoKX0tJHt0ZXN0Ll9jdXJyZW50UmV0cnl9YDtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQWZ0ZXIodGVzdDogTW9jaGEuUnVubmFibGUpIHtcbiAgaWYgKCFhZnRlclJlcG9ydGVkVGVzdHMuaW5jbHVkZXMoZ2V0VGVzdEhhc2godGVzdCkpKSB7XG4gICAgc2VuZFRlc3RBZnRlck1ldHJpY3ModGVzdCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZUJlZm9yZSh0ZXN0OiBNb2NoYS5SdW5uYWJsZSkge1xuICBpZiAoIWJlZm9yZVJlcG9ydGVkVGVzdHMuaW5jbHVkZXMoZ2V0VGVzdEhhc2godGVzdCkpKSB7XG4gICAgc2VuZFRlc3RCZWZvcmVNZXRyaWNzKHRlc3QpO1xuICB9XG59XG5cbmFmdGVyRWFjaCgoKSA9PiB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgY3VycmVudFRlc3QgPSBjeS5zdGF0ZShcImN0eFwiKS5jdXJyZW50VGVzdDtcbiAgaWYgKGN1cnJlbnRUZXN0KSB7XG4gICAgaGFuZGxlQWZ0ZXIoY3VycmVudFRlc3QpO1xuICB9XG59KTtcblxuYmVmb3JlRWFjaCgoKSA9PiB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgY3VycmVudFRlc3QgPSBjeS5zdGF0ZShcImN0eFwiKS5jdXJyZW50VGVzdDtcblxuICBpZiAoY3VycmVudFRlc3QpIHtcbiAgICBoYW5kbGVCZWZvcmUoY3VycmVudFRlc3QpO1xuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpQ0FBMEI7QUFFMUIsSUFBTSxxQkFBK0IsQ0FBQztBQUN0QyxJQUFNLHNCQUFnQyxDQUFDO0FBRXZDLFNBQVMsYUFBYSxNQUFzQjtBQUMxQyxTQUFPO0FBQUEsSUFDTCxPQUFPLENBQUMsQ0FBQyxLQUFLO0FBQUEsSUFDZCxNQUFNLEtBQUs7QUFBQSxJQUNYLFVBQVUsS0FBSztBQUFBO0FBQUEsSUFFZixLQUFLLEtBQUs7QUFBQTtBQUFBLElBRVYsT0FBTyxDQUFDLENBQUMsS0FBSztBQUFBO0FBQUEsSUFFZCxPQUFPLEtBQUs7QUFBQTtBQUFBLElBRVosSUFBSSxLQUFLO0FBQUE7QUFBQSxJQUVULG1CQUFtQixLQUFLO0FBQUE7QUFBQSxJQUV4QixPQUFPLEtBQUs7QUFBQSxJQUNaLFNBQVMsS0FBSztBQUFBLElBQ2QsU0FBUyxLQUFLLFFBQVE7QUFBQSxJQUN0QixPQUFPLEtBQUs7QUFBQSxJQUNaLE1BQU0sQ0FBQyxDQUFDLEtBQUs7QUFBQSxJQUNiLFVBQVUsS0FBSztBQUFBO0FBQUEsSUFFZixTQUFTLEtBQUs7QUFBQTtBQUFBLElBRWQsTUFBTSxLQUFLO0FBQUE7QUFBQSxJQUVYLG9CQUFvQixLQUFLO0FBQUEsSUFDekIsT0FBTyxLQUFLO0FBQUE7QUFBQSxJQUVaLGNBQWMsS0FBSztBQUFBLElBQ25CLFdBQVcsS0FBSyxVQUFVO0FBQUEsRUFDNUI7QUFDRjtBQUNBLFNBQVMscUJBQXFCLE1BQXNCO0FBQ2xELE1BQUksS0FBSyxXQUFXLENBQUMsS0FBSyxPQUFPO0FBRy9CO0FBQUEsRUFDRjtBQUVBLHFCQUFtQixLQUFLLFlBQVksSUFBSSxDQUFDO0FBQ3pDLEtBQUcsS0FBSywrQkFBMkIsMkJBQUFBLFNBQWMsYUFBYSxJQUFJLENBQUMsR0FBRztBQUFBLElBQ3BFLEtBQUs7QUFBQSxFQUNQLENBQUM7QUFDSDtBQUVBLFNBQVMsc0JBQXNCLE1BQXNCO0FBQ25ELHNCQUFvQixLQUFLLFlBQVksSUFBSSxDQUFDO0FBQzFDLEtBQUcsS0FBSyxnQ0FBNEIsMkJBQUFBLFNBQWMsYUFBYSxJQUFJLENBQUMsR0FBRztBQUFBLElBQ3JFLEtBQUs7QUFBQSxFQUNQLENBQUM7QUFDSDtBQUVBLFNBQVMsWUFBWSxNQUFzQjtBQUV6QyxTQUFPLEdBQUcsS0FBSyxVQUFVLEtBQUssS0FBSztBQUNyQztBQUVBLFNBQVMsWUFBWSxNQUFzQjtBQUN6QyxNQUFJLENBQUMsbUJBQW1CLFNBQVMsWUFBWSxJQUFJLENBQUMsR0FBRztBQUNuRCx5QkFBcUIsSUFBSTtBQUFBLEVBQzNCO0FBQ0Y7QUFDQSxTQUFTLGFBQWEsTUFBc0I7QUFDMUMsTUFBSSxDQUFDLG9CQUFvQixTQUFTLFlBQVksSUFBSSxDQUFDLEdBQUc7QUFDcEQsMEJBQXNCLElBQUk7QUFBQSxFQUM1QjtBQUNGO0FBRUEsVUFBVSxNQUFNO0FBRWQsUUFBTSxjQUFjLEdBQUcsTUFBTSxLQUFLLEVBQUU7QUFDcEMsTUFBSSxhQUFhO0FBQ2YsZ0JBQVksV0FBVztBQUFBLEVBQ3pCO0FBQ0YsQ0FBQztBQUVELFdBQVcsTUFBTTtBQUVmLFFBQU0sY0FBYyxHQUFHLE1BQU0sS0FBSyxFQUFFO0FBRXBDLE1BQUksYUFBYTtBQUNmLGlCQUFhLFdBQVc7QUFBQSxFQUMxQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInNhZmVTdHJpbmdpZnkiXQp9Cg==
