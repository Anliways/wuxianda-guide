/**
 * 将 B 站视频页 URL 或 BV 号转换为 B 站嵌入式播放器 iframe 地址
 * 支持格式：
 * - https://www.bilibili.com/video/BV1xx411c7mD
 * - https://b23.tv/BV1xx411c7mD
 * - BV1xx411c7mD
 */
export function toBilibiliEmbedUrl(url: string): string {
  const trimmed = url.trim();
  const bvMatch = trimmed.match(/BV[\w]+/);
  if (!bvMatch) return "";
  return `https://player.bilibili.com/player.html?bvid=${bvMatch[0]}&autoplay=1&danmaku=0&high_quality=1`;
}
