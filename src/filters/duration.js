import moment from 'moment';

export default value => {
  const now = moment(Date.now());
  const createdAt = moment(value);
  const diff = createdAt.diff(now);
  const diffDuration = moment.duration(diff);
  const days = Math.abs(diffDuration.days());
  const hours = Math.abs(diffDuration.hours());
  const minutes = Math.abs(diffDuration.minutes());
  if (days !== 0) {
    return `${days}${days > 1 ? ' days ago' : ' day ago'}`;
  }

  if (hours !== 0) {
    return `${hours}${hours > 1 ? ' hours ago' : ' hour ago'}`;
  }

  if (minutes !== 0) {
    return `${minutes}${minutes > 1 ? ' minutes ago' : ' minute ago'}`;
  }

  return 'now';
};
