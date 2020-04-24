export default (text) => {
  let s = text;
  s = s.replace(/(^\s*)|(\s*$)/gi, "");
  s = s.replace(/[ ]{2,}/gi, " ");
  s = s.replace(/\n /, "\n");

  let textLength = s.split(" ").length;

  let wordsPerMinute = textLength / 200;
  let splitRes = wordsPerMinute.toString().split(".");
  let minutes = Number(splitRes[0]);
  let seconds = Number(splitRes[1]) * 0.6;
  if (minutes === 0) return 1
  let totalTime = minutes + seconds;
  return Math.round(totalTime);
}