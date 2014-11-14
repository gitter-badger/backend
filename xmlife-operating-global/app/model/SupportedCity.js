Ext.define('XMLifeOperating.model.SupportedCity', {
    extend: 'Ext.data.Model',
    fields: ['id', 'code', 'name', 'status', 'shopAreas','zones','shipfee','deductd','lng','lat'],
    idProperty:'code',
    proxy: new XMLifeOperating.generic.BaseProxy('supportedcity')
});