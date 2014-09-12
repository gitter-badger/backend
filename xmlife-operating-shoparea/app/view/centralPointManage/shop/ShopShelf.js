Ext.define('XMLifeOperating.view.centralPointManage.shop.ShopShelf', {
    extend: 'Ext.grid.Panel',
    closable: false,
    xtype: 'shopshelf',
    store: 'CategoryRoots',
    id: 'ShelvesList',
    bbar: [{
        xtype: 'pagingtoolbar',
        itemId: 'pagetool',
        store: 'CategoryRoots',
        displayInfo: true,
        style: 'border:none'
    }],
    columns: [{
        xtype: 'rownumberer',
        align: 'center',
        tdCls: 'user-td'
    }, {
        text: '货架名称',
        dataIndex: 'name',
        align: 'center',
        tdCls: 'user-td'
    }, {
        text: '是否有次级货架',
        dataIndex: 'leaf',
        align: 'center',
        tdCls: 'user-td',
        renderer: function(value, metadata, model, rowIndex, colIndex, store) {
            if (value) {
                return '无';
            }
            return '有';
        }
    }, {
        text: '货架图片（横）',
        dataInde: 'xImage',
        width: 420,
        sortable: false,
        align: 'center',
        tdCls: 'user-td',
        renderer: function(value) {
            return Ext.String.format('<img src="{0}{1}" height="100" />', XMLifeOperating.generic.Global.URL.res, value);
        }
    }, {
        text: '货架图片（竖）',
        dataInde: 'vImage',
        width: 420,
        sortable: false,
        align: 'center',
        tdCls: 'user-td',
        renderer: function(value) {
            return Ext.String.format('<img src="{0}{1}" height="100" />', XMLifeOperating.generic.Global.URL.res, value);
        }
    }, {
        text: '编辑',
        xtype: 'actioncolumn',
        width: 50,
        icon: 'resources/images/edit.png',
        tooltip: 'Edit',
        menuDisabled: true,
        sortable: false,
        itemId: 'openModifyShelvesWin',
        tdCls: 'user-td',
        align: 'center'

    }],
    tbar: [{
        text: '添加货架',
        itemId: 'openCreateShelvesWin'
    }, {
        xtype: 'button',
        text: '保存排序',
        itemId: 'saveOrder'
    }],
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorder'
        }
    },
    initComponent: function() {
      
/*        this.viewConfig
        'gridviewdragdrop' :{
            drop:function(){
                console.log(123)
            }
        }*/

    }



});