// BUSCA TODA A ESTRUTURA DA EXECUÇÃO CADASTRADA DE UM DETERMINADO PROJETO (OS)
function createDataset(fields, constraints, sortFields) {

	var dsNewDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRM";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var numOS = ""
    var execucao = ""
    var codTrfEx = ""
    	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue; ;
        		
        	} 
        	if(constraints[i].fieldName == "EXECUCAO"){
        		
        		execucao = constraints[i].initialValue;
        	
        	}
        	if(constraints[i].fieldName == "CODTRFEX"){
        		
        		codTrfEx = " AND CODTRFPAI='"+constraints[i].initialValue+"' "   
        	
        	}
        
        }
        
    }  
    
    var myQuery = "SELECT *,ISNULL((SELECT cast(SUM(CASE WHEN K.QTDEEFETIVADA>=K.QTDEPLANEJADA THEN 5 ELSE K.STATUS END)as float)/cast(COUNT(*) as float) FROM KITEMORDEM K	"+  	
			" INNER JOIN KORDEMCOMPL KL ON 	KL.CODCOLIGADA=K.CODCOLIGADA 	AND KL.CODFILIAL=K.CODFILIAL 		"+
			" AND KL.CODORDEM=K.CODORDEM 	AND KL.NUMEXEC=Z.EXECUCAO 			"+
			" INNER JOIN KORDEM KO ON 	KO.CODCOLIGADA=K.CODCOLIGADA 	AND KO.CODFILIAL=K.CODFILIAL "+	
			" AND KO.CODORDEM=K.CODORDEM 	"+
			" WHERE K.CODESTRUTURA=Z.CODIGOPRD COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI AND K.CODCOLIGADA=Z.CODCOLIGADA	"+  		
			" AND K.CODFILIAL=Z.CODFILIAL AND K.CODCCUSTO=Z.OS COLLATE SQL_LATIN1_GENERAL_CP1_CI_AI AND K.STATUS != 6 AND KO.RESPONSAVEL NOT LIKE '%RETRABALHO%' ),0) STATUS_FABRI	"+
    		" FROM FLUIG.DBO.Z_CRM_EX001005 Z WHERE OS='"+numOS+"' AND EXECUCAO='"+execucao+"' AND ITEMEXCLUSIVO<>2 "+codTrfEx+" "+
				  "ORDER BY "+
				  "     CAST('/' + REPLACE(INDICE, '.', '/') + '/' AS HIERARCHYID) "
   
    log.info("QUERY dsConsultaEstruturaExecucao: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsNewDataset.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsNewDataset.addRow(Arr);
            
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
    
    return dsNewDataset;
	
}