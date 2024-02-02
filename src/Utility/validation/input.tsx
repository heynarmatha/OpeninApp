import { EMAIL_REGEX, PASSWORD_REGEX } from "../RegexConstants";

function passwordValidation(value: string | null) {
  if (value) {
    if (PASSWORD_REGEX.test(value)) {
      return true;
    }
    return false;
  }
  return false;
}

function emailValidation(value: string | null) {
  if (value) {
    if (EMAIL_REGEX.test(value)) {
      return true;
    }
    return false;
  }
  return false;
}

export const INPUT_DATA_VALIDATION = {
  passwordValidation,
  emailValidation,
};
