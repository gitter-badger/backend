var dataProxy = new XMLifeOperating.generic.BaseProxy('shop');
Ext.define('XMLifeOperating.model.Shop', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'templateId',
		'templateName',
		// 'desc', // 疑似不再使用，各界面未见对应的域
		'openTime',
		'closeTime',
		'openTimeText',
		'closeTimeText',
		'lng',
		'lat',
		'url',
		'city',
		'areaNames',
		'banners',
		'address',
		'time',
		'areaIds',
		'shopBannerTemplateId',
		'superShopperCount',
		'shopId',
		'status',
		'areas',
		'beCopyedShopId',
		'initShippingFee',
		'minPrice',
		'minOrderForFreeShipping',
		'minDistance',
		'shippingFeePerKM',
		'autoOnline',
		'showAllProducts',
		'needAuditPrice',
		'needUserCollection',
		'storeLimitEnable',
		'type',
		'managerCount'
	],
	idProperty: 'id',
	proxy: dataProxy
});