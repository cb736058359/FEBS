$(function() {
    var settings = {
        url: ctx + "dict/list",
        pageSize: 10,
        queryParams: function(params) {
            return {
                pageSize: params.limit,
                pageNum: params.offset / params.limit + 1,
                keyy: $(".dict-table-form").find("input[name='key']").val().trim(),
                valuee: $(".dict-table-form").find("input[name='value']").val().trim(),
                tableName: $(".dict-table-form").find("input[name='tableName']").val().trim(),
                fieldName: $(".dict-table-form").find("input[name='fieldName']").val().trim(),
            };
        },
        columns: [{
                checkbox: true
            },
            {
                field: 'dictId',
                title: '字典ID',
                width: 150
            }, {
                field: 'key',
                title: '键'
            }, {
                field: 'value',
                title: '值'
            }, {
                field: 'tableName',
                title: '表名',
            }, {
                field: 'fieldName',
                title: '列名'
            }
        ]
    }
    $MB.initTable('dictTable', settings);
});

function search() {
    $MB.refreshTable('dictTable');
}

function refresh() {
    $(".dict-table-form")[0].reset();
    $MB.refreshTable('dictTable');
}

function deleteDicts() {
    var selected = $("#dictTable").bootstrapTable('getSelections');
    var selected_length = selected.length;
    if (!selected_length) {
        $MB.n_warning('请勾选需要删除的字典！');
        return;
    }
    var ids = "";
    for (var i = 0; i < selected_length; i++) {
        ids += selected[i].dictId;
        if (i != (selected_length - 1)) ids += ",";
    }

    $MB.confirm({
        text: "确定删除选中的字典？",
        confirmButtonText: "确定删除"
    }, function() {
        $.post(ctx + 'dict/delete', { "ids": ids }, function(r) {
            if (r.code == 0) {
                $MB.n_success(r.msg);
                refresh();
            } else {
                $MB.n_danger(r.msg);
            }
        });
    });
}

function exportDictExcel(){
	$.post(ctx+"dict/excel",$(".dict-table-form").serialize(),function(r){
		if (r.code == 0) {
			window.location.href = "common/download?fileName=" + r.msg + "&delete=" + true;
		} else {
			$MB.n_warning(r.msg);
		}
	});
}

function exportDictCsv(){
	$.post(ctx+"dict/csv",$(".dict-table-form").serialize(),function(r){
		if (r.code == 0) {
			window.location.href = "common/download?fileName=" + r.msg + "&delete=" + true;
		} else {
			$MB.n_warning(r.msg);
		}
	});
}