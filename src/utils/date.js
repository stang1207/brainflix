export function getRelativeDate(targetDateTimestamp) {
  const currentTimestamp = new Date().getTime();
  const currentSeconds = Math.floor(currentTimestamp / 1000);
  const targetSeconds = Math.floor(targetDateTimestamp / 1000);
  const diff = currentSeconds - targetSeconds;

  if (diff < 60) {
    return 'Just now';
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else if (diff < 2620800) {
    return `${Math.floor(diff / 86400)} days ago`;
  } else if (diff < 31449600) {
    return `${Math.floor(diff / 2620800)} months ago`;
  } else {
    return `${Math.floor(diff / 31449600)} years ago`;
  }
}

export function getReadableDate(timestamp) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}
