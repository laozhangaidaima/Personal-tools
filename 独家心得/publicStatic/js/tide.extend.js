(function ($) {
    $.extend($.fn.bootstrapSwitch.defaults, {
        "size": 'mini',
        "onColor": 'primary',
        "animate": false
    });

    $.extend($.fn.dataTable.defaults, {
        "searching": true, //是否允许Datatables开启本地搜索
        "lengthChange": false, //是否允许用户改变表格每页显示的记录数
        "lengthMenu": [10, 15, 25, 50],
        "info": true, //控制是否显示表格左下角的信息
        "ordering": true, //是否允许Datatables开启排序
        "autoWidth": false, //控制Datatables是否自适应宽度
        "processing": true, //是否显示处理状态(排序的时候，数据很多耗费时间长的话，也会显示这个)
        "paging": true, //是否开启本地分页
        "pageLength": 15, //每页多少条数据
        "pagingType": "full_numbers",
        "dom": 'rt<"row"<"col-xs-4"i><"col-xs-8 pull-right"p>>',
        "language": {
            "search": "", //搜索框的提示信息
            "searchPlaceholder": "查找", //搜索框(input)的placeholder属性
            "lengthMenu": "每页 _MENU_ 条", //'每页显示记录'的下拉框的提示信息
            "infoFiltered": "",//前端搜索提示，" - 从 _MAX_ 记录中搜索"
            "paginate": {
                "first": "首页",
                "last": "末页",
                "next": ">",
                "previous": "<"
            }, //分页信息显示所需的字符串的所有信息
            "info": "第 _PAGE_  / _PAGES_ 页, 总 _TOTAL_ 条记录", //表格的page分页所需显示的所有字符串
            "infoEmpty": "没有数据", //当表格没有数据时，汇总地方显示的字符串
            "emptyTable": "当前没有可用数据", //当表格没有数据时，表格所显示的字符串
            "processing": "正在请求数据...", //当table处理用户处理信息时，显示的信息字符串
            "zeroRecords": "未找到匹配结果" //当搜索结果为空时，显示的信息
        }
    });

    $.extend({ tide: {} });

    $.extend($.tide, {

        /*
        * 打开侧边栏
        * mask: true:打开遮罩; false:不使用遮罩
        * width: 侧边栏宽度
        * title: 标题
        * body: 内容
        */
        openSidebar: function (options) {
            if (options.mask) {
                var mask = $('<div class="mask"></div>')
                    .on('click', $.tide.closeSidebar);

                $('body').append(mask);

                mask.fadeIn();
            }
            var sidebar = $('#sidebar');
            sidebar.css('right', '0px');
            sidebar.css('z-index', '2000');

            if (options.width > 0) {
                sidebar.css('width', options.width + 'px');
            }

            if (options.title) {
                sidebar.find('[_id="title"]').text(options.title);
            }

            var body = sidebar.find('[_id="body"]').empty()
                .append(options.body)
                .slimScroll({
                    height: ($('body').height() - 50) + 'px'
                });

            sidebar.find('[_id="cancel"]')
                .unbind("click")
                .click(function () {
                    $.tide.closeSidebar();
                });
        },

        /*
        * 关闭侧边栏
        */
        closeSidebar: function () {
            var sidebar = $('#sidebar');
            sidebar.css('width', '400px')
                .css('right', -400);

            $('.mask').fadeOut().remove();
        },

        /*
        * 打开模态框
        */
        openModal: function (options) {
            var modal = $('#modal');
            modal.css('z-index', '3000');
            var content = modal.find('.modal-dialog')
                .removeClass()
                .addClass('modal-dialog');
            if (options.width) {
                content.css('width', options.width + 'px');
            }
            else if (options.size == 'big') {
                content.addClass('modal-lg');
            }
            else {
                content.addClass('modal-sm');
            }

            if (options.title) {
                modal.find('[_id="title"]').text(options.title);
            }
            modal.find('[_id="modal_body"]').empty()
                .append(options.body);

            modal.find('[_id="submit"]')
                .unbind("click")
                .click(function () {
                    modal.modal('hide');

                    options.submit();
                });

            modal.find('[_id="cancel"]')
                .unbind("click")
                .click(function () {
                    $.tide.closeModal();
                });

            modal.modal('show');
        },

        /*
        * 关闭模态窗
        */
        closeModal: function () {
            var modal = $('#modal');

            modal.modal('hide');
        },
        /*
         * 打开加载窗口
         */
        openLoading: function (options) {
            var modal = $('#loading').modal({ backdrop: 'static', keyboard: false });
            modal.css('z-index', '3000');
            var content = modal.find('.modal-dialog')
                .removeClass()
                .addClass('modal-dialog');
            if (options.width) {
                content.css('width', options.width + 'px');
            }
            else if (options.size == 'big') {
                content.addClass('modal-lg');
            }
            else {
                content.addClass('modal-sm');
            }

            if (options.title) {
                modal.find('[_id="title"]').text(options.title);
            }
            modal.find('[_id="modal_body"]').empty()
                .append(options.body);
            

           

            modal.modal('show');
        },

        /*
        * 关闭加载窗口
        */
        closeLoading: function () {
            var modal = $('#loading');

            modal.modal('hide');
        },
        /*
        * 初始化一个仪表盘
        */
        initGaugeChart: function (element, title, data) {
            var chart = echarts.init(element);
            chart.setOption({
                title: {
                    text: title,
                    y: 'bottom',
                    x: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 13
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{c}%"
                },
                series: [
                    {
                        name: title,
                        type: 'gauge',
                        splitNumber: 5,
                        radius: '90%',
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length: 20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        title: {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 12,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            show: false
                        },
                        data: [data]
                    }
                ]
            });
        },

        /*
        * 显示一个成功对话框
        */
        notifySuccess: function (msg) {
            $.notify({
                message: msg
            }, {
                type: 'success',
                placement: {
                    from: "top",
                    align: "center"
                }
            });
        },

        /*
        * 显示一个错误提示框
        */
        notifyError: function (msg) {
            $.notify({
                message: msg
            }, {
                type: 'danger',
                placement: {
                    from: "top",
                    align: "center"
                }
            });
        },

        /*
        * 显示一个信息提示框
        */
        notifyInfo: function (msg) {
            $.notify({
                message: msg
            }, {
                type: 'info',
                placement: {
                    from: "bottom",
                    align: "rigth"
                }
            });
        },

        /*
        * 显示一个告警提示框
        */
        notifyWarning: function (msg) {
            $.notify({
                message: msg
            }, {
                type: 'warning',
                placement: {
                    from: "bottom",
                    align: "rigth"
                }
            });
        },

        /*
        * 运行一个POST请求
        * url: 请求地址
        * data: 请求参数
        * success: 成功响应回调，可以是一个function或string，
        *   function(data): 一个响应值参数，如果返回string，则会显示一个成功通知
        *   string: 显示一个成功通知
        * error: 失败响应回调，可以是一个function或string，
        *   function(code, error): 一个错误码，一个错误描述，如果返回string，则会显示一个失败通知
        *   string: 显示一个失败通知
        */
        post: function (url, data, success, error) {
            $.post(url, data, function (data, status) {
                var msg = '';
                if ('success' == status) {
                    if (data && data.code == 100) {
                        if (typeof (success) === 'function') {
                            msg = success(data.content);
                            if (typeof (msg) === 'string') {
                                $.tide.notifySuccess(msg);
                            }
                        }
                        else if (typeof (success) === 'string') {
                            $.tide.notifySuccess(success);
                        }

                        return;
                    }
                    else {
                        msg = data.msg;
                    }
                }

                if (typeof (error) === 'function') {
                    msg = error(data.code, msg);
                    if (typeof (msg) === 'string') {
                        $.tide.notifyError(msg);
                    }
                }
                else if (typeof (error) === 'string') {
                    $.tide.notifyError(error + msg);
                }
                else {
                    $.tide.notifyError(msg);
                }
            });
        },

        /*
        * 返回
        */
        back: function () {
            window.history.back();
        },

        /*
        * 获取参数值
        */
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },

        /*
        * 获取URL地址中的ID
        * url地址应类似：http://localhost:57563/Monitor/Target/Detail/00AC6277-3B48-4663-BF83-9CDBFCB79207
        */
        getUrlId: function () {
            var href = window.location.href;
            var index = href.lastIndexOf('/');

            if (index > 0) {
                var endIndex = href.lastIndexOf('?');
                if (endIndex > 0) {
                    return href.substr(index + 1, endIndex - index - 1);
                }
                else {
                    return href.substr(index + 1);
                }
            }

            return '';
        },

        /*
        * 将返回的数据转换为绘图组件可使用的格式
        */
        toChartDatas: function (result) {
            var series = [];

            for (var i = 0; i < result.records.length; i++) {
                var record = result.records[i];
                var data = [];
                _.each(record.datas, function (value, index) {
                    var time = new Date((result.start + index * result.interval) * 1000);
                    if (value < 0) {
                        data.push({
                            name: time.toString(),
                            value: 'undefined'
                        });
                    }
                    else {
                        data.push({
                            name: time.toString(),
                            value: [
                                moment(time).format('YYYY-MM-DD HH:mm'),
                                value
                            ]
                        });
                    }
                });

                series.push({
                    name: record.key,
                    data: data
                });
            }

            return series;
        }
    });
})(jQuery);