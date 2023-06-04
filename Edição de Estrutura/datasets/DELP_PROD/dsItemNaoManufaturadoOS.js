// VERIFICA SE UM DETERMINADO ITEM DA ESTRUTURA É NÃO MANUFATURADO
function createDataset(fields, constraints, sortFields) {

	var dsItemNaoManufaturadoOS = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
   
    var numOS = ""
    var indice = ""
    var exec = ""
    var codtrfpai = ""
	
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName == "OS"){
        		
        		numOS = constraints[i].initialValue;
        	
        	}
        	
        	if(constraints[i].fieldName == "INDICE"){
        		
        		indice = constraints[i].initialValue;
        	
        	}
        	
        	if(constraints[i].fieldName == "EXEC"){
        		
        		exec = constraints[i].initialValue;
        	
        	} 
        	
        	if(constraints[i].fieldName == "CODTRFPAI"){
        		
        		codtrfpai = constraints[i].initialValue;
        	
        	} 
        	
        }
        
    }  

    log.info("VOU MONTAR A QUERY")
    
    var myQuery = ""
    
    if(exec == ""){
    	
    	myQuery = "SELECT * FROM Z_CRM_ML001005 WHERE OS='"+numOS+"' AND INDICE='"+indice+"' AND TIPODESENHO='NAOMANUFATURADO'"
    	
    }
    else{
    	
    	myQuery = "SELECT * FROM Z_CRM_EX001005 WHERE OS='"+numOS+"' AND INDICE='"+indice+"' AND TIPODESENHO='NAOMANUFATURADO' " +
    			  " AND EXECUCAO='"+exec+"' AND CODTRFEX='"+codtrfpai+"'" 
    		
    	
    }	
    
    log.info("QUERY dsItemNaoManufaturadoOS: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	  
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsItemNaoManufaturadoOS.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsItemNaoManufaturadoOS.addRow(Arr);
            
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
    
    return dsItemNaoManufaturadoOS;

}