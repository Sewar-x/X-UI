type Size = "large" | "default" | "small";
type Type = "" | "primary" | "success" | "warning" | "danger" | "info";

export interface BtnType {
  type?: Type;
  size?: Size;
  [key: string]: any;
}
export interface ButtonType {
  attr?: BtnType;
  event?: Recordable;
  colAttr?: Recordable;
  content?: CompType;
  loading?: CompType;
  icon?: IconType;
}
