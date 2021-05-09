$(document).ready(function () {
    var formNoticias = $("#form-noticias");

    formNoticias.on("submit", function() {
        try {
            var json = recordFromForm(formNoticias);
            addDataTable(json);
        } catch (e) {
            console.error(e);            
        }
        
        return false;
    });
    
    function recordFromForm(form) {
        var inputs = form.find('input[type="text"], textarea');
        var json = "";

        inputs.each(function(idx, input){
            var name = $(input).attr("name");
            var value = $(input).val();

            if(json !== ""){
                json += ",";
            }

            json += `"${name}": "${ value.trim() }"`;
        });
        
        json = `{${json}}`;

        return JSON.parse(json);
    }

    function addDataTable(noticiajson) {
        var tbody = $("#table-noticias tbody");
        var tr = $("<tr></tr>");
        var tdTitulo = $("<td></td>");
        var tdIntroducao = $("<td></td>");
        var tdRemover = $("<td></td>");

        tdTitulo.text(noticiajson["titulo"]);
        tdIntroducao.text(["introducao"]);

        var remover = $('<a href="#"></a>');
        remover.html('<i class="bi-trash"><i/>Remover');
        remover.addClass("btn btn-sn btn-danger");
        tdRemover.append(remover);

        remover.on("click", function () {
            removeRow(tr);
        });

        tr.append(tdTitulo, tdIntroducao, tdRemover);
        tbody.append(tr);

        showRowCounts();
    }

    function removeRow(tr) {
        tr.remove();
        showRowCounts();
    }

    function showRowCounts() {
        var trs = $("#table-noticias tbody tr");
        var  total = trs.length;

        $("#table-noticias tfoot tr td span").text(total);
    }
});
