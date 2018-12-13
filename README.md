#购物车实现
##0.本地数据加载
    1.data中定义数组 shopListArr:[]
    2.mounted(){
        this.getData();
    }  钩子函数中调用存放本地数据的方法
    3.methods方法中请求本地数据
    methods:{
        getData(){
            this.$http.get('data/cart.json').then(response => {
                console.log(response);
                const res = response.body;
                //判断是否有数据
                if(res){
                    this.shopListArr = res.allShops.shopList;
                }
            },error => {
                alert('请求失败！')
            })
        }
    }
##1.单选按钮选中不选中

###1.1 css样式
    .selected-img{
        background: url("images/gou.png") no-repeat;
    }
    .check{
        background: url("images/gou-red.png") no-repeat;
    }
    
###1.2 html 
    <a href="javascript:;" class="selected-img" :class="{'check':item.checked}" @click="checkProduct(item)"></a>   
    
    注：后台数据没有选中字段，需要自行添加。:class="{'check':item.checked}" 判断数据中是否有checked,若有类名中添加check,显示选中效果;反之。
    
###1.3 js中方法
   ####单个商品选中与不选中
    checkProduct(item){
        //判断属性是否存在 typeof
        if(typeof item.checked == 'undefined'){
            //不存在需要添加字段checked
            //Vue.set(item,'check',true);    //全局注册
            this.$set(item,'checked',true);   //局部注册
        }else{      
            //存在点击时取反
            item.checked = !item.checked;
        }
    }
    
##2.数量加减

###2.1 html 
    <span class="btn-add" @click="singlePrice(item,false)">-</span>
    <input type="text" v-model="item.shopNumber" placeholder="item.shopNumber">
    <span class="btn-add" @click="singlePrice(item,true)">+</span>

###2.2 js 方法
    
    singlePrice(shop,flag){
        if(flag){     //商品加1
            shop.shopNumber += 1;
        }else{        //商品减1  
            if(shop.shopNumber <= 1){
                shop.shopNumber = 1;
                return;
            }
            shop.shopNumber -= 1;
        }
    }
        
##3.遮罩问题   
    样式中设置为隐藏，点击删除按钮显示，点击取消按钮消失
  ###3.1 通过class属性控制隐藏
    data中定义属性markState:true   /   deleteDate:{}
    <div class="mark-wrap" :class="{'showHide':markState}">
  ###3.2 点击删除按钮显示
    <div class="btn-right-wrap" @click="deleteShop(item)">
        <img src="images/deleteIcon.png" alt="">
    </div>
    deleteShop(shop){
        this.markState = false;
        this.isHideDelShop = shop;      //获取到删除数据的下标
    }
  ###3.3 点击取消按钮消失
    <button class="cancel" @click="cancel">取消</button>
    cancel(){
        this.markState = true;
    }
    
##4.删除数据

  ###4.1 html
    <button class="submit" @click="deleteSubmit">确定</button>

  ###4.2 js 方法
    1.在data中定义一个对象，作用是存放要删除的一条数据  deleteDate:{}
    deleteSubmit(){
        const delDate = this.shopListArr.indexOf(this.deleteDate);
        this.shopListArr.splice(index,1);
    }
    
##5.全选按钮选中不选中
  ###5.1 html
    <a href="javascript:;" class="selected-img" :class="{'check':selectAllFlag}" @click="selectAll(true)"></a>
    
  ###5.2 js 方法
    在date中定义全选属性selectAllFlag:true
    selectAll(){
        this.selectAllFlag = !this.selectAllFlag;
        this.shopListArr.forEach((shop,index) => {
            if(typeof shop.checked === 'undefined'){
                this.$set(shop,'checked',this.selectAllFlag)
            }else{
                shop.checked = this.selectAllFlag;
            }
        })
    }
##6.判断商品是否全选
    作用：若商品没有全部选中，全选按钮没有效果；反之。

###6.1 js 方法
    注：该方法在单选商品方法中调用
    hasSelete(){
        let flag = true;
        this.shopListArr.forEach((value,index) => { 
            if(!value.checked){
                flag = false;
            }
        })
        this.selectAllFlag = true;
    }
    
##7.商品金额规范形式

  ###7.1 html
    <span>{{totalAllPrice | moneyFormat(totalAllPrice)}}</span>
  ###7.2 js 过滤钩子函数
  
    filters:{
        //金钱格式
        moneyFormat(money){
            return '¥' + money.toFixed(2);
        }
    }
      
##8.合计商品价格

###8.1 html 
    <span>{{totalAllPrice | moneyFormat(totalAllPrice)}}</span>
    
###8.2 js 方法
    在data中定义属性totalAllPrice
    
    totalPrice(){
        let total = 0;
        this.shopListArr.forEach((value,index) => {
            if(value.checked){
                total += value.shopNumber * value.shopPrice;
            }
        })
        this.totalAllPrice = total;
    }
        

#属性改变背景图片
##1.获取到类名
    window.onload = function(){
        let getA = document.getElementById('selected-img');
    }
##2.判断添加的属性是否存在
    let attr = getA.hasAttribute('checked');
##3.通过if...else语句设置
    if(attr){
        getA.style.background = 'url(img/1.png)'
    }else{
        getA.style.background = 'url(img/2.png)'
    }    
    
    
    
    
#git上传项目
##1. cd到本地项目中
##2. git init
##3. git add .
##4. git commit -m "描述"
##5. git config --global user.name ""/git config --global user.email "1311143874@qq.com"
##6. git commit -m "描述"
##7. git remote add origin github上面地址
##8. git push -u origin master
     