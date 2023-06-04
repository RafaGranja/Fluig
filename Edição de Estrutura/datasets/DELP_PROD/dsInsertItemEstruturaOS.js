// INSERE UM ITEM NA TABELA DE ESTRUTURA
function createDataset(fields, constraints, sortFields) {

	var dsInsertItemEstruturaOS = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    var idCriacao = ""
    var nivel = ""
	var indice = ""
	var numDesenho = ""
	var descricao = ""
	var posicaoDesenho = ""
	var posicao = ""
	var codTarefa = ""
	var expansor = ""
	var comporLista = ""
	var idprj = ""
	var descOS = ""
	var codigoTarefaDesc = ""
	var nomeTrfItem = ""
	var idTrfItem = "" 
	var codTrfItem = ""
	var opcao = ""
	var detalhado = ""
	var numDocDelp = ""
	var revisaoDocDelp = ""
	var codColigada = ""
	var desQtde = ""
	var totalQtde = ""
	var codFilial = ""
	var codTrfPai = ""
	var idTrfPai = ""
	var nomeTrfPai = ""
	var execucoes = 1
	var reccreatedon = ""
	var reccreatedby = ""
	var recmodifiedon = ""
	var recmodifiedby = "" 
			
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "IDCRIACAO"){
        		
        		idCriacao = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "NIVEL"){
        		
        		nivel = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "INDICE"){
        		
        		indice = constraints[i].initialValue;
        	
        	}  else if(constraints[i].fieldName == "NUMDESENHO"){
        		
        		numDesenho = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "DESCRICAO"){
        		
        		descricao = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "POSICAODESENHO"){
        		
        		posicaoDesenho = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "POSICAOINDICE"){
        		
        		posicao = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "CODTRFOS"){
        		
        		codTarefa = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "EXPANSOR"){
        		
        		expansor = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "COMPORLISTA"){
        		
        		comporLista = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "IDPRJOS"){
        		
        		idprj = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "DESCOS"){
        		
        		descOS = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "CODIGOTAREFADESC"){
        		
        		codigoTarefaDesc = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "NOMETRFITEM"){
        		
        		nomeTrfItem = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "IDTRFITEM"){
        		
        		idTrfItem = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "CODTRFITEM"){
        		
        		codTrfItem = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "OPCAO"){
        		
        		opcao = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "DETALHADO"){
        		
        		detalhado = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "CODCOLIGADA"){
        		
        		codColigada = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "CODFILIAL"){
        		
        		codFilial = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "DESQTDE"){
        		
        		desQtde = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "TOTALQTDE"){
        		
        		totalQtde = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "CODTRFPAI"){
        		
        		codTrfPai = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "IDTRFPAI"){
        		
        		idTrfPai = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "NOMETRFPAI"){
        		
        		nomeTrfPai = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "EXECUCOES"){
        		
        		execucoes = constraints[i].initialValue;
        	
        	} else if(constraints[i].fieldName == "RECCREATEDBY"){
        		
        		reccreatedby = constraints[i].initialValue;
        	
        	}   else if(constraints[i].fieldName == "RECMODIFIEDBY"){
        		
        		recmodifiedby = constraints[i].initialValue;
        	
        	}
        	
        }
        
    }  

    log.info("VOU MONTAR A QUERY")
    
    // SE É INSERÇÃO DO PRIMEIRO ITEM DA ESTRUTURA
    if(opcao==1){
    	
    	var myQuery = "INSERT INTO Z_CRM_ML001005 " +
		  " (ID,OS,IDCRIACAO,NIVEL,INDICE,NUMDESENHO,POSICAOINDICE,DESCRICAO,POSICAODESENHO,CODTRFOS,EXPANSOR,COMPORLISTA,CODIGOTAREFADESC,NOMETRFITEM,IDTRFITEM,CODTRFITEM,DETALHADO,IDPRJOS,DESCOS,CODCOLIGADA,CODFILIAL,DESQTDE,TOTALQTDE,CODTRFPAI,IDTRFPAI,NOMETRFPAI,EXECUCOES,RECCREATEDON,RECCREATEDBY,RECMODIFIEDON,RECMODIFIEDBY) "+
		  " OUTPUT inserted.IDCRIACAO "+
		  " VALUES((SELECT VALAUTOINC FROM CORPORE.dbo.GAUTOINC WHERE CODSISTEMA = 'K' AND CODAUTOINC = 'Z_CRM_ML001005')+1,'"+numOS+"',(SELECT VALAUTOINC FROM CORPORE.dbo.GAUTOINC WHERE CODSISTEMA = 'K' AND CODAUTOINC = 'IDCRIACAO')+1,'"+nivel+"','"+indice+"'," +
		  " '"+numDesenho+"','"+posicao+"','"+descricao+"','"+posicaoDesenho+"','"+codTarefa+"','"+expansor+"','"+comporLista+"','"+codigoTarefaDesc+"','"+nomeTrfItem+"'," +
		  		" '"+idTrfItem+"','"+codTrfItem+"','"+detalhado+"','"+idprj+"','"+descOS+"','"+codColigada+"','"+codFilial+"','"+desQtde+"','"+totalQtde+"','"+codTrfPai+"','"+idTrfPai+"','"+nomeTrfPai+"',"+execucoes+",GETDATE(),'"+reccreatedby+"',GETDATE(),'"+recmodifiedby+"') "+
		  //" UPDATE CORPORE.dbo.GAUTOINC SET VALAUTOINC = (SELECT MAX(CAST(ID AS int)) FROM Z_CRM_ML001005) WHERE CODSISTEMA = 'K' AND CODAUTOINC = 'Z_CRM_ML001005' "
		  " UPDATE CORPORE.dbo.GAUTOINC SET VALAUTOINC = (SELECT MAX(ID) FROM (SELECT ID FROM Z_CRM_ML001005 UNION ALL SELECT ID FROM Z_CRM_EX001005) AS MLS) WHERE CODCOLIGADA = 0 AND CODAUTOINC = 'Z_CRM_ML001005' "+
		  "	UPDATE CORPORE.dbo.GAUTOINC SET VALAUTOINC = (SELECT MAX(CAST (IDCRIACAO AS INT)) FROM (SELECT IDCRIACAO FROM Z_CRM_ML001005 UNION ALL SELECT IDCRIACAO FROM Z_CRM_EX001005) AS MLS) WHERE CODCOLIGADA = 0 AND CODAUTOINC = 'IDCRIACAO' "
    
    }
    
    // SE NÃO
    if(opcao==2){
    	
    	var myQuery = "INSERT INTO Z_CRM_ML001005 " +
		  " (ID,OS,IDCRIACAO,NIVEL,INDICE,NUMDESENHO,POSICAOINDICE,DESCRICAO,POSICAODESENHO,CODTRFOS,EXPANSOR,COMPORLISTA,CODIGOTAREFADESC,NOMETRFITEM,IDTRFITEM,CODTRFITEM,DETALHADO,IDPRJOS,DESCOS,CODCOLIGADA,CODFILIAL,DESQTDE,TOTALQTDE,CODTRFPAI,IDTRFPAI,NOMETRFPAI,EXECUCOES,RECCREATEDON,RECCREATEDBY,RECMODIFIEDON,RECMODIFIEDBY) "+
		  " OUTPUT inserted.IDCRIACAO "+
		  " VALUES((SELECT VALAUTOINC FROM CORPORE.dbo.GAUTOINC WHERE CODSISTEMA = 'K' AND CODAUTOINC = 'Z_CRM_ML001005')+1,'"+numOS+"', (SELECT VALAUTOINC FROM CORPORE.dbo.GAUTOINC WHERE CODSISTEMA = 'K' AND CODAUTOINC = 'IDCRIACAO')+1,'"+nivel+"','"+indice+"'," +
		  " '"+numDesenho+"','"+posicao+"','"+descricao+"','"+posicaoDesenho+"','"+codTarefa+"','"+expansor+"','"+comporLista+"','"+codigoTarefaDesc+"','"+nomeTrfItem+"'," +
		  		" '"+idTrfItem+"','"+codTrfItem+"','"+detalhado+"','"+idprj+"','"+descOS+"','"+codColigada+"','"+codFilial+"','"+desQtde+"','"+totalQtde+"','"+codTrfPai+"','"+idTrfPai+"','"+nomeTrfPai+"',"+execucoes+",GETDATE(),'"+reccreatedby+"',GETDATE(),'"+recmodifiedby+"') "+
		  //" UPDATE CORPORE.dbo.GAUTOINC SET VALAUTOINC = (SELECT MAX(CAST(ID AS int)) FROM Z_CRM_ML001005) WHERE CODSISTEMA = 'K' AND CODAUTOINC = 'Z_CRM_ML001005' "
  		  " UPDATE CORPORE.dbo.GAUTOINC SET VALAUTOINC = (SELECT MAX(ID) FROM (SELECT ID FROM Z_CRM_ML001005 UNION ALL SELECT ID FROM Z_CRM_EX001005) AS MLS) WHERE CODCOLIGADA = 0 AND CODAUTOINC = 'Z_CRM_ML001005' "+
  		  "	UPDATE CORPORE.dbo.GAUTOINC SET VALAUTOINC = (SELECT MAX(CAST (IDCRIACAO AS INT)) FROM (SELECT IDCRIACAO FROM Z_CRM_ML001005 UNION ALL SELECT IDCRIACAO FROM Z_CRM_EX001005) AS MLS) WHERE CODCOLIGADA = 0 AND CODAUTOINC = 'IDCRIACAO' "
		  		
    }
    
    // CORRETA
    /*var myQuery = "INSERT INTO ML001005 " +
	  			  " (ID,OS,IDCRIACAO,NIVEL,INDICE,NUMDESENHO,POSICAOINDICE,DESCRICAO,POSICAODESENHO,CODTRFOS,EXPANSOR,COMPORLISTA,IDPRJOS,DESCOS) "+
	  			  " OUTPUT inserted.IDCRIACAO "+
	  			  " VALUES((SELECT MAX(ID) FROM ML001005)+ 1,'"+numOS+"', (SELECT MAX(CAST(IDCRIACAO AS INT)) FROM ML001005 WHERE OS='"+numOS+"') + 1,'"+nivel+"','"+indice+"'," +
	  			  " '"+numDesenho+"','"+posicao+"','"+descricao+"','"+posicaoDesenho+"','"+codTarefa+"','"+expansor+"','"+comporLista+"','"+idprj+"','"+descOS+"');"*/
    
    /*var myQuery = "INSERT INTO ML001207 " +
	  			  " (ID,OS,IDCRIACAO,NIVEL,INDICE,NUMDESENHO,POSICAOINDICE,DESCRICAO,POSICAODESENHO,CODTRFOS,EXPANSOR,COMPORLISTA,IDPRJOS,DESCOS) "+
	  			  " VALUES("+id+",'"+numOS+"','"+idCriacao+"','"+nivel+"','"+indice+"'," +
	  			  " '"+numDesenho+"','"+posicao+"','"+descricao+"','"+posicaoDesenho+"','"+codTarefa+"','"+expansor+"','"+comporLista+"','"+idprj+"','"+descOS+"');"*/
    
    /*var myQuery = "INSERT INTO ML001207 " +
	  			  " (ID,OS,IDCRIACAO,NIVEL,INDICE,NUMDESENHO,POSICAOINDICE,DESCRICAO,POSICAODESENHO,CODTRFOS,EXPANSOR,COMPORLISTA,IDPRJ,DESCOS) "+
	  			  " VALUES("+id+",'"+numOS+"','"+idCriacao+"','"+nivel+"','"+indice+"'," +
	  			  " '"+numDesenho+"','"+posicao+"','"+descricao+"','"+posicaoDesenho+"','"+codTarefa+"','"+expansor+"','"+comporLista+"','"+idprj+"','"+descOS+"');"*/
				  
    log.info("QUERY dsInsertItemEstruturaOS: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsInsertItemEstruturaOS.addColumn(rs.getMetaData().getColumnName(i));
                	
                }
                
                created = true;
                
            }
            
            var Arr = new Array();
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                    
                } else {
                	
                    Arr[i - 1] = "null";
                    
                }
                
            }
            
            dsInsertItemEstruturaOS.addRow(Arr);
            
        }
        
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
    
    return dsInsertItemEstruturaOS;
	
}