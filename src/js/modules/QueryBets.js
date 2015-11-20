(function() {
    'use strict';

    function QueryBets(container) {  
        this.container = container;
        this.lotteryTypes = [
            {'text': '彩种', 'value': '1'},
            {'text': '重庆时时彩', 'value': '2'},
            {'text': '日本时时彩', 'value': '3'},
            {'text': '江西时时彩', 'value': '4'},
            {'text': '新疆时时彩', 'value': '5'},
            {'text': '广东11选5', 'value': '6'},
            {'text': '山东11选5', 'value': '7'},
            {'text': '江西11选5', 'value': '8'},
            {'text': '3D福彩', 'value': '9'},
            {'text': '体彩排列三', 'value': '10'},
            {'text': '江苏快三', 'value': '11'}
        ];

        this.lotteryDates= [
            {'text': '彩种奖期', 'value': '1'},
            {'text': '2015090951', 'value': '2'},
            {'text': '2015090950', 'value': '3'}
        ];

        this.playCategorys= [
            {'text': '游戏玩法', 'value': '1'}
        ];
        this._initDom();
        this._bindEvents();
    }
    
    QueryBets.prototype._initDom = function() {
        var temp =  '<div class="query-bets-ctrl">' +
                        '<div class="bar-zone">' +
                            '<div class="controls">' +
                                '<div class="row1">' +
                                    '<select class="lottery-type">' +
                                        this._generateSelectOptions(this.lotteryTypes) +
                                    '</select>' +
                                    '<select class="lottery-dates">' +
                                        this._generateSelectOptions(this.lotteryDates) +
                                    '</select>' +
                                    '<select class="lottery-play-category">' +
                                        this._generateSelectOptions(this.playCategorys) +
                                    '</select>' +
                                    '<ul class="award-status">' +
                                        '<li data-value="' + 0 + '"data-i18n="all"></li>' +
                                        '<li data-value="' + 1 + '"data-i18n="already-win"></li>' +
                                        '<li data-value="' + 2 + '"data-i18n="not-win"></li>' +
                                    '</ul>' +
                                '</div>' +

                                '<div class="row2">' +
                                    '<input type="text" class="starttime" data-i18n="[placeholder]start-time" />' +
                                    '<input type="text" class="endtime" data-i18n="[placeholder]end-time" />' +
                                    '<input class="search" type="text" data-i18n="[placeholder]search" />' +
                                '</div>' +
                            '</div>' +

                            '<div class="submit">' +
                                '<button data-i18n="search"></button>' +
                            '</div>' +

                            '<div class="clear"></div>' +
                        '</div>' +

                        '<div class="table-zone">' +
                            '<table id="example1" class="display" width="100%"></table>' +
                        '</div>' +                        
                    '</div>';
        
        $(temp).appendTo(this.container);

        var dataSet = [
            {
                "yhzh":       "Tiger Nixon",
                "cz":   "System Architect",
                "wf":     "$3,120",
                "czjq": "2011/04/25",
                "tznr":     "Edinburgh",
                "tzje":       "5421",
                "jj":     "Edinburgh",
                "kjhm":     "Edinburgh",
                "tzsj":     "Edinburgh",
                "zt":     "Edinburgh"
            },
            {
                "yhzh":       "Tiger Nixon",
                "cz":   "System Architect",
                "wf":     "$3,120",
                "czjq": "2011/04/25",
                "tznr":     "Edinburgh",
                "tzje":       "5421",
                "jj":     "Edinburgh",
                "kjhm":     "Edinburgh",
                "tzsj":     "Edinburgh",
                "zt":     "Edinburgh"
            },
            {
                "yhzh":       "Tiger Nixon",
                "cz":   "System Architect",
                "wf":     "$3,120",
                "czjq": "2011/04/25",
                "tznr":     "Edinburgh",
                "tzje":       "5421",
                "jj":     "Edinburgh",
                "kjhm":     "Edinburgh",
                "tzsj":     "Edinburgh",
                "zt":     "Edinburgh"
            },
            {
                "yhzh":       "Tiger Nixon",
                "cz":   "System Architect",
                "wf":     "$3,120",
                "czjq": "2011/04/25",
                "tznr":     "Edinburgh",
                "tzje":       "5421",
                "jj":     "Edinburgh",
                "kjhm":     "Edinburgh",
                "tzsj":     "Edinburgh",
                "zt":     "Edinburgh"
            }
        ];
 
        $('#example1').DataTable( {
            info: false,
            searching: false,
            lengthChange: true,
            orderClasses: false,
            data: dataSet,
            dom: '<"top"i>rt<"bottom"lp><"clear">',
            language: {
                "lengthMenu": "每页显示 _MENU_ 条记录",
                "paginate": {
                    "next":       "下一页",
                    "previous":   "上一页"
                }
            },
            columns: [
                { title: "用户账号", data: "yhzh"},
                { title: "彩种", data: "cz"},
                { title: "玩法", data: "wf"},
                { title: "彩种奖期", data: "czjq"},
                { title: "投注内容", data: "tznr"},
                { title: "投注金额", data: "tzje"},
                { title: "奖金", data: "jj"},
                { title: "开奖号码", data: "kjhm"},
                { title: "投注时间", data: "tzsj"},
                { title: "状态", data: "zt"}
            ]
        });

        $('.query-bets-ctrl .starttime, .query-bets-ctrl .endtime').datetimepicker({
            timepicker: false
        });
    };

    QueryBets.prototype._generateSelectOptions = function(data) {
        var i;
        var temp = '';
        for (i = 0; i < data.length; i++) {
            temp += '<option value ="' + data[i].value + '">' + data[i].text + '</option>';
        }
        return temp;
    };

    QueryBets.prototype._bindEvents = function() {
        $('.query-bets-ctrl .award-status').delegate('li', 'click', function(){
            $('.award-status li').removeClass('selected');
            $(this).addClass('selected');
        });
    };

    QueryBets.prototype.show = function() {
        $('.query-bets-ctrl').show();
    };  

    QueryBets.prototype.hide = function() {
        $('.query-bets-ctrl').hide();
    };  

    window.QueryBets = QueryBets;
}());
