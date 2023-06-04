function createDataset(fields, constraints, sortFields) {

	var dsExecutaConsulta = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    var sql = "";	
    var user = "";
    
    log.info("DATASET EXECUTA CONSULTA")
    
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++) {
        	
        	if(constraints[i].fieldName.search("SQL")!=-1){
        		
        		sql += constraints[i].initialValue+ " ";
        		
        	} 
        	if(constraints[i].fieldName == "USER"){
        		
        		user = constraints[i].initialValue;
        		
        	} 
        	
        }
        
    }  
    
    var myQuery = "";
    	
    log.info("usuário executor : " + user);
    log.info("sql executor : " + sql); 
    
	if(user!="" && user!=null && user!=undefined){
		
		myQuery = sql
		
	}				
   
    log.info("QUERY dsExecutaConsulta: " + myQuery);
    
    try {
    	
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        
        while (rs.next()) {
        	
            if (!created) {
            	
                for (var i = 1; i <= columnCount; i++) {
                	
                	dsExecutaConsulta.addColumn(rs.getMetaData().getColumnName(i));
                	
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
            
            dsExecutaConsulta.addRow(Arr);
            
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
    
    return dsExecutaConsulta;
	
}