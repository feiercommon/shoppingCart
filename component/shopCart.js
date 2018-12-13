new Vue({
    el:'#app',
    data:{
        //购物车数据
        shopListArr:[],
        //选中所有商品
        selectAllFlag:true,
        //所有商品总价
        totalAllPrice:0,
        //是否隐藏删除面板
        markState:true,
        //当前要删除的一个商品
        isHideDelShop:{}
    },

    //组件已经加载完毕，请求网络数据，业务处理
    mounted(){
        //请求本地数据
        this.getLocalData();
    },

    //过滤
    filters:{
        //格式化金钱
        moneyFormat(money){
            return '¥' + money.toFixed(2)
        }
    },
    methods:{
        //1.请求本地数据
        getLocalData(){
            this.$http.post('data/cart.json').then(response => {
                // console.log(response.body);
                const res = response.body;
                if(res){
                    this.shopListArr = res.allShops.shopList;
                    // console.log(this.shopListArr);
                    this.getAllPrice()
                }

            }).catch(error => {
                alert("请求失败！")
            })
        },
        //2.商品数量
        singlePrice(shop,flag){
            if(flag){
                shop.shopNumber += 1;
            }else{
                if(shop.shopNumber <= 1){
                    shop.shopNumber = 1;
                    return;
                }
                shop.shopNumber -= 1;
            }
            this.getAllPrice();
        },
        //3.单个商品的选中
        checkProduct(item){
            //判断属性是否存在typeof
            if(typeof item.checked === 'undefined'){
                //不存在需要添加字段
                //Vue.set(item,'check',true);    //全局注册
                this.$set(item,'checked',true);   //局部注册
            }else{
                item.checked = !item.checked;
            }
            this.hasSelectAll();
            this.getAllPrice();

        },
        //4.选中所有商品
        selectAll(flag){
            // this.selectAllFlag = !this.selectAllFlag;
            this.selectAllFlag = flag;
            this.shopListArr.forEach((item,index) => {
                if(typeof item.checked === 'undefined'){
                    this.$set(item,'checked',this.selectAllFlag);   //局部注册
                }else{
                    item.checked = this.selectAllFlag;
                }
            });
            this.getAllPrice()
        },
        //5.判断是否选中商品
        hasSelectAll(){
            let flag = true;
            this.shopListArr.forEach((value,index) => {
                // console.log(value);
                if(!value.checked){
                    flag = false;
                }
            });
            this.selectAllFlag = flag;
        },
        //6.点击垃圾桶
        deleteShop(shop){
            this.markState = false;
            this.isHideDelShop = shop;
        },
        //7.取消删除
        cancel(){
            this.markState = true;
        },
        //8.确定删除
        deleteSubmit(){
            this.markState = true;
            const index = this.shopListArr.indexOf(this.isHideDelShop);
            this.shopListArr.splice(index,1);
            this.getAllPrice();
        },
        //9.计算商品总价格
        getAllPrice(){
            let totalPrice = 0;
            this.shopListArr.forEach((value,index) => {
                // console.log(value);
                //判断商品是否被选中
                if(value.checked){
                    totalPrice += value.shopPrice * value.shopNumber;
                }
            })
            this.totalAllPrice = totalPrice;
        }
    }
})












