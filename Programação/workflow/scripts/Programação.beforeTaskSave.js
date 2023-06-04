function beforeTaskSave(colleagueId,nextSequenceId,userList){
	
	var numProcess = getValue("WKNumProces");
	var activity   = getValue('WKNumState');
	var coligada 	= '1'
	var codfilial 	= '7'
	
    log.info("Entrei no beforeTaskSave do Processo de Programação Nível 3");
	
	var indexesAtv = hAPI.getChildrenIndexes("ATIVIDADES");
	var indexesN3 = hAPI.getChildrenIndexes("SELECIONADOSN3");
	var coligada = ""
    var filial = ""
    var codOrdem = ""
    var codAtividade = ""
    var codPessoa = ""
    var dataProgramada = ""
    var horasProgramadas = ""    	
		        	
	// PERCORRE TODOS OS REGISTROS DA TABELA DE SELECIONADOS N3
    /*for (var i = 0; i < indexesN3.length; i++) {
	
    	var codmo = hAPI.getCardValue("CODMON3___"+indexesN3[i])
    	
	    // PERCORRE TODOS OS REGISTROS DA TABELA DE PROGRAMAÇÃO
	    for (var j = 0; j < indexesAtv.length; j++) {
	
	    	coligada = hAPI.getCardValue("CODCOLIGADA___"+indexesAtv[j])
	        filial = hAPI.getCardValue("CODFILIAL___"+indexesAtv[j])
	        codOrdem = hAPI.getCardValue("OPATV___"+indexesAtv[j])
	        codAtividade = hAPI.getCardValue("CODATIVIDADEATV___"+indexesAtv[j])
	        
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA1ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA1ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA1ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA1ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA1ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	            
	            log.info("DIA1ATV foi preenchido com "+hAPI.getCardValue("DIA1ATV___"+indexesAtv[j]))
	            
	            log.info("Transformei "+hAPI.getCardValue("DIA1ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	    	
	    	// SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA2ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA2ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA2ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA2ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA2ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA2ATV foi preenchido com "+hAPI.getCardValue("DIA2ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA2ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA3ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA3ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA3ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA3ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA3ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA3ATV foi preenchido com "+hAPI.getCardValue("DIA3ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA3ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA4ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA4ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA4ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA4ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA4ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA4ATV foi preenchido com "+hAPI.getCardValue("DIA4ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA4ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA5ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA5ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA5ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA5ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA5ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA5ATV foi preenchido com "+hAPI.getCardValue("DIA5ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA5ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA6ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA6ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA6ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA6ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA6ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA6ATV foi preenchido com "+hAPI.getCardValue("DIA6ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA6ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA7ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA7ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA7ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA7ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA7ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA7ATV foi preenchido com "+hAPI.getCardValue("DIA7ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA7ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA8ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA8ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA8ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA8ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA8ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA8ATV foi preenchido com "+hAPI.getCardValue("DIA8ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA8ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA9ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA9ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA9ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA9ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA9ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA9ATV foi preenchido com "+hAPI.getCardValue("DIA9ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA9ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	        // SE DIA FOI PREENCHIDO
	        if(!(hAPI.getCardValue("DIA10ATV___"+indexesAtv[j])=="" || hAPI.getCardValue("DIA10ATV___"+indexesAtv[j])==null || hAPI.getCardValue("DIA10ATV___"+indexesAtv[j])==undefined)){
	        	
	        	dataProgramada = hAPI.getCardValue("DIA10ATVREAL___"+indexesAtv[j])
	            horasProgramadas = hAPI.getCardValue("DIA10ATV___"+indexesAtv[j])
	        	horasProgramadas = horasProgramadas.replace(",",".")
	        	
	            log.info("DIA10ATV foi preenchido com "+hAPI.getCardValue("DIA10ATV___"+indexesAtv[j]))
	            log.info("Transformei "+hAPI.getCardValue("DIA10ATV___"+indexesAtv[j])+" em "+horasProgramadas)
	            
	            // EXECUTA A PROCEDURE DE INTEGRACAO
	            execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas)
	            
	        }
	    
	        
	    }
    
    }*/
	
}

// EXECUTA A PROCEDURE
function execProcedure(numProcess,coligada,filial,codOrdem,codAtividade,codmo,dataProgramada,horasProgramadas){
	
	log.info("beforeTaskSave - Vou executar a Procedure");
	log.info("numProcess: "+numProcess+", coligada: "+coligada+", filial: "+filial+", codOrdem: "+
			codOrdem+", codAtividade: "+codAtividade+", codmo: "+codmo+
			", dataProgramada: "+dataProgramada+", horasProgramadas: "+horasProgramadas);
    
    //var c1 = DatasetFactory.createConstraint("NUMPROCESSO", numProcess, numProcess, ConstraintType.MUST);
    var c1 = DatasetFactory.createConstraint("CODCOLIGADA", coligada, coligada, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("CODFILIAL", filial, filial, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("CODORDEM", codOrdem, codOrdem, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("CODATIVIDADE", codAtividade, codAtividade, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("CODPESSOA", codmo, codmo, ConstraintType.MUST);
    var c6 = DatasetFactory.createConstraint("DATAPROGRAMADA", dataProgramada, dataProgramada, ConstraintType.MUST);
    var c7 = DatasetFactory.createConstraint("HORASPROGRAMADAS", horasProgramadas, horasProgramadas, ConstraintType.MUST);
    
    var constraints = new Array(c1,c2,c3,c4,c5,c6,c7);

    log.info("Vou executar o dataset da PROCEDURE DA PROGRAMAÇÃO")
    
    var dataset = DatasetFactory.getDataset("dsProcedureProgramacao", null, constraints, null);

    log.info("Executei o dataset da PROCEDURE")
    
}