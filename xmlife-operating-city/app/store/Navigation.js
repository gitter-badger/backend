Ext.define('XMLifeOperating.store.Navigation', {
    requires: [
        'Ext.grid.*',
        'Ext.data.TreeStore',
    ],
    defaultRootId: '',
    extend: 'Ext.data.TreeStore',
    model: 'XMLifeOperating.model.Navigation',
    autoLoad: false,
    root: {
        expanded: true,
        children:[]
    }
    /*    root: {
            text: 'Root',
            expanded: true,
            children: [{
                id: 'freightList',
                text: '运费管理',
                leaf: true
            }, {
                id:'soldoutProductManage',
                text:'下架商品管理',
                leaf:false,
                children:[
                {
                    id:'soldoutRecordList',
                    text:'下架记录',
                    leaf:true
                },{
                    id:'shopperRecordList',
                    text:'买手记录',
                    leaf:true
                }]
            },{
                id: 'freightList',
                text: '改价审核',
                leaf: true
            }, {
                id: 'shopAreaList',
                text: '中心平台管理',
                leaf: true
            }, {
                id: 'authorityList',
                text: '中心权限管理',
                leaf: true
            }, {
                id: 'personalCenter',
                text: '个人中心',
                leaf: true
            }]
        }*/
});
