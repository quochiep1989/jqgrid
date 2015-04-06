<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="Shift_JIS">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src='js/jquery-1.11.0.min.js'></script>
        <script>
            $(document).ready(function(){
//                 $("#click").click(function(){
//                      $.ajax({
//                        type: "POST",
//                        dataType: "json",
//                        url: "data.php",
//                        data: 'name=1',
//                        success: function (msg) {
//                            document.location.href = './download.php';
//                            
//                        }
//                        //JSON.stringify(data)
//
//                    });
//
//                });
            var data = [];
            for(var i=0;i<10000;i++){
                var k = {'id':i,'name':'h'+i};
                data[i] = k;
            }
            $("#click").click(function(){
                $("#filedata").val(JSON.stringify(data));
                $("#hiddenform").submit();
            });
        });
           
        </script>
    </head>
    <body>
        <div>TODO write content</div>
        <button id="click"></button>
         <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select> 
        <form id="hiddenform" method="POST" action="csv.php">
            <input type="hidden" id="filedata" name="data" value="">
        </form>
    </body>
</html>


