import {
  ReactNode,
  ComponentProps,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  CSSProperties,
  Dispatch,
  SetStateAction,
  Context,
} from "react";

declare global {
  export type ReactNode = ReactNode;
  export type SetterType<T> = Dispatch<SetStateAction<T>>;
  export type CSSProperties = CSSProperties;
}
