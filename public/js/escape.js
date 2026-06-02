function escapeHtml(str) {
  if (!str && str !== 0) return '';
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}
function escapeAttr(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeJsStr(str) {
  return String(str).replace(/\\/g,'\\\\').replace(/'/g,"\\u0027").replace(/"/g,'\\u0022').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/</g,'\\u003C').replace(/>/g,'\\u003E');
}
