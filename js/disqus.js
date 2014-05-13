function load_disqus() {
  /* * * CONFIGURATION VARIABLES: THIS CODE IS ONLY AN EXAMPLE * * */
  var disqus_shortname = 'jegtnes';
  var disqus_identifier = '{{url}}';
  var disqus_title = '{{title}}';
  var disqus_url = '{{@blog.url}}{{url}}';

  (function() {
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
}
