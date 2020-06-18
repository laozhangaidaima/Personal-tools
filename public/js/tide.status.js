(function ($) {
    $.getStatus = function (status) {
        var name, color, colorStyle, icon;

        if (1 == status) {
            name = '正常';
            color = '#00a65a';
            colorStyle = 'btn-success';
            icon = 'glyphicon-ok-sign';
        }
        else if (2 == status) {
            name = '信息';
            color = '#5bc0de';
            colorStyle = 'btn-info';
            icon = 'glyphicon-info-sign';
        }
        else if (3 == status) {
            name = '警告';
            color = '#f0ad4e';
            colorStyle = 'btn-warning';
            icon = 'glyphicon-exclamation-sign';
        }
        else if (4 == status) {
            name = '异常';
            color = '#d9534f';
            colorStyle = 'btn-danger';
            icon = 'glyphicon-remove-sign';
        }
        else {
            name = "--";
            color = '#ccc';
            colorStyle = 'btn-default';
            icon = 'glyphicon-question-sign';
        }

        return { "name": name, "color": color, 'icon': icon };
    };
    
    $.fn.statusBtn = function (status, title) {
        var tmp = $.getStatus(status);
        if (!title) {
            title = tmp.name;
        }

        var html = '<div class="form-inline" data-toggle="tooltip" data-placement="right" title="' + title + '">';
        //html = '<div class="btn btn-xs lg ' + tmp.color + '" data-toggle="tooltip" data-placement="right" title="' + title + '" _id="statusBtn">';
        html += '<i class="glyphicon ' + tmp.icon + '" style="color:' + tmp.color + ';" aria-hidden="true" ></i> ';
        //html += '</div>';
        html += tmp.name;
        html += '</div>';

        this.append(html);

        return this;
    };
})(jQuery);