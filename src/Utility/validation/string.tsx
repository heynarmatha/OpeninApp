function isEmpty(value: string | null) {
  if (value) {
    if (value !== '' && value.trim() !== '' && value.length > 0) {
      return false;
    }
    return true;
  }
  return true;
}

function isNotEmpty(value: string | null) {
  if (value) {
    if (value !== '' && value.trim() !== '' && value.length > 0) {
      return true;
    }
    return false;
  }
  return false;
}

export const STRING_VALIDATION = {
  isNotEmpty,
  isEmpty,
};
