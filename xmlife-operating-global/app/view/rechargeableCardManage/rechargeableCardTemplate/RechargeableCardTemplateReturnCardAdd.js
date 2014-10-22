/**
 * @class SimpleTasks.view.tasks.EditWindow
 * @extends Ext.window.Window
 */
Ext.define('XMLifeOperating.view.rechargeableCardManage.rechargeableCardTemplate.RechargeableCardTemplateReturnCardAdd', {
    extend: 'Ext.window.Window',
    xtype: 'rechargeablecardtemplatereturncardadd',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
    ],
    closeAction: 'hide',
    modal: true,
    width: 350,
    height: 420,
    resizable: false,
    layout: 'fit',
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            border: false,
            items: [{
                xtype: 'textfield',
                name: 'name',
                fieldLabel: '名称',
                labelWidth: 90,
                width: 300,
                allowBlank: false
            }, {
                xtype: 'textfield',
                name: 'desc',
                fieldLabel: '描述',
                labelWidth: 90,
                width: 300,
                height: 61,
                allowBlank: false,
                maxLength: 28,
                maxLengthText: '充值成功描述最大长度为28',
            }, {
                xtype: 'container',
                layout: 'column',
                style: 'margin-top:3px',
                items: [{
                    xtype: 'textfield',
                    name: 'immediatelyAmount',
                    fieldLabel: '即时到账',
                    width: 160,
                    labelWidth: 90,
                    allowBlank: false,
                }, {
                    xtype: 'displayfield',
                    value: '元',
                    style: 'margin-left:5px'
                }]
            }, {
                xtype: 'container',
                layout: 'column',
                style: 'margin-top:3px',
                items: [{
                    xtype: 'textfield',
                    name: 'returnAmount',
                    fieldLabel: '返还金额',
                    labelWidth: 90,
                    width: 160,
                    allowBlank: false,
                }, {
                    xtype: 'displayfield',
                    value: '元',
                    style: 'margin-left:5px'
                }]
            }, {
                xtype: 'container',
                layout: 'column',
                style: 'margin-top:3px;margin-bottom:3px;',
                items: [{
                    xtype: 'textfield',
                    name: 'count',
                    fieldLabel: '返现次数',
                    labelWidth: 90,
                    width: 160,
                    allowBlank: false,
                    itemId: 'returncount'
                }, {
                    xtype: 'displayfield',
                    value: '次',
                    style: 'margin-left:5px'
                }]
            }, {
                xtype: 'container',
                layout: 'vbox',
                maxHeight: 150,
                autoScroll: true,
                width: 320,
                style: 'overflow-x:Hidden; overflow-y:scroll',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                itemId: 'returnContainer',
                items: []
            }, {
                xtype: 'checkbox',
                name: 'newAccount',
                fieldLabel: '是否新手卡',
                //labelWidth: 90,
                allowBlank: false,
            }, ],
            buttons: [{
                text: 'Save',
                itemId: 'save-addReturnTemplate-edit-btn'
            }, {
                text: 'Cancel',
                handler: function() {
                    //关闭窗口
                    Ext.ComponentQuery.query('rechargeablecardtemplatereturncardadd')[0].close();
                }
            }]
        }]

        this.callParent(arguments);

    }

});