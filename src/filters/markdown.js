import marked from "marked";

export default (text = '') => {
  return marked(text);
}