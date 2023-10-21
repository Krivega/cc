type TestState = "failed" | "passed" | "pending" | "skipped";
type TestAttemptState = "failed" | "passed" | "pending";
type TestingType$1 = "e2e" | "component";
interface MochaError {
    message: string;
    name: string;
    stack: string;
    parsedStack: MochaParsedStackItem[];
    codeFrame: MochaCodeFrame;
}
interface MochaInvocationDetails {
    function: string;
    fileUrl: string;
    originalFile: string;
    relativeFile: string;
    absoluteFile: string;
    line: number;
    column: number;
    whitespace: string;
    stack: string;
}
interface MochaCodeFrame {
    line: number;
    column: number;
    originalFile: string;
    relativeFile: string;
    absoluteFile: string;
    frame: string;
    language: string;
}
interface MochaParsedStackItem {
    message: string;
    whitespace: string;
    function?: string;
    fileUrl?: string;
    originalFile?: string;
    relativeFile?: string;
    absoluteFile?: string;
    line?: number;
    column?: number;
}
interface MochaHook {
    title: string;
    hookName: string;
    hookId: string;
    pending: boolean;
    body: string;
    type: string;
    file: null | string;
    invocationDetails: MochaInvocationDetails;
    currentRetry: number;
    retries: number;
    _slow: number;
}
type TimingKey = "before each" | "after each" | "after all" | "before all";
type Timing = {
    [key in TimingKey]?: HookTimingItem;
} & {
    lifecycle: number;
    test: TimingItem;
};
interface HookTimingItem extends TimingItem {
    hookId: string;
}
interface TimingItem {
    fnDuration: number;
    afterFnDuration: number;
}

declare namespace Cypress12 {
    namespace SpecAfter {
        interface Payload {
            error: string | null;
            hooks: Hooks[] | null;
            reporter?: string;
            reporterStats: ReporterStats | null;
            screenshots: Screenshot[];
            spec: Spec;
            stats: Stats;
            tests: Test[] | null;
            video: string | null;
        }
        interface Spec {
            absolute: string;
            baseName: string;
            fileExtension: string;
            fileName: string;
            name: string;
            relative: string;
            relativeToCommonRoot: string;
            specFileExtension: string;
            specType: string;
        }
        interface Screenshot {
            height: number;
            name: string | null;
            path: string;
            screenshotId: string;
            takenAt: string;
            testAttemptIndex: number;
            testId: string;
            width: number;
        }
        interface ReporterStats {
            suites: number;
            tests: number;
            passes: number;
            pending: number;
            failures: number;
            start: string;
            end: string;
            duration: number;
        }
        interface Stats {
            suites: number;
            tests: number;
            passes: number;
            pending: number;
            skipped: number;
            failures: number;
            wallClockStartedAt: string;
            wallClockEndedAt: string;
            wallClockDuration: number;
        }
        interface Test {
            attempts: TestAttempt[];
            body: string;
            displayError: string | null;
            state: TestState;
            title: string[];
            testId: string;
        }
        interface Hooks {
            hookId: string;
            hookName: "before each" | "after each" | "before all" | "after all";
            title: string[];
            body: string;
        }
        interface TestAttempt {
            error: TestError | null;
            failedFromHookId: string | null;
            state: TestAttemptState;
            timings: Timing | null;
            videoTimestamp: number;
            wallClockDuration: number;
            wallClockStartedAt: string;
        }
        interface TestError {
            message: string;
            name: string;
            stack: string;
            codeFrame: CodeFrame | null;
        }
        interface CodeFrame {
            line: number | null;
            column: number | null;
            originalFile: string | null;
            relativeFile: string | null;
            absoluteFile: string | null;
            frame: string | null;
            language: string | null;
        }
    }
    namespace TestAfter {
        interface Payload extends TestBefore.Payload {
            duration: number;
            err?: MochaError;
            hooks: MochaHook[];
            timings: Timing;
        }
    }
    namespace TestBefore {
        interface Payload {
            async: boolean;
            body: string;
            currentRetry: number;
            fullTitle: string;
            hooks?: MochaHook[];
            id: string;
            invocationDetails?: MochaInvocationDetails;
            order: number;
            pending: boolean;
            retries: number;
            state: string;
            sync: boolean;
            timedOut: boolean;
            timings: Pick<Timing, "lifecycle">;
            title: string;
            type: string;
            wallClockStartedAt: string;
        }
    }
    namespace ScreenshotAfter {
        interface Payload {
            testAttemptIndex: number;
            size: number;
            takenAt: string;
            dimensions: {
                width: number;
                height: number;
            };
            multipart: boolean;
            specName: string;
            name: string | null;
            testFailure: boolean;
            path: string;
            scaled: boolean;
            duration: number;
            blackout: string[];
        }
    }
    namespace ModuleAPI {
        type Result = CompletedResult | FailureResult;
        interface FailureResult {
            status: "failed";
            failures: number;
            message: string;
        }
        interface CompletedResult {
            browserName: string;
            browserPath: string;
            browserVersion: string;
            config: Config;
            cypressVersion: string;
            endedTestsAt: string;
            osName: string;
            osVersion: string;
            runs: Run[];
            startedTestsAt: string;
            status: "finished" | "failed";
            totalDuration: number;
            totalFailed: number;
            totalPassed: number;
            totalPending: number;
            totalSkipped: number;
            totalSuites: number;
            totalTests: number;
        }
        interface Run {
            error: SpecAfter.Payload["error"];
            hooks: SpecAfter.Payload["hooks"];
            reporter?: SpecAfter.Payload["reporter"];
            reporterStats: SpecAfter.Payload["reporterStats"];
            shouldUploadVideo: boolean;
            spec: SpecAfter.Spec;
            stats: Stats;
            tests: Test[] | null;
            video: string | null;
        }
        interface Test {
            title: string[];
            state: TestState;
            body: string;
            displayError: string | null;
            attempts: TestAttempt[];
        }
        interface TestAttempt {
            state: SpecAfter.TestAttempt["state"];
            error: SpecAfter.TestAttempt["error"];
            videoTimestamp: number;
            duration: number | null;
            startedAt: string;
            screenshots: Screenshot[];
        }
        interface Screenshot {
            name: string | null;
            takenAt: string;
            path: string;
            height: number;
            width: number;
        }
        interface Stats {
            duration: number;
            endedAt: string;
            failures: number;
            passes: number;
            pending: number;
            skipped: number;
            startedAt: string;
            suites: number;
            tests: number;
        }
        interface Config {
            specPattern: string;
            video: boolean;
            videoUploadOnPasses: boolean;
            version: string;
            testingType: TestingType$1;
        }
    }
}

type TestingType = Cypress.TestingType;
declare enum DebugMode {
    None = "none",
    All = "all",
    Cc = "cc",
    Cypress = "cypress",
    CommitInfo = "commit-info"
}
type StrippedCypressModuleAPIOptions = Omit<Partial<CypressCommandLine.CypressRunOptions>, "autoCancelAfterFailures" | "tag" | "spec" | "exit" | "headed" | "record" | "headless" | "noExit" | "parallel" | "key" | "tag" | "group" | "ciBuildId" | "cloudConfigFile">;
type CcRunParameters = StrippedCypressModuleAPIOptions & {
    ciBuildId?: string;
    batchSize?: number;
    record?: boolean;
    cloudServiceUrl?: string;
    env?: object;
    group?: string;
    recordKey?: string;
    parallel?: boolean;
    projectId?: string;
    spec?: string | string[];
    tag?: string | string[];
    testingType?: TestingType;
    autoCancelAfterFailures?: number | false;
    headed?: boolean;
    cloudConfigFile?: string;
    cloudDebug?: DebugMode | true | string | string[];
    experimentalCoverageRecording?: boolean;
};
interface CcRunAPI extends CcRunParameters {
}

declare function run(params?: CcRunAPI): Promise<CypressCommandLine.CypressRunResult | CypressCommandLine.CypressFailedRunResult | {
    runUrl: string;
    browserName: string;
    browserPath: string;
    browserVersion: string;
    config: Cypress12.ModuleAPI.Config;
    cypressVersion: string;
    endedTestsAt: string;
    osName: string;
    osVersion: string;
    runs: Cypress12.ModuleAPI.Run[];
    startedTestsAt: string;
    status: "finished" | "failed";
    totalDuration: number;
    totalFailed: number;
    totalPassed: number;
    totalPending: number;
    totalSkipped: number;
    totalSuites: number;
    totalTests: number;
} | undefined>;

export { CcRunAPI, run };
