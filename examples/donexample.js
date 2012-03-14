(function() {
  var myblog, views;

  views = require('./views/views.js').views;

  myblog = {
    title: "my blog",
    articles: [
      {
        id: 123,
        title: "my article 1",
        body: "article1 body",
        link: "#",
        anchor: "my link1"
      }, {
        id: 456,
        title: "my article 2",
        body: "article2 body",
        link: "#",
        anchor: "my link2"
      }, {
        id: 789,
        title: "my article 3",
        body: "article3 beh",
        link: "#",
        anchor: "my link3"
      }
    ]
  };

  console.log(views.home(myblog));

}).call(this);
