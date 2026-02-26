import { NextMiddleware, NextResponse } from "next/server";

export function stackMiddlewares(functions: Array<(middleware: NextMiddleware) => NextMiddleware>, index = 0): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    const response = current(next)
    return response;
  }
  return () => NextResponse.next();
}