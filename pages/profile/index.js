// pages/profile/index.js
Page({
  /**
   * Page initial data
   */
  data: {
    userInfo: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo');

    if (userInfo) {
      this.setData({
        userInfo: userInfo,
      })
    }
  },

  userInfoHandler: function (data) {
    wx.BaaS.auth.loginWithWechat(data).then(
      (res) => {
        // user login successful, user authorized
        this.setData({
          userInfo: res,
        });
        
      },
      (err) => {
        console.log("login error", err);
      }
    );
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {},

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {},
});
