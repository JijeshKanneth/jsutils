function XMLTransformer(){}
XMLTransformer.prototype = {
    importCSS : function (fileName){
        var links = document.createElement("link");   
        links.setAttribute("type","text/css");   
        links.setAttribute("rel","stylesheet");   
        links.setAttribute("href",fileName);  
        document.getElementsByTagName('head')[0].appendChild(links);        
    },
    getXMLDoc : function (url){
        var xmlDoc;
        if (window.XMLHttpRequest) xmlDoc = new window.XMLHttpRequest();
        else xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
        xmlDoc.open("POST",url,false);
        xmlDoc.send("");
        return xmlDoc.responseXML;
    },
    loadXMLDoc : function (path){
        xsl_data = new ActiveXObject("Microsoft.XMLDOM"); 
        xsl_data.async = false; 
        xsl_data.load(path); 
        return xsl_data;
    },    
    parse : function (xml_path, xslt_path, result_block_id)
    {
        if (window.ActiveXObject)
        {
            xsl_data = this.loadXMLDoc(xslt_path);
            xml_data = this.getXMLDoc(xml_path);
            html_text = xml_data.transformNode(xsl_data);            
            document.getElementById(result_block_id).innerHTML = html_text;
        }else if (document.implementation && document.implementation.createDocument)
        {
            xsl_data = this.getXMLDoc(xslt_path);
            xml_data = this.getXMLDoc(xml_path);
            xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl_data);
            resultDocument = xsltProcessor.transformToFragment(xml_data,document);
            document.getElementById(result_block_id).appendChild(resultDocument);
        }
    }
}

