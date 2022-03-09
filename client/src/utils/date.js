/**
 * Returns a string that show relative time of a target day
 * @param  {number} targetTimestamp - a timestamp in milliseconds
 * @param  {string} targetRelativeTime - the date format that you want (second, min, hour, day, month, year, default)
 */

export const getRelativeDate = (
  targetTimestamp,
  targetRelativeTime = 'default'
) => {
  const currentTimestamp = new Date().getTime();
  const diffInSeconds = currentTimestamp / 1000 - targetTimestamp / 1000;
  const temp = { diff: 0, unit: '' };
  if (typeof +targetTimestamp !== 'number') {
    return new Error('Invalid timestamp.');
  }
  // eslint-disable-next-line default-case
  switch (targetRelativeTime) {
    case 'second':
      temp.diff = 1;
      temp.unit = 'seconds';
      break;
    case 'minute':
      temp.diff = 60;
      temp.unit = 'minutes';
      break;
    case 'hour':
      temp.diff = 3600;
      temp.unit = 'hours';
      break;
    case 'day':
      temp.diff = 86400;
      temp.unit = 'days';
      break;
    case 'month':
      temp.diff = 2620800;
      temp.unit = 'months';
      break;
    case 'year':
      temp.diff = 31449600;
      temp.unit = 'years';
      break;
    case 'default':
      temp.diff = 31449600;
      temp.unit = 'years';
      if (diffInSeconds < 31449600) {
        temp.diff = 2620800;
        temp.unit = 'months';
        if (diffInSeconds < 2620800) {
          temp.diff = 86400;
          temp.unit = 'days';
          if (diffInSeconds < 86400) {
            temp.diff = 3600;
            temp.unit = 'hours';
            if (diffInSeconds < 3600) {
              temp.diff = 60;
              temp.unit = 'minutes';
              if (diffInSeconds < 60) {
                temp.diff = 1;
                temp.unit = 'seconds';
              }
            }
          }
        }
      }
  }
  const result = Math.floor(diffInSeconds / temp.diff);
  return `${result} ${result === 1 ? temp.unit.slice(0, -1) : temp.unit} ago`;
};

/**
 * Convert a timestamp to a string that is in  month/day/year format
 * @param  {number} targetTimestamp - timestamp in milliseconds
 */
export const mdy = (targetTimestamp) => {
  if (typeof targetTimestamp !== 'number')
    return new Error('Invalid timestamp.');
  const date = new Date(targetTimestamp);
  return `${(date.getMonth() + 1 + '').padStart(2, '0')}/${(
    date.getUTCDate() + ''
  ).padStart(2, '0')}/${date.getFullYear()}`;
};
