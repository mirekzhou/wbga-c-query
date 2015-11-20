(function () {
    'use strict';

    var queryBets           = new QueryBets($('.content .container'));
    var queryAdditionalBets = new QueryAdditionalBets($('.content .container'));
    var queryTransfers      = new QueryTransfers($('.content .container'));

    function initI18next (lang) {
        var localePath  = '../data/i18n/';
        var browserLang = navigator.language || navigator.userLanguage;
        var storageLang = localStorage.getItem('*lang');
        var l           = lang || storageLang|| browserLang.toLowerCase();
        
        var options = {
            sendType: 'GET',
            lng: l,
            resGetPath: localePath + l + '.json',
            useLocalStorage: false,
            getAsync: false
        };
        
        if (i18n.lng() && i18n.lng() === lang) {
            return;
        }
        
        if(i18n.lng()) {
            i18n.setLng(lang, options);
        } else {
            i18n.init(options);
        }
        
        if (localStorage) {
            localStorage.setItem('*lang', l);
        }

        $('.cquery-page').i18n();
    }

    function initPlaceHolder () {
        $('input, textarea').placeholder();
    }
    
    function initIE8() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        
        if (msie > 0) {
            if (ua.substring(msie + 5, msie + 8) === '8.0') {
                $('body').addClass('ie8');
            }
        }
    }
    
    function initSelectedFeature() {
        var urlSearch = window.location.search;
        var pos = urlSearch.indexOf('?');
        var args;
        var temp;
        var featureName;
        var arr;

        if (pos === -1) {
            return;
        }

        args = urlSearch.substring(pos + 1);
        temp = args.split(';')[0];

        if (temp.length === 0) {
            return;
        }

        arr = temp.split('=');
        if (arr[0] !== 'type') {
            return;
        }
        
        featureName = arr[1];
        
        toggleFeature(featureName);
    }

    function toggleFeature(name) {
        if (name === 'bets') {
            queryAdditionalBets.hide();
            queryTransfers.hide();
            queryBets.show();
        } else if (name === 'rebets') {
            queryBets.hide();
            queryTransfers.hide();
            queryAdditionalBets.show();
        } else if (name === 'transfers') {
            queryBets.hide();
            queryAdditionalBets.hide();
            queryTransfers.show();
        }

        $('.cquery-page .toggle-feature li').removeClass('selected');
        $('.cquery-page .toggle-feature li.title-' + name).addClass('selected');
        $('input, textarea').placeholder();
    }

    function bindEvents() {
        $('.cquery-page .toggle-feature').delegate('li', 'click', function() {
            var className   = $(this).attr('class')
            var pos1        = className.indexOf('title-');
            var pos2        = className.indexOf(' ');
            var featureName;
            if (pos2 !== -1) {
                featureName = className.substring(pos1 + 6, pos2);
            } else {
                featureName = className.substring(pos1 + 6);
            }
            toggleFeature(featureName);
        });

        $('.cquery-page .go-beting').click(function() {
            window.location.href = '../../test2.html';
        });
    }

    initI18next('zh-cn');
    initPlaceHolder();
    initIE8();
    initSelectedFeature();
    bindEvents();
})();


