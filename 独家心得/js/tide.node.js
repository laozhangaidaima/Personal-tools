(function ($) {

    var defaultConfig = {
        "rootNode": 20005
    }
    $.fn.tideNode = function (opts,selectChanged) {
        var options = $.extend(true, {}, defaultConfig, opts);
        var picker = this;

        picker.selected = function (data) {
            if (data) {
                picker.find('[_id="node_picker"]').val(data.text);
                picker.data = data;
            }
            else {
                return picker.data;
            }
        }

        $.ajax({
            type: "get",
            url: "/Api/Node/GetNode",
            success: function (data, status) {
                if (status === "success") {
                    if (typeof (data) == 'string') {
                        data = $.parseJSON(data);
                    }
                    picker.find('[_id="node_tree"]').treeview({
                        showBorder: false,
                        levels: 5,
                        data: Array.isArray(data) ? data : [data],
                        onNodeSelected: function (event, data) {
                            //picker.find('[_id="node_picker"]').val(data.text);
                            //picker.data = data;
                            picker.selected(data);
                            if (selectChanged)selectChanged(data);
                        }
                    });
                }
            },
            error: function () {
                toastr.error('Error');
            },
        });

        return this;
    };

})(jQuery);
