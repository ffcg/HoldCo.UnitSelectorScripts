# Krav på leverans för Unit Selector



## Filstruktur

```bash
├── "projectname"
│   ├── views
│   │   ├── 2-1.jpg
│   │   ├── 2-2.jpg
│   │   ├── 2-3.jpg
│   │   ├── ...
│   ├── intApt.json
│   ├── extApt.json
│   ├── settings.json
```
## Innehåll: 

### views mapp
Mappen ska innehålla bilder för varje vy i unit selectorn. Namnet på filen mappas mot namnet för objektet i settings.json.

### settings.json
Behöver alltid genereras.
Settings objektet 

```bash
├── {
│   ├── settings: {
│   │   ├── firstView: 2-1
│   ├── }
│   ├── views: {
│   │   ├── 2-1: {
│   │   │   ├── Se avsnitt: view-object
│   │   ├── },
│   │   ├── 2-2: {...},
│   │   ├── 2-3: {...}
│   ├── }
├── }
```


#### view-object
View-objektet måste innehålla följande propertys:
- viewId 
    - type: string 
    - info: id för vyn, ska stämma överens med objektets namn samt bildfilens namn.
- father 
    - type: string 
    - info: Används ifall Unit Selectorn har översiktsvy, om så är fallet så ska det vara översiktsvyns id här annars ta samma som viewId.
- linked 
    - type: bool 
    - info: om vyn är länkad till annan vy med interLink objektet eller översiktsvy. 
- name
    - type: string
    - info: Namn på vyn
- clickarea
    - type: object
    - info: Objekt med alla klickareor, se avsnitt clickarea-object. 
- interlink
    - type: object
    - info: Objekt med en eller två länkar till föregående eller nästa vy i Unit Selectorn.
 

```bash
├── {
│   ├── viewId: "2-1"
│   ├── father: "2-1"
│   ├── linked: true
│   ├── name: "namn på vy"
│   ├── interlink: {
│   │   ├── Se avsnitt interlink-object
│   ├── },
│   ├── clickarea: {
│   │   ├── Se avsnitt clickarea-object
│   ├── }
├── }
```

#### interlink-object
interLink-objektet används för att länka mellan vyer i Unit Selectorn.

Innehåller ett eller två objekt beroende på hur många vyer som finns att länka till.


Exempel 1: Länkar bara till nästa vy
```bash
├── {
│   ├── 0: {
│   │   ├── arrowDir: "1 right"
│   │   ├── arrowName: "Namn på nästa vy"
│   │   ├── toView: "view: 2-2"
│   ├── }
├── }
```

Exempel 2: Länkar till föregående och nästa vy
Tänk att objektet appliceras på vy 2-2.
```bash
├── {
│   ├── 0: {
│   │   ├── arrowDir: "1 right"
│   │   ├── arrowName: "Namn på nästa vy"
│   │   ├── toView: "view: 2-3"
│   ├── },
│   ├── 1: {
│   │   ├── arrowDir: "1 left"
│   │   ├── arrowName: "Namn på föregående vy"
│   │   ├── toView: "view: 2-1"
│   ├── }
├── }
```


#### clickarea-object
Clickarea objektet innehåller koordinater för alla units.
Varje unit representeras som ett objekt med: 
- coords:
    - type: string
    - exempel: "M840.439,432.616L766.144,430.123V381.334L840.439,386.834Z"
- goTo: 
    - type: string
    - exempel: "view:3-1" eller "apt:2-1" beroende på om det är i en översiktsvty eller inte.

```bash
├── {
│   ├── 0: {
│   │   ├── coords: "M840.439,432.616L766.144,430.123V381.334L840.439,386.834Z"
│   │   ├── goTo: "apt:LVU004921"
│   ├── },
│   ├── 1: {
│   │   ├── coords: "M840.439,432.616L766.144,430.123V381.334L840.439,386.834Z"
│   │   ├── goTo: "apt:LVU004922"
│   ├── },
│   ├── 2: {
│   │   ├── coords: "M840.439,432.616L766.144,430.123V381.334L840.439,386.834Z"
│   │   ├── goTo: "apt:LVU004923"
│   ├── },
│   ├── 3: {
│   │   ├── coords: "M840.439,432.616L766.144,430.123V381.334L840.439,386.834Z"
│   │   ├── goTo: "apt:LVU004924"
│   ├── },
│   ├── ....
├── }
```

### intApt.json
Behöver alltid genereras.
intApt objektet används inte av Unit Selectorn men måste genereras med LVU-id eftersom att lösningen är byggd utifrån Diakrit.

```bash
├── {
│   ├── apts: {
│   │   ├── "LVU-ID": {
│   │   │   ├── available: ""
│   │   │   ├── fee: 0
│   │   │   ├── floor: 0
│   │   │   ├── price: 0
│   │   │   ├── rooms: 0
│   │   │   ├── size: 0
│   │   │   ├── typeAptId: 0
│   │   │   ├── viewId: 0
│   │   ├── }
│   ├── }
├── }
```

### extApt.json
Behöver INTE genereras. 
extApt-objektet skapas upp via API:et som används på webben för att få senaste aktuell data från CRM.
Vill man testa Unit Selectorn utanför Bonavas webb, dvs utanför Episerver så kan man göra en GET mot API:et med projektets ID-nummer som parameter. 