/// <reference types="vite/client" />

declare module "@splidejs/react-splide" {
  import * as React from "react";
  export interface SplideProps {
    options?: Record<string, unknown>;
    hasTrack?: boolean;
    tag?: string;
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }
  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<{ className?: string; children?: React.ReactNode }>;
  export const SplideTrack: React.FC<{ children?: React.ReactNode }>;
}
