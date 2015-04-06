
$(document).ready(function () {

    $("#rowed2").jqGrid({
        url: "data.php",
        datatype: "json",
        height: "auto",
        method: "POST",
        colNames: ["", "Id", "Name", "Date", ""],
        colModel: [
            {name: "link", width: 120},
            {name: "id", width: 120, key: true, hidden: true},
            {name: "name", width: 300, editable: true, editrules: {required: true}},
            {
                name: 'dateStart',
                index: 'dateStart',
                formatter: 'date',
                width: 200,
                sortable: false,
                align: 'right',
                editable: true,
                editoptions: {
                    size: 20,
                    maxlengh: 10,
                    dataInit: function (element) {
                        $(element).datepicker({
                            dateFormat: 'yy-mm-dd',
                            constrainInput: false,
                            showOn: 'button',
                            buttonText: '...'
                        });
                    }
                },
                formatoptions: {
                    newformat: "Y-m-d"
                }
            },
            {name: 'act', index: 'act', width: 270, sortable: false}

        ],
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: true,
            cell: "cell",
            id: "id",
            subgrid: {
                root: "rows",
                repeatitems: true,
                cell: "cell"
            }
        },
        caption: "Detail",
        rowNum: 50,
        pager: '#prowed2',
        loadonce: true,
        sortable: true,
        sortname: "id",
        sortorder: "desc",
        viewrecords: true,
        gridComplete: function () {
            var ids = jQuery("#rowed2").jqGrid('getDataIDs');

            for (var i = 0; i < ids.length; i++) {
                var cl = ids[i];
                be = "<input style='height:22px;width:40px;' type='button' value='Edit' onclick=\"jQuery('#rowed2').jqGrid('editRow','" + cl + "');\"  />";
                se = "<input style='height:22px;width:40px;' type='button' value='Save' onclick=\"jQuery('#rowed2').jqGrid('saveRow','" + cl + "');\"  />";
                ce = "<input style='height:22px;width:50px;' type='button' value='Cancel' onclick=\"jQuery('#rowed2').jqGrid('restoreRow','" + cl + "');\" />";
                link = "<a href='http://localhost/taiyo/index.php?id=" + cl + "'>ClickToId" + cl + "</a>";
                jQuery("#rowed2").jqGrid('setRowData', ids[i], {act: be + se + ce});
                jQuery("#rowed2").jqGrid('setRowData', ids[i], {link: link});
            }
        },
        onSelectRow: function (rowid) {
            var id ;
           
            saveparameters = {
                    "successfunc" : null,
                    "url" : "add.php",
                    "extraparam" : {},
                    "aftersavefunc" : null,
                    "errorfunc": null,
                    "afterrestorefunc" : null,
                    "restoreAfterError" : true,
                    "mtype" : "POST"
            };

            jQuery("#rowed2").jqGrid('saveRow',rowid,  saveparameters);
        },
        editurl: "update.php"

    }).jqGrid('navGrid', "#prowed2", {edit: true, add: true, del: true, search: true},
    {
        height: 400,
        width: 420,
        savekey: [true, 13],
        navkeys: [true, 38, 40],
        reloadAfterSubmit: false,
        jqModal: false,
        closeOnEscape: true,
        url: 'update.php',
        bottominfo: "Fields marked with (*) are required"

    }, // edit options

    {
        height: 360,
        width: 400,
        datatype: "json",
        savekey: [true, 13],
        navkeys: [true, 38, 40],
        reloadAfterSubmit: false,
        jqModal: false,
        closeOnEscape: true,
        url: 'add.php',
        userDataOnFooter: true,
        jsonReader: {
            userdata: {id: 0}
        },
        position: 'last',
        bottominfo: "Fields marked with (*) are required",
        onclickSubmit: function (options, postData) {
            var lastId = $("#rowed2").find(">tbody>tr.jqgrow").filter(":first").attr("id");
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "result.php",
                data: 'name=1',
                success: function (msg) {
                    postData.id = parseInt(msg[0]["id"]) + 1;
                }
                //JSON.stringify(data)

            });

            //location.reload();

        }
    }, // add options 




    {
        height: 360,
        width: 400,
        savekey: [true, 13],
        navkeys: [true, 38, 40],
        reloadAfterSubmit: false,
        jqModal: false,
        closeOnEscape: true,
        url: 'delete.php',
        bottominfo: "Fields marked with (*) are required"}, // delete options 
    {
        closeOnEscape: true}, // search options 
    {
        navkeys: [true, 38, 40],
        height: 400,
        jqModal: false,
        closeOnEscape: true}
    ).jqGrid(//#pager
            'navButtonAdd', "#prowed2", {
                caption: "Excel export",
                buttonicon: "ui-icon-arrowthickstop-1-s",
                onClickButton: null,
                position: "first",
                title: "Excel export",
                cursor: "pointer",
                onClickButton: function () {
                    window.location = "http://localhost/taiyo1/csv.php";
                }
            });
    $("#click").click(function () {
        var id;
         $.ajax({
                type: "POST",
                dataType: "json",
                url: "result.php",
                data: 'name=1',
                success: function (msg) {
                    id = parseInt(msg[0]["id"]) + 1;
                    parameters =
                {
                    rowID: id,
                    initdata: {},
                    position: "first",
                    useDefValues: false,
                    useFormatter: false,
                    addRowParams: {extraparam: {}}
                };
                jQuery("#rowed2").jqGrid('addRow', parameters);
                }
                //JSON.stringify(data)

            });
        
    });

});

