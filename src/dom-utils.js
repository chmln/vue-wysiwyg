export default {
  isParentNode(node, el) {
    let p = el.parentNode;
    while (p) {
      if ('body' == p.nodeName || 'html' == p.nodeName) {
        return true;
      }
      if (p === node) {
        return true;
      }
      p = p.parentNode;
    }
    return false;
  }
}
