var dataProxy = new XMLifeOperating.generic.BaseProxy('shopbannertemplate');
Ext.define('XMLifeOperating.model.ShopBannerTemplate', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'banner', 'nameColor','nameStrokeColor','nameDegree','descColor','descStrokeColor','descDegree','type','response'],
    proxy: dataProxy,
});