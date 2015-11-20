(function() {
    'use strict';

    function QueryTransfers(container) {  
        this.container = container;
        this.transferTypes= [
            {'text': '转账详情', 'value': '1'},
            {'text': '转入', 'value': '2'},
            {'text': '转出', 'value': '3'}
        ];
        
        this._initDom();
        this._bindEvents();
    }
    
    QueryTransfers.prototype._initDom = function() {
        var temp =  '<div class="query-transfers-ctrl">' +
                        '<div class="bar-zone">' +
                            '<div class="controls">' +
                                '<div class="row1">' +
                                    '<input type="text" class="starttime" data-i18n="[placeholder]start-time" />' +
                                    '<input type="text" class="endtime" data-i18n="[placeholder]end-time" />' +
                                    '<select class="lottery-type">' +
                                        this._generateSelectOptions(this.transferTypes) +
                                    '</select>' +
                                    '<input type="text" data-i18n="[placeholder]search" />' +                                  
                                '</div>' +
                            '</div>' +

                            '<div class="submit">' +
                                '<button data-i18n="search"></button>' +
                            '</div>' +
                            
                            '<div class="clear"></div>' +
                        '</div>' +

                        '<div class="table-zone">' +
                            '<table id="example3" class="display" width="100%"></table>' +
                        '</div>' +                        
                    '</div>';
        
        $(temp).appendTo(this.container);

        var dataSet = [
            {
                "yhzh":       "Tiger Nixon",
                "jysj":   "System Architect",
                "zzxq":     "$3,120",
                "jyse": "2011/04/25",
                "khye":     "Edinburgh",
                "zzzt":       "5421",
                "lsh":       "5421"
            },
            {
                "yhzh":       "Tiger Nixon",
                "jysj":   "System Architect",
                "zzxq":     "$3,120",
                "jyse": "2011/04/25",
                "khye":     "Edinburgh",
                "zzzt":       "5421",
                "lsh":       "5421"
            },
            {
                "yhzh":       "Tiger Nixon",
                "jysj":   "System Architect",
                "zzxq":     "$3,120",
                "jyse": "2011/04/25",
                "khye":     "Edinburgh",
                "zzzt":       "5421",
                "lsh":       "5421"
            },
            {
                "yhzh":       "Tiger Nixon",
                "jysj":   "System Architect",
                "zzxq":     "$3,120",
                "jyse": "2011/04/25",
                "khye":     "Edinburgh",
                "zzzt":       "5421",
                "lsh":       "5421"
            }
        ];
        
        $('#example3').DataTable( {
            info: false,
            data: dataSet,
            lengthChange: false,
            searching: false,
            orderClasses: false,
            language: {
                "lengthMenu": "每页显示 _MENU_ 条记录",
                "paginate": {
                    "next":       "下一页",
                    "previous":   "上一页"
                }
            },
            columns: [
                { title: "用户账号", data: "yhzh"},
                { title: "交易时间", data: "jysj"},
                { title: "转账详情", data: "zzxq"},
                { title: "交易数额", data: "jyse"},
                { title: "客户余额", data: "khye"},
                { title: "转账状态", data: "zzzt"},
                { title: "流水号", data: "lsh"}
            ]
        });

        $('.query-transfers-ctrl .starttime, .query-transfers-ctrl .endtime').datetimepicker({
            timepicker: false
        });
    };

    QueryTransfers.prototype._generateSelectOptions = function(data) {
        var i;
        var temp = '';
        for (i = 0; i < data.length; i++) {
            temp += '<option value ="' + data[i].value + '">' + data[i].text + '</option>';
        }
        return temp;
    };

    QueryTransfers.prototype._bindEvents = function() {
    };

    QueryTransfers.prototype.show = function() {
        $('.query-transfers-ctrl').show();
    };  

    QueryTransfers.prototype.hide = function() {
        $('.query-transfers-ctrl').hide();
    };  

    window.QueryTransfers = QueryTransfers;
}());
