/***
 * 全局获取分页时,每页现实的条数
 * @param height
 * @returns {number}
 */
const getPageSize = function(height = 50) {
  let pageSize = 0;
  if (localStorage.getItem("pageSize")) {
    pageSize = parseInt(localStorage.getItem("pageSize"));
    if (pageSize != parseInt((screen.height - 200) / height / 5) * 5) {
      pageSize = parseInt((screen.height - 200) / height / 5) * 5;
      localStorage.setItem("pageSize", pageSize);
    }
  } else {
    pageSize = parseInt((screen.height - 200) / height / 5) * 5;
    localStorage.setItem("pageSize", pageSize);
  }
  return pageSize;
};

/***
 * 从URL中获取指定名称的参数的值
 * @param name 参数名称
 * @returns {string|null}
 */
const getQueryString = function(name) {
  let searchParams = new URLSearchParams(window.location.href);
  let value = searchParams.get(name);
  if (value) return value;
  return null;
};
exports = { getPageSize, getQueryString };
