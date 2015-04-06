
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
                name: 'date',
                index: 'date',
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
       
        cellEdit: true,
        cellsubmit : 'remote',
	cellurl : 'update.php',
        editurl: "update.php",      
         onCellSelect : function (rowid) {
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
        }

    }).jqGrid('navGrid', "#prowed2", {edit: false, add: false, del: false, search: true});
          
    $("#click").click(function () {
        var id;
         $.ajax({
                type: "POST",
                dataType: "json",
                url: "result.php",
                data: {name:1,id:2},
                success: function (msg) {
                    id = parseInt(msg["id"]) + 1;
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
            });
        
    });
    $("#clicknew").click(function(){
        //var maydata = [{id:"118",name:"hiep",date:"2015-03-11"}];
        //$("#rowed2").jqGrid('addRowData',118,maydata);    
        var id;
        var id_detail = $("#input_id").val();
         $.ajax({              
                type: "POST",
                dataType: "json",
                url: "newdata.php",
                data: {id_detail:id_detail},
                success: function (msg) {
                    id = parseInt(msg["id"]) + 1;
                    var newData = {id: id, name: msg['name']};
                    $("#rowed2").jqGrid('addRowData',id, newData);
                    
                }
            });
        
    });
var string = 'kjashfsakj fdfshjf fdsfsfs jhsfhdshjfsh jsfdsjf  fhjdsfhsdhj jdfhjsjhfs fhajkfhajkf 2015/12/06~2015/11/10 sagdajksdfsjfhjsdf 2015/05/06';


alert(split_string(string));


});


function format_date(date) {
 var parts = (date).split('/');
 return parts[0] + '”N' + parts[1] + 'ŒŽ' + parts[2] + '“ú';
}

function split_string(string){
    var string      = string.split(" ");
    var part_date        = string[string.length-3];
    var part_date_start  = part_date.substr(0,10);
    var part_date_end    = part_date.substr(11,10);
    var part_text        = string[string.length-2];
    var part_date_limit  = string[string.length-1];
    return format_date(part_date_start)+ '~' +format_date(part_date_end)+' '+ part_text+ ' ' + format_date(part_date_limit);
}

