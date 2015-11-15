//B表
Ext.define('com.module.common.orders.OrdersPanel_SearhForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.OrdersPanel_SearhForm',
    height: 80,
    width: '100%',
    border: false,
    layout: 'column',
    buttonAlign: 'left',
    defaults: {
        labelAlign: 'left',
        border: false,
        margin: '8,0,0,20',
        labelWidth: 70,
        align: 'left'
    },
    initComponent: function() {
        var me = this;
        me.items = [{
            fieldLabel: "医生姓名",
            name: 'dname',
            xtype: 'textfield'
        },
        {
            fieldLabel: "用户电话",
            name: 'uphone',
            xtype: 'textfield'
        }];
        me.buttons = [{
            xtype: 'button',
            text: frame.lang.global._search,
            width: 100,
            handler: function() {
                me.ownerCt.down('grid').getStore().load()
            }
        },
        {
            xtype: 'button',
            text: frame.lang.global._reset,
            width: 100,
            handler: function() {
                me.getForm().reset()
            }
        }];
        me.callParent()
    },
    getQueryCondition: function() {
        var formPanel = this;
        var values = formPanel.getForm().getValues();
        var dname = values.dname;
        var uphone = values.uphone;
        var condition = [];
        if (!frame.util.isNull(dname)) {
            condition.push({
                fieldName: 'd.name',
                operation: 'like',
                valueType: 'String',
                value: '%' + dname + '%'
            })
        }
        if (!frame.util.isNull(uphone)) {
            condition.push({
                fieldName: 'u.phone',
                operation: 'like',
                valueType: 'String',
                value: '%' + uphone + '%'
            })
        }
        return condition
    }
});
Ext.define("com.module.common.orders.OrdersPanel_Grid", {
    extend: 'Ext.grid.Panel',
    requires: ['com.module.common.orders.OrdersOperatePanel'],
    alias: 'widget.OrdersPanel_Grid',
    flex: 1,
    width: '100%',
    autoScroll: true,
    border: false,
    stripeRows: true,
    split: true,
    clicksToEdit: 2,
    collapseMode: 'mini',
    listeners: {
        'itemdblclick': function(gridView, record) {
            this.getSelectionModel().select([record], true);
            this.lookOrder()
        }
    },
    columns: [{
        xtype: 'rownumberer'
    },
    {
        header: '订单ID',
        dataIndex: 'oid',
        width: 70,
        sortable: true
    },
    {
        header: '医生姓名',
        dataIndex: 'dname',
        width: 75,
        sortable: true
    },
      {
        header: '医生电话',
        dataIndex: 'dphone',
        width: 120,
        sortable: true
    },
     {
        header: '用户姓名',
        dataIndex: 'uname',
        width: 75,
        sortable: true
    },
    {
        header: '用户电话',
        dataIndex: 'uphone',
        width: 120,
        sortable: true
    },
    {
        header: '订单状态',
        dataIndex: 'status',
        width: 150,
        sortable: true,
				renderer:function(value)
				{
					if(value==0)return '新建';
					if(value==1)return '已支付';
					if(value==2)return 'dc_已出发';
					if(value==3)return '诊断中';
					if(value==4)return '待确认支付';
					if(value==5)return '待用户一次评价';
					if(value==6)return '待dc_一次评价';
					if(value==7)return '待用户二次评价';
		            if(value==8)return '待dc_二次评价';
					if(value==9)return '待确认取消';
					if(value==10)return '挂起';
					if(value==11)return '结束';
					return value;
				}        
    },
    {
        header: '创建时间',
        dataIndex: 'createtime',
        width: 150,
        sortable: true
    },
    {
        header: '订单价格',
        dataIndex: 'price',
        width: 80,
        sortable: true
    },
    {
        header: '订单整体评价',
        dataIndex: 'evaluate',
        width: 200,
        sortable: true
    }],
    initComponent: function() {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            fields: ['oid','uid','did', 'dlvl', 'status', 'record', 'record_pic', 'createtime', 'evaltime1',
            'reevaltime1', 'evaltime2', 'reevaltime2', 'eval1', 'reeval1', 'eval2', 'reeval2', 
            'espeed', 'eattitude', 'erecord', 'eeffect', 'esupport', 
            'evaluate', 'uaid', 'distance', 'price', 'payid', 'lct','dname','dphone','uname','uphone','range','addr','totaladdr'],
            autoLoad: true,
            pageSize: frame.config.pageSize,
            proxy: {
                type: 'ajax',
                url: basePath + 'BackOrdersController/loadOrders',
                reader: {
                    type: 'json',
                    root: 'returnData'
                }
            },
            listeners: {
                'beforeload': function(store) {
                    var formPanel = me.ownerCt.down('form');
                    var condition = formPanel.getQueryCondition();
                    Ext.apply(store.proxy.extraParams, {
                        condition: Ext.encode(condition)
                    })
                }
            }
        });
        var sm = Ext.create('Ext.selection.CheckboxModel', {
            mode: "MULTI"
        });
        var _tbar = new Ext.Toolbar({
            items: [{
                xtype: 'button',
                text: frame.lang.global._refresh,
                width: 70,
                handler: function() {
                    me.refreshOrder()
                }
            },
            {
                xtype: 'button',
                text: frame.lang.global._look,
                width: 70,
                handler: function() {
                    me.lookOrder()
                }
            }]
        });
        var pageSizeCombo = Ext.create('Ext.form.ComboBox', {
            store: Ext.create('Ext.data.ArrayStore', {
                fields: ['text', 'value'],
                data: [['10', 10], ['20', 20], ['30', 30], ['50', 50], ['100', 100]]
            }),
            valueField: 'value',
            displayField: 'text',
            value: frame.config.pageSize,
            width: 70
        });
        var bbar = new Ext.PagingToolbar({
            afterPageText: frame.lang.global.afterPageText,
            beforePageText: frame.lang.global.beforePageText,
            store: store,
            inputItemWidth: 50,
            displayInfo: true,
            items: ['-', frame.lang.global.everyPageShow, pageSizeCombo, frame.lang.global.row],
            displayMsg: frame.lang.global.displayMsg,
            emptyMsg: frame.lang.global.emptyMsg
        });
        pageSizeCombo.on("select", 
        function(comboBox) {
            var nowPageSize = parseInt(comboBox.getValue());
            bbar.pageSize = nowPageSize;
            store.pageSize = nowPageSize;
            store.load();
            store.loadPage(1)
        });
        me.bbar = bbar;
        me.mybbar = bbar;
        me.tbar = _tbar;
        me.store = store;
        me.selModel = sm;
        this.callParent()
    },
    refreshOrder: function() {
        var me = this;
        me.store.load()
    },
    lookOrder: function() {
        var me = this;
        var rec = me.selModel.getLastSelected();
      
        if (Ext.isEmpty(rec)) {
            frame.util.QuickMsg.showMsg(frame.lang.global.selectHandleData);
            return
        }
        
        Ext.widget('OrdersOperatePanel', {
            record: rec,
            showMode: 'look'
        }).show()
    }
   
});
Ext.define("com.module.common.orders.OrdersPanel", {
    extend: 'Ext.panel.Panel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;
        me.callParent();
        var grid = Ext.widget('OrdersPanel_Grid');
        var searchFrom = Ext.widget('OrdersPanel_SearhForm');
        me.add(searchFrom);
        me.add(grid)
    }
});