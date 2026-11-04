import type { IncomingMessage, ServerResponse } from "node:http";

/** Node.js request/response helpers supplied by Vercel and the local Express server. */
export interface ApiRequest extends IncomingMessage {
  body?: unknown;
}
export interface ApiResponse extends ServerResponse {
  status(code: number): ApiResponse;
  json(body: unknown): ApiResponse;
}
