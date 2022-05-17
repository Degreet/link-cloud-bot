export function genShortId() {
  return Math.floor(Math.random() * 8888888) + 1111111
}

export function getShareLink(shortId?: number) {
  return `https://t.me/work_in_progress_demo_bot?start=${shortId}`
}