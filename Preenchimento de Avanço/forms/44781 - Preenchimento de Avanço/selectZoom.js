function setSelectedZoomItem(selectedItem) { 


    if(selectedItem.inputId == 'FILIAL'){

        // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
        $("#CODFILIAL_FILTRO").val(selectedItem['CODFILIAL'])


    }

    if(selectedItem.inputId == 'CELULA'){

        // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
		$("#CODCELULA").val(selectedItem['CODCLIENTE'])
			
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO

        if($("#CODPRJ").val()!="" && $("#CODPRJ").val()!= null && $("#CODPRJ").val()!=undefined){
            reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+$("#CODPRJ").val()+",CELULA,"+selectedItem['CODCLIENTE'])
        }
        else{
            reloadZoomFilterValues("ORDEMPRODUCAO","CELULA,"+selectedItem['CODCLIENTE'])
        }

    }

    if(selectedItem.inputId == 'PROJETO'){

        // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
			$("#CODPRJ").val(selectedItem['CODPRJ'])
			$("#DESCRICAOIDPRJ").val(selectedItem['DESCRICAO'])
			$("#IDPRJ").val(selectedItem['IDPRJ'])
			
			console.log("NUM OS: "+selectedItem['CODPRJ']+", DESCRIÇÃO: "+selectedItem["DESCRICAO"]+", IDPRJ: "+selectedItem["IDPRJ"])

            if($("#CODCELULA").val()!="" && $("#CODCELULA").val()!= null && $("#CODCELULA").val()!=undefined){
                // RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
                reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+$("#CODPRJ").val()+",CELULA,"+selectedItem['CODCLIENTE'])
            }
            else{
                // RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
			    reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+selectedItem['CODPRJ'])
            }


        
    }

    if(selectedItem.inputId == 'ORDEMPRODUCAO'){

        // PREENCHE OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
        var codordem = $("#CODORDEM").val()
        var indice = $("#INDICE_PRD").val()
        var nivel = $("#NIVEL_PRD").val()

        if(codordem==""){

            $("#CODORDEM").val(selectedItem['CODORDEM'])

        }
        else{

            $("#CODORDEM").val(codordem+","+selectedItem['CODORDEM'])

        }
        if(indice==""){

            $("#INDICE_PRD").val(selectedItem['INDICE_FLUIG'])

        }
        else{

            $("#INDICE_PRD").val(indice+","+selectedItem['INDICE_FLUIG'])

        }
        if(nivel==""){

            $("#NIVEL_PRD").val(selectedItem['NIVEL_FLUIG'])

        }
        else{

            $("#NIVEL_PRD").val(indice+","+selectedItem['NIVEL_FLUIG'])

        }

        
    }


}


function removedZoomItem(removedItem) { 

    if(removedItem.inputId == 'FILIAL'){

        // LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A SELEÇÃO
        $("#CODFILIAL_FILTRO").val("")

    }

    if(removedItem.inputId == 'CELULA'){

        // LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODCELULA").val("")
		
		// RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		reloadZoomFilterValues("ORDEMPRODUCAO","")

        if($("#CODPRJ").val()!="" && $("#CODPRJ").val()!= null && $("#CODPRJ").val()!=undefined){
            reloadZoomFilterValues("ORDEMPRODUCAO","CODCCUSTO,"+$("#CODPRJ").val())
        }
        else{
            reloadZoomFilterValues("ORDEMPRODUCAO","")
        }

        
    }

    if(removedItem.inputId == 'PROJETO'){

        // LIMPA OS CAMPOS NECESSÁRIOS DE ACORDO COM A REMOÇÃO
		$("#CODPRJ").val("")
		$("#DESCRICAOIDPRJ").val("")
		$("#IDPRJ").val("")

        if($("#CODCELULA").val()!="" && $("#CODCELULA").val()!= null && $("#CODCELULA").val()!=undefined){
            // RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
            reloadZoomFilterValues("ORDEMPRODUCAO","CELULA,"+$("#CODCELULA").val())
        }
        else{
            // RELOAD ZOOM FILTER VALUES NAS OP'S DO PROJETO
		    reloadZoomFilterValues("ORDEMPRODUCAO","")
        }
        
    }

    if(removedItem.inputId == 'ORDEMPRODUCAO'){
        console.log("op removida:")
        console.log(removedItem)

        var codordem = $("#CODORDEM").val().split(",")

        for(var i=0; i<codordem.length; i++){

            if(codordem[i]==removedItem['CODORDEM']){

                codordem.splice(i,1)

            }

        }
        $("#CODORDEM").val(codordem.toString())


        var indice = $("#INDICE_PRD").val().split(",")
        for(var i=0; i<indice.length; i++){

            if(indice[i]==removedItem['INDICE_FLUIG']){

                indice.splice(i,1)

            }
            
        }
        $("#INDICE_PRD").val(indice.toString())


        var nivel = $("#NIVEL_PRD").val().split(",")
        for(var i=0; i<nivel.length; i++){

            if(nivel[i]==removedItem['NIVEL_FLUIG']){

                nivel.splice(i,1)

            }
            
        }
        $("#NIVEL_PRD").val(nivel.toString())

        
    }

}