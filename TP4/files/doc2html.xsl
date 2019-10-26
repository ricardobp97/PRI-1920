<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="doc">
        <html>
            <head>
                <title>Música: <xsl:value-of select="tit"/></title>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1><xsl:value-of select="tit"/></h1>
                <table>
                    <tr>
                        <td align="left"><b>Província: </b><xsl:value-of select="prov"/></td>
                    </tr>
                    <tr>
                        <td align="left"><b>Local: </b><xsl:value-of select="local"/></td>
                    </tr>
                    <tr>
                        <td align="left"><b>Músico: </b><xsl:value-of select="musico"/></td>
                    </tr>
                    <tr>
                        <td align="left"><b>Duração: </b><xsl:value-of select="duracao"/></td>
                    </tr>
                    <tr>
                        <td align="left"><b>Tipo de Ficheiro: </b><xsl:value-of select="file/@t"/></td>
                    </tr>
                </table>
                <hr/>
            </body>
        </html>
    </xsl:template>
    
</xsl:stylesheet>