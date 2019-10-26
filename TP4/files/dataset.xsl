<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xml"/>
    
    <xsl:template match="doc">
        <xsl:result-document href="data/doc{count(preceding-sibling::*)+1}.xml">
            <xsl:processing-instruction name="xml-stylesheet">type="text/xsl" href="data/doc2html.xsl"</xsl:processing-instruction>
            <xsl:copy-of select="."></xsl:copy-of>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>