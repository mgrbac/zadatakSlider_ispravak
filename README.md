# zadatakSlider_ispravak_2

Niže uz vaše prijašnje komentare dopisujem svoje kojima opisujem učinjeno:

Dosta je toga sada ispravljeno što je odlično, međutim potrebno je još doraditi js logiku. Naime sva logika je zapravo odrađena u constructoru. Potrebno je “bolje” razdvojiti/prebaciti funkcije iz constructora u “baš prave” metode.
Proučiti [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes]

// js logika je prepisana na način da su 
	- varijable prepisane u class fieldove
	- u constructoru ostavljeno samo potrebno za inicijalizaciju slidera
	- sve ostale arrow funkcije prebačene su u metode



# zadatakSlider_ispravak

Niže uz vaše prijašnje komentare dopisujem svoje kojima opisujem učinjeno:

HTML kod je dobro pisan i formatiran, imena klasa su također dobro izvedena
// zahvaljujem

Buttonima (upravljačkim kontrolama) nedostaje hover animacija (button sam po sebi ima sivi border i strelicu a na “hover, focus” i active prelazi u plavu kombinaciju, ali background još uvijek ostaje transparentan)
// moje isprike, ovo je bio previd. Ispravljeno je.

Nije korišten nikakav css preprocesor, implementirati, preporuka je SASS/SCSS
// sada sam upotrijebila sass. Korištene su varijable, ugnježđivanje, aritmetičke operacije, nasljeđivanje selektora, import. Nisam pronašla odgovarajući slijed stilova za prikaz upotrebu mixina.

JS logika je dobro izvedena, međutim nekoliko “brzih” uzastopnih klikova na buttone “pokida” slider. Ispraviti na način da buttoni budu onemogučeni (“disable-ani”) dok traje tranzicija
// hvala na prijedlogu, podešeno preko html disable atributa.

Pohvalno je što je cijela js logika “enkapsulirana”. Proučiti i rješiti zadatak koristeći noviju ES6/ECMASCRIPT2015 sintaksu skupa sa Objektno-orijentiranim principom (Klase i objekti)
// budući je riječ o jednom elementu odnosno samo slideru, osnovnu funkciju MGSlider, prepisala sam u jednu klasu. Ostale elemente ostavila sam u obliku funkcija (metoda) te postavila u konstruktor funkciju kako bih mogla zadržati varijablu _this kao globalnu i nepromijenjenu kroz metode i callback funkcije (problem je radila callback funkcija .on('click') metode i referenciranje na globalni objekt i na sam button) 
// upotreba ES6/ECMASCRIPT2015 u imenovanju varijabli (var u let i const), pisanje i imenovanje funkcija preko arrow funkcija.

Implementirati “transpile” feature pomoću babel-a za podršku starijim browserima (https://babeljs.io/)
// budući nije riječ o produkcijskom pluginu upotrijebila sam jednokatni transpile od babela i dodatno minificirala preko minifier.org

Babel (js) i SASS/SCSS (css) outputi moraju biti minificirani, proučiti zašto i implementirati
// minificirani kod ubrzava čitanje istog, što u konačnici rezultira bržim radom weba, a time i boljim korisničkim iskustvom. To je praksa koja mi je bila i prije poznata nego budući je dio zadatka bio napisati uredan kod, nisam primjenila.
