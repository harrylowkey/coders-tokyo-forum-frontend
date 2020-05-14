export default text => {
  let s = text;
  s = s.replace(/(^\s*)|(\s*$)/gi, '');
  s = s.replace(/[ ]{2,}/gi, ' ');
  s = s.replace(/\n /, '\n');

  const textLength = s.split(' ').length;

  const wordsPerMinute = textLength / 200;
  const splitRes = wordsPerMinute.toString().split('.');
  const minutes = Number(splitRes[0]);
  const seconds = Number(splitRes[1]) * 0.6;
  if (minutes === 0) return 1;
  const totalTime = minutes + seconds;
  return Math.round(totalTime);
};
