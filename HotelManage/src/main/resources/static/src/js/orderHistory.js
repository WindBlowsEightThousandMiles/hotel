var orderHistory = {
    pageSize: 0,
    init: function () {
        layui.use('layer', function () {
            var index = layer.load(2, {
                offset: ['48%', '48%'],
                time: 300,
                anim: -1,
                isOutAnim: false
            });
            orderHistory.funcs.renderTable();
            // layer.close(index);
        });
    },
    funcs: {
        renderTable: function () {
            $.get(home.urls.orderHistory.getAll, {}, function (result) {
                console.log(result);
                var data = result.data;        //获取数据
                var $tbody = $("#order-history-table").children('tbody');
                orderHistory.funcs.renderHandler($tbody, data);
                var searchBtn = $('#search');
                orderHistory.funcs.bindSearchEventListener(searchBtn, $tbody);
            });
            // 数据渲染完毕
            var refreshBtn = $("#refresh");
            orderHistory.funcs.bindRefreshEventListener(refreshBtn);
            var selectBtn = $("#select-bar");
            orderHistory.funcs.bindSelectEventListener(selectBtn);
        },
        renderHandler: function ($tbody, data) {
            $tbody.empty();                  //清空表格
            data.forEach(function (e) {
                $tbody.append(
                    "<tr>" +
                    "<td>" + (e.orderno) + "</td>" +
                    "<td>" + (e.name) + "</td>" +
                    "<td>" + (e.id) + "</td>" +
                    "<td>" + (e.phone) + "</td>" +
                    "<td>" + home.funcs.timeStrDate(e.starttime) + "</td>" +
                    "<td>" + home.funcs.timeStrDate(e.endtime) + "</td>" +
                    "<td>" + (e.price) + "</td>" +
                    "<td><a href='#' class='mores' id='more-" + e.orderno + "'><i class=\"layui-icon layui-icon-list\"></i></a></td>" +
                    "</tr>")
            });
            // 数据渲染完毕
            var moreBtns = $('.mores');
            orderHistory.funcs.bindMoreEventListener(moreBtns);
        },
        bindRefreshEventListener: function (refreshBtn) {
            refreshBtn.off('click');
            refreshBtn.on('click', function () {
                layui.use('layer', function () {
                    var index = layer.load(2, {
                        offset: ['48%', '48%']
                    });
                    var time = setTimeout(function () {
                        layer.msg('刷新成功', {
                            offset: ['48%', '45%'],
                            time: 700
                        });
                        orderHistory.init();
                        layer.close(index);
                        clearTimeout(time);
                    }, 200)
                });
            })
        },
        bindSearchEventListener: function (searchBtn, $tbody) {
            searchBtn.off('click');
            searchBtn.on('click', function () {
                var select = $('#select-bar').val();
                var search = $('#search-bar').val();
                $.post(home.urls.orderHistory.getAll, {}, function (result) {
                    $tbody.empty();
                    var data = result.data;
                    for (var i = 0; i < data.length; i++) {
                        var flag = 0;
                        switch (parseInt(select)) {
                            case 0:
                                flag = (JSON.stringify(data[i].orderno).indexOf(search) !== -1);
                                break;
                            case 1:
                                flag = (JSON.stringify(data[i].name).indexOf(search) !== -1);
                                break;
                            case 2:
                                flag = (JSON.stringify(data[i].phone).indexOf(search) !== -1);
                                break;
                            case 3:
                                flag = (JSON.stringify(data[i].starttime).indexOf(search) !== -1);
                                break;
                            case 4:
                                flag = (JSON.stringify(data[i].endtime).indexOf(search) !== -1);
                                break;
                            case 5:
                                flag = (JSON.stringify(data[i].isenter).indexOf(search) !== -1);
                                break;
                        }
                        if (flag) {
                            $tbody.append(
                                "<tr>" +
                                "<td>" + (data[i].orderno) + "</td>" +
                                "<td>" + (data[i].name) + "</td>" +
                                "<td>" + (data[i].phone) + "</td>" +
                                "<td>" + home.funcs.timeStrDate(data[i].starttime) + "</td>" +
                                "<td>" + home.funcs.timeStrDate(data[i].endtime) + "</td>" +
                                "<td>" + (data[i].price) + "</td>" +
                                "<td>" + home.vars.enter[data[i].isenter] + "</td>" +
                                "<td><a href='#' class='mores' id='more-" + data[i].orderno + "'><i class=\"layui-icon layui-icon-list\"></i></a></td>" +
                                "<td><a href='#' class='edits' id='edit-" + data[i].orderno + "'><i class=\"layui-icon layui-icon-edit\"></i></a></td>" +
                                "<td><a href='#' class='deletes' id='delete-" + data[i].orderno + "'><i class=\"layui-icon layui-icon-delete\"></i></a></td>" +
                                "<td><a href='#' class='submits' id='submit-" + data[i].orderno + "'><i class=\"layui-icon layui-icon-ok-circle\"></i></a></td>" +
                                "</tr>")
                        }
                    }
                    // 数据渲染完毕
                    var editBtns = $('.edits');
                    var deleteBtns = $('.deletes');
                    orderHistory.funcs.bindEditEventListener(editBtns);
                    orderHistory.funcs.bindDeleteEventListener(deleteBtns);
                })
            })
        },
        bindMoreEventListener: function (moreBtn) {
            moreBtn.off('click');
            moreBtn.on('click', function () {
                console.log("MORE");
                var code = this.id.substr(5);
                console.log(code);
                // 获取订单信息
                $.get(home.urls.orderHistory.getOne + code, {}, function (result) {
                    console.log(result);
                    var res = result.data[0];
                    // var str = "";
                    layui.use('layer', function () {
                        // 使用订单号查找订单所包含的所有房间
                        $.get(home.urls.room.getAll + res.orderno, {}, function (allRoom) {
                            console.log(allRoom);
                            var allRoomData = allRoom.data;
                            allRoomData.forEach(function (each) {
                                // 插一行房间信息和查看按钮
                                var str = "<tr><td>" + each.roomno + "</td><td>" + home.funcs.spaceFunc(each.brand) + "</td>" +
                                    "<td><a href='#' class='rooms' id='room-" + each.roomno + "'><i class=\"layui-icon layui-icon-list\"></i></a></td></tr>";
                                orderHistory.funcs.detailHandler(str);
                                // 绑定查看按钮事件
                                var roomBtns = $(".rooms");
                                orderHistory.funcs.bindRoomsEventListener(roomBtns);
                            });
                        });
                        // console.log(str);
                        layer.open({
                            type: 1,
                            title: '查看',
                            content:
                                "<div id='pop-div-room' class='display-table'>" +
                                "<table id='detail-table' class='layui-table' borderHistory='1px'>" +
                                "<tr><th colspan='3'>订单详情</th></tr>" +
                                "<tr><td>订单号</td><td colspan='2'>" + (res.orderno) + "</td></tr>" +
                                "<tr><td>房间数量</td><td colspan='2'>" + (res.roomcount) + "</td></tr>" +
                                "<tr><td>订单价格</td><td colspan='2'>" + (res.price) + "</td></tr>" +
                                "<tr><td>姓名</td><td colspan='2'>" + (res.name) + "</td></tr>" +
                                "<tr><td>身份证号</td><td colspan='2'>" + (res.id) + "</td></tr>" +
                                "<tr><td>联系方式</td><td colspan='2'>" + (res.phone) + "</td></tr>" +
                                "<tr><td>入住时间</td><td colspan='2'>" + home.funcs.timeStrDate(res.starttime) + "</td></tr>" +
                                "<tr><td>离开时间</td><td colspan='2'>" + home.funcs.timeStrDate(res.endtime) + "</td></tr>" +
                                "<tr><td>是否会员</td><td colspan='2'>" + home.vars.member[res.member] + "</td></tr>" +
                                "<tr><td>是否入住</td><td colspan='2'>" + home.vars.enter[res.isenter] + "</td></tr>" +
                                "<tr><th colspan='3'>房间详情</th></tr>" +
                                "<tr><td>房间号</td><td>绑定车牌</td><td>查看房间信息</td></tr>" +
                                "</table>" +
                                "</div>",
                            area: ['600px', '600px'],
                            btn: ['确认'],
                            offset: 'auto',// ['5%', '35%'],
                            zIndex: 5,
                            btnAlign: 'c',
                            yes: function (index) {
                                layer.close(index)
                            }
                        });
                    });
                });
            });
        },
        bindSelectEventListener: function (selectBtn) {
            selectBtn.off('click');
            selectBtn.on('click', function () {
                var select = parseInt($('#select-bar').val());
                var element = $('#change')[0];
                console.log(element);
                if (select === 5) {
                    element.innerHTML =
                        "<select id='search-bar' class='search-bar'>" +
                        "<option value='0'>" + home.vars.enter[0] + "</option>" +
                        "<option value='1'>" + home.vars.enter[1] + "</option>" +
                        "</select>";
                }
                else {
                    element.innerHTML = "<input type='text' id='search-bar' class='search-bar' placeholder='输入关键字'>";
                }
            });
        },
        bindRoomsEventListener: function (roomBtn) {
            roomBtn.off('click');
            roomBtn.on('click', function () {
                console.log("ROOM");
                var code = this.id.substr(5);
                console.log(code);
                layui.use('layer', function () {
                    // 使用code (roomno) 检索 room-id 表中的信息
                    $.get(home.urls.roomid.getAll + code, {}, function (allRoomId) {
                        console.log(allRoomId);
                        var allRoomIdData = allRoomId.data;
                        allRoomIdData.forEach(function (each) {
                            // 插一行用户信息
                            var str = "<tr><td>" + each.roomno + "</td><td>" + each.name + "</td><td>" + each.id + "</td></tr>";
                            orderHistory.funcs.detailRoomHandler(str);
                        });
                    });
                    layer.open({
                        type: 1,
                        title: '房间' + code,
                        content:
                            "<div id='pop-div-roomid' class='display-table'>" +
                            "<table id='room-detail-table' class='layui-table' borderHistory='1px' width='70%'>" +
                            "<tr><td>房间号</td><td>姓名</td><td>身份证号</td></tr>" +
                            "</table>" +
                            "</div>",
                        area: ['500px', '400px'],
                        btn: ['确认'],
                        offset: 'auto', //['5%', '35%'],
                        zIndex: 10,
                        btnAlign: 'c',
                        success: function (layero) {
                            layer.setTop(layero); //重点2
                        },
                        yes: function (index) {
                            layer.close(index)
                        }
                    })
                })
            })
        },
        detailHandler: function (addStr) {
            var $tbody = $("#detail-table").children('tbody');
            $tbody.append(addStr);
        },
        detailRoomHandler: function (addStr) {
            var $tbody = $("#room-detail-table").children('tbody');
            $tbody.append(addStr);
        },
    }
};