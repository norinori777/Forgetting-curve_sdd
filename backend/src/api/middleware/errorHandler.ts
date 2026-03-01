import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { toApiError, type ApiErrorCode } from "@fc/shared";

import { logger } from "../../lib/logger";

export class HttpError extends Error {
  public readonly status: number;
  public readonly code: ApiErrorCode;
  public readonly details?: unknown;

  constructor(params: {
    status: number;
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  }) {
    super(params.message);
    this.status = params.status;
    this.code = params.code;
    this.details = params.details;
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    res
      .status(err.status)
      .json(toApiError({ code: err.code, message: err.message, details: err.details }));
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json(
      toApiError({
        code: "VALIDATION_ERROR",
        message: "Invalid request",
        details: err.flatten(),
      })
    );
    return;
  }

  logger.error({ err }, "Unhandled error");
  res
    .status(500)
    .json(toApiError({ code: "INTERNAL_ERROR", message: "Internal server error" }));
}
