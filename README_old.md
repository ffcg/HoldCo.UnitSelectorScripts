# Unit Selector Scripts

Script from Daniel (Vinnovera) for transforming SVG and Home-data to Unit Selector/Navigator JSON-files with views.



Kom igång:
- npm install


Mer info: 
filer att använda:
data.svg
settings.json
intApt.json
index.js

index.js är beroende av att data.svg, settings.json och intApt.json finns i samma mapp samt att dom har innehåll som är definerat i filerna copy_this-filerna. 

settings.json och intApt.json måste ställas om till ursprungsläge för varje vy som du generar. Du hittar default datan för varje fil i copy-this-filerna. 


Gunnars leverans innehåller oftast:
- En eller flera vyer i jpg och svg format. ex 2-1.svg och 2-1.png
- docx fil som innehåller varje vys namn. 
- xml fil med länk till home data

Steg:
1: Kontrollera om projektet har flera vyer, om så är fallet är det bättre att skapa upp en "delivery_settings.json" och "delivery_intApt.json" som du kopierar över till efter varje gång du kört scriptet.
2: Kopiera innehållet i en svg-fil till data.svg
3: Se till så att settings.json och intApt.json finns i samma mapp som index.js och har samma innehåll som copy_this_settings.json och copy_this.intApt.json.
4: Öppna terminalen och navigera till mappen och kör scriptet med: "node index.js"
5: Om allt gick bra så ser du ser resultatet i settings.json och intApt.json.

6: goTo värdet ska prefixas med apt: eller view: beroende på om det länkar till en unit eller översiktsvy. 
 ex: “goTo”: “apt:LVU0036664" om det är till en unit
     “goTo”: “view:3-1" om det är en översiktvy som länkar till en specifik vy
7: Varje object för en vy ska innehålla följande propertys: 
        "clickarea": {},
        "viewId": "",
        "father": "",
        "name": "",
        "linked": true,
        "interlink": {},

OBS! Det är bara clickarea object som du får från scriptet. Så övriga properties måste du skapa manuellt för varje vy.

Exempel: Unit Selector med översiktsvy: https://www.bonava.dk/diakrit/n5/Sohusene/n5assets_Sohusene/settings.json
Exempel: Unit Selector https://www.bonava.fi/diakrit/n5/margareta_fi/n5assets_margareta/settings.json
