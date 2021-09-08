var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
var import_http, import_https, import_zlib, import_stream, import_util, import_crypto, import_url, src, dataUriToBuffer$1, Readable, wm, Blob, fetchBlob, Blob$1, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, carriage, dashes, carriageLength, getFooter, getBoundary, INTERNALS$2, Body, clone, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers, redirectStatus, isRedirect, INTERNALS$1, Response, getSearch, INTERNALS, isRequest, Request, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    init_shims();
    import_http = __toModule(require("http"));
    import_https = __toModule(require("https"));
    import_zlib = __toModule(require("zlib"));
    import_stream = __toModule(require("stream"));
    import_util = __toModule(require("util"));
    import_crypto = __toModule(require("crypto"));
    import_url = __toModule(require("url"));
    src = dataUriToBuffer;
    dataUriToBuffer$1 = src;
    ({ Readable } = import_stream.default);
    wm = new WeakMap();
    Blob = class {
      constructor(blobParts = [], options2 = {}) {
        let size = 0;
        const parts = blobParts.map((element) => {
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element;
          } else {
            buffer = Buffer.from(typeof element === "string" ? element : String(element));
          }
          size += buffer.length || buffer.size || 0;
          return buffer;
        });
        const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
        wm.set(this, {
          type: /[^\u0020-\u007E]/.test(type) ? "" : type,
          size,
          parts
        });
      }
      get size() {
        return wm.get(this).size;
      }
      get type() {
        return wm.get(this).type;
      }
      async text() {
        return Buffer.from(await this.arrayBuffer()).toString();
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of this.stream()) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        return Readable.from(read(wm.get(this).parts));
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = wm.get(this).parts.values();
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
            blobParts.push(chunk);
            added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
            relativeStart = 0;
            if (added >= span) {
              break;
            }
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        Object.assign(wm.get(blob), { size: span, parts: blobParts });
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    fetchBlob = Blob;
    Blob$1 = fetchBlob;
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && object[NAME] === "AbortSignal";
    };
    carriage = "\r\n";
    dashes = "-".repeat(2);
    carriageLength = Buffer.byteLength(carriage);
    getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
    getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_stream.default)
          ;
        else if (isFormData(body)) {
          boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
          body = import_stream.default.Readable.from(formDataIterator(body, boundary));
        } else {
          body = Buffer.from(String(body));
        }
        this[INTERNALS$2] = {
          body,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_stream.default) {
          body.on("error", (err) => {
            const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].body;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_stream.PassThrough({ highWaterMark });
        p2 = new import_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].body = p1;
        body = p2;
      }
      return body;
    };
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${body.getBoundary()}`;
      }
      if (isFormData(body)) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body instanceof import_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request;
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      if (isFormData(body)) {
        return getFormDataLength(request[INTERNALS$2].boundary);
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else if (isBlob(body)) {
        body.stream().pipe(dest);
      } else if (Buffer.isBuffer(body)) {
        dest.write(body);
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw err;
      }
    };
    validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const err = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
        throw err;
      }
    };
    Headers = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback) {
        for (const name of this.keys()) {
          callback(this.get(name), name);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response = class extends Body {
      constructor(body = null, options2 = {}) {
        super(body, options2);
        const status = options2.status || 200;
        const headers = new Headers(options2.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          url: options2.url,
          status,
          statusText: options2.statusText || "",
          headers,
          counter: options2.counter,
          highWaterMark: options2.highWaterMark
        };
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response(clone(this, this.highWaterMark), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal !== null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      clone() {
        return new Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const requestOptions = {
        path: parsedURL.pathname + search,
        pathname: parsedURL.pathname,
        hostname: parsedURL.hostname,
        protocol: parsedURL.protocol,
        port: parsedURL.port,
        hash: parsedURL.hash,
        search: parsedURL.search,
        query: parsedURL.query,
        href: parsedURL.href,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return requestOptions;
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/@sveltejs/adapter-vercel/files/shims.js
var init_shims = __esm({
  "node_modules/@sveltejs/adapter-vercel/files/shims.js"() {
    init_install_fetch();
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    init_shims();
    "use strict";
    exports.parse = parse;
    exports.serialize = serialize;
    var decode = decodeURIComponent;
    var encode = encodeURIComponent;
    var pairSplitRegExp = /; */;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var pairs = str.split(pairSplitRegExp);
      var dec = opt.decode || decode;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var eq_idx = pair.indexOf("=");
        if (eq_idx < 0) {
          continue;
        }
        var key = pair.substr(0, eq_idx).trim();
        var val = pair.substr(++eq_idx, pair.length).trim();
        if (val[0] == '"') {
          val = val.slice(1, -1);
        }
        if (obj[key] == void 0) {
          obj[key] = tryDecode(val, dec);
        }
      }
      return obj;
    }
    function serialize(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString !== "function") {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});
init_shims();

// node_modules/@sveltejs/kit/dist/node.js
init_shims();
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}

// .svelte-kit/output/server/app.js
init_shims();
var import_cookie = __toModule(require_cookie());

// node_modules/@lukeed/uuid/dist/index.mjs
init_shims();
var IDX = 256;
var HEX = [];
var BUFFER;
while (IDX--)
  HEX[IDX] = (IDX + 256).toString(16).substring(1);
function v4() {
  var i = 0, num, out = "";
  if (!BUFFER || IDX + 16 > 256) {
    BUFFER = Array(i = 256);
    while (i--)
      BUFFER[i] = 256 * Math.random() | 0;
    i = IDX = 0;
  }
  for (; i < 16; i++) {
    num = BUFFER[IDX + i];
    if (i == 6)
      out += HEX[num & 15 | 64];
    else if (i == 8)
      out += HEX[num & 63 | 128];
    else
      out += HEX[num];
    if (i & 1 && i > 1 && i < 11)
      out += "-";
  }
  IDX++;
  return out;
}

// .svelte-kit/output/server/app.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$1(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$1(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page: page2
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: page2,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page2 && page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2 && page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2 && page2.path)},
						query: new URLSearchParams(${page2 ? s$1(page2.query.toString()) : ""}),
						params: ${page2 && s$1(page2.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page: page2,
  node,
  $session,
  context,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  const page_proxy = new Proxy(page2, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page2.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function coalesce_to_error(err) {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page: page2,
    node: default_layout,
    $session,
    context: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page: page2,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page: page2
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let context = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              context,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    context: node_loaded.context,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    });
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page2 = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page: page2
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(request2.path);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
Promise.resolve();
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$4 = {
  code: "#svelte-announcer.svelte-9z6sc{position:absolute;left:0;top:0;clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\t-webkit-clip-path: inset(50%);\\n\\t\\t        clip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}</style>"],"names":[],"mappings":"AAsDC,iBAAiB,aAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,iBAAiB,CAAE,MAAM,GAAG,CAAC,CACrB,SAAS,CAAE,MAAM,GAAG,CAAC,CAC7B,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$4);
  {
    stores.page.set(page2);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var handle = async ({ request, resolve: resolve2 }) => {
  const cookies = import_cookie.default.parse(request.headers.cookie || "");
  request.locals.userid = cookies.userid || v4();
  if (request.query.has("_method")) {
    request.method = request.query.get("_method").toUpperCase();
  }
  const response = await resolve2(request);
  if (!cookies.userid) {
    response.headers["set-cookie"] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
  }
  return response;
};
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  handle
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-62147430.js",
      css: [assets + "/_app/assets/start-c446e5f0.css"],
      js: [assets + "/_app/start-62147430.js", assets + "/_app/chunks/vendor-46edfb2d.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": "albaranes.svg", "size": 4526, "type": "image/svg+xml" }, { "file": "clientes.svg", "size": 7671, "type": "image/svg+xml" }, { "file": "facturas.svg", "size": 5706, "type": "image/svg+xml" }, { "file": "favicon.png", "size": 856, "type": "image/png" }, { "file": "imago.svg", "size": 1117, "type": "image/svg+xml" }, { "file": "logo-192.png", "size": 2908, "type": "image/png" }, { "file": "logo-512.png", "size": 4325, "type": "image/png" }, { "file": "logo-h.svg", "size": 8404, "type": "image/svg+xml" }, { "file": "logo-s.svg", "size": 7315, "type": "image/svg+xml" }, { "file": "logo-v.svg", "size": 8367, "type": "image/svg+xml" }, { "file": "logo.svg", "size": 8028, "type": "image/svg+xml" }, { "file": "mobile.png", "size": 3074, "type": "image/png" }, { "file": "presupuestos.svg", "size": 24645, "type": "image/svg+xml" }, { "file": "productos-servicios.svg", "size": 18588, "type": "image/svg+xml" }, { "file": "proveedores.svg", "size": 13603, "type": "image/svg+xml" }, { "file": "robots.txt", "size": 67, "type": "text/plain" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/about\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/about.svelte": () => Promise.resolve().then(function() {
    return about;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-f5a3146d.js", "css": ["assets/pages/__layout.svelte-3e4f4c24.css"], "js": ["pages/__layout.svelte-f5a3146d.js", "chunks/vendor-46edfb2d.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-d36fd939.js", "css": [], "js": ["error.svelte-d36fd939.js", "chunks/vendor-46edfb2d.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-a57d2c2f.js", "css": ["assets/pages/index.svelte-33c3b7e2.css"], "js": ["pages/index.svelte-a57d2c2f.js", "chunks/vendor-46edfb2d.js"], "styles": [] }, "src/routes/about.svelte": { "entry": "pages/about.svelte-c8853808.js", "css": ["assets/pages/about.svelte-c87dab8a.css"], "js": ["pages/about.svelte-c8853808.js", "chunks/vendor-46edfb2d.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
var page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var css$3 = {
  code: "nav.svelte-o1yrva{height:65px;padding:0 40px}.logo.svelte-o1yrva{width:200px}li.svelte-o1yrva{padding:0 20px}.active.svelte-o1yrva{border-bottom:2px solid #383838}",
  map: '{"version":3,"file":"Nav.svelte","sources":["Nav.svelte"],"sourcesContent":["<script>\\r\\n  import { page } from \\"$app/stores\\";\\r\\n\\r\\n  const routes = [\\r\\n    {\\r\\n      slug: \\"/\\",\\r\\n      title: \\"Inicio\\",\\r\\n    },\\r\\n    {\\r\\n      slug: \\"/about\\",\\r\\n      title: \\"Sobre\\",\\r\\n    },\\r\\n  ];\\r\\n<\/script>\\r\\n\\r\\n<nav class=\\"row jbetween acenter xfill\\">\\r\\n  <img class=\\"logo\\" src=\\"logo.svg\\" alt=\\"facturasgratis\\" />\\r\\n\\r\\n  <ul class=\\"row yfill\\">\\r\\n    {#each routes as route}\\r\\n      <li class=\\"row acenter yfill\\" class:active={$page.path === route.slug}><a href={route.slug}>{route.title}</a></li>\\r\\n    {/each}\\r\\n  </ul>\\r\\n</nav>\\r\\n\\r\\n<style lang=\\"scss\\">nav {\\n  height: 65px;\\n  padding: 0 40px;\\n}\\n\\n.logo {\\n  width: 200px;\\n}\\n\\nli {\\n  padding: 0 20px;\\n}\\n\\n.active {\\n  border-bottom: 2px solid #383838;\\n}</style>\\r\\n"],"names":[],"mappings":"AAyBmB,GAAG,cAAC,CAAC,AACtB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CAAC,IAAI,AACjB,CAAC,AAED,KAAK,cAAC,CAAC,AACL,KAAK,CAAE,KAAK,AACd,CAAC,AAED,EAAE,cAAC,CAAC,AACF,OAAO,CAAE,CAAC,CAAC,IAAI,AACjB,CAAC,AAED,OAAO,cAAC,CAAC,AACP,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AAClC,CAAC"}'
};
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const routes = [{ slug: "/", title: "Inicio" }, { slug: "/about", title: "Sobre" }];
  $$result.css.add(css$3);
  $$unsubscribe_page();
  return `<nav class="${"row jbetween acenter xfill svelte-o1yrva"}"><img class="${"logo svelte-o1yrva"}" src="${"logo.svg"}" alt="${"facturasgratis"}">

  <ul class="${"row yfill"}">${each(routes, (route) => `<li class="${["row acenter yfill svelte-o1yrva", $page.path === route.slug ? "active" : ""].join(" ").trim()}"><a${add_attribute("href", route.slug, 0)}>${escape(route.title)}</a></li>`)}</ul>
</nav>`;
});
var css$2 = {
  code: '*,*:before,*:after{box-sizing:border-box;margin:0;padding:0;border:none;outline:none;box-shadow:none;line-height:1.4;-webkit-appearance:none;-moz-appearance:none;appearance:none;image-rendering:crisp-edges;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;-webkit-tap-highlight-color:transparent}*:active,*:before:active,*:after:active{-webkit-tap-highlight-color:transparent}@media(max-width: 900px){*,*:before,*:after{cursor:default}}html,body{position:relative;width:100%;height:100%;overflow:hidden}body{background:#000;color:#000}main{position:absolute;top:0;left:0;width:100%;height:100%;background:#fafafa;border-radius:0.5em}body,input,textarea,select,option{font-family:"Circular Std", "Segoe UI Emoji", sans-serif}input,textarea,select,option,p{font-weight:lighter}a{text-decoration:none;color:#383838}ul{list-style:none}pre,code{font-family:"Operator Mono Lig", monospace;font-size:0.9em}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{from{opacity:1}to{opacity:0}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}@-webkit-keyframes scaleIn{from{transform:scale(0, 0);opacity:0}to{transform:scale(1, 1);opacity:1}}@keyframes scaleIn{from{transform:scale(0, 0);opacity:0}to{transform:scale(1, 1);opacity:1}}@-webkit-keyframes scaleOut{from{transform:scale(1, 1);opacity:1}to{transform:scale(0, 0);opacity:0}}@keyframes scaleOut{from{transform:scale(1, 1);opacity:1}to{transform:scale(0, 0);opacity:0}}@-webkit-keyframes fromTop{from{transform:translate3d(0, -100vh, 0)}to{transform:translate3d(0, 0, 0)}}@keyframes fromTop{from{transform:translate3d(0, -100vh, 0)}to{transform:translate3d(0, 0, 0)}}@-webkit-keyframes fromLeft{from{transform:translateX(-100vw)}to{transform:translateX(0)}}@keyframes fromLeft{from{transform:translateX(-100vw)}to{transform:translateX(0)}}@-webkit-keyframes fromRight{from{transform:translateX(100vw);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes fromRight{from{transform:translateX(100vw);opacity:0}to{transform:translateX(0);opacity:1}}@-webkit-keyframes fromBot{from{transform:translate3d(0, 100vh, 0)}to{transform:translate3d(0, 0, 0)}}@keyframes fromBot{from{transform:translate3d(0, 100vh, 0)}to{transform:translate3d(0, 0, 0)}}@-webkit-keyframes toTop{from{transform:translateY(0)}to{transform:translateY(-100vh)}}@keyframes toTop{from{transform:translateY(0)}to{transform:translateY(-100vh)}}@-webkit-keyframes toLeft{from{transform:translateX(0)}to{transform:translateX(-100vw)}}@keyframes toLeft{from{transform:translateX(0)}to{transform:translateX(-100vw)}}@-webkit-keyframes toRight{from{transform:translateX(0)}to{transform:translateX(100vw)}}@keyframes toRight{from{transform:translateX(0)}to{transform:translateX(100vw)}}@-webkit-keyframes toBot{from{transform:translateY(0)}to{transform:translateY(100vh)}}@keyframes toBot{from{transform:translateY(0)}to{transform:translateY(100vh)}}@-webkit-keyframes fromFlipX{from{transform:rotateX(90deg);position:absolute}to{transform:rotateX(0)}}@keyframes fromFlipX{from{transform:rotateX(90deg);position:absolute}to{transform:rotateX(0)}}@-webkit-keyframes toFlipX{from{transform:rotateX(0);position:absolute}to{transform:rotateX(90deg)}}@keyframes toFlipX{from{transform:rotateX(0);position:absolute}to{transform:rotateX(90deg)}}@-webkit-keyframes fromFlipY{from{transform:rotateY(90deg);position:absolute}to{transform:rotateY(0)}}@keyframes fromFlipY{from{transform:rotateY(90deg);position:absolute}to{transform:rotateY(0)}}@-webkit-keyframes toFlipY{from{transform:rotateY(0);position:absolute}to{transform:rotateY(90deg)}}@keyframes toFlipY{from{transform:rotateY(0);position:absolute}to{transform:rotateY(90deg)}}@-webkit-keyframes shake{0%{transform:translateX(1px)}10%{transform:translateX(-1px)}20%{transform:translateX(-3px)}30%{transform:translateX(3px)}40%{transform:translateX(1px)}50%{transform:translateX(-1px)}60%{transform:translateX(-3px)}70%{transform:translateX(3px)}80%{transform:translateX(-1px)}90%{transform:translateX(1px)}100%{transform:translateX(1px)}}@keyframes shake{0%{transform:translateX(1px)}10%{transform:translateX(-1px)}20%{transform:translateX(-3px)}30%{transform:translateX(3px)}40%{transform:translateX(1px)}50%{transform:translateX(-1px)}60%{transform:translateX(-3px)}70%{transform:translateX(3px)}80%{transform:translateX(-1px)}90%{transform:translateX(1px)}100%{transform:translateX(1px)}}@-webkit-keyframes bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-30px)}60%{transform:translateY(-20px)}}@keyframes bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-30px)}60%{transform:translateY(-20px)}}@-webkit-keyframes pulse{0%,20%,50%,80%,100%{transform:scale(1)}40%{transform:scale(1.1)}60%{transform:scale(0.8)}}@keyframes pulse{0%,20%,50%,80%,100%{transform:scale(1)}40%{transform:scale(1.1)}60%{transform:scale(0.8)}}button,a.btn{cursor:pointer;display:block;background-color:transparent;font-size:0.9em;font-weight:bold;color:#000;border:2px solid transparent;padding:0.9em 2em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-drag:none;transition:200ms}button:hover,a.btn:hover{transform:scale(0.95)}button.round,a.round{border-radius:4em}button.semi,a.semi{border-radius:0.4em}button.out,a.out{border-color:#000}button.disabled,a.disabeled{cursor:not-allowed;background:#808080;color:#e6e6e6}button.pri,a.pri{background:#383838;border-color:#383838}button.sec,a.sec{background:#ccc;border-color:#ccc}button.black,a.black{background:#000;border-color:#000;color:#fafafa}button.white,a.white{background:#fff;border-color:#fff}button.link,a.link{background:#2d8cf0;border-color:#2d8cf0;color:#fff}button.succ,a.succ{background:#19be6b;border-color:#19be6b;color:#fff}button.warn,a.warn{background:#ff9900;border-color:#ff9900}button.err,a.err{background:#ed3f14;border-color:#ed3f14;color:#fff}button.outpri,a.outpri{color:#383838;border-color:#383838}button.outsec,a.outsec{color:#ccc;border-color:#ccc}button.outblack,a.outblack{color:#000;border-color:#000}button.outwhite,a.outwhite{color:#fff;border-color:#fff}button.outlink,a.outlink{color:#2d8cf0;border-color:#2d8cf0}button.outsucc,a.outsucc{color:#19be6b;border-color:#19be6b}button.outwarn,a.outwarn{color:#ff9900;border-color:#ff9900}button.outerr,a.outerr{color:#ed3f14;border-color:#ed3f14}.view{position:relative;width:100%;height:100%;display:flex;overflow:hidden}.scroll{position:relative;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}.scroll::-webkit-scrollbar{width:7px}.scroll::-webkit-scrollbar-track{background-color:#e6e6e6}.scroll::-webkit-scrollbar-thumb{background-color:#383838}.box{border:1px solid #e6e6e6;padding:0.9em 1em}.box.round{border-radius:0.4em}.slider{position:relative;width:100%;display:block;overflow-x:auto;overflow-y:hidden;white-space:nowrap;-webkit-overflow-scrolling:touch;-ms-overflow-style:none;scrollbar-width:none}.slider::-webkit-scrollbar{display:none}.slider *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.slide{display:inline-flex}.row{width:auto;display:flex;flex-flow:wrap;justify-content:flex-start;align-items:flex-start}.col{width:auto;display:flex;flex-flow:column;justify-content:flex-start;align-items:flex-start}.nowrap{flex-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}h-div{width:100%;height:1px;display:flex;background:#e6e6e6}v-div{width:1px;height:100%;display:flex;background:#e6e6e6}.jstart{justify-content:flex-start}.jcenter{justify-content:center}.jend{justify-content:flex-end}.jbetween{justify-content:space-between}.jaround{justify-content:space-around}.jevenly{justify-content:space-evenly}.astart{align-items:flex-start}.acenter{align-items:center}.astretch{align-items:stretch}.abase{align-items:baseline}.aend{align-items:flex-end}.fstart{justify-content:flex-start;align-items:flex-start}.fcenter{justify-content:center;align-items:center}.fend{justify-content:flex-end;align-items:flex-end}.xfill{width:100%}.xhalf{width:50%}.yfill{height:100%}.yhalf{height:50%}.fill{width:100%;height:100%}.grow{flex-grow:1}input,select,textarea{background:transparent;color:#000;font-size:0.9em;padding:0.9em 1em;transition:200ms}input.round,select.round,textarea.round{border-radius:4em;padding:0.9em 1.2em}input.semi,select.semi,textarea.semi{border-radius:0.4em}input.out,select.out,textarea.out{border:1px solid #e6e6e6}input.disabled,select.dissabled,textarea.disabled{cursor:not-allowed;background:#e6e6e6;color:#808080}input.white,select.white,textarea.white{background:#fff}input.black,select.black,textarea.black{background:#000}b.pri{color:#2d8cf0}b.sec{color:#2d8cf0}b.link{color:#2d8cf0}b.succ{color:#19be6b}b.warn{color:#ff9900}b.err{color:#ed3f14}.main{height:calc(100% - 90px)}footer{height:25px;background:#383838;color:#fff;font-size:12px}',
  map: '{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\r\\n  import Nav from \\"$lib/Nav.svelte\\";\\r\\n  import \\"../fonts/circular.css\\";\\r\\n  import \\"../fonts/operator.css\\";\\r\\n<\/script>\\r\\n\\r\\n<main>\\r\\n  <Nav />\\r\\n\\r\\n  <div class=\\"main scroll\\">\\r\\n    <slot />\\r\\n  </div>\\r\\n\\r\\n  <footer class=\\"row fcenter xfill\\">\\r\\n    <p>Made with \u2665 by verdu on 2021-2022.</p>\\r\\n  </footer>\\r\\n</main>\\r\\n\\r\\n<style lang=\\"scss\\" global>:global(*),\\n:global(*:before),\\n:global(*:after) {\\n  box-sizing: border-box;\\n  margin: 0;\\n  padding: 0;\\n  border: none;\\n  outline: none;\\n  box-shadow: none;\\n  line-height: 1.4;\\n  -webkit-appearance: none;\\n     -moz-appearance: none;\\n          appearance: none;\\n  image-rendering: crisp-edges;\\n  -webkit-font-smoothing: antialiased;\\n  -moz-osx-font-smoothing: grayscale;\\n  text-rendering: optimizeLegibility;\\n  -webkit-tap-highlight-color: transparent;\\n}\\n:global(*:active),\\n:global(*:before:active),\\n:global(*:after:active) {\\n  -webkit-tap-highlight-color: transparent;\\n}\\n@media (max-width: 900px) {\\n  :global(*),\\n:global(*:before),\\n:global(*:after) {\\n    cursor: default;\\n  }\\n}\\n\\n:global(html),\\n:global(body) {\\n  position: relative;\\n  width: 100%;\\n  height: 100%;\\n  overflow: hidden;\\n}\\n\\n:global(body) {\\n  background: #000;\\n  color: #000;\\n}\\n\\n:global(main) {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  background: #fafafa;\\n  border-radius: 0.5em;\\n}\\n\\n:global(body),\\n:global(input),\\n:global(textarea),\\n:global(select),\\n:global(option) {\\n  font-family: \\"Circular Std\\", \\"Segoe UI Emoji\\", sans-serif;\\n}\\n\\n:global(input),\\n:global(textarea),\\n:global(select),\\n:global(option),\\n:global(p) {\\n  font-weight: lighter;\\n}\\n\\n:global(a) {\\n  text-decoration: none;\\n  color: #383838;\\n}\\n\\n:global(ul) {\\n  list-style: none;\\n}\\n\\n:global(pre),\\n:global(code) {\\n  font-family: \\"Operator Mono Lig\\", monospace;\\n  font-size: 0.9em;\\n}\\n\\n@-webkit-keyframes -global-fadeIn {\\n  from {\\n    opacity: 0;\\n  }\\n  to {\\n    opacity: 1;\\n  }\\n}\\n\\n@keyframes -global-fadeIn {\\n  from {\\n    opacity: 0;\\n  }\\n  to {\\n    opacity: 1;\\n  }\\n}\\n@-webkit-keyframes -global-fadeOut {\\n  from {\\n    opacity: 1;\\n  }\\n  to {\\n    opacity: 0;\\n  }\\n}\\n@keyframes -global-fadeOut {\\n  from {\\n    opacity: 1;\\n  }\\n  to {\\n    opacity: 0;\\n  }\\n}\\n@-webkit-keyframes -global-scaleIn {\\n  from {\\n    transform: scale(0, 0);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: scale(1, 1);\\n    opacity: 1;\\n  }\\n}\\n@keyframes -global-scaleIn {\\n  from {\\n    transform: scale(0, 0);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: scale(1, 1);\\n    opacity: 1;\\n  }\\n}\\n@-webkit-keyframes -global-scaleOut {\\n  from {\\n    transform: scale(1, 1);\\n    opacity: 1;\\n  }\\n  to {\\n    transform: scale(0, 0);\\n    opacity: 0;\\n  }\\n}\\n@keyframes -global-scaleOut {\\n  from {\\n    transform: scale(1, 1);\\n    opacity: 1;\\n  }\\n  to {\\n    transform: scale(0, 0);\\n    opacity: 0;\\n  }\\n}\\n@-webkit-keyframes -global-fromTop {\\n  from {\\n    transform: translate3d(0, -100vh, 0);\\n  }\\n  to {\\n    transform: translate3d(0, 0, 0);\\n  }\\n}\\n@keyframes -global-fromTop {\\n  from {\\n    transform: translate3d(0, -100vh, 0);\\n  }\\n  to {\\n    transform: translate3d(0, 0, 0);\\n  }\\n}\\n@-webkit-keyframes -global-fromLeft {\\n  from {\\n    transform: translateX(-100vw);\\n  }\\n  to {\\n    transform: translateX(0);\\n  }\\n}\\n@keyframes -global-fromLeft {\\n  from {\\n    transform: translateX(-100vw);\\n  }\\n  to {\\n    transform: translateX(0);\\n  }\\n}\\n@-webkit-keyframes -global-fromRight {\\n  from {\\n    transform: translateX(100vw);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateX(0);\\n    opacity: 1;\\n  }\\n}\\n@keyframes -global-fromRight {\\n  from {\\n    transform: translateX(100vw);\\n    opacity: 0;\\n  }\\n  to {\\n    transform: translateX(0);\\n    opacity: 1;\\n  }\\n}\\n@-webkit-keyframes -global-fromBot {\\n  from {\\n    transform: translate3d(0, 100vh, 0);\\n  }\\n  to {\\n    transform: translate3d(0, 0, 0);\\n  }\\n}\\n@keyframes -global-fromBot {\\n  from {\\n    transform: translate3d(0, 100vh, 0);\\n  }\\n  to {\\n    transform: translate3d(0, 0, 0);\\n  }\\n}\\n@-webkit-keyframes -global-toTop {\\n  from {\\n    transform: translateY(0);\\n  }\\n  to {\\n    transform: translateY(-100vh);\\n  }\\n}\\n@keyframes -global-toTop {\\n  from {\\n    transform: translateY(0);\\n  }\\n  to {\\n    transform: translateY(-100vh);\\n  }\\n}\\n@-webkit-keyframes -global-toLeft {\\n  from {\\n    transform: translateX(0);\\n  }\\n  to {\\n    transform: translateX(-100vw);\\n  }\\n}\\n@keyframes -global-toLeft {\\n  from {\\n    transform: translateX(0);\\n  }\\n  to {\\n    transform: translateX(-100vw);\\n  }\\n}\\n@-webkit-keyframes -global-toRight {\\n  from {\\n    transform: translateX(0);\\n  }\\n  to {\\n    transform: translateX(100vw);\\n  }\\n}\\n@keyframes -global-toRight {\\n  from {\\n    transform: translateX(0);\\n  }\\n  to {\\n    transform: translateX(100vw);\\n  }\\n}\\n@-webkit-keyframes -global-toBot {\\n  from {\\n    transform: translateY(0);\\n  }\\n  to {\\n    transform: translateY(100vh);\\n  }\\n}\\n@keyframes -global-toBot {\\n  from {\\n    transform: translateY(0);\\n  }\\n  to {\\n    transform: translateY(100vh);\\n  }\\n}\\n@-webkit-keyframes -global-fromFlipX {\\n  from {\\n    transform: rotateX(90deg);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateX(0);\\n  }\\n}\\n@keyframes -global-fromFlipX {\\n  from {\\n    transform: rotateX(90deg);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateX(0);\\n  }\\n}\\n@-webkit-keyframes -global-toFlipX {\\n  from {\\n    transform: rotateX(0);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateX(90deg);\\n  }\\n}\\n@keyframes -global-toFlipX {\\n  from {\\n    transform: rotateX(0);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateX(90deg);\\n  }\\n}\\n@-webkit-keyframes -global-fromFlipY {\\n  from {\\n    transform: rotateY(90deg);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateY(0);\\n  }\\n}\\n@keyframes -global-fromFlipY {\\n  from {\\n    transform: rotateY(90deg);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateY(0);\\n  }\\n}\\n@-webkit-keyframes -global-toFlipY {\\n  from {\\n    transform: rotateY(0);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateY(90deg);\\n  }\\n}\\n@keyframes -global-toFlipY {\\n  from {\\n    transform: rotateY(0);\\n    position: absolute;\\n  }\\n  to {\\n    transform: rotateY(90deg);\\n  }\\n}\\n@-webkit-keyframes -global-shake {\\n  0% {\\n    transform: translateX(1px);\\n  }\\n  10% {\\n    transform: translateX(-1px);\\n  }\\n  20% {\\n    transform: translateX(-3px);\\n  }\\n  30% {\\n    transform: translateX(3px);\\n  }\\n  40% {\\n    transform: translateX(1px);\\n  }\\n  50% {\\n    transform: translateX(-1px);\\n  }\\n  60% {\\n    transform: translateX(-3px);\\n  }\\n  70% {\\n    transform: translateX(3px);\\n  }\\n  80% {\\n    transform: translateX(-1px);\\n  }\\n  90% {\\n    transform: translateX(1px);\\n  }\\n  100% {\\n    transform: translateX(1px);\\n  }\\n}\\n@keyframes -global-shake {\\n  0% {\\n    transform: translateX(1px);\\n  }\\n  10% {\\n    transform: translateX(-1px);\\n  }\\n  20% {\\n    transform: translateX(-3px);\\n  }\\n  30% {\\n    transform: translateX(3px);\\n  }\\n  40% {\\n    transform: translateX(1px);\\n  }\\n  50% {\\n    transform: translateX(-1px);\\n  }\\n  60% {\\n    transform: translateX(-3px);\\n  }\\n  70% {\\n    transform: translateX(3px);\\n  }\\n  80% {\\n    transform: translateX(-1px);\\n  }\\n  90% {\\n    transform: translateX(1px);\\n  }\\n  100% {\\n    transform: translateX(1px);\\n  }\\n}\\n@-webkit-keyframes -global-bounce {\\n  0%, 20%, 50%, 80%, 100% {\\n    transform: translateY(0);\\n  }\\n  40% {\\n    transform: translateY(-30px);\\n  }\\n  60% {\\n    transform: translateY(-20px);\\n  }\\n}\\n@keyframes -global-bounce {\\n  0%, 20%, 50%, 80%, 100% {\\n    transform: translateY(0);\\n  }\\n  40% {\\n    transform: translateY(-30px);\\n  }\\n  60% {\\n    transform: translateY(-20px);\\n  }\\n}\\n@-webkit-keyframes -global-pulse {\\n  0%, 20%, 50%, 80%, 100% {\\n    transform: scale(1);\\n  }\\n  40% {\\n    transform: scale(1.1);\\n  }\\n  60% {\\n    transform: scale(0.8);\\n  }\\n}\\n@keyframes -global-pulse {\\n  0%, 20%, 50%, 80%, 100% {\\n    transform: scale(1);\\n  }\\n  40% {\\n    transform: scale(1.1);\\n  }\\n  60% {\\n    transform: scale(0.8);\\n  }\\n}\\n:global(button),\\n:global(a.btn) {\\n  cursor: pointer;\\n  display: block;\\n  background-color: transparent;\\n  font-size: 0.9em;\\n  font-weight: bold;\\n  color: #000;\\n  border: 2px solid transparent;\\n  padding: 0.9em 2em;\\n  -webkit-user-select: none;\\n     -moz-user-select: none;\\n      -ms-user-select: none;\\n          user-select: none;\\n  -webkit-user-drag: none;\\n  transition: 200ms;\\n}\\n:global(button:hover),\\n:global(a.btn:hover) {\\n  transform: scale(0.95);\\n}\\n\\n:global(button.round),\\n:global(a.round) {\\n  border-radius: 4em;\\n}\\n\\n:global(button.semi),\\n:global(a.semi) {\\n  border-radius: 0.4em;\\n}\\n\\n:global(button.out),\\n:global(a.out) {\\n  border-color: #000;\\n}\\n\\n:global(button.disabled),\\n:global(a.disabeled) {\\n  cursor: not-allowed;\\n  background: #808080;\\n  color: #e6e6e6;\\n}\\n\\n:global(button.pri),\\n:global(a.pri) {\\n  background: #383838;\\n  border-color: #383838;\\n}\\n\\n:global(button.sec),\\n:global(a.sec) {\\n  background: #ccc;\\n  border-color: #ccc;\\n}\\n\\n:global(button.black),\\n:global(a.black) {\\n  background: #000;\\n  border-color: #000;\\n  color: #fafafa;\\n}\\n\\n:global(button.white),\\n:global(a.white) {\\n  background: #fff;\\n  border-color: #fff;\\n}\\n\\n:global(button.link),\\n:global(a.link) {\\n  background: #2d8cf0;\\n  border-color: #2d8cf0;\\n  color: #fff;\\n}\\n\\n:global(button.succ),\\n:global(a.succ) {\\n  background: #19be6b;\\n  border-color: #19be6b;\\n  color: #fff;\\n}\\n\\n:global(button.warn),\\n:global(a.warn) {\\n  background: #ff9900;\\n  border-color: #ff9900;\\n}\\n\\n:global(button.err),\\n:global(a.err) {\\n  background: #ed3f14;\\n  border-color: #ed3f14;\\n  color: #fff;\\n}\\n\\n:global(button.outpri),\\n:global(a.outpri) {\\n  color: #383838;\\n  border-color: #383838;\\n}\\n\\n:global(button.outsec),\\n:global(a.outsec) {\\n  color: #ccc;\\n  border-color: #ccc;\\n}\\n\\n:global(button.outblack),\\n:global(a.outblack) {\\n  color: #000;\\n  border-color: #000;\\n}\\n\\n:global(button.outwhite),\\n:global(a.outwhite) {\\n  color: #fff;\\n  border-color: #fff;\\n}\\n\\n:global(button.outlink),\\n:global(a.outlink) {\\n  color: #2d8cf0;\\n  border-color: #2d8cf0;\\n}\\n\\n:global(button.outsucc),\\n:global(a.outsucc) {\\n  color: #19be6b;\\n  border-color: #19be6b;\\n}\\n\\n:global(button.outwarn),\\n:global(a.outwarn) {\\n  color: #ff9900;\\n  border-color: #ff9900;\\n}\\n\\n:global(button.outerr),\\n:global(a.outerr) {\\n  color: #ed3f14;\\n  border-color: #ed3f14;\\n}\\n\\n:global(.view) {\\n  position: relative;\\n  width: 100%;\\n  height: 100%;\\n  display: flex;\\n  overflow: hidden;\\n}\\n\\n:global(.scroll) {\\n  position: relative;\\n  width: 100%;\\n  height: 100%;\\n  overflow-x: hidden;\\n  overflow-y: auto;\\n  -webkit-overflow-scrolling: touch;\\n}\\n:global(.scroll::-webkit-scrollbar) {\\n  width: 7px;\\n}\\n:global(.scroll::-webkit-scrollbar-track) {\\n  background-color: #e6e6e6;\\n}\\n:global(.scroll::-webkit-scrollbar-thumb) {\\n  background-color: #383838;\\n}\\n\\n:global(.box) {\\n  border: 1px solid #e6e6e6;\\n  padding: 0.9em 1em;\\n}\\n\\n:global(.box.round) {\\n  border-radius: 0.4em;\\n}\\n\\n:global(.slider) {\\n  position: relative;\\n  width: 100%;\\n  display: block;\\n  overflow-x: auto;\\n  overflow-y: hidden;\\n  white-space: nowrap;\\n  -webkit-overflow-scrolling: touch;\\n  -ms-overflow-style: none;\\n  scrollbar-width: none;\\n}\\n:global(.slider::-webkit-scrollbar) {\\n  display: none;\\n}\\n:global(.slider) :global(*) {\\n  -webkit-user-select: none;\\n     -moz-user-select: none;\\n      -ms-user-select: none;\\n          user-select: none;\\n}\\n\\n:global(.slide) {\\n  display: inline-flex;\\n}\\n\\n:global(.row) {\\n  width: auto;\\n  display: flex;\\n  flex-flow: wrap;\\n  justify-content: flex-start;\\n  align-items: flex-start;\\n}\\n\\n:global(.col) {\\n  width: auto;\\n  display: flex;\\n  flex-flow: column;\\n  justify-content: flex-start;\\n  align-items: flex-start;\\n}\\n\\n:global(.nowrap) {\\n  flex-wrap: nowrap;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n  white-space: nowrap;\\n}\\n\\n:global(h-div) {\\n  width: 100%;\\n  height: 1px;\\n  display: flex;\\n  background: #e6e6e6;\\n}\\n\\n:global(v-div) {\\n  width: 1px;\\n  height: 100%;\\n  display: flex;\\n  background: #e6e6e6;\\n}\\n\\n:global(.jstart) {\\n  justify-content: flex-start;\\n}\\n\\n:global(.jcenter) {\\n  justify-content: center;\\n}\\n\\n:global(.jend) {\\n  justify-content: flex-end;\\n}\\n\\n:global(.jbetween) {\\n  justify-content: space-between;\\n}\\n\\n:global(.jaround) {\\n  justify-content: space-around;\\n}\\n\\n:global(.jevenly) {\\n  justify-content: space-evenly;\\n}\\n\\n:global(.astart) {\\n  align-items: flex-start;\\n}\\n\\n:global(.acenter) {\\n  align-items: center;\\n}\\n\\n:global(.astretch) {\\n  align-items: stretch;\\n}\\n\\n:global(.abase) {\\n  align-items: baseline;\\n}\\n\\n:global(.aend) {\\n  align-items: flex-end;\\n}\\n\\n:global(.fstart) {\\n  justify-content: flex-start;\\n  align-items: flex-start;\\n}\\n\\n:global(.fcenter) {\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\n:global(.fend) {\\n  justify-content: flex-end;\\n  align-items: flex-end;\\n}\\n\\n:global(.xfill) {\\n  width: 100%;\\n}\\n\\n:global(.xhalf) {\\n  width: 50%;\\n}\\n\\n:global(.yfill) {\\n  height: 100%;\\n}\\n\\n:global(.yhalf) {\\n  height: 50%;\\n}\\n\\n:global(.fill) {\\n  width: 100%;\\n  height: 100%;\\n}\\n\\n:global(.grow) {\\n  flex-grow: 1;\\n}\\n\\n:global(input),\\n:global(select),\\n:global(textarea) {\\n  background: transparent;\\n  color: #000;\\n  font-size: 0.9em;\\n  padding: 0.9em 1em;\\n  transition: 200ms;\\n}\\n\\n:global(input.round),\\n:global(select.round),\\n:global(textarea.round) {\\n  border-radius: 4em;\\n  padding: 0.9em 1.2em;\\n}\\n\\n:global(input.semi),\\n:global(select.semi),\\n:global(textarea.semi) {\\n  border-radius: 0.4em;\\n}\\n\\n:global(input.out),\\n:global(select.out),\\n:global(textarea.out) {\\n  border: 1px solid #e6e6e6;\\n}\\n\\n:global(input.disabled),\\n:global(select.dissabled),\\n:global(textarea.disabled) {\\n  cursor: not-allowed;\\n  background: #e6e6e6;\\n  color: #808080;\\n}\\n\\n:global(input.white),\\n:global(select.white),\\n:global(textarea.white) {\\n  background: #fff;\\n}\\n\\n:global(input.black),\\n:global(select.black),\\n:global(textarea.black) {\\n  background: #000;\\n}\\n\\n:global(b.pri) {\\n  color: #2d8cf0;\\n}\\n\\n:global(b.sec) {\\n  color: #2d8cf0;\\n}\\n\\n:global(b.link) {\\n  color: #2d8cf0;\\n}\\n\\n:global(b.succ) {\\n  color: #19be6b;\\n}\\n\\n:global(b.warn) {\\n  color: #ff9900;\\n}\\n\\n:global(b.err) {\\n  color: #ed3f14;\\n}\\n\\n:global(.main) {\\n  height: calc(100% - 90px);\\n}\\n\\n:global(footer) {\\n  height: 25px;\\n  background: #383838;\\n  color: #fff;\\n  font-size: 12px;\\n}</style>\\r\\n"],"names":[],"mappings":"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"}'
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<main>${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}

  <div class="${"main scroll"}">${slots.default ? slots.default({}) : ``}</div>

  <footer class="${"row fcenter xfill"}"><p>Made with \u2665 by verdu on 2021-2022.</p></footer>
</main>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var css$1 = {
  code: ".header.svelte-45tthb.svelte-45tthb{background:linear-gradient(45deg, #383838 50%, #ccc);text-align:center;color:#fff;padding:80px}.header.svelte-45tthb h1.svelte-45tthb{max-width:900px;font-size:3vw;line-height:1;margin-bottom:40px}.header.svelte-45tthb p.svelte-45tthb{max-width:900px;font-size:18px;color:#ccc}.tools.svelte-45tthb.svelte-45tthb{padding:40px}.tools.svelte-45tthb li.svelte-45tthb{cursor:pointer;width:25%;min-width:250px;height:210px;margin:5px;padding:20px;transition:200ms}.tools.svelte-45tthb li.svelte-45tthb:hover{background:#e6e6e6}.tools.svelte-45tthb li .icon.svelte-45tthb{width:50px;height:50px;margin-bottom:10px}.tools.svelte-45tthb li h2.svelte-45tthb{margin-bottom:10px}",
  map: '{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\r\\n  const tools = [\\r\\n    {\\r\\n      slug: \\"/facturas\\",\\r\\n      title: \\"Facturas\\",\\r\\n      desc: \\"Genera y/o modifica facturas. Env\xEDalas por correo electr\xF3nico y/o gu\xE1rdalas en PDF.\\",\\r\\n      icon: \\"facturas.svg\\",\\r\\n    },\\r\\n    {\\r\\n      slug: \\"/presupuestos\\",\\r\\n      title: \\"Presupuetos\\",\\r\\n      desc: \\"Genera y/o modifica presupuestos. Env\xEDalos por correo electr\xF3nico y/o gu\xE1rdalos en PDF.\\",\\r\\n      icon: \\"presupuestos.svg\\",\\r\\n    },\\r\\n    {\\r\\n      slug: \\"/albaranes\\",\\r\\n      title: \\"Albaranes\\",\\r\\n      desc: \\"Genera y/o modifica albaranes. Env\xEDalos por correo electr\xF3nico y/o gu\xE1rdalos en PDF.\\",\\r\\n      icon: \\"albaranes.svg\\",\\r\\n    },\\r\\n    {\\r\\n      slug: \\"/clientes\\",\\r\\n      title: \\"Clientes\\",\\r\\n      desc: \\"Crea una lista de clientes. Despu\xE9s podr\xE1s usarlos en tus facturas, presupuestos y/o albaranes.\\",\\r\\n      icon: \\"clientes.svg\\",\\r\\n    },\\r\\n    {\\r\\n      slug: \\"/productos-servicios\\",\\r\\n      title: \\"Productos/Servicios\\",\\r\\n      desc: \\"Crea una lista de productos/servicios. Despu\xE9s podr\xE1s usarlos en tus facturas, presupuestos y/o albaranes.\\",\\r\\n      icon: \\"productos-servicios.svg\\",\\r\\n    },\\r\\n    {\\r\\n      slug: \\"/proveedores\\",\\r\\n      title: \\"Proveedores\\",\\r\\n      desc: \\"Crea una lista de proveedores. As\xED los tendr\xE1s su informaci\xF3n de contacto siempre a mano.\\",\\r\\n      icon: \\"proveedores.svg\\",\\r\\n    },\\r\\n  ];\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <title>Facturas gratis | Inicio</title>\\r\\n</svelte:head>\\r\\n\\r\\n<section class=\\"header row fcenter xfill\\">\\r\\n  <h1>Herramientas online para facturaci\xF3n y presupuestos</h1>\\r\\n  <p>\\r\\n    Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos,\\r\\n    albaranes, clientes, proveedores y productos/servicios. No se necesita instalaci\xF3n.\\r\\n  </p>\\r\\n</section>\\r\\n\\r\\n<ul class=\\"tools row jcenter xfill\\">\\r\\n  {#each tools as tool}\\r\\n    <li class=\\"box round col acenter\\">\\r\\n      <a href={tool.slug}>\\r\\n        <div class=\\"icon\\">\\r\\n          <img src={tool.icon} alt={tool.title} />\\r\\n        </div>\\r\\n\\r\\n        <h2>{tool.title}</h2>\\r\\n        <p>{tool.desc}</p>\\r\\n      </a>\\r\\n    </li>\\r\\n  {/each}\\r\\n</ul>\\r\\n\\r\\n<style lang=\\"scss\\">.header {\\n  background: linear-gradient(45deg, #383838 50%, #ccc);\\n  text-align: center;\\n  color: #fff;\\n  padding: 80px;\\n}\\n.header h1 {\\n  max-width: 900px;\\n  font-size: 3vw;\\n  line-height: 1;\\n  margin-bottom: 40px;\\n}\\n.header p {\\n  max-width: 900px;\\n  font-size: 18px;\\n  color: #ccc;\\n}\\n\\n.tools {\\n  padding: 40px;\\n}\\n.tools li {\\n  cursor: pointer;\\n  width: 25%;\\n  min-width: 250px;\\n  height: 210px;\\n  margin: 5px;\\n  padding: 20px;\\n  transition: 200ms;\\n}\\n.tools li:hover {\\n  background: #e6e6e6;\\n}\\n.tools li .icon {\\n  width: 50px;\\n  height: 50px;\\n  margin-bottom: 10px;\\n}\\n.tools li h2 {\\n  margin-bottom: 10px;\\n}</style>\\r\\n"],"names":[],"mappings":"AAoEmB,OAAO,4BAAC,CAAC,AAC1B,UAAU,CAAE,gBAAgB,KAAK,CAAC,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACrD,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,AACf,CAAC,AACD,qBAAO,CAAC,EAAE,cAAC,CAAC,AACV,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,CAAC,CACd,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,qBAAO,CAAC,CAAC,cAAC,CAAC,AACT,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,AACb,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,OAAO,CAAE,IAAI,AACf,CAAC,AACD,oBAAM,CAAC,EAAE,cAAC,CAAC,AACT,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,KAAK,AACnB,CAAC,AACD,oBAAM,CAAC,gBAAE,MAAM,AAAC,CAAC,AACf,UAAU,CAAE,OAAO,AACrB,CAAC,AACD,oBAAM,CAAC,EAAE,CAAC,KAAK,cAAC,CAAC,AACf,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,oBAAM,CAAC,EAAE,CAAC,EAAE,cAAC,CAAC,AACZ,aAAa,CAAE,IAAI,AACrB,CAAC"}'
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const tools = [
    {
      slug: "/facturas",
      title: "Facturas",
      desc: "Genera y/o modifica facturas. Env\xEDalas por correo electr\xF3nico y/o gu\xE1rdalas en PDF.",
      icon: "facturas.svg"
    },
    {
      slug: "/presupuestos",
      title: "Presupuetos",
      desc: "Genera y/o modifica presupuestos. Env\xEDalos por correo electr\xF3nico y/o gu\xE1rdalos en PDF.",
      icon: "presupuestos.svg"
    },
    {
      slug: "/albaranes",
      title: "Albaranes",
      desc: "Genera y/o modifica albaranes. Env\xEDalos por correo electr\xF3nico y/o gu\xE1rdalos en PDF.",
      icon: "albaranes.svg"
    },
    {
      slug: "/clientes",
      title: "Clientes",
      desc: "Crea una lista de clientes. Despu\xE9s podr\xE1s usarlos en tus facturas, presupuestos y/o albaranes.",
      icon: "clientes.svg"
    },
    {
      slug: "/productos-servicios",
      title: "Productos/Servicios",
      desc: "Crea una lista de productos/servicios. Despu\xE9s podr\xE1s usarlos en tus facturas, presupuestos y/o albaranes.",
      icon: "productos-servicios.svg"
    },
    {
      slug: "/proveedores",
      title: "Proveedores",
      desc: "Crea una lista de proveedores. As\xED los tendr\xE1s su informaci\xF3n de contacto siempre a mano.",
      icon: "proveedores.svg"
    }
  ];
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>Facturas gratis | Inicio</title>`, ""}`, ""}

<section class="${"header row fcenter xfill svelte-45tthb"}"><h1 class="${"svelte-45tthb"}">Herramientas online para facturaci\xF3n y presupuestos</h1>
  <p class="${"svelte-45tthb"}">Herramientas online y completamente gratuitas para generar, enviar, rectificar y enlistar facturas, presupuestos,
    albaranes, clientes, proveedores y productos/servicios. No se necesita instalaci\xF3n.
  </p></section>

<ul class="${"tools row jcenter xfill svelte-45tthb"}">${each(tools, (tool) => `<li class="${"box round col acenter svelte-45tthb"}"><a${add_attribute("href", tool.slug, 0)}><div class="${"icon svelte-45tthb"}"><img${add_attribute("src", tool.icon, 0)}${add_attribute("alt", tool.title, 0)}></div>

        <h2 class="${"svelte-45tthb"}">${escape(tool.title)}</h2>
        <p>${escape(tool.desc)}</p></a>
    </li>`)}
</ul>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css = {
  code: ".header.svelte-pduoor.svelte-pduoor{background:linear-gradient(45deg, #383838 50%, #ccc);text-align:center;color:#fff;padding:80px}.header.svelte-pduoor h1.svelte-pduoor{max-width:900px;font-size:3vw;line-height:1;margin-bottom:20px}.header.svelte-pduoor p.svelte-pduoor{max-width:900px;font-size:18px;color:#ccc;margin-bottom:60px}",
  map: '{"version":3,"file":"about.svelte","sources":["about.svelte"],"sourcesContent":["<svelte:head>\\r\\n  <title>Facturas gratis | Sobre</title>\\r\\n</svelte:head>\\r\\n\\r\\n<section class=\\"header col fcenter xfill\\">\\r\\n  <h1>P\xE1gina en construcci\xF3n</h1>\\r\\n  <p>Disculpe las mol\xE9stias.</p>\\r\\n\\r\\n  <a class=\\"btn sec semi\\" href=\\"/\\">VOLVER AL INICIO</a>\\r\\n</section>\\r\\n\\r\\n<style lang=\\"scss\\">.header {\\n  background: linear-gradient(45deg, #383838 50%, #ccc);\\n  text-align: center;\\n  color: #fff;\\n  padding: 80px;\\n}\\n.header h1 {\\n  max-width: 900px;\\n  font-size: 3vw;\\n  line-height: 1;\\n  margin-bottom: 20px;\\n}\\n.header p {\\n  max-width: 900px;\\n  font-size: 18px;\\n  color: #ccc;\\n  margin-bottom: 60px;\\n}</style>\\r\\n"],"names":[],"mappings":"AAWmB,OAAO,4BAAC,CAAC,AAC1B,UAAU,CAAE,gBAAgB,KAAK,CAAC,CAAC,OAAO,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACrD,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,AACf,CAAC,AACD,qBAAO,CAAC,EAAE,cAAC,CAAC,AACV,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,CAAC,CACd,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,qBAAO,CAAC,CAAC,cAAC,CAAC,AACT,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,IAAI,AACrB,CAAC"}'
};
var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Facturas gratis | Sobre</title>`, ""}`, ""}

<section class="${"header col fcenter xfill svelte-pduoor"}"><h1 class="${"svelte-pduoor"}">P\xE1gina en construcci\xF3n</h1>
  <p class="${"svelte-pduoor"}">Disculpe las mol\xE9stias.</p>

  <a class="${"btn sec semi"}" href="${"/"}">VOLVER AL INICIO</a>
</section>`;
});
var about = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": About
});

// .svelte-kit/vercel/entry.js
init();
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */