export type AnyObject = {
  [key: string]: any;
};

export type ValidationRule = {
  rule: RegExp;
  match: boolean;
  message: string;
}