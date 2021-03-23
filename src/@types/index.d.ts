/// <reference types="node" />

declare module 'jwt-encode' {
    export default function sign(
      payload: object | string,
      secret: string
    ): string;
  }
  