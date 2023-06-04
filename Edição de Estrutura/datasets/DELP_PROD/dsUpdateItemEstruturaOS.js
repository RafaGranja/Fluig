// ATUALIZA OS DADOS DE UM DETERMINADO ITEM DA ESTRUTURA
function createDataset(fields, constraints, sortFields) {

	log.info("ENTREI NO DATASET dsUpdateItemEstruturaOS")
	
	var dsUpdateItemEstruturaOS = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    var numOS = ""
    var idCriacao = ""
   	var numDbi = ""
	var undMedida = ""
	var revisaoDbi = ""
	var revisaoDesenho = ""
	var bitola = ""
	var espessura = ""
	var largura = ""
	var massaLinear = ""
	var espRosca = ""
	var comprimento = ""
	var observacoes = ""
	var diametroExt = ""
	var diametroInt = ""
	var dataRevisao = ""
	var observacoesDesenho = ""
	var perimetroCorte = ""
	var areaPintura = ""
	var obsProcesso = ""
	var obsGeral = ""
	var material = ""
	var areaSecao = ""
	var altura = ""
	var larguraAba = ""
	var espAlma = ""
	var espAba = ""
	var tipoDesenho = ""
	var qtdeUnComp = ""
	var produtoRM = ""
	var idprd = ""
	var codigoPrd = ""
	var comporLista = ""
	var codigoTarefa = ""
	var codTrfItem = ""
	var idTrfItem = ""
	var nomeTrfItem = ""
	var numDocDelp = ""
	var revisaoDocDelp = ""
	var diametroExtDisco = ""
	var diametroIntDisco = ""
	var codTrfPai = ""
	var idtrfPai = ""
	var nomeTrfPai = ""
	var opsUnitarias = ""
	var pesoBruto = ""
	var pesoUn = ""
	var pesoUnitLiq = ""
	var pesoLiquido = ""
	var reccreatedon = " , RECCREATEDON=GETDATE() "
	var reccreatedby = ""
	var recmodifiedon = " , RECMODIFIEDON=GETDATE() "
	var recmodifiedby = ""
	var itemderetorno = ""
		
    log.info("VOU SALVAR AS CONSTRAINTS")
    	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = " WHERE OS='"+constraints[i].initialValue+"'";
        	
        	} else if(constraints[i].fieldName == "IDCRIACAO"){
        		
        		idCriacao = " AND IDCRIACAO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "NUMDBI"){
        		
        		numDbi = " SET NUMDBI='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "UNDMEDIDA"){
        		
        		undMedida = ", UNDMEDIDA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "REVISAODBI"){
        		
        		revisaoDbi = ", REVISAODBI='"+constraints[i].initialValue+"'";
        	
        	}	else if(constraints[i].fieldName == "REVISAODESENHO"){
        		
        		revisaoDesenho = ", REVISAODESENHO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "BITOLA"){
        		
        		bitola = ", BITOLA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "ESPESSURA"){
        		
        		espessura = ", ESPESSURA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "LARGURA"){
        		
        		largura = ", LARGURA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "MASSALINEAR"){
        		
        		massaLinear = ", MASSALINEAR='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "ESPROSCA"){
        		
        		espRosca = ", ESPROSCA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "COMPRIMENTO"){
        		
        		comprimento = ", COMPRIMENTO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "OBSERVACOES"){
        		
        		observacoes = ", OBSERVACOES='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "DIAMETROEXTERNO"){
        		
        		diametroExt = ", DIAMETROEXTERNO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "DIAMETROINTERNO"){
        		
        		diametroInt = ", DIAMETROINTERNO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "DATAREVISAO"){
        		
        		dataRevisao = ", DATAREVISAO='"+constraints[i].initialValue+"'";
        	
        	} else if(constraints[i].fieldName == "PRODUTORM"){
        		
        		produtoRM = ", PRODUTORM='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "IDPRD"){
        		
        		idprd = ", IDPRD='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "CODIGOPRD"){
        		
        		codigoPrd = ", CODIGOPRD='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "OBSERVACOESDESENHO"){
        		
        		observacoesDesenho = ", OBSERVACOESDESENHO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "PERIMETROCORTE"){
        		
        		perimetroCorte = ", PERIMETROCORTE='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "AREAPINTURA"){
        		
        		areaPintura = ", AREAPINTURA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "OBSPROCESSO"){
        		
        		obsProcesso = ", OBSPROCESSO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "OBSGERAL"){
        		
        		obsGeral = ", OBSGERAL='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "TIPODESENHO"){
        		
        		tipoDesenho = ", TIPODESENHO='"+constraints[i].initialValue+"'";
        	
        	}   else if(constraints[i].fieldName == "QTDEUNCOMP"){
        		
        		qtdeUnComp = ", QTDEUNCOMP='"+constraints[i].initialValue+"'";
        	
        	}	else if(constraints[i].fieldName == "AREASECAO"){
        		
        		areaSecao = ", AREASECAO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "ALTURA"){
        		
        		altura = ", ALTURA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "LARGURAABA"){
        		
        		larguraAba = ", LARGURAABA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "ESPALMA"){
        		
        		espAlma = ", ESPALMA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "ESPABA"){
        		
        		espAba = ", ESPABA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "MATERIAL"){
        		
        		material = ", MATERIAL='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "COMPORLISTA"){
        		
        		comporLista = ", COMPORLISTA='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "CODIGOTAREFADESC"){
        		
        		codigoTarefa = ", CODIGOTAREFADESC='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "CODTRFITEM"){
        		
        		codTrfItem = ", CODTRFITEM='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "IDTRFITEM"){
        		
        		idTrfItem = ", IDTRFITEM='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "NOMETRFITEM"){
        		
        		nomeTrfItem = ", NOMETRFITEM='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "NUMDOCDELP"){
        		
        		numDocDelp = ", NUMDOCDELP='"+constraints[i].initialValue+"'";
        	
        	}   else if(constraints[i].fieldName == "REVISAODOCDELP"){
        		
        		revisaoDocDelp = ", REVISAODOCDELP='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "DIAMETROEXTERNODISCO"){
        		
        		diametroExtDisco = ", DIAMETROEXTERNODISCO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "DIAMETROINTERNODISCO"){
        		
        		diametroIntDisco = ", DIAMETROINTERNODISCO='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "CODTRFPAI"){
        		
        		codTrfPai = ", CODTRFPAI='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "IDTRFPAI"){
        		
        		idtrfPai = ", IDTRFPAI='"+constraints[i].initialValue+"'";
        	
        	}  else if(constraints[i].fieldName == "NOMETRFPAI"){
        		
        		nomeTrfPai = ", NOMETRFPAI='"+constraints[i].initialValue+"'";
        	
        	} else if(constraints[i].fieldName == "PESOUNITARIO"){
        		
        		pesoUnit = ", PESOUNITARIO='"+constraints[i].initialValue+"'";
        	
        	} else if(constraints[i].fieldName == "PESOUNLIQUIDO"){
        		
        		pesoUnitLiq = ", PESOUNLIQUIDO='"+constraints[i].initialValue+"'";
        	
        	} else if(constraints[i].fieldName == "OPSUNITARIAS"){
        		
        		opsUnitarias = ", OPSUNITARIAS='"+constraints[i].initialValue+"'";
        	
        	} else if(constraints[i].fieldName == "PESOBRUTO"){
        		        		
        		pesoBruto = ", PESOBRUTO='"+constraints[i].initialValue+"'";
        	        		
        	} else if(constraints[i].fieldName == "UNITARIOPESO"){
        		        		
        		pesoUn = ", PESOUNITARIO='"+constraints[i].initialValue+"'";
        	        		
        	} else if(constraints[i].fieldName == "PESOLIQUIDO"){
        		
        		pesoLiquido = ", PESOLIQUIDO='"+constraints[i].initialValue+"'";
        	
        	}   else if(constraints[i].fieldName == "RECCREATEDBY"){
        		
        		reccreatedby = ", RECCREATEDBY='"+constraints[i].initialValue+"'";
        	
        	}   else if(constraints[i].fieldName == "RECMODIFIEDBY"){
        		
        		recmodifiedby = ", RECMODIFIEDBY='"+constraints[i].initialValue+"'";
        	
        	}	else if(constraints[i].fieldName == "ITEMDERETORNO"){
        		
        		itemderetorno = ", TIPORETORNO='"+constraints[i].initialValue+"'";
        	
        	}
        	
        }
        
    }  

    log.info("VOU MONTAR A QUERY")
    
    var myQuery = "UPDATE Z_CRM_ML001005 " +
    			  "		"+numDbi+" "+revisaoDbi+" "+revisaoDesenho+" "+undMedida+" "+
    			  " "+bitola+" "+espessura+" "+largura+" "+massaLinear+" "+espRosca+" "+diametroInt+" "+diametroExt+" "+comprimento+" "+
    			  produtoRM+" "+idprd+" "+codigoPrd+" "+qtdeUnComp+" "+
    			  dataRevisao+" "+observacoesDesenho+" "+perimetroCorte+" "+areaPintura+" "+obsProcesso+" "+obsGeral+" "+observacoes+" "+
    			  " "+tipoDesenho+" "+areaSecao+" "+altura+" "+larguraAba+" "+espAlma+" "+espAba+" "+material+" "+comporLista+" "+codigoTarefa+" "+codTrfItem+" "+
    			  idTrfItem+" "+nomeTrfItem+" "+numDocDelp+" "+revisaoDocDelp+" "+diametroExtDisco+" "+diametroIntDisco+" "+opsUnitarias+" "+pesoBruto+" "+pesoUn+" "+pesoUnitLiq+" "+pesoLiquido+" "+
    			  " "+recmodifiedon+" "+recmodifiedby+" "+itemderetorno+" "+
    			  //" "+codTrfPai+" "+idtrfPai+" "+nomeTrfPai+" "
    			  numOS+" "+idCriacao
   
    			  
    log.info("QUERY dsUpdateItemEstruturaOS: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.execute(myQuery);
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    
    } finally {
    	
        if (stmt != null) {
            
        	stmt.close();
        	
        }
        
        if (conn != null) {
            
        	conn.close();
        	
        }
        
    }
    
    return dsUpdateItemEstruturaOS;

}