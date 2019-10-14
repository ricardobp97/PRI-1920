<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="/">
        
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <title>Arqueossítios do Nordeste Português</title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1>Arqueossítios do Nordeste Português</h1>
                    <ol>
                        <xsl:apply-templates/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        
        <xsl:apply-templates mode="individual"/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="individual">
        <xsl:result-document href="website/{generate-id()}.html">
            <html>
                <head>
                    <title>Arqueossítio: Página Individual</title>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1><xsl:value-of select="IDENTI"/></h1>
                    <p><b>Autor: </b><xsl:value-of select="AUTOR"/></p>
                    
                    <hr/>
                    <hr/>
                    
                    <h2>Info</h2>
                    
                    <table width="100%">
                        <tr>
                            <td width="50%"><b>Codadm: </b><xsl:value-of select="CODADM"/></td>
                            <td><b>Data: </b><xsl:value-of select="DATA"/></td>
                        </tr>
                        <tr>
                            <td width="50%"><b>Concelho: </b><xsl:value-of select="CONCEL"/></td>
                            <td><b>Altitude: </b><xsl:value-of select="ALTITU"/></td>
                        </tr>
                        <tr>
                            <td width="50%"><b>Freguesia: </b><xsl:value-of select="FREGUE"/></td>
                            <td><b>Longitude: </b><xsl:value-of select="LONGIT"/></td>
                        </tr>
                        <tr>
                            <td width="50%"><b>Lugar: </b><xsl:value-of select="LUGAR"/></td>
                            <td><b>Latitude: </b><xsl:value-of select="LATITU"/></td>
                        </tr>
                    </table>
                    
                    <hr/>
                    <hr/>
                    
                    <h2>Descrição</h2>
                    
                    <p><xsl:value-of select="ACESSO"/></p>
                    <p><xsl:value-of select="QUADRO"/></p>
                    <p><xsl:value-of select="TRAARQ"/></p>
                    <p><xsl:value-of select="DESARQ"/></p>
                    <p><xsl:value-of select="INTERP"/></p>
                    <p><xsl:value-of select="INTERE"/></p>
                    <p><xsl:value-of select="DEPOSI"/></p>
                    
                    <hr/>
                    <hr/>
                    
                    <h2>Referências</h2>
                    
                    <ol>
                        <xsl:for-each select="BIBLIO">
                            <p><li><xsl:value-of select="."/></li></p>
                        </xsl:for-each>
                    </ol>
                    
                    <hr/>
                    <hr/>
                    
                    <address>
                        <a href="index.html#{generate-id()}">Voltar ao índice</a>
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        <li id="{generate-id()}">
            <a href="{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
        </li>
    </xsl:template>
    
</xsl:stylesheet>