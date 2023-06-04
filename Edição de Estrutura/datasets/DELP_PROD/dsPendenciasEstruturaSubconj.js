// BUSCA TODA A ESTRUTURA DETALHADA COM ALGUMS INFORMAÇÕES DE COMPONENTES E PROCESSOS
function createDataset(fields, constraints, sortFields) {

	var dsNewDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var numOS = ""
    var execucao = ""
    var indicePai = ""
    var myQuery = ""
    
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue; 
        		
        	} 
        	
			if(constraints[i].fieldName == "EXECUCAO"){
			        		
        		execucao = constraints[i].initialValue; 
        		
        	} 

			if(constraints[i].fieldName == "INDICEPAI"){
				
				indicePai = " AND (E.INDICE='"+constraints[i].initialValue+"' OR E.INDICE LIKE '"+constraints[i].initialValue+".%') " 
				
			} 
			
			if(constraints[i].fieldName == "IDCRIACAO"){
	
				idCriacao = constraints[i].initialValue; 
				
			} 
			        	
        }
        
    }  
    
    if(execucao!=""){
    	
    	myQuery = 	  "SELECT " +
					  "		E.*, " +
					  "		CASE WHEN (SELECT TOP 1 IDCRIACAOPROCESSO FROM Z_CRM_EX001021 WHERE OSPROCESSO=E.OS AND IDCRIACAOPROCESSO=E.IDCRIACAO) IS NULL AND E.OS NOT IN ('3.07840.32.001' ,'3.07844.32.001','3.07842.60.001') THEN 'NAO' ELSE 'SIM' END TEMPROCESSO, "+
					  "		CASE WHEN (SELECT TOP 1 IDCRIACAOCOMPONENTES FROM Z_CRM_EX001019 WHERE OSCOMPONENTES=E.OS AND IDCRIACAOCOMPONENTES=E.IDCRIACAO) IS NULL AND E.OS NOT IN ('3.07840.32.001' ,'3.07844.32.001','3.07842.60.001') THEN 'NAO' ELSE 'SIM' END TEMCOMPONENTES, "+
					  "		CASE WHEN (SELECT TOP 1 IDCRIACAO FROM Z_CRM_EX001005 WHERE OS=E.OS AND NIVEL=E.INDICE AND ITEMEXCLUSIVO!=2) IS NULL AND E.OS NOT IN ('3.07840.32.001' ,'3.07844.32.001','3.07842.60.001') THEN 'NAO' ELSE 'SIM' END TEMFILHOS, " +
					  " 	( SELECT TOP 1 REGRA FROM Z_DELP_PENDINDUSTRIALIZADO_EX WHERE OS ='"+numOS+"' AND EXECUCAO ="+execucao+" AND INDICE=E.INDICE ) REGRA_INDUSTRIALIZADO, "+
					  " 	( SELECT TOP 1 REGRA FROM Z_DELP_PENDNAOMANUFATURADO_EX WHERE OS ='"+numOS+"' AND EXECUCAO ="+execucao+" AND INDICE=E.INDICE ) REGRA_NAOMANUFATURADO "+
					  "FROM " +
					  "		Z_CRM_EX001005 E " +
					  "		RIGHT JOIN Z_CRM_EX001005 EX ON E.OS = EX.OS "+
					  "WHERE " +
					  "		(E.INDICE LIKE EX.INDICE OR E.INDICE LIKE EX.INDICE+'.%' OR (E.INDICE LIKE 'X%' AND E.INDICEANTIGO LIKE EX.INDICE+'.%'))	"+
					  "		AND E.OS='"+numOS+"' AND EX.IDCRIACAO = '"+idCriacao+"' AND E.EXECUCAO='"+execucao+"' "
					  
    } else {
    	
    	
    	myQuery = 	  "SELECT "+
					  "		E.*, "+
					  "		CASE WHEN (SELECT TOP 1 IDCRIACAOPROCESSO FROM Z_CRM_ML001021 WHERE OSPROCESSO=E.OS AND IDCRIACAOPROCESSO=E.IDCRIACAO ) IS NULL AND E.OS NOT IN ('3.07840.32.001' ,'3.07844.32.001','3.07842.60.001') THEN 'NAO' ELSE 'SIM' END TEMPROCESSO, "+
					  "		CASE WHEN (SELECT TOP 1 IDCRIACAOCOMPONENTES FROM Z_CRM_ML001019 WHERE OSCOMPONENTES=E.OS AND IDCRIACAOCOMPONENTES=E.IDCRIACAO) IS NULL AND E.OS NOT IN ('3.07840.32.001' ,'3.07844.32.001','3.07842.60.001') THEN 'NAO' ELSE 'SIM' END TEMCOMPONENTES, "+
					  "		CASE WHEN (SELECT TOP 1 IDCRIACAO FROM Z_CRM_ML001005 WHERE OS=E.OS AND NIVEL=E.INDICE) IS NULL AND E.OS NOT IN ('3.07840.32.001' ,'3.07844.32.001','3.07842.60.001') THEN 'NAO' ELSE 'SIM' END TEMFILHOS, " +
					  " 	( SELECT TOP 1 REGRA FROM Z_DELP_PENDINDUSTRIALIZADO_OS WHERE OS ='"+numOS+"' AND INDICE=E.INDICE ) REGRA_INDUSTRIALIZADO, "+
					  " 	( SELECT TOP 1 REGRA FROM Z_DELP_PENDNAOMANUFATURADO_OS WHERE OS ='"+numOS+"' AND INDICE=E.INDICE  ) REGRA_NAOMANUFATURADO "+
					  "FROM "+
					  "		Z_CRM_ML001005 E "+
					  "		RIGHT JOIN Z_CRM_ML001005 ML ON E.OS = ML.OS "+
					  "WHERE "+
					  "		(E.INDICE LIKE ML.INDICE OR E.INDICE LIKE ML.INDICE+'.%' OR (E.INDICE LIKE 'X%' AND E.INDICEANTIGO LIKE ML.INDICE+'.%')) " +
					  "		AND E.OS='"+numOS+"' AND ML.IDCRIACAO = '"+idCriacao+"' "


    }
    
        
   
    log.info("QUERY dsPendenciasEstruturasSubconj: " + myQuery);
    
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