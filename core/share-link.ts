export function genShortId() {
  return Math.floor(Math.random() * 8888888) + 1111111
}

export function getShareLink(username: string, shortId: number) {
  return `https://t.me/${username}?start=${shortId}`
}