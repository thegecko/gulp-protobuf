/// <reference types="node" />
import { Transform } from "stream";
export interface PbjsOptions {
    /**
     * Specifies the target format. Also accepts a path to require a custom target
     * json          JSON representation (default)
     * json-module   JSON representation as a module
     * proto2        Protocol Buffers, Version 2
     * proto3        Protocol Buffers, Version 3
     * static        Static code without reflection (non-functional on its own)
     * static-module Static code without reflection as a module
     */
    target?: string;
    /**
     * Adds a directory to the include path
     */
    path?: string;
    /**
     * Specifies the wrapper to use. Also accepts a path to require a custom wrapper
     * default   Default wrapper supporting both CommonJS and AMD
     * commonjs  CommonJS wrapper
     * amd       AMD wrapper
     * es6       ES6 wrapper (implies --es6)
     * closure   A closure adding to protobuf.roots where protobuf is a global
     */
    wrap?: string;
    /**
     * Specifies an alternative protobuf.roots name
     */
    root?: string;
    /**
     * Linter configuration. Defaults to protobuf.js-compatible rules:
     * eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins
     */
    lint?: string;
    /**
     * Enables ES6 syntax (const/let instead of var) (default false)
     */
    es6?: boolean;
    /**
     * Keeps field casing instead of converting to camel case (default false)
     */
    "keep-case"?: boolean;
    /**
     * Does not generate create functions used for reflection compatibility (default false)
     */
    "no-create"?: boolean;
    /**
     * Does not generate encode functions (default false)
     */
    "no-encode"?: boolean;
    /**
     * Does not generate decode functions (default false)
     */
    "no-decode"?: boolean;
    /**
     * Does not generate verify functions (default false)
     */
    "no-verify"?: boolean;
    /**
     * Does not generate convert functions like from/toObject (default false)
     */
    "no-convert"?: boolean;
    /**
     * Does not generate delimited encode/decode functions (default false)
     */
    "no-delimited"?: boolean;
    /**
     * Does not beautify generated code (default false)
     */
    "no-beautify"?: boolean;
    /**
     * Does not output any JSDoc comments (default false)
     */
    "no-comments"?: boolean;
    /**
     * Enfores the use of 'Long' for s-/u-/int64 and s-/fixed64 fields (default false)
     */
    "force-long"?: boolean;
    /**
     * Enfores the use of 'number' for s-/u-/int64 and s-/fixed64 fields (default false)
     */
    "force-number"?: boolean;
    /**
     * Enfores the use of enum strings (default false)
     */
    "force-enum-string"?: boolean;
    /**
     * Enfores the use of message instances instead of plain objects (default false)
     */
    "force-message"?: boolean;
}
export interface PbtsOptions {
    /**
     * Name of the global object in browser environments, if any
     */
    global?: string;
    /**
     * Does not output any JSDoc comments (default false)
     */
    "no-comments"?: boolean;
    /**
     * Wraps everything in a module of the specified name
     */
    name?: string;
    /**
     * Whether building the main library without any imports (default false)
     */
    main?: boolean;
}
export declare function pbjs(options: PbjsOptions): Transform;
export declare function pbts(options: PbtsOptions): Transform;
