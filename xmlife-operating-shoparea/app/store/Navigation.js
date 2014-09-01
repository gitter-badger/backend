Ext.define('XMLifeOperating.store.Navigation', {
    requires: [
        'Ext.grid.*',
        'Ext.data.TreeStore',
    ],
    extend: 'Ext.data.TreeStore',
    fields: ['id', 'text', 'code', 'leaf'],
    autoLoad: true,
    root: {
        text: 'Root',
        expanded: true,
        children: [
        {
            id: 'centralPointManage',
            text: '中心管理',
            leaf: false,
            expanded: true,
            children: [{
                id: 'shoplist',
                text: '店铺管理',
                leaf: true
            }, {
                id: 'residentaldistrictlist',
                text: '配送地址管理',
                leaf: true
            }, {
                id: 'linelist',
                text: '线路管理',
                leaf: true
            }, {
                id: 'centralpointconfigurelist',
                text: '首页配置',
                leaf: true

            }]
        },
        {
            id: 'operateManage',
            text: '操作管理',
            left: false,
            expanded: true,
            children: [{
                id: 'dealShopAreaList',
                text: '货到中心管理',
                leaf: true
            }, {
                id: 'dealProblemDealsList',
                text: '问题订单管理',
                leaf: true
            }, {
                id: 'realTimeList',
                text: '数据中心',
                leaf: true
            }, {
                id: 'dealCashOnDeliveryList',
                text: '货到付款管理',
                leaf: true
            }]
        }, 
        {
            id: 'staffManage',
            text: '员工管理',
            leaf: false,
            expanded: true,
            children: [{
                id: 'shopperList',
                text: '买手管理',
                leaf: true
            }, {
                id: 'delivererList',
                text: '配送员管理',
                leaf: true
            }]
        }, 
        {
            id: 'customerManage',
            text: '用户管理',
            leaf: false,
            expanded: true,
            children: [{
                id: 'customerList',
                text: '用户信息管理',
                leaf: true
            }, {
                id: 'feedbackList',
                text: '用户反馈管理',
                leaf: true
            }]
        }, 
        {
            id: 'dealList',
            text: '订单管理',
            leaf: true
        }, 
        {
            id: 'refundList',
            text: '退款订单查询',
            leaf: true
        }]
    }
});