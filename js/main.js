document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("load-comments").addEventListener("click",function(e) {
    this.parentNode.removeChild(this);
    load_disqus();
  });
});
