// FUNÇÃO QUE CONSTROI O CAMPO ZOOM EXTERNO
function zoomDataSet(titulo, dataset, campos, resultFields, filterValues, type) {
	
	console.log("entrei na zoomDataSet")
	// 600, 350
	window.open("/webdesk/zoom.jsp?datasetId="+dataset+"&dataFields="+campos+"&resultFields="+resultFields+"&filterValues="+filterValues+"&type="+type+"&title="+titulo, "zoom" , "status , scrollbars=no ,left=200,width=800, height=600");
	
	console.log("finalizei a zoomDataSet")
	
}

//FUNÇÃO QUE CONSTROI O CAMPO ZOOM EXTERNO DO CAMPO CÓDIGO SUBSTITUTO
function zoomProd(componente,i) {
	
    var ccomponente = componente
	console.log("entrei na zoomProd")
    var i_=ccomponente.split("_")[1];
    var j_=ccomponente.split("_")[2];
    limparZoomProd(i_,j_);
    
	
	// PASSAGEM DE PARÂMETROS PARA FUNÇÃO ZOOM DATASET: Titulo, dataset, campos, type
	zoomDataSet('Material', 'dsMaterial', 'PRODUTO,Produto,CODUNDCONTROLE,Und','PRODUTO,IDPRD,CODIGOPRD,CODUNDCONTROLE,DESCRICAO', "", componente);
	
	console.log("finalizei a zoomProd")




    
}

function setSelectedZoomItem(selectedItem){

     // SE A OS FOI SELECIONADA

     if(selectedItem.inputId=="PROJETO"){

        console.log("OS foi selecionada...");

        reloadZoomFilterValues("ESTRUTURA", "OS,"+selectedItem['OS'])
        $("#CODCOLIGADA").val(selectedItem["CODCOLIGADA"])
        $("#CODFILIAL").val(selectedItem["CODFILIAL"])
        $("#OS").val(selectedItem['OS']);
        $("#ESTRUTURA").prop("disabled",false)

    }
    //SE A ESTRUTURA FOI SELECIONADA
    if(selectedItem.inputId=="ESTRUTURA"){

        console.log("Estrutura foi selecionada...");
        console.log($("#ESTRUTURAOS").val())
        
        if ($("#PROJETO").val()==null || $("#PROJETO").val()==undefined || $("#PROJETO").val()==""){

            Swal.fire({

                icon: 'error',
                title: 'A OS não foi selecionado',
                text: 'Favor selecionar uma OS para cadastro'

            })

            
            $("#ESTRUTURA").val("")
            reloadZoomFilterValues("ESTRUTURA", "OS,"+selectedItem['OS'])

        } else {

            console.log(selectedItem['CODESTRUTURA'])
            $("#FILTRAPRINCIPAL").prop("disabled",false)
            var estrutura = $("#ESTRUTURAOS").val()
    
            if(estrutura == "" || estrutura == null || estrutura == undefined){

                $("#ESTRUTURAOS").val(selectedItem['CODESTRUTURA'])

            }else{

                $("#ESTRUTURAOS").val(estrutura+","+selectedItem['CODESTRUTURA'])

            }
            estrutura = $("#ESTRUTURAOS").val() 
            estrutura = estrutura.replace(/,/g,';') 
            reloadZoomFilterValues("FILTRAPRINCIPAL","ESTRUTURA,"+estrutura) 

        }

    
    }
   
    //SE UM COMPONENTE PRINCIPAL FOI SELECIONADO
    if(selectedItem.inputId=="FILTRAPRINCIPAL" && $("#TEMTABELA").val()==1){

        $("#FILTRAPRINCIPALAUX").val(selectedItem['CODIGOPRD'])
        Swal.fire({
            title: 'Selecionar este campo irá recarregar os componentes principais e substitutos!',
            text: 'Tem certeza que deseja fazer isso?',
            icon: 'warning',
            showCancelButton: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#F08E8E',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(function(result){

            if (result.value) {
                console.log("Componentes principal foi selecionado...");
                console.log($("#FILTRAPRINCIPALAUX").val())
                console.log($("#TEMTABELA").val())
                if($("#TEMTABELA").val()==1){
                    construir();
                }

                if ($("#PROJETO").val()==null || $("#PROJETO").val()==undefined || $("#PROJETO").val()==""){

                    Swal.fire({

                        icon: 'error',
                        title: 'A OS não foi selecionada',
                        text: 'Favor selecionar uma OS para cadastro'

                    })

                    $("#FILTRAPRINCIPAL>option").remove()
                    $("#FILTRAPRINCIPALAUX").val("")
                    reloadZoomFilterValues("FILTRAPRINCIPAL", "ESTRUTURA,"+selectedItem['CODIGOPRD'])

                }

                else if ($("#ESTRUTURA").val()==null || $("#ESTRUTURA").val()==undefined || $("#ESTRUTURA").val()==""){

                    Swal.fire({

                        icon: 'error',
                        title: 'A Estrutura não foi selecionada',
                        text: 'Favor selecionar uma Estrutura para cadastro'

                    })

                    $("#FILTRAPRINCIPAL>option").remove()
                    $("#FILTRAPRINCIPALAUX").val("")
                    reloadZoomFilterValues("FILTRAPRINCIPAL", "ESTRUTURA,"+selectedItem['CODIGOPRD'])

                }
            } else {

                $("#FILTRAPRINCIPAL>option").remove()
                $("#FILTRAPRINCIPALAUX").val("")

            }
          })

    }
    else if(selectedItem.inputId=="FILTRAPRINCIPAL"){
        
        $("#FILTRAPRINCIPALAUX").val(selectedItem['CODIGOPRD'])
        console.log("Componentes principal foi selecionado...");
        console.log($("#FILTRAPRINCIPALAUX").val())
        console.log($("#TEMTABELA").val())

        if ($("#PROJETO").val()==null || $("#PROJETO").val()==undefined || $("#PROJETO").val()==""){

            Swal.fire({

                icon: 'error',
                title: 'A OS não foi selecionada',
                text: 'Favor selecionar uma OS para cadastro'

            })

            $("#FILTRAPRINCIPAL>option").remove()
            $("#FILTRAPRINCIPALAUX").val("")
            reloadZoomFilterValues("FILTRAPRINCIPAL", "ESTRUTURA,"+selectedItem['CODIGOPRD'])

        }

        else if ($("#ESTRUTURA").val()==null || $("#ESTRUTURA").val()==undefined || $("#ESTRUTURA").val()==""){

            Swal.fire({

                icon: 'error',
                title: 'A Estrutura não foi selecionada',
                text: 'Favor selecionar uma Estrutura para cadastro'

            })

            $("#FILTRAPRINCIPAL>option").remove()
            $("#FILTRAPRINCIPALAUX").val("")
            reloadZoomFilterValues("FILTRAPRINCIPAL", "ESTRUTURA,"+selectedItem['CODIGOPRD'])

        }
    }


        //SE UM CODIGO SUBSTITUTO FOI SELECIONADO NO CAMPO ZOOM EXTERNO
        // VARIAVEL (I) É O INCICE DO COMPONENTE PRINCIPAL E (J) É O INDICE DOS COMPONENTES SUBSTITUTOS
        // NÃO PERMITE INSERIR O MESMO CÓDIGO DUAS VEZES
    if(selectedItem.type.split("_")[0] == "material") {

        console.log("Componente substituto foi selecionado...");
        try{
        
            var i = selectedItem.type.split("_")[1];
            var j = selectedItem.type.split("_")[2];
            var erro = new Array();


            var codigo1=selectedItem.CODIGOPRD;
            console.log(codigo1);

            for (var seq = 1; seq <= j; seq++) {

                var codigo2=$("#VIEWPROD_"+i+"_"+seq).val()
                console.log(codigo2);
                if(codigo1==codigo2){

                    erro.length=0;
                    erro.push("error","Este componente já foi selecionado como substituto","Não é possível adicionar o mesmo componente duas vezes");
                    throw erro;
                    
                }
                
            }

            var coligada = $("#CODCOLIGADA").val();

            var filial = $("#CODFILIAL").val();

            var estrutura = $("#ESTRUTURAOS").val();

            var componenteprincipal = $("#IDPRDORIGEM_"+i).val();

            var componentesubstituto = selectedItem.IDPRD;

            var a1 = DatasetFactory.createConstraint("CODCOLIGADA",coligada,coligada,ConstraintType.MUST);
            var a2 = DatasetFactory.createConstraint("CODFILIAL",filial,filial,ConstraintType.MUST);
            var a3 = DatasetFactory.createConstraint("CODESTRUTURA",estrutura,estrutura,ConstraintType.MUST);
            var a4 = DatasetFactory.createConstraint("IDPRDORIGEM",componenteprincipal,componenteprincipal,ConstraintType.MUST);
            var a5 = DatasetFactory.createConstraint("IDPRD",componentesubstituto,componentesubstituto,ConstraintType.MUST);

            var constraints = new Array(a1,a2,a3,a4,a5);

            var dataset = DatasetFactory.getDataset("dsVerificaSubstituto",null,constraints,null);

            var count = dataset.values.length
            console.log(count);
            if(count!=0){

                erro.length=0;
                erro.push("error","Este componente já é um substituto","Não é possível adicionar o mesmo componente duas vezes");
                throw erro;

            }


            if(codigo1==$("#CODPRINCIPAL_"+i).text()){

                erro.length=0;
                erro.push("error","Este componente já foi cadastrado como principal","Não é possível adicionar um componente como substituto dele mesmo");
                throw erro;


            }
            $("#IDPRD_"+i+"_"+j).val(selectedItem.IDPRD);
            $("#QTDSUBSTITUTO_"+i+"_"+j).val("");
            console.log("codigoprd= "+selectedItem.CODIGOPRD)
            $("#VIEWPROD_"+i+"_"+j).val(selectedItem.CODIGOPRD);
            $("#DESCSUBSTITUTO_"+i+"_"+j).val(selectedItem.DESCRICAO);
            $("#UNDSUBSTITUTO_"+i+"_"+j).val(selectedItem.CODUNDCONTROLE);
            var fluig=confereEstruturaFluig(i,j);


            if(fluig==0){
                $("#IDPRD_"+i+"_"+j).val("");
                $("#QTDSUBSTITUTO_"+i+"_"+j).val("");
                $("#VIEWPROD_"+i+"_"+j).val("");
                $("#DESCSUBSTITUTO_"+i+"_"+j).val("");
                $("#UNDSUBSTITUTO_"+i+"_"+j).val("");
                //$("#F_IDPRD").val(selectedItem.IDPRD)
                //$("#F_CODIGOPRD").val(selectedItem.CODIGOPRD)
            }else{
                return 1;
            }
        }
        catch(erro){

            Swal.fire({

                icon: erro[0],
                title: erro[1],
                text: erro[2]

            })

        }
    }
    
}



//FUNÇÃO QUE É ACINONADA QUANDO UM ELEMENTO ZOOM È REMOVIDO
function removedZoomItem(removedItem){

    //SE A OS FOI REMOVIDA
    if(removedItem.inputId=="PROJETO" && $("#TEMTABELA").val()==1){

        Swal.fire({
            title: 'Remover este campo irá limpar os componentes principais e substitutos!',
            text: 'Tem certeza que deseja fazer isso?',
            icon: "warning",
            showCancelButton: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#F08E8E',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(function(result){

            if (result.value) {

                $("#OS").val("")
                console.log("OS foi removida...");
                $("[name='FORMCOMPONENTES']").empty();
                $("#ESTRUTURA>option").remove()
                $("#FILTRAPRINCIPAL>option").remove()
                $("#CODCOLIGADA").val("")
                $("#CODFILIAL").val("")
                reloadZoomFilterValues("ESTRUTURA", "OS,"+"")
                reloadZoomFilterValues("FILTRAPRINCIPAL", "ESTRUTURA,"+removedItem['CODESTRUTURA'])    
                $("#ESTRUTURA").prop("disabled", true)
                $("#FILTRAPRINCIPAL").prop("disabled",true)
                var tabela=document.getElementById("TABLECOMPONENTES");
                tabela.style.display='none';
                //Swal.fire('Componentes removidos!', '', 'success')
                $("#TEMTABELA").val(0);

            } else {

                console.log($("#OS").val())
                setZoomData("PROJETO",$("#OS").val())
                //window["PROJETO"].setValue($("#OS").val());

            }
          })

        
        
    }
    else if(removedItem.inputId=="PROJETO"){

        $("#OS").val("")
        console.log("OS foi removida...");
        $("[name='FORMCOMPONENTES']").empty();
        $("#ESTRUTURA>option").remove()
        $("#FILTRAPRINCIPAL>option").remove()
        $("#CODCOLIGADA").val("")
        $("#CODFILIAL").val("")
        reloadZoomFilterValues("ESTRUTURA", "OS,"+"")
        reloadZoomFilterValues("FILTRAPRINCIPAL", "ESTRUTURA,"+removedItem['CODESTRUTURA'])    
        $("#ESTRUTURA").prop("disabled", true)
        $("#FILTRAPRINCIPAL").prop("disabled",true)
        var tabela=document.getElementById("TABLECOMPONENTES");
        tabela.style.display='none';
        $("#TEMTABELA").val(0);

    }

    //SE A ESTRUTURA FOI REMOVIDA
    if(removedItem.inputId=="ESTRUTURA" && $("#TEMTABELA").val()==1){

        console.log(removedItem)

        Swal.fire({
            title: 'Remover este campo irá limpar os componentes principais e os substitutos!',
            text: 'Tem certeza que deseja fazer isso?',
            icon: 'warning',
            showCancelButton: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#F08E8E',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(function(result){

            // mexer aqui
            if (result.value) {

                
                var estrutura= $("#ESTRUTURAOS").val()
                estrutura= estrutura.split(",")

                console.log("estrutura: ")
                console.log(estrutura)

            

                for(var i=0; i<estrutura.length; i++){
                    if(estrutura[i]==removedItem['CODESTRUTURA']  || estrutura[i] == removedItem.text){
                        console.log("vou remover a estrutura: "+estrutura[i])
                        estrutura.splice(estrutura.indexOf(estrutura[i]),1)

                    }
                    

                }
                
                estrutura =  estrutura.toString()
                if(estrutura == null || estrutura == undefined || estrutura == "" ){
                    $("#FILTRAPRINCIPAL").prop("disabled",true)
                } else {
                    $("#FILTRAPRINCIPAL").prop("disabled",false)
                }
                console.log("estrutura: "+estrutura)
                $("#ESTRUTURAOS").val(estrutura);
                console.log("Estrutura foi removida...");
                $("[name='FORMCOMPONENTES']").empty();
                estrutura = $("#ESTRUTURAOS").val() 
                estrutura = estrutura.replace(/,/g,';') 
                reloadZoomFilterValues("FILTRAPRINCIPAL","ESTRUTURA,"+estrutura) 
                $("#FILTRAPRINCIPAL>option").remove()   
                var tabela=document.getElementById("TABLECOMPONENTES");
                tabela.style.display='none';
                $("#TEMTABELA").val(0);
            }

            else {


                var estrutura = $("#ESTRUTURAOS").val() 
                estrutura = estrutura.split(',')
                console.log(removedItem)

                window['ESTRUTURA'].clear()
                window['ESTRUTURA'].setValues(estrutura)


                console.log("estrutura: ")
                console.log(estrutura)
            
            }

        })

    }
    else if(removedItem.inputId=="ESTRUTURA" ){
        var estrutura= $("#ESTRUTURAOS").val()
        estrutura= estrutura.split(",")

        console.log("estrutura: ")
        console.log(estrutura)

       

        for(var i=0; i<estrutura.length; i++){
            if(estrutura[i]==removedItem['CODESTRUTURA'] || estrutura[i] == removedItem.text){

                console.log("vou remover a estrutura: "+estrutura[i])
                estrutura.splice(estrutura.indexOf(estrutura[i]),1)

               
            }

        }

     
        estrutura=  estrutura.toString()
        if(estrutura == null || estrutura == undefined || estrutura == "" ){
            $("#FILTRAPRINCIPAL").prop("disabled",true)
        } else {
            $("#FILTRAPRINCIPAL").prop("disabled",false)
        }
        console.log("estrutura: "+estrutura)
        $("#ESTRUTURAOS").val(estrutura);
        console.log("Estrutura foi removida...");
        $("[name='FORMCOMPONENTES']").empty();
        estrutura = $("#ESTRUTURAOS").val() 
        estrutura = estrutura.replace(/,/g,';') 
        reloadZoomFilterValues("FILTRAPRINCIPAL","ESTRUTURA,"+estrutura) 
        $("#FILTRAPRINCIPAL>option").remove()   
        var tabela=document.getElementById("TABLECOMPONENTES");
        tabela.style.display='none';
        $("#TEMTABELA").val(0);
        
        // ate aqui 

    }

    //SE O CODIGO PRINCIPAL FOI REMOVIDO
    if(removedItem.inputId.indexOf("FILTRAPRINCIPAL")!="-1" && $("#TEMTABELA").val()==1){

        Swal.fire({
            title: 'Remover este campo irá recarregar os componentes principais e limpar os substitutos!',
            text: 'Tem certeza que deseja fazer isso?',
            icon: 'warning',
            showCancelButton: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#F08E8E',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(function(result) {

            if (result.value) {

                $("#FILTRAPRINCIPALAUX").val("");
                console.log("Componente principal foi removido...");
                construir();
                
            }
            else {

                console.log($("#FILTRAPRINCIPALAUX").val())
                setZoomData("FILTRAPRINCIPAL",$("#FILTRAPRINCIPALAUX").val())
                window["FILTRAPRINCIPAL"].setValue($("#FILTRAPRINCIPALAUX").val());

            }

          })

    }
    else if(removedItem.inputId=="FILTRAPRINCIPAL"){

        $("#FILTRAPRINCIPALAUX").val("");
        console.log("Componente principal foi removido...");
        construir();
    }



}

//FUNÇÃO QUE CONFERE SE O ITEM ESTÀ NA ESTRUTURA DO FLUIG
function confereEstruturaFluig(i,j){

    var os=$("#OS").val();
    var principal=$("#CODPRINCIPAL_"+i).text();
    var prioridade=$("#PRIORIDADEPRINCIPAL_"+i).text();
    var unidade= $("#UNDSUBSTITUTO_"+i+"_"+j).val();
    var substituto=$("#VIEWPROD_"+i+"_"+j).val();
    var estrutura=$("#ESTRUTURAOS").val();

    var a0 = DatasetFactory.createConstraint("ESTRUTURA",estrutura,estrutura,ConstraintType.MUST);
    var a1 = DatasetFactory.createConstraint("OS",os,os,ConstraintType.MUST);
    var a2 = DatasetFactory.createConstraint("CODIGOPRINCIPAL",principal,principal,ConstraintType.MUST);
    var a3 = DatasetFactory.createConstraint("PRIORIDADE",prioridade,prioridade,ConstraintType.MUST);
    var a4 = DatasetFactory.createConstraint("CODIGOUNIDADE",unidade,unidade,ConstraintType.MUST);
    var a5 = DatasetFactory.createConstraint("CODIGOSUBSTITUTO",substituto,substituto,ConstraintType.MUST);


    var constraints = new Array(a0,a1,a2,a3,a4,a5);

    var dataset = DatasetFactory.getDataset("dsVerificaSubstitutoFluig",null,constraints,null);

    var count = dataset.values.length

    console.log(count);

    if(count<=0){
        Swal.fire({

            icon: 'error',
            title: 'Este código não está cadastrado na estrutura do Fluig',
            text: 'Primeiramente adicione este componente como substituto na estrutura para depois cadastrar neste formulário'

      })
      return 0;
    }else{
        return 1;
    }

}

//SETA VALOR EM CAMPO ZOOM
function setZoomData(instance, value){

    window[instance].setValue(value);

}
