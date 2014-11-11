Ext.define('XMLifeOperating.view.damagedGoodsManage.DamagedGoodsList', {
  extend: 'Ext.grid.Panel',
  xtype: 'damagedGoodsList',
  alias : 'widget.damagedGoodsList',
  id: 'damagedGoodsList',
  autoScroll: true,
  title : '残损审核',
  titleAlign : 'left',
  closable : true,
  store: 'DamagedProduct',
  forceFit: true,
  selModel: Ext.create('Ext.selection.CheckboxModel'),
  requires:[
    'Ext.panel.Panel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.RowExpander',
    'Ext.selection.CheckboxModel'],
  bbar: [{
    xtype: 'pagingtoolbar',
    itemId: 'pagetool',
    store: 'DamagedProduct',
    displayInfo: true
  }],
  tbar :[
    '申报时间',
    {
      xtype : 'datefield',
      name : 'startTime',
      emptyText : '开始时间',
      maxValue: new Date(),
      value: new Date(),
      format : 'Y-m-d'
    },
    '到',
    {
      xtype : 'datefield',
      name : 'endTime',
      emptyText : '结束时间',
      maxValue: new Date(),
      value: new Date(),
      format : 'Y-m-d'
    },
    {
      xtype: 'combo',
      editable: false,
      itemId: 'shopArea',
      store: 'ShopArea',
      triggerAction : 'all',
      displayField: 'name',
      valueField: 'id',
      fieldLabel: '商圈',
      name: 'areaId'
    },
    {
      xtype : 'combo',
      editable: false,
      itemId: 'status',
      store: Ext.create('Ext.data.Store', {
          fields: ['id', 'name'],
          data: [
            {id: '0', name: '未审核'},
            {id: '1', name: '审核通过'},
            {id: '2', name: '审核拒绝'}
          ]
        }),
      triggerAction : 'all',
      displayField: 'name',
      valueField: 'id',
      fieldLabel: '申报状态',
      name: 'status'
    },
    {
      xtype: 'button',
      text: '搜索',
      itemId: 'search'
    },
    {
      xtype: 'button',
      style: 'margin-left: 50px;',
      text: '导出数据',
      itemId: 'export'
    },
    {
      xtype: 'button',
      style: 'margin-left: 50px;',
      text: '批量通过',
      itemId: 'batchAccept'
    }
  ],
  columns: [
    {
      xtype: 'rownumberer'
    },{
      text: '商圈',
      dataIndex: 'areaName',
      width: 100,
      sortable: false,
      align: 'left'
    }, {
      text: '申报时间',
      dataIndex: 'applyTime',
      width: 60,
      sortable: false,
      align: 'left'
    },{
      text: '商品名称',
      dataIndex: 'productName',
      width: 100,
      sortable: false,
      align: 'left'
    }, {
      text: '数量',
      dataIndex: 'count',
      width: 100,
      sortable: false,
      align: 'left'
    }, {
      text: '总价',
      dataIndex: 'totalPrice',
      width: 100,
      sortable: false,
      align: 'left'
    }, {
      text: '所属商家',
      dataIndex: 'shopName',
      width: 100,
      sortable: false,
      align: 'left'
    }, {
      text: '理由',
      dataIndex: 'reasonCode',
      width: 100,
      sortable: false,
      align: 'left'
    }, {
      text: '状态',
      dataIndex: 'status',
      width: 100,
      sortable: false,
      align: 'left',
      renderer: function (v) {
        switch (v) {
          case 0:
            return '未审核';
          case 1:
            return '审核通过';
          case 2:
            return '审核失败';
        }
      }
    }, {
      text: '操作',
      dataIndex: 'status',
      width: 50,
      sortable: false,
      align: 'left',
      itemId: 'acceptBtn',
      renderer: function (v) {
        if (v == 0) {
          return '<button>通过</button>'
        }
      }
    }, {
      text: '操作',
      dataIndex: 'status',
      width: 50,
      sortable: false,
      align: 'left',
      itemId: 'rejectBtn',
      renderer: function (v) {
        if (v == 0) {
          return '<button>拒绝</button>'
        }
      }
    }
  ],
  viewConfig: {
    plugins: {
      ptype: 'gridviewdragdrop',
      dragText: 'Drag and drop to reorder'
    }
  }

});