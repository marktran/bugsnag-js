import Breadcrumb from "./breadcrumb";
import * as common from "./common";

declare class Event {
  public static create(
    maybeError: any,
    tolerateNonErrors: boolean,
    handledState: HandledState,
    component: string,
    errorFramesToSkip: number,
    logger?: common.Logger
  ): Event;

  public app: App;
  public device: Device;
  public request: Request;

  public errors: Error[];
  public breadcrumbs: Breadcrumb[];

  public severity: "info" | "warning" | "error";

  public readonly originalError: any;
  public readonly unhandled: boolean;

  public apiKey?: string;
  public context?: string;
  public groupingHash?: string;

  // user
  public getUser(): { id?: string; email?: string; name?: string };
  public setUser(id?: string, email?: string, name?: string): void;

  // metadata
  public addMetadata(section: string, values: { [key: string]: any }): void;
  public addMetadata(section: string, key: string, value: any): void;
  public getMetadata(section: string, key?: string): any;
  public clearMetadata(section: string, key?: string): void;
}

interface HandledState {
  severity: string;
  unhandled: boolean;
  severityReason: {
    type: string;
    [key: string]: any;
  };
}

interface Stackframe {
  file: string;
  method?: string;
  lineNumber?: number;
  columnNumber?: number;
  code?: object;
  inProject?: boolean;
}

interface Error {
  errorClass: string;
  errorMessage: string;
  stacktrace: Stackframe[];
  type: string;
}

interface Device {
  id?: string;
  hostname?: string;
  locale?: string;
  manufacturer?: string;
  model?: string;
  modelNumber?: string;
  orientation?: string;
  osName?: string;
  osVersion?: string;
  runtimeVersions?: {
    [key: string]: any;
  };
  time?: string;
  userAgent?: string;
  [key: string]: any;
}

interface App {
  codeBundleId?: string;
  duration?: number;
  durationInForeground?: number;
  inForeground?: boolean;
  releaseStage?: string;
  type?: string;
  version?: string;
  [key: string]: any;
}

interface Request {
  clientIp?: string;
  headers?: { [key: string]: string };
  httpMethod?: string;
  referer?: string;
  url?: string;
  [key: string]: any;
}

export default Event;
