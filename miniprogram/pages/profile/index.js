Page({
  data:{
    user:{name:'青丝会员',avatar:'青'},
    order:null,
    storeName:'温州鹿城店',
    points:280,
    pointGoods:[],
    redemptions:[]
  },
  onShow(){this.refreshProfile()},
  refreshProfile(){
    const orders=wx.getStorageSync('orders')||[]
    const storeName=wx.getStorageSync('favoriteStore')||'温州鹿城店'
    const points=this.readPoints()
    const pointGoods=this.readPointGoods()
    const redemptions=wx.getStorageSync('pointRedemptions')||[]
    this.setData({order:orders[0]||null,storeName,points,pointGoods:pointGoods.filter(item=>item.active!==false),redemptions})
  },
  readPoints(){
    const saved=Number(wx.getStorageSync('memberPoints'))
    if(Number.isFinite(saved)&&saved>=0)return saved
    wx.setStorageSync('memberPoints',280)
    return 280
  },
  readPointGoods(){
    const saved=wx.getStorageSync('pointGoods')
    if(Array.isArray(saved)&&saved.length)return saved
    const defaults=[
      {id:'gift-care',name:'东方草本养护礼盒',desc:'洗护旅行装 · 到店领取',points:180,stock:20,active:true},
      {id:'gift-comb',name:'檀木气垫梳',desc:'顺发按摩 · 精致随行',points:320,stock:12,active:true},
      {id:'gift-carecard',name:'接发养护体验券',desc:'门店护理项目抵用',points:500,stock:8,active:true}
    ]
    wx.setStorageSync('pointGoods',defaults)
    return defaults
  },
  booking(){wx.switchTab({url:'/pages/booking/index'})},
  orders(){wx.navigateTo({url:'/pages/orders/index'})},
  contact(){wx.showActionSheet({itemList:['微信客服咨询','拨打客服 400-888-1212'],success:({tapIndex})=>tapIndex===1&&wx.makePhoneCall({phoneNumber:'4008881212'})})},
  chooseStore(){wx.showActionSheet({itemList:['温州鹿城店','温州鳌江店','温州苍南店'],success:r=>{const storeName=['温州鹿城店','温州鳌江店','温州苍南店'][r.tapIndex];wx.setStorageSync('favoriteStore',storeName);this.setData({storeName})}})},
  redeemGift(event){
    const id=event.currentTarget.dataset.id
    const pointGoods=this.data.pointGoods.map(item=>({...item}))
    const gift=pointGoods.find(item=>item.id===id)
    if(!gift||gift.active===false)return
    const points=Number(this.data.points)||0
    if(points<gift.points){wx.showToast({title:'积分不足',icon:'none'});return}
    if(gift.stock<=0){wx.showToast({title:'库存不足',icon:'none'});return}
    gift.stock-=1
    const nextPoints=points-gift.points
    const redemptions=[{
      id:'RD'+Date.now(),
      name:gift.name,
      points:gift.points,
      time:new Date().toLocaleString(),
      status:'待到店领取'
    },...this.data.redemptions]
    wx.setStorageSync('memberPoints',nextPoints)
    wx.setStorageSync('pointGoods',pointGoods)
    wx.setStorageSync('pointRedemptions',redemptions)
    this.setData({points:nextPoints,pointGoods,redemptions})
    wx.showToast({title:'兑换成功',icon:'success'})
  }
})

