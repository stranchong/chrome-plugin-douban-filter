﻿var background = {
    blackList: {},
    init: function () {
        this.addListener();
        //this.setBlackList();
    },
    sendBlackList: function () {
        var that = this;
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var msg = {cmdType: "get_blacklist", statusCode: "success", blackList: that.getBlackList()};
            chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
                //console.log(response);
            });
        });
    },
    getBlackList: function () {
        return this.blackList;
    },
    setBlackList: function () {
        var that = this;
        $.ajax({
            async: true,
            type: "GET",
            url: "http://note.youdao.com/yws/public/note/22a1a92bb13899f858fa38413675a8ef?cstk=VH9DIjHd",
            dataType: 'json',
            success: function (data) {
                if (data) {
                    var personList = data.content.split("|");
                    var thatBlackList = that.getBlackList();
                    for (var i = 0, len = personList.length; i < len; i++) {
                        thatBlackList[personList[i]] = true;
                    }
                }
            }
        });
    },
    addListener: function () {
        var that = this;
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.cmdType == "get_blacklist") {
                that.setBlackList();
                var respMsg = {cmdType: "get_blacklist", statusCode: "success", blackList: that.getBlackList()};
                sendResponse(respMsg);
            }
        });
    }
};
