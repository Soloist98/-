Page({
  data: {
    img_arr: [],
    formdata: '',
  },
  //点击发布按钮
  formSubmit() {
    this.uploadFile(0)
  },
  //上传图片
  uploadFile: function (index) {
    var that = this
    //如果所有图片都已经上传完，就不再往下执行
    if (index >= that.data.img_arr.length) {

      return
    }
    wx.uploadFile({
      url: 'http://localhost:8080/upload/picture', //自己的Java后台接口地址
      filePath: that.data.img_arr[index],
      name: 'con',
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
        'Authorization': 'okgoodit' //若有token，此处换上你的token，没有的话省略
      },
      // formData: ({ //上传图片所要携带的参数
      //   username: "编程小石头",
      //   password: '2501902696'
      // }),
      success: function (res) {
        console.log(that.data.img_arr[index])
        console.log(`第${index+1}张上传成功`, res)
        index++
        that.uploadFile(index)
      },
      fail(res) {
        console.log(`第${index+1}张上传失败`, res)
      }
    })
  },
  //选择要上传的图片
  upimg: function () {
    var that = this;
    //这里小程序规定最好只能选9张，我这里随便填的3，你也可以自己改
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          });
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },
})