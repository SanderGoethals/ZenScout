# Expo managed project + structuur

Het project wordt gestart met Expo in TypeScript.  

<img width="236" height="512" alt="1" src="https://github.com/user-attachments/assets/a642cdfe-80d6-4fbd-86f4-3e93df7f2b38" />
<img width="236" height="512" alt="2" src="https://github.com/user-attachments/assets/50a8760b-e0bb-451a-89a5-8fb7eea48657" />
<img width="236" height="512" alt="3" src="https://github.com/user-attachments/assets/54dedabe-a4e3-41c8-8ed9-89071ea4e3f4" />
<img width="236" height="512" alt="13" src="https://github.com/user-attachments/assets/93173806-fbb7-46f8-bcc8-dc3b3ce4e543" />
<img width="236" height="512" alt="4" src="https://github.com/user-attachments/assets/5d0629fc-be6a-4cd5-86aa-c3f47c5d4c49" />
<img width="236" height="512" alt="5" src="https://github.com/user-attachments/assets/97db100b-c31c-400f-8205-a2c3218bf4ac" />
<img width="236" height="512" alt="6" src="https://github.com/user-attachments/assets/e6e4924e-2099-4778-b118-f9fc0128cdbb" />
<img width="236" height="512" alt="7" src="https://github.com/user-attachments/assets/bc40ea0d-bd77-4994-8812-06b64d405056" />
<img width="236" height="512" alt="8" src="https://github.com/user-attachments/assets/1822189e-9c27-4e97-9934-3ca00e5014f8" />
<img width="236" height="512" alt="12" src="https://github.com/user-attachments/assets/51049eee-b726-42c6-9580-8945e6b4fd34" />
<img width="236" height="512" alt="9" src="https://github.com/user-attachments/assets/6070765a-f7e4-4a15-ba01-7763128f65be" />
<img width="236" height="512" alt="10" src="https://github.com/user-attachments/assets/7cd6bf9e-3860-4638-b7f8-7f83287b0da0" />
<img width="236" height="512" alt="11" src="https://github.com/user-attachments/assets/6e12a121-9a37-45ce-89c9-9e9f52601e5b" />

## Components, lokale state & props

Er worden herbruikbare components voorzien, zoals:

- `SpaListCard`
- `SpaCarousel`
- `GlassButton`
- `TextMarkup`
- ...

Lokale UI-state wordt beheerd met `useState` en `useEffect`.  
Props en componenten worden volledig getypeerd.

---

## Styling & layout

Flexbox wordt gebruikt voor layout.  
Styling gebeurt met `StyleSheet.create`, minimale styling inline.  
Er zijn vier custom fonts toegevoegd via Google Fonts en toegepast via het basiscomponent `TextMarkup`.

---

## Redux + persist

Redux wordt gebruikt voor globale state, zoals favorieten en onlangs bekeken.  
Persistente opslag gebeurt via `redux-persist` in combinatie met `AsyncStorage`, zodat data behouden blijft na het sluiten van de app.

---

## Navigatie

Er wordt een combinatie gebruikt van:

**DrawerNavigator**
- Home  
- Favorieten  
- Profiel  
- Spa-categorieën  

**NativeStackNavigator**
- Detailpagina’s  

Daarnaast is er een aparte `AuthStack` voor login en registratie.

---

## User input

De gebruiker kan zoeken, filteren en inloggen.  
Formulieren zoals Login en Register worden gebouwd met Formik.  
Filterinvoer wordt beheerd via lokale state of Formik, afhankelijk van de complexiteit.

---

## Validatie

Yup wordt gebruikt voor validatie van invoervelden.

Voorbeelden:
- E-mail moet geldig zijn  
- Wachtwoord moet voldoen aan minimumvereisten  

Formik toont foutmeldingen per veld.

---

## Authenticatie

Firebase Authentication wordt gebruikt voor login en registratie via e-mail en wachtwoord.  
Alleen ingelogde gebruikers hebben toegang tot de app.  
Niet-ingelogde gebruikers zien enkel de `AuthStack`.

---

## Firestore database

De wellnessgegevens worden opgeslagen in Firestore.

Collections:
- `wellnesses` (naam, locatie, faciliteiten, rating)  
- `users/{uid}/reviews` (reviews per gebruiker)  

---

## Native features

De GPS-locatie wordt gebruikt om wellnessen in de buurt te tonen.  
Er wordt een kaartweergave toegevoegd via `react-native-maps`.

---

## TypeScript

Het project gebruikt een strikte TypeScript-configuratie.  
Er wordt geen gebruik gemaakt van `any`.  
Types worden gedefinieerd voor data-objecten, component-props en Redux-slices.
