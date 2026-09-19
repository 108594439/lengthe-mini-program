Page({
  data:{orders:[]},onShow(){this.setData({orders:wx.getStorageSync('orders')||[]})},
  cancel(e){const index=+e.currentTarget.dataset.index,orders=this.data.orders;if(!orders[index]||orders[index].status!=='待到店')return;wx.showModal({title:'取消预约',content:'确认取消这次预约吗？',success:r=>{if(!r.confirm)return;orders[index].status='已取消';wx.setStorageSync('orders',orders);this.setData({orders})}})},
  rebook(e){const item=this.data.orders[+e.currentTarget.dataset.index];if(item)wx.setStorageSync('bookingServiceId',item.service.id);wx.switchTab({url:'/pages/booking/index'})}
})
