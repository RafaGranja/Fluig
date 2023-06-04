// BUSCA A SITUAÇÃO DOS ITENS DE UMA OS EM RELAÇÃO A PROCESSO, COMPONENTES E LISTA DE MATERIAIS
function createDataset(fields, constraints, sortFields) {

	var dsSituacaoItemOs = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDS"
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
   
    var indice = ""
    var idcriacao = ""
    var numOS = ""
    var codTrfEx = ""
    var indicepai = ""
    	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if (constraints[i].fieldName == "INDICE") {
            	
        		indice = " AND KE.INDICE='"+constraints[i].initialValue+"' "
            	
            }
        	if (constraints[i].fieldName == "NUM_OS") {
            	
        		numOS = " KE.OS='"+constraints[i].initialValue+"' "
            	
            }
        	if (constraints[i].fieldName == "IDCRIACAO") {
            	
        		idcriacao = " AND KE.IDCRIACAO="+constraints[i].initialValue
            	
            }
        	if(constraints[i].fieldName == "CODTRFEX"){
        		
        		codTrfEx = " AND KE.CODTRFPAI='"+constraints[i].initialValue+"' "   
        	
        	}
        	if(constraints[i].fieldName == "INDICEPAI"){
        		
        		indicepai = " AND KE.INDICE LIKE '"+constraints[i].initialValue+"%' "
        	
        	}
        	     	
        }
        
	}
	
	var myQuery = "SELECT INDICE,IDCRIACAO,TIPODESENHO   "+		
						" ,CASE WHEN COMPONENTE>0 THEN 1 ELSE 0 END AS COMPONENTE  		"+	
						" ,CASE WHEN PROCESSO>0 THEN 1 ELSE 0 END AS PROCESSO  		"+	
						" ,CASE WHEN LISTA>0 THEN 1 ELSE 0 END AS LISTA  		"+	
						" ,CASE WHEN	COMPORLISTA='SIM' THEN 1 ELSE 0 END AS COMPORLISTA "+
						" ,CASE WHEN	TEMFILHOS='SIM' THEN 1 ELSE 0 END AS TEMFILHOS "+
						" FROM (  SELECT INDICE,OS,IDCRIACAO,TIPODESENHO,(SELECT COUNT(ID) FROM Z_CRM_ML001019  "+						
						" WHERE OSCOMPONENTES=KE.OS AND IDCRIACAOCOMPONENTES=KE.IDCRIACAO) COMPONENTE,"+					
						" (SELECT COUNT(ID) FROM Z_CRM_ML001021  					"+	
						" WHERE OSPROCESSO=KE.OS AND IDCRIACAOPROCESSO=KE.IDCRIACAO) PROCESSO, "+	
						" (SELECT	SUM(ID) FROM( SELECT COUNT(ID) ID FROM Z_CRM_LISTAMATERIAIS  	"+					
						" WHERE NUMOSSALVOS=KE.OS AND IDCRIACAOSALVOS=KE.IDCRIACAO"+	
						" UNION "+	
						" SELECT COUNT(ID) ID FROM Z_CRM_ML001019  					"+	
						" WHERE OSCOMPONENTES=KE.OS AND IDCRIACAOCOMPONENTES=KE.IDCRIACAO "+	
						" AND CODIGOPRDCOMPONENTES!='' ) L ) LISTA,  				"+	
						" KE.COMPORLISTA,   		"+	
						" CASE WHEN (SELECT TOP 1 IDCRIACAO FROM Z_CRM_ML001005 WHERE OS=KE.OS AND NIVEL=KE.INDICE) IS NULL THEN 'NAO' ELSE 'SIM' END TEMFILHOS "+
					" FROM Z_CRM_ML001005 KE "+ 
							" 	WHERE "+
							" 		"+numOS+idcriacao+indice+codTrfEx+indicepai+") R "+
							" 	ORDER BY CAST('/' + REPLACE(INDICE, '.', '/') + '/' AS HIERARCHYID) "
	    
    log.info("QUERY dsSituacaoItemOs: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.executeQuery(myQuery)
        var columnCount = rs.getMetaData().getColumnCount()
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsSituacaoItemOs.addColumn(rs.getMetaData().getColumnName(i))
                	
                }
               
                created = true
                
            }
            
            var Arr = new Array()
            
            for (var i = 1; i <= columnCount; i++) {
            	
                var obj = rs.getObject(rs.getMetaData().getColumnName(i))
                
                if (null != obj) {
                	
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString()
                    
                } else {
                	
                    Arr[i - 1] = "null"
                    
                }
                
            }
            
            dsSituacaoItemOs.addRow(Arr)
            
        }
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message)
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close()
            
        }
        
        if (conn != null) {
        	
            conn.close()
            
        }
        
    }
    
    return dsSituacaoItemOs
	
}