/**
 * @class XMLifeOperating.controller.AuthorityTabPanel
 * @extends extendsClass
 * Description
 */
Ext.define('XMLifeOperating.controller.Authority', {
    extend: 'Ext.app.Controller',
    views : [
    'authorityManage.AuthorityTabPanel',
    'authorityManage.CityAccountManage',
    'authorityManage.GlobalAccountManage',
    'authorityManage.addGlobalAccount',
    'authorityManage.addCityManagerAccount'],
    models : ['Account'],
    stores : ['Account','Authority','Province','AllCities'],
    refs: [{
      ref: 'AuthorityTabPanel',
      selector: 'AuthorityTabPanel',
      xtype: 'AuthorityTabPanel',
      autoCreate: true
    },{
      ref: 'CityAccountManage',
      selector: 'CityAccountManage',
      xtype: 'CityAccountManage',
      autoCreate: true
    },{
      ref: 'GlobalAccountManage',
      selector: 'GlobalAccountManage',
      xtype: 'GlobalAccountManage',
      autoCreate: true
    },{
      ref: 'addGlobalAccount',
      selector: 'addGlobalAccount',
      xtype: 'addGlobalAccount',
      autoCreate: true
    },{
      ref: 'addCityManagerAccount',
      selector: 'addCityManagerAccount',
      xtype: 'addCityManagerAccount',
      autoCreate: true
    },{
        ref: 'cmbCity',
        selector: '#cmbCity',
        xtype: 'combobox'
        }
        ],
    init : function(){
      var self = this;
      self.control({
        'GlobalAccountManage' : {
          activate : function(){
            self.loadData('GlobalAccountManage');
            self.initGlobalAuthority();
          }
        },
        'GlobalAccountManage #addGlobalAccount' : {
          click : function(){
            //创建全局账号
            
            var addGlobalAccount = self.getAddGlobalAccount(),
                form = addGlobalAccount.down('form'),
                formEl = form.getForm(),
                accountField = form.down('#accountField');
                accountField.setDisabled(false);
                formEl.reset();
                form.edit = false;
                addGlobalAccount.show();
                console.log('创建全局账号');
          }
        },
        'GlobalAccountManage #seachAccount' : {
          click : function(){
            //搜索全局账号
            var store = self.getAccountStore();
                seachKeyword = self.getGlobalAccountManage().down('#seachKeyword').getValue();
                store.getProxy().extraParams = {
                   keyword : seachKeyword,
                   type : 'Global'
                    };
                store.loadPage(1);
              }
        },
        'GlobalAccountManage #edit' : {
          click : function(a,b,c,d,e,f,g){
            var addGlobalAccount = self.getAddGlobalAccount(),
                form = addGlobalAccount.down('form'),
                accountField = form.down('#accountField'),
                modulesCheckbox = form.down('#modulesCheckbox').query('checkboxfield'),
                citiesCheckbox = form.down('#citiesCheckbox').query('checkboxfield'),
                isHaveCities = form.down('#isHaveCities'),
                model = arguments[5],
                cityIds = model.get('cityIds'),
                moduleIds = model.get('moduleIds'); 
                form.loadRecord(model);
                accountField.setDisabled(true);
                Ext.each(modulesCheckbox, function(checkbox) {
                   for(var i = 0 , l = moduleIds.length; i < l ; i++){
                    if(checkbox.inputValue == moduleIds[i]){
                      checkbox.setValue(true);
                    }
                   }
                });

                if(cityIds.length>0){
                  isHaveCities.setValue(true);
                }

                Ext.each(citiesCheckbox, function(checkbox) {
                   for(var i = 0 , l = cityIds.length; i < l ; i++){
                    if(checkbox.inputValue == cityIds[i]){
                      checkbox.setValue(true);
                    }
                   }
                });

                form.edit = true;
                addGlobalAccount.show();

          }
        },
        'CityAccountManage' : {
          activate : function(){
            self.loadData('CityAccountManage');
          }
        },
        'CityAccountManage #edit' : {
            click : function(){
              var addCityManagerAccount = self.getAddCityManagerAccount()
                  form = addCityManagerAccount.down('form'),
                  accountField = form.down('#accountField'),
                  cmbCity = form.down('#cmbCity'),
                  cmbProvince = form.down('#cmbProvince'),
                  model = arguments[5],
                  cityIds = model.get('cityIds'),
                  cityId = cityIds[0],
                  allCitiesStore = self.getAllCitiesStore(),
                  cityModel = allCitiesStore.findRecord('code',cityId),
                  provinceId = cityModel.get('parent');

                  cmbProvince.setValue(provinceId);
                  cmbCity.setValue(cityId);

                  accountField.setDisabled(true);

                  form.loadRecord(model);

                  form.edit = true;
                  addCityManagerAccount.show();

            }
        },
        '#handel' : {
          click : function(){
            var model = arguments[5],
                enable = model.get('enable'),
                account = model.get('account'),
                url = '',
                str = '';
                if(enable){
                  url = XMLifeOperating.generic.Global.URL.biz+'admin/disable/'+account 
                  str = '关闭';
                }else{
                  url = XMLifeOperating.generic.Global.URL.biz+'admin/enable/'+account;
                  str = '开启';

                }
                Ext.Ajax.request({
                  method : "PUT",
                  url: url,
                  success : function(data){
                      if(data.responseText == '1'){
                        Ext.Msg.alert('成功', '成功'+str+'账户'+account);
                        var store = self.getAccountStore();
                        store.clearFilter(true);
                        store.load();
                      }
                  }
              });
          }
        },
        'addGlobalAccount #submit' : {
          click : function(button){
            self.submitData(button);
          }
        },
        'addCityManagerAccount #submit' : {
          click : function(button){
            self.submitData(button);
          }
        },
        'CityAccountManage #addCityAccount' : {
          click : function(){
            //创建城市经理
            //
             var addCityManagerAccount = self.getAddCityManagerAccount(),
                form = addCityManagerAccount.down('form'),
                formEl = form.getForm(),
                accountField = form.down('#accountField');
                accountField.setDisabled(false);
                formEl.reset();
                form.edit =false;
                addCityManagerAccount.show();
                console.log('创建城市经理');
            
          }
        },
        '#lookActiveAccount' : {
          click : function(){
            //查看开启的账号
           var store = self.getAccountStore();
           store.clearFilter(true);
           store.filter('enable',true)
          }
        },
        '#lookDisableAccount' : {
          click : function(){
            //查看关闭的账号
            var store = self.getAccountStore();
                store.clearFilter(true);
                store.filter('enable',false)
          }
        },
        'CityAccountManage #seachAccount' : {
          click : function(){
            //搜索城市经理账号
            var store = self.getAccountStore();
                seachKeyword = self.getCityAccountManage().down('#seachKeyword').getValue();
                store.getProxy().extraParams = {
                   keyword : seachKeyword,
                   type : 'City'
                    };
                store.loadPage(1);
          
          }
        },
        'addCityManagerAccount combobox[name=cpro]' : {
            select: function(combo, records, eOpts) {
                if (records.length == 0) {
                    console.log('no entry selected');
                    return;
                }
                var store = this.getAllCitiesStore();
                var cmbCity = this.getCmbCity();

                cmbCity.lastQuery = null;
                cmbCity.clearValue();

                store.clearFilter();
                store.filter('parent', records[0].data.code);
            }
        }
      })
    },
    loadData : function(type){
      var type = type || 'GlobalAccountManage';
      var data = {
        'GlobalAccountManage' : 'Global',
        'CityAccountManage' : 'City'
      }
      
      this.activeType = data[type];

      var store = this.getAccountStore(),
          proxy = store.getProxy();
          proxy.extraParams = { type : this.activeType};
          store.clearFilter(true);
          store.load();
      
    },
    initGlobalAuthority : function(){
            var authorityStore = this.getAuthorityStore(),
                cityStore = this.getAllCitiesStore(),
                addGlobalAccount = this.getAddGlobalAccount(),
                modulesCheckbox = addGlobalAccount.down('#modulesCheckbox'),
                radiogroup = addGlobalAccount.down('radiogroup');
                isHaveCities = addGlobalAccount.down('#isHaveCities');

                authorityStore.load({
                  callback : function(stores){
                    modulesCheckbox.removeAll();
                    Ext.each(stores, function(model) {
                      modulesCheckbox.add({
                        xtype: 'checkboxfield',
                        boxLabel  : model.get('text'),
                        name      : 'modules',
                        inputValue: model.get('uid')
                      }) 
                    });
                  }
                });
                /**
                 * 选择城市
                 */
                /*
                cityStore.load({
                  callback : function(stores){
                    Ext.each(stores, function(model) {
                      radiogroup.add({ 
                        boxLabel: model.get('name'), 
                        name: 'city', 
                        inputValue: model.get('name') })
                    });
                  }
                });*/

    },
    submitData : function(button){
            var windowEl = button.up('window'),
                form = button.up('window').down('form'),
                account = form.down('#accountField') && form.down('#accountField').getValue(),
                isHaveCities = form.down('#isHaveCities') && form.down('#isHaveCities').getValue(),
                citiesCheckboxs = form.down('#citiesCheckbox') && form.down('#citiesCheckbox').query('checkboxfield'),
                subData = form.getValues(),
                editUrl = form.editUrl
                cityNum = 0;
                 if(account){
                  subData['account'] = account
                 }

             if(isHaveCities){
              Ext.each(citiesCheckboxs, function(checkbox) {
                if(checkbox.getValue()){
                  cityNum++;
                }
              });
              if(cityNum <= 0){
                Ext.Msg.alert('失败', '请至少选择一个城市');
                return false;
              }
             }
            if (form.edit) {
              Ext.Ajax.request({
                  method : "PUT",
                  url: editUrl,
                  params: subData,
                  success : function(data){
                      if(data.responseText == '1'){
                        Ext.Msg.alert('成功', '成功更新账户'+account);
                        var store = self.getAccountStore();
                        store.clearFilter(true);
                        windowEl.close();
                        store.load()
                      }else{
                        Ext.Msg.alert('失败', '更新账户'+account+'失败');
                      }
                  }
              });
            }else{
              form.submit({
                failure : function(form, action) {
                  if(action.response.responseText == '1'){
                    Ext.Msg.alert('添加成功', '成功添加');
                    var store = self.getAccountStore();
                    store.clearFilter(true);
                    windowEl.close();
                    store.load();
                  }else{
                    Ext.Msg.alert('失败', '失败');
                  }
                }
              });  
            };
            
          
    }
});