var clearAd = {
    init: function () {
        this.addListener();
        this.getBlackList();
    },
    getBlackList: function () {
        var that = this;
        var msg = {cmdType: "get_blacklist"};
        chrome.runtime.sendMessage(msg, function (response) {
            if (response && response.statusCode === "success" && response.cmdType === "get_blacklist") {
                console.log(response.blackList);
                that.hideBlackList(response.blackList);
            }
        });
    },
    hideBlackList: function (blackList) {
        var $table = $(".olt");
        if ($table && $table.length > 0) {
            var trs = $table.find("tr");
            for (var i = 0; i < trs.length; i++) {
                if ($(trs[i]).is(":hidden")) {
                    continue;
                }

                var hrefs = $(trs[i]).find("a");
                var author = $(hrefs[1]).text();
                if (blackList[author]) {
                    $(trs[i]).hide();
                }
            }
        }
    },
    addListener: function () {
        var that = this;
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request && request.statusCode === "success") {
                switch (request.cmdType) {
                    case "get_blacklist":
                        console.log(request.blackList);
                        that.hideBlackList(request.blackList);
                        break;
                }
            }

            var respMsg = {statusCode: "success"};
            sendResponse(respMsg);
        });
    }
};

clearAd.init();
