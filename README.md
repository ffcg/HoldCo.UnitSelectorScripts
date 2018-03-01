
## Unit Selector scripts

Node skript för att transformera SVG´s och unitdata till objekt som navigator-koden kan använda. 
Skriptet är baserat på en leverans av dokument, svg:er och bilder från NCC.

## Kom igång

För att komma igång och använda scriptet måste du ha följande installerat: 

```
node
npm
git

```

Installera: 

```
npm install
```

för att installera alla beroenden.

## NCCs leverans 

Skriptet är baserat på den leverans som idag levereras:
Vi förväntar oss att ta emot följande filer:

- En eller flera vyer i jpg/png och svg-format. Ex 2-1.svg & 2-1.jpg/png
- Dokument-fil som innehåller bild och ett namn för varje vy
- XML-fil med länk till API:et på bonava.xx som tillhandahåller data från HoME


## Användning

Skriptet är beroende av att tre filer finns i samma mapp som index.js:

```
data.svg
settings.json
intApt.json
```

settings.json och intApt.json måste innehålla object som finns definerade i copy_this_settings.json och copy_this_intApt.json

Settings.json måste alltid nollställas inför varje körning om projektet har flera vyer. För varje projekt måste båda filerna nollställas till ursprungsläget utifrån copy_this-filerna. 

### Steg

- 1: Kolla om projektet har flera vyer, om så är fallet är det bättre att använda "delivery_settings.json" och en delivery_intApt.json" som du kopierar över till efter varje gång du kört skriptet. 
- 2: Kontrollera så att settings.json, data.svg och intApt.json ligger i samma mapp som index.js. Settings.json ohc intApt.json ska ha samma innehåll som copy_this-filerna.
- 3: Börja med att kopiera över allt i en svg-fil från NCCs leverans till data.svg
- 4: Öppna terminalen/CMD och navigera till mappen och kör skriptet genom att skriva in "node index.js" och tryck enter. 
- 5: När skriptet är klart kommer settings.json och intApt.json vara uppdaterade med ny data. 
- 6: Settings.json behöver nu manuell handpåläggning. 
goTo-värdet måste prefixas med apt: eller view: beroende på om det länkar till en unit eller en vy. Om projektet har en översiktvy så är det "view:" du ska använda på den vyn. Annars är det "apt:". 
Exempel:
```
    “goTo”: “apt:LVU0036664"
    eller
    “goTo”: “view:3-1"
```
- 7: Varje objekt för en vy ska innehållande följande properties: 
        
        "clickarea": {},
        "viewId": "",
        "father": "",
        "name": "",
        "linked": true,
        "interlink": {}, 

    Skriptet genererar alltså bara "clickarea". Resten görs manuellt.

    viewId: Ta värdet från filen, dvs 2-1 om det är 2-1.svg du har tagit in i data.svg
    
    name: Tas från dokumentet som finns med i NCCs leverans. 

    father: Används om det finns en översiktsvy annars kan det vara samma värde som viewId. Se exempel på settings.json filer nedan. 

    linked: true om det ska gå att länka till vyn.

    interLink: Objekt som används för att vyerna ska kunna länka mellan varandra. Det här objektet innehåller två objekt med keys 0 eller 1. 
    Ex: 
    ```
                "0": {
                    "arrowName": "Namn på vy som det länkas till",
                    "toView": "view:2-4",
                    "arrowDir": "1 left"
                },
                "1": {
                    "arrowName": "Namn på vy som det länkas till",
                    "toView": "view:2-2",
                    "arrowDir": "1 right"
                }
    ```

- 8: När allt är klart kan du kopiera in resultatet i delivery_settings.json, så varje körning av skriptet motsvarar ett objekt i views. 

## Test

Exempel på settings.json:
     Unit Selector med översiktsvy https://www.bonava.dk/diakrit/n5/Sohusene/n5assets_Sohusene/settings.json
     Unit Selector https://www.bonava.fi/diakrit/n5/margareta_fi/n5assets_margareta/settings.json

Exempel på intApt.json
    https://www.bonava.fi/diakrit/n5/margareta_fi/n5assets_margareta/intApt.json

Du kan testa filerna i Holdco.Web projektet genom att köra igång Navigator-koden med en local server.

## Deploy

Navigator-koden som använder den här datan på bonava.xx förväntar sig en viss struktur. Det är därför viktigt att alla steg i tidigare avsnitt utförs rätt. Det går att testa det lagt upp i Blob Storage på BuaTest eller DevTest. 