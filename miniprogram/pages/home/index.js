Page({
  data: {
    services: [],
    store: { name:'温州鹿城店', address:'温州市鹿城区城市中心商圈' }
  },
  onShow(){this.setData({services:getApp().getProducts()})},
  goBooking(e) { wx.setStorageSync('bookingServiceId', e.currentTarget.dataset.id || 'feather'); wx.switchTab({ url:'/pages/booking/index' }) },
  contact() { wx.showActionSheet({ itemList:['微信客服咨询','拨打客服 400-888-1212'], success:({tapIndex})=>{ if(tapIndex===1) wx.makePhoneCall({ phoneNumber:'4008881212' }) } }) }
})
