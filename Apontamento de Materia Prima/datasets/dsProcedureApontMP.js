// BUSCA INFORMAÇÕES DO MOVIMENTO E EXECUTA A PROCEDURE VINCULA MATERIAL
function createDataset(fields, constraints, sortFields) {

	var newDataset = DatasetBuilder.newDataset()
    var dataSource = "/jdbc/FluigDSRM"
	//var dataSource = "/jdbc/FluigDSRM
    var ic = new javax.naming.InitialContext()
    var ds = ic.lookup(dataSource)
    var created = false
    
    log.info("Entrei no dataset dsProcedureApontMP")
    
    var myQuery = ""

    var numprocesso = ""
    var retornoUpdate = "SUCESSO"

		
    if (constraints != null) {
    	
        for (var i = 0; i < constraints.length; i++){
            
            if (constraints[i].fieldName == "NUMPROCESSO") {
            	
            	numprocesso = constraints[i].initialValue
            	
            }
            
        }
        
    }
	
		

	myQuery =   " EXEC SP_DELP_APONTAMATERIAPRIMA_FLUIG "+numprocesso
				

	 
	
    log.info("dsProcedureApontMP MY QUERY: " + myQuery)
    
    try {
    	
        var conn = ds.getConnection()
        var stmt = conn.createStatement()
        var rs = stmt.execute(myQuery)
        log.info(rs)
        
        
    } catch (e) {
        
    	log.error("ERRO==============> " + e.message);
    	retornoUpdate =  e.message;
    
    } finally {
    	
        if (stmt != null) {
        	
            stmt.close();
            
        }
        
        if (conn != null) {
        	
            conn.close();
            
        }
        
    }
    newDataset.addColumn('MSG')
    newDataset.addRow(new Array(retornoUpdate))
    
    return newDataset
	
}