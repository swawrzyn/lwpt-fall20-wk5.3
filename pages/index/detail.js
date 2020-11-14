//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    movie: {
      title: "Loading...",
    },
    items: [{ id: 1, text: "Loading..." }],
    scrollInto: "",
    inputVal: "",
  },
  onLoad: function (options) {
    const Movies = new wx.BaaS.TableObject("movies");
    const MovieReviews = new wx.BaaS.TableObject("movie_reviews");

    // console.log("detail page options", options);

    // Getting a single movie by id (options.id)
    Movies.get(options.id).then((res) => {
      // console.log("detail page result", res);
      this.setData({
        movie: res.data,
      });
    });

    // Getting all the reviews with movie_id == options.id
    // set up the query
    let query = new wx.BaaS.Query();

    query.compare("movieId", "=", options.id);

    // grab the information from movie_reviews table
    MovieReviews.setQuery(query)
      .find()
      .then((res) => {
        // console.log("result from movie reviews query find", res);
        this.setData({
          items: res.data.objects,
        });
      });
  },
  inputChange: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  formReset: function () {
    const val = this.data.inputVal;

    if (val.trim() === "") return;
    const items = this.data.items;
    const nextId = items.length + 1;
    items.push({ id: nextId, name: val });
    this.setData({
      items,
    });
    setTimeout(() => {
      this.setData({
        scrollInto: `item-${nextId}`,
      });
    }, 250);
    this.setData({
      inputVal: "",
    });
  },
});
