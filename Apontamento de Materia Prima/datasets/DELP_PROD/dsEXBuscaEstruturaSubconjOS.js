// BUSCA OS ITENS DA ESTRUTURA PARTINDO DE UM DETERMINADO SUBCONJUNTO
function createDataset(fields, constraints, sortFields) {

	var dsEXBuscaEstruturaSubconjOS = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    var numOS = ""
    var idCriacao = ""
	var execucao = ""
	var ordenacao = ""
	var myQuery = ""
			
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	}
        	
        	if(constraints[i].fieldName == "IDCRIACAO"){
        		
        		idCriacao = constraints[i].initialValue;
        	
        	}
        	if(constraints[i].fieldName == "EXECUCAO"){
        		
        		execucao = constraints[i].initialValue;
        	
        	}
        	if(constraints[i].fieldName == "ORDENACAO"){
        		
        		ordenacao = constraints[i].initialValue;
        	
        	}
        	
        }
        
    }  

    log.info("VOU MONTAR A QUERY")
    
    if(ordenacao=="1"){
    	
    	myQuery = "SELECT "+
				  "		* ,ISNULL((SELECT cast(SUM(CASE WHEN K.QTDEEFETIVADA>=K.QTDEPLANEJADA THEN 5 ELSE K.STATUS END) as float)/cast(COUNT(*) as float) FROM KITEMORDEM K	"+  	
			" INNER JOIN KORDEMCOMPL KL ON 	KL.CODCOLIGADA=K.CODCOLIGADA 	AND KL.CODFILIAL=K.CODFILIAL 		"+
			" AND KL.CODORDEM=K.CODORDEM 	AND KL.NUMEXEC=M.EXECUCAO 			"+
			" INNER JOIN KORDEM KO ON 	KO.CODCOLIGADA=K.CODCOLIGADA 	AND KO.CODFILIAL=K.CODFILIAL "+	
			" AND KO.CODORDEM=K.CODORDEM 	"+
			" WHERE K.CODESTRUTURA=M.CODIGOPRD COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI AND K.CODCOLIGADA=M.CODCOLIGADA	"+  		
			" AND K.CODFILIAL=M.CODFILIAL AND K.CODCCUSTO=M.OS COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI AND K.STATUS != 6 AND KO.RESPONSAVEL NOT LIKE '%RETRABALHO%' ),0) STATUS_FABRI	"+
				  "FROM "+
				  "		FLUIG.DBO.Z_CRM_EX001005 M "+
				  "		RIGHT JOIN FLUIG.DBO.Z_CRM_EX001005 ML ON M.OS = ML.OS AND M.EXECUCAO = ML.EXECUCAO "+
				  "WHERE "+
				  "		(M.INDICE LIKE ML.INDICE OR M.INDICE LIKE ML.INDICE+'.%' OR (M.INDICE LIKE 'X%' AND M.INDICEANTIGO LIKE ML.INDICE+'.%')) AND M.OS='"+numOS+"' AND ML.IDCRIACAO = '"+idCriacao+"' AND M.ITEMEXCLUSIVO<>2 AND M.EXECUCAO="+execucao
    	
    } else {
    	
    	myQuery = "SELECT "+
				  "		* ,ISNULL((SELECT SUM(CASE WHEN K.QTDEEFETIVADA>=K.QTDEPLANEJADA THEN 5 ELSE K.STATUS END)/COUNT(*) FROM KITEMORDEM K	"+  	
			" INNER JOIN KORDEMCOMPL KL ON 	KL.CODCOLIGADA=K.CODCOLIGADA 	AND KL.CODFILIAL=K.CODFILIAL 		"+
			" AND KL.CODORDEM=K.CODORDEM 	AND KL.NUMEXEC=M.EXECUCAO 			"+
			" INNER JOIN KORDEM KO ON 	KO.CODCOLIGADA=K.CODCOLIGADA 	AND KO.CODFILIAL=K.CODFILIAL "+	
			" AND KO.CODORDEM=K.CODORDEM 	"+
			" WHERE K.CODESTRUTURA=M.CODIGOPRD COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI AND K.CODCOLIGADA=M.CODCOLIGADA	"+  		
			" AND K.CODFILIAL=M.CODFILIAL AND K.CODCCUSTO=M.OS COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI AND K.STATUS != 6 AND KO.RESPONSAVEL NOT LIKE '%RETRABALHO%' ),0) STATUS_FABRI	"+
				  "FROM "+
				  "		FLUIG.DBO.Z_CRM_EX001005 M "+
				  "		RIGHT JOIN FLUIG.DBO.Z_CRM_EX001005 ML ON M.OS = ML.OS AND M.EXECUCAO = ML.EXECUCAO "+
				  "WHERE "+
				  "		(M.INDICE LIKE ML.INDICE OR M.INDICE LIKE ML.INDICE+'.%' OR (M.INDICE LIKE 'X%' AND M.INDICEANTIGO LIKE ML.INDICE+'.%')) AND M.OS='"+numOS+"' AND ML.IDCRIACAO = '"+idCriacao+"' AND M.ITEMEXCLUSIVO<>2 AND M.EXECUCAO="+execucao+" "+
				  "ORDER BY CAST('/' + REPLACE(M.INDICE, '.', '/') + '/' AS HIERARCHYID)"
    	
    }
    		  
    log.info("QUERY dsEXBuscaEstruturaSubconjOS: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsEXBuscaEstruturaSubconjOS.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsEXBuscaEstruturaSubconjOS.addRow(Arr);
            
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
    
    return dsEXBuscaEstruturaSubconjOS;
	
}