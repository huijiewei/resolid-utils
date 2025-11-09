/**
 * 将字符串的首字母转换为大写，其余保持不变。
 *
 * @param str - 要处理的字符串
 * @returns 首字母大写后的字符串，如果传入空字符串或 falsy 值，返回空字符串
 */
export function capitalize(str: string): string {
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 判断字符串是否以指定前缀开头，可选择忽略大小写。
 *
 * @param text - 要检查的字符串
 * @param prefix - 前缀字符串
 * @param ignoreCase - 是否忽略大小写，默认 true
 * @returns 如果 text 以 prefix 开头，则返回 true，否则返回 false
 */
export function startsWith(
  text: string,
  prefix: string,
  ignoreCase = true,
): boolean {
  if (text.length < prefix.length) {
    return false;
  }

  if (ignoreCase) {
    return text.toLowerCase().startsWith(prefix.toLowerCase());
  }

  return text.startsWith(prefix);
}

/**
 * 判断字符串是否以指定后缀结尾，可选择忽略大小写。
 *
 * @param text - 要检查的字符串
 * @param suffix - 后缀字符串
 * @param ignoreCase - 是否忽略大小写，默认 true
 * @returns 如果 text 以 suffix 结尾，则返回 true，否则返回 false
 */
export function endsWith(
  text: string,
  suffix: string,
  ignoreCase = true,
): boolean {
  if (text.length < suffix.length) {
    return false;
  }

  if (ignoreCase) {
    return text.toLowerCase().endsWith(suffix.toLowerCase());
  }

  return text.endsWith(suffix);
}

/**
 * 如果字符串以指定前缀开头，则去掉该前缀。
 *
 * @param text - 要处理的字符串
 * @param prefix - 要移除的前缀
 * @param ignoreCase - 是否忽略大小写，默认 true
 * @returns 去掉前缀后的字符串，如果 text 不以 prefix 开头，则返回原字符串
 */
export function trimStart(
  text: string,
  prefix: string,
  ignoreCase = true,
): string {
  if (startsWith(text, prefix, ignoreCase)) {
    return text.slice(prefix.length, text.length);
  }

  return text;
}

/**
 * 如果字符串以指定后缀结尾，则去掉该后缀。
 *
 * @param text - 要处理的字符串
 * @param suffix - 要移除的后缀
 * @param ignoreCase - 是否忽略大小写，默认 true
 * @returns 去掉后缀后的字符串，如果 text 不以 suffix 结尾，则返回原字符串
 */
export function trimEnd(
  text: string,
  suffix: string,
  ignoreCase = true,
): string {
  if (endsWith(text, suffix, ignoreCase)) {
    return text.slice(0, text.length - suffix.length);
  }

  return text;
}
