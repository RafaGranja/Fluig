var beforeSendValidate = function(numState,nextState){


    console.log("Entrei no before")
	
	// VARIÁVEL PARA ATIVIDADE
    var atv = numState
    
    // VARIÁVEL PARA USUÁRIO ATUAL
    var usuario = $("#USUARIOATUAL").val()
    
    console.log("atv: "+atv)
    console.log("usuario: "+usuario)
    console.log("final do before")

    var datafechamento = $("#DATAFECHAMENTO").val() 

    if(atv==25 && $("#EXCLUSIVO2").val()==0 && nextState==39){

        Swal.fire({

            title: 'Selecione o modelo',
            html:
            '  <div class="input-field col s12"> '+
            '    <select id="MODELO" name="MODELO"> '+
            '    <option value="" selected disabled>Selecione uma Opção</option> '+
            '    <option value="1">Programar Envio</option> '+
            '    <option value="2">Enviar Imediatamente</option> '+
            '    </select> '+
            '    <label>Modelo</label> '+
            '</div> ',
            icon:'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '<strong>Confirmar!</strong>',
            cancelButtonText: '<strong>Cancelar!</strong>',
            allowOutsideClick : false,
            allowEscapeKey : false,
            didOpen:function(){
        
                var elems = document.querySelectorAll('#MODELO');
                var instances = M.FormSelect.init(elems);

            }

        }).then(
            function(result){

                if(result.isConfirmed && $("#MODELO").val()!="" && $("#MODELO").val()!=null && $("#MODELO").val()!=undefined){

                    if($("#MODELO").val()==1){

                        Swal.fire({

                            title: 'Selecione a data e hora da programação',
                            html:
                            '  <div class="input-field date" id="PERIODO3"> '+
                            '      <i class="material-icons prefix">date_range</i> '+
                            '      <input type="text" id="DATA_FECHAMENTO" name="DATA_FECHAMENTO" mask="99/99/9999"/> '+
                            '      <label for="DATA_FECHAMENTO">Data Programação</label> '+
                            '  </div> '+
                            '  <div class="input-field date" id="PERIODO4"> '+
                            '      <i class="material-icons prefix">date_range</i> '+
                            '      <input type="text" id="HORA_FECHAMENTO" name="HORA_FECHAMENTO" mask="99:99"/> '+
                            '      <label for="HORA_FECHAMENTO">Hora Programação</label> '+
                            '  </div> '+
                            '<p class="caption">Emails de envio</p>'+
                            '<div class="chips"></div>',
                            icon:'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '<strong>Confirmar!</strong>',
                            cancelButtonText: '<strong>Cancelar!</strong>',
                            allowOutsideClick : false,
                            allowEscapeKey : false,
                            didOpen:function(){
        
                                minimoDate = new Date(new Date().setDate(new Date().getDate()))
                                $('#DATA_FECHAMENTO').datepicker({format:'dd/mm/yyyy',minDate:minimoDate,autoClose:true,showDaysInNextAndPreviousMonths:true,i18n:stringsBR,showClearBtn:true});
                                $('#HORA_FECHAMENTO').timepicker({autoClose:true,i18n:stringsBR2,defaultTime:'12:00',showClearBtn:true,twelveHour:false});

                                $('.chips').chips({placeholder:'Emails',secondaryPlaceholder:'Emails',
                                
                                    onChipAdd:function(a){

                                        var instance = M.Chips.getInstance(document.querySelectorAll('.chips')[0]);

                                        var teste = instance.chipsData[instance.chipsData.length-1]
                                        

                                        if(teste.tag.search(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)==-1){

                                            instance.deleteChip(instance.chipsData.length-1); 

                                            FLUIGC.toast({
                                                title: 'Erro email:',
                                                message: 'Insira um email válido',
                                                type: 'warning',
                                                timeout : 3000
                                            });

                                        }
                                    
                                    
                                    },
                                    autocompleteOptions : {

                                        data : retornaEmails(),
                                        limit: Infinity,
                                        minLength: 1,
                                    }
                                
                                
                                });

                                $(".chips").find("input").attr("autocomplete","off")
                                $(".chips").find("input").attr("list","autocompleteOff")
                                $(".chips").find("input").attr("aria-autocomplete","none")

                            },
                            willClose: function(){


                                var instance = M.Chips.getInstance(document.querySelectorAll('.chips')[0]);

                                console.log("Instance: " + instance)

                                var dest = ""

                                for (var i = 0; i < instance.chipsData.length; i++) {

                                    dest += instance.chipsData[i].tag + ";"

                                }

                                console.log(dest)
    
                                $("#DESTINATARIOS").val(dest)

                                $("#DATAFECHAMENTO").val($("#DATA_FECHAMENTO").val())
                                $("#HORAFECHAMENTO").val($("#HORA_FECHAMENTO").val())

                            }
        
        
                        }).then(function(result){
        
                            if(result.isConfirmed) {
                    
                                if($("#DATAFECHAMENTO").val() != "" && $("#DATAFECHAMENTO").val()!=undefined && $("#DATAFECHAMENTO").val()!=null){

                                    if($("#HORAFECHAMENTO").val() != "" && $("#HORAFECHAMENTO").val()!=undefined && $("#HORAFECHAMENTO").val()!=null){

                                        if($("#DESTINATARIOS").val() != "" && $("#DESTINATARIOS").val()!=undefined && $("#DESTINATARIOS").val()!=null){

                                            salvaDados()
            
                                            $("#EXCLUSIVO2").val(1)
                                            $("#PROGRAMAR").val(1)
                                            // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
                                            $("#workflowActions > button:first-child", window.parent.document).click();

                                        }
                                        else{

                                            Swal.fire({
            
                                                title: 'Valor Inválido para destinatários',
                                                icon:'error',
                                                confirmButtonColor: '#3085d6',
                                                confirmButtonText: '<strong>Ok!</strong>',
                                                allowOutsideClick : false,
                                                allowEscapeKey : false,
                                    
                                            })

                                            return false;

                                        }
            
                                    }
                                    else{
            
                                        Swal.fire({
            
                                            title: 'Valor Inválido para hora',
                                            icon:'error',
                                            confirmButtonColor: '#3085d6',
                                            confirmButtonText: '<strong>Ok!</strong>',
                                            allowOutsideClick : false,
                                            allowEscapeKey : false,
                                
                                        })
    
                                        return false;
            
                                    }
        
                                }
                                else{
        
                                    Swal.fire({
        
                                        title: 'Valor Inválido para data',
                                        icon:'error',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: '<strong>Ok!</strong>',
                                        allowOutsideClick : false,
                                        allowEscapeKey : false,
                            
                                    })

                                    return false;
        
                                }
                            
                            }
                            else{
        
                                return false
        
                            }
                    
                        })

                    }
                    else if($("#MODELO").val()==2){
                        
                        var dados = 0;

                        if(table!=null && table!=undefined && table!=""){

                            dados = table.getData().length


                        }        
            

                        if(dados > 0){

                            Swal.fire({

                                title: 'Selecione os destinatários',
                                html:
                                '<p class="caption">Emails de envio</p>'+
                                '<div class="chips"></div>',
                                icon:'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: '<strong>Confirmar!</strong>',
                                cancelButtonText: '<strong>Cancelar!</strong>',
                                allowOutsideClick : false,
                                allowEscapeKey : false,
                                didOpen:function(){

            
                                    $('.chips').chips({placeholder:'Emails',secondaryPlaceholder:'Emails',

                                        onChipAdd:function(a){

                                            var instance = M.Chips.getInstance(document.querySelectorAll('.chips')[0]);

                                            var teste = instance.chipsData[instance.chipsData.length-1]
                                            

                                            if(teste.tag.search(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)==-1){

                                                instance.deleteChip(instance.chipsData.length-1); 

                                                FLUIGC.toast({
                                                    title: 'Erro email:',
                                                    message: 'Insira um email válido',
                                                    type: 'warning',
                                                    timeout : 3000
                                                });

                                            }
                                        
                                        
                                        },
                                        autocompleteOptions : {

                                            data : retornaEmails(),
                                            limit: Infinity,
                                            minLength: 1,
                                        }
                                    
                                    
                                    });

                                    $(".chips").find("input").attr("autocomplete","off")
                                    $(".chips").find("input").attr("list","autocompleteOff")
                                    $(".chips").find("input").attr("aria-autocomplete","none")

                                },
                                willClose: function(){
    
    
                                    var instance = M.Chips.getInstance(document.querySelectorAll('.chips')[0]);
    
                                    console.log("Instance: " + instance)

                                    var dest = ""

                                    for (var i = 0; i < instance.chipsData.length; i++) {

                                        dest += instance.chipsData[i].tag + ";"
                                    }

                                    console.log(dest)
    
                                    $("#DESTINATARIOS").val(dest)
                                }
            
            
                            }).then(function(result){

                                if(result.isConfirmed && $("#DESTINATARIOS").val()!="" && $("#DESTINATARIOS").val()!=null && $("#DESTINATARIOS").val()!=undefined){

                                    salvaDados()
        
                                    $("#EXCLUSIVO2").val(1)
                                    $("#PROGRAMAR").val(0)
                                    // SIMULA O CLICK NO BOTÃO ENVIAR DA SOLICITAÇÃO
                                    $("#workflowActions > button:first-child", window.parent.document).click();

                                }
                                else{

                                    if(result.isConfirmed){

                                        Swal.fire({
        
                                            title: 'Modelo inválido',
                                            text:'Nenhum item na tabela da solicitação',
                                            icon:'error',
                                            confirmButtonColor: '#3085d6',
                                            confirmButtonText: '<strong>Ok!</strong>',
                                            allowOutsideClick : false,
                                            allowEscapeKey : false,
                                
                                        })

                                        return false;

                                    }

                                    return false;

                                }


                            })

                        }
                        else{

                            Swal.fire({
        
                                title: 'Modelo inválido',
                                text:'Nenhum item na tabela da solicitação',
                                icon:'error',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: '<strong>Ok!</strong>',
                                allowOutsideClick : false,
                                allowEscapeKey : false,
                    
                            })

                        }

                    }
                    else{

                        Swal.fire({
        
                            title: 'Modelo inválido',
                            icon:'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: '<strong>Ok!</strong>',
                            allowOutsideClick : false,
                            allowEscapeKey : false,
                
                        })

                    }

                }
                else{

                    return false;

                }
    
            }

        );

        return false;

    }
    else{
    	
    	if($("#PROGRAMAR").val()==0){
    		
        	$("#DATAFECHAMENTO").val("")
    			
    	}
    	

        salvaDados()

        return true;

    }
    
}

