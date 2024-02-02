import {STRING_VALIDATION} from './string';

function isValidDob(dob: string) {
  if (STRING_VALIDATION.isNotEmpty(dob)) {
    //  Need to ad one more condition like the date should be greater than 18 years ago
    return true;
  }
  return false;
}

export const DATE_VALIDATION = {
  isValidDob,
};
