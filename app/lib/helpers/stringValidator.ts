/* global string iterface */
declare global {
  interface String {
    isValidNumber(): boolean;
    hasOnlyAlphabets(): boolean;
    isValidEmail(): boolean;
    isEmpty(): boolean;
    max(length: number): boolean;
    min(length: number): boolean;
    lengthEquals(length: number): boolean;
  }
}

/* if string is a valid number */
String.prototype.isValidNumber = function (this: string) {
  return /^\d+$/.test(this);
}

String.prototype.max = function (this: string, length: number) {
  return this.length > length;
}

String.prototype.min = function (this: string, length: number) {
  return this.length < length;
}

String.prototype.lengthEquals = function (this: string, length: number) {
  return this.length === length;
}

String.prototype.hasOnlyAlphabets = function (this: string) {
  return /^[A-Za-z ]+$/.test(this)
}
/* check if string is a valid email address */
String.prototype.isValidEmail = function (this: string) {
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
    this
  );
};
/* check if string is empty/blank */
String.prototype.isEmpty = function (this: string) {
  return this.trim() === "";
};

export default {}