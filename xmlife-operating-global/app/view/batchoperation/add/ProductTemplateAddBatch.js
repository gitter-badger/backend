Ext.define('XMLifeOperating.view.batchoperation.add.ProductTemplateAddBatch', {
  extend: 'Ext.panel.Panel',
  id : 'ProductTemplateAddBatch',
  xtype : 'ProductTemplateAddBatch',
  alias : 'widget.ProductTemplateAddBatch',
  title : '商品模板',
  closeAction: 'hide',
  resizable: false,
  forceFit: true,
  items : [
    {
      xtype : 'form',
      border: 0,
      edit : false,
      items : [
        {
          xtype: 'fieldcontainer',
          defaultType: 'textfield',
          defaults: {
            labelWidth: 80,
            width: 500
          },
          items: [
            {
              xtype: 'radiogroup',
              fieldLabel: '文件类型',
              items: [
                {boxLabel: 'Excel文件[2007或以上版本]', name: 'filetype', inputValue: '1', checked: true},
                {boxLabel: 'Excel文件', name: 'filetype', inputValue: '2'}
              ]
            },
            {
              xtype: 'filefield',
              fieldLabel: '文件路径',
              name: 'file'
            },
            {
              xtype: 'radiogroup',
              fieldLabel: '图片类型',
              items: [
                {boxLabel: '(*.jpg)', name: 'filetype', inputValue: '1', checked: true}
              ]
            },
            {
              xtype: 'filefield',
              fieldLabel: '图片路径',
              name: 'pictures',
              listeners:{
                afterrender:function(cmp){
                  cmp.fileInputEl.set({
                    multiple:'multiple'
                  });
                }
              }
            },
            {
              xtype: 'textareafield',
              grow: true,
              name: 'description',
              fieldLabel: '提交说明'
            },
            {
              xtype: 'button',
              text: '提交',
              width: 50,
              style: 'margin-left: 430px; margin-top: 10px; color: blue;',
              itemId: 'submit'
            },
            {
              xtype: 'textareafield',
              style: 'margin-left: 85px; margin-top: 30px;',
              edit: false,
              grow: true,
              blankText: '执行结果',
              itemId: 'resultLog',
              width: 415,
              cols: 40
            }

          ]
        }
      ]
    }
  ]
});
