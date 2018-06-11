export function displayTime(timeStamp) {
  const h = Math.floor(timeStamp / 3600);
  const m = Math.floor((timeStamp % 3600) / 60);
  const s = Math.floor((timeStamp % 3600) % 60);
  const mDisplay = m >= 10 ? m : `0${m}`;
  const sDisplay = s >= 10 ? s : `0${s}`;
  return `${h}:${mDisplay}:${sDisplay}`;
}

export default null;
