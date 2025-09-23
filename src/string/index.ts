/**
 * 将字符串的首字母大写，其余部分保持不变。
 */
export const capitalize = (str: string): string => {
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 检查字符串是否以指定前缀开头，可选择忽略大小写。
 */
export const startsWith = (
  text: string,
  prefix: string,
  ignoreCase = true,
): boolean => {
  if (text.length < prefix.length) {
    return false;
  }

  if (ignoreCase) {
    return text.toLowerCase().startsWith(prefix.toLowerCase());
  }

  return text.startsWith(prefix);
};

/**
 * 检查字符串是否以指定后缀结尾，可选择忽略大小写。
 */
export const endsWith = (
  text: string,
  suffix: string,
  ignoreCase = true,
): boolean => {
  if (text.length < suffix.length) {
    return false;
  }

  if (ignoreCase) {
    return text.toLowerCase().endsWith(suffix.toLowerCase());
  }

  return text.endsWith(suffix);
};

export const trimStart = (
  text: string,
  prefix: string,
  ignoreCase = true,
): string => {
  if (startsWith(text, prefix, ignoreCase)) {
    return text.slice(prefix.length, text.length);
  }

  return text;
};

export const trimEnd = (
  text: string,
  suffix: string,
  ignoreCase = true,
): string => {
  if (endsWith(text, suffix, ignoreCase)) {
    return text.slice(0, text.length - suffix.length);
  }

  return text;
};
