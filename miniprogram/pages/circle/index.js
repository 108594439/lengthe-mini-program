const CURRENT_USER='user-qingsi-001'
const seed=[{id:'p1',ownerId:'user-lulu',name:'鹿鹿',avatar:'鹿',tag:'接发体验',text:'第一次做羽毛接发，睡觉会不会硌头呀？有经验的姐妹聊聊～',meta:'鹿城店 · 12分钟前',likes:18},{id:'p2',ownerId:'user-xiaoman',name:'小满',avatar:'满',tag:'养护分享',text:'洗头前先把发尾梳顺，从接点向下吹，真的不容易打结。',meta:'苍南店 · 36分钟前',likes:42},{id:'p3',ownerId:'user-aqing',name:'阿青',avatar:'青',tag:'门店交流',text:'想约鳌江店，细软发更推荐羽毛接发还是6D纳米？',meta:'鳌江店 · 1小时前',likes:9}]
Page({
  data:{currentUserId:CURRENT_USER,posts:[],text:'',images:[]},
  onShow(){const saved=wx.getStorageSync('circlePosts');this.setData({posts:saved&&saved.length?saved:seed})},
  input(e){this.setData({text:e.detail.value})},
  chooseImage(){wx.chooseMedia({count:3,mediaType:['image'],sourceType:['album','camera'],success:r=>this.setData({images:r.tempFiles.map(x=>x.tempFilePath)})})},
  removeImage(e){const images=this.data.images.filter((_,i)=>i!==+e.currentTarget.dataset.index);this.setData({images})},
  publish(){const text=this.data.text.trim();if(!text&&!this.data.images.length)return wx.showToast({title:'写点内容或选择图片',icon:'none'});const post={id:`p${Date.now()}`,ownerId:CURRENT_USER,name:'青丝会员',avatar:'我',tag:'新话题',text:text||'分享了接发照片',meta:'刚刚发布',likes:0,images:this.data.images};const posts=[post,...this.data.posts];wx.setStorageSync('circlePosts',posts);this.setData({posts,text:'',images:[]})},
  deletePost(e){const index=+e.currentTarget.dataset.index,post=this.data.posts[index];if(!post||post.ownerId!==CURRENT_USER)return wx.showToast({title:'只能删除自己的动态',icon:'none'});wx.showModal({title:'删除动态',content:'删除后无法恢复，确定删除吗？',success:r=>{if(!r.confirm)return;const posts=this.data.posts.filter((_,i)=>i!==index);wx.setStorageSync('circlePosts',posts);this.setData({posts})}})}
})
