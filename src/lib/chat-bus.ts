export const OPEN_CHAT_EVENT = "otn:open-chat";

export type OpenChatDetail = { prefill?: string; send?: boolean };

export function openChat(detail: OpenChatDetail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail }));
}
