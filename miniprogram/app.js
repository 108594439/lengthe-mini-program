const defaultProducts=[
  {id:'feather',name:'无痕羽毛接发',note:'轻盈自然 · 可扎高马尾',time:'约3小时',price:1280,tag:'人气首选',mark:'羽',active:true,image:''},
  {id:'nano6d',name:'6D 纳米接发',note:'隐形牢固 · 适合细软发',time:'约3.5小时',price:1580,tag:'自然隐形',mark:'隐',active:true,image:''},
  {id:'care',name:'接发拆卸护理',note:'专业拆卸 · 深层修护',time:'约1.5小时',price:299,tag:'养护必选',mark:'养',active:true,image:''}
]
const normalizeProducts=products=>{
  if(!Array.isArray(products))return []
  return products.map((item,index)=>{
    if(Array.isArray(item))return {name:item[0]||'未命名商品',note:item[1]||'',price:Number(item[2])||0,time:item[3]||'约3小时',id:item[4]||`product-${index}`,active:item[5]!==false,image:item[6]||'',tag:['人气首选','自然隐形','养护必选','后台同步'][index%4],mark:['羽','隐','养','雅'][index%4]}
    return {id:item.id||`product-${index}`,name:item.name||'未命名商品',note:item.note||item.desc||'',time:item.time||item.duration||'约3小时',price:Number(item.price)||0,tag:item.tag||'后台同步',mark:item.mark||'雅',active:item.active!==false,image:item.image||''}
  }).filter(item=>item.name&&item.price>0)
}
App({
  getProducts({activeOnly=true}={}){
    const stored=wx.getStorageSync('lengtheProducts')||wx.getStorageSync('products')
    const products=normalizeProducts(stored).length?normalizeProducts(stored):defaultProducts
    return activeOnly?products.filter(item=>item.active!==false):products
  },
  saveProducts(products){
    const normalized=normalizeProducts(products)
    wx.setStorageSync('lengtheProducts',normalized)
    wx.setStorageSync('products',normalized)
    return normalized
  },
  globalData: {
    currentUser: { id: 'user-qingsi-001', name: '青丝会员', avatar: '青' },
    defaultProducts,
    stores: [
      { id: 'lucheng', name: '温州鹿城店', address: '温州市鹿城区城市中心商圈' },
      { id: 'aojiang', name: '温州鳌江店', address: '温州市平阳县鳌江镇中心商圈' },
      { id: 'cangnan', name: '温州苍南店', address: '温州市苍南县灵溪镇中心商圈' }
    ]
  }
})
