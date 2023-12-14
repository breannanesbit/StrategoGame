# StrategoGame
## Nov 4th
  - [/] CI/CD pipeline
  - [X] Home page w/ start the game button
  - [x] rules page
  - [ ] authentication and user account support - we will have the ability to login and out of our gaming site. This way users know who they are playing against and can have the saved borads and achivements 
  - [ ] piece generic (start)
  - [ ] decide your borad page (start)
  - [ ] generic input 

## Nov 11th ( 8 items by date)
  - [/] CI/CD pipeline
  - [ ] authentication and user account support - we will have the ability to login and out of our gaming site. This way users know who they are playing against and can have the saved borads and achivements 
  - [x] piece generic (start)
  - [x] decide your borad page (start)
  - [ ] generic input 
  - [x] Error handling (both on api requests and render errors) - we plan to create our own error page to catch errors and stop the site from crashing. On our api if a 400 or 505 is thrown we will report the code and message 
  - [ ] Network Calls
    - [x] read data - will read when moves are made, when website is loaded etc. 
    - [x] write data - will write a new move, new board or when user informations is added
    - [ ] websocket - two players will play the game together on different computers so websockets needed
  - [/] play page
  - [ ] 3+ generic form input components
  - [ ] gameover showing who won page

## Nov 18th ( 13 items by date)
  - [x] CI/CD pipeline
  - [x] authentication and user account support - we will have the ability to login and out of our gaming site. This way users know who they are playing against and can have the saved borads and achivements 
  - [x] generic input
  - [ ] Network Calls
    - [ ] websocket - two players will play the game together on different computers so websockets needed
  - [/] play page
  - [ ] 3+ generic form input components
  - [x] gameover showing who won page
  - [ ] Use of Local Storage - we plan to save players information localy before it gets saved to the api
  - [x] Client side state stores (e.g. redux or context)- We'll use redux to keep track of the game state and context possibly for settings.
  - [x] Toasts / global notifications or alerts - we intend to have different achivements that players can achive and when awarded these achivements will display as toasts 
  - [x] leader borad
  - [x] leader board generic
## Nov 25th 
  - [ ]   Player icon and name
  - [ ]   Making Player for initial start and edit genaric
  - [ ] settings page/user info

## Dec 2nd (22 items by date)
  - [ ] admin pages and public pages - our admin pages will be a settings page to add new achivements people can achive. Most other pages will be for users
  - [ ] admin create achivements page
  - [ ] achivements page

## Dec 9 (26 items by date)
  - uncompleted tasks

## Extra

# 
- [x] Use of Local Storage - we plan to save players information localy before it gets saved to the api
- [/] Client side state stores (e.g. redux or context)- We'll use redux to keep track of the game state and context possibly for settings.
- [x] Toasts / global notifications or alerts - most toasts can be found in the apiService  
- [x] Error handling (both on api requests and render errors) - api request have try catches and toasted raised then rendering errors is handled by the error-page.jsx that is rendered in the index.tsx for the errorboundary
- [ ] Network Calls
  - [x] read data - In apiService 
  - [x] write data - In apiService
  - [ ] websocket - two players will play the game together on different computers so websockets needed
- [x] Developer type helping (typescript) - we will be using typescript
- [x] 10+ pages via a router
  - [x] Home page w/ start the game button - Homepage.tsx
  - [x] rules page - GameRules.tsx
  - [x] decide your borad - GameBoard.tsx
  - [x] play - PlayGame.tsx
  - [x] leader borad - LeaderBoard.tsx
  - [x] gameover showing who won - GameOver.tsx
  - [x] see defualt borads - SeeDefaultBoard.tsx
  - [x] create new defualt borads to save - NewDefaultBoard.tsx
  - [x] settings page/user info - Settings.tsx
  - [x] achivements page - Acheivements.tsx
  - [x] admin create achivements page - AdminAcheivement.tsx
- [x] CI/CD pipeline
  - [x] https support - site can be found as stratego2023.duckdns.org:2002
  - [x] Live production environment - we will have our deployment.yml and use github actions to host our site on the class server. 
  - [x] Automated testing and linting in the pipeline (abort build if fails) - .eslintrc.json file 
- [ ] 3+ generic form input components
  - [x] text input - /component/GenericInput.tsx
  - [x] select input w/ custom options - /component/GenericSelect.tsx
  - [x] Radio input - /component/GenericRadio.tsx
- [ ] 4+ generic layout components
  - [x]   Borad - /component/GenericBoard.tsx
  - [x]   Piece - /component/piece.tsx
  - [x]   leader board - /component/LeaderBoard.tsx
  - [x]   achievements - /component/GenericAcheivment.tsx
  
- [x] authentication and user account support - we will have the ability to login and out of our gaming site. This way users know who they are playing against and can have the saved borads and achivements (keycloak found in keycloak folder)
  - [x] admin pages and public pages - our admin pages will be a settings page to add new achivements people can achive. Most other pages will be for users

