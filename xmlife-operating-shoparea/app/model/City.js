Ext.define('XMLifeOperating.model.City', {
    extend: 'Ext.data.Model',
    fields: ['id', 'code', 'name', 'status', 'shopAreas','zones','shipfee','deductd','lng','lat'],
    proxy: new XMLifeOperating.generic.BaseProxy('supportedcity')
});