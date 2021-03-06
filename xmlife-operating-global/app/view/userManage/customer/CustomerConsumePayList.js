var consumePayCount = 1,
    consumePayMark = '',
    isFirstConsumePay = false;
Ext.define('XMLifeOperating.view.userManage.customer.CustomerConsumePayList', {
    extend: 'Ext.grid.Panel',
    id: 'customerConsumePayList',
    xtype: 'customerConsumePayList',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
    ],
    store: 'CustomerUserCashflow',
    forceFit: true,
    layout: 'fit',
    closable: true,
    columns: [{
        xtype: 'rownumberer',
        width: 50,
        align: 'center'
    }, {
        text: '日期',
        dataIndex: 'date',
        width: 80,
        sortable: false,
        renderer: function(value) {
            return Ext.util.Format.date(new Date(value), "Y.m.d");
        }
    }, {
        text: '详情',
        dataIndex: 'content',
        width: 60,
    }, {
        text: '金额',
        dataIndex: 'amount',
        width: 80,
        renderer: function(value) {
            return value / 100;
        }
    }],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        id: 'paging',
        itemId: 'pagetoll',
        store: 'CustomerUserCashflow',
        dock: 'bottom',
        displayInfo: true,
        hidden: true
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
            id: 'up',
            text: '上一页',
            handler: function() {
                var toolbar = Ext.getCmp('paging');
                if (consumePayMark == 'next') {
                    consumePayCount--;
                }
                consumePayCount--;
                var start = consumePayCount * 25;
                toolbar.store.reload({
                    start: start,
                    limit: 25
                });
                payMark = 'prev';
                if (consumePayCount == 0) {
                    consumePayCount = 1;
                    isFirstConsumePay = true;
                }
                consumePayMark = 'prev';
            }
        }, {
            text: '下一页',
            handler: function() {
                var toolbar = Ext.getCmp('paging'),
                    pageSize = toolbar.store.getCount();
                if (pageSize < 25) {
                    return;
                }
                if (consumePayMark == 'prev') {
                    if (isFirstConsumePay) {
                        consumePayCount = 1;
                        isFirstConsumePay = false;
                    } else {
                        consumePayCount++;
                    }
                }
                var start = consumePayCount * 25;
                consumePayCount++;
                toolbar.store.reload({
                    start: start,
                    limit: 25
                });
                consumePayMark = 'next';
            }
        }]
    }]
});
