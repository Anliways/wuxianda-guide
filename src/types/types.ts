/**
 * 全局业务类型定义
 * 与 Supabase `profiles` 表结构对应
 */
export interface Profile {
  id: string;
  username?: string;
  avatar_url?: string;
  /** 个性签名 / 简介 */
  bio?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}
