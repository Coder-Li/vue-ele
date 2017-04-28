/**
 * Created by li-ji on 2017/4/28.
 */
export function urlParse() {
  let url = window.location.search;
  let result = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      result[key] = value;
    });
  }
  return result;
}
