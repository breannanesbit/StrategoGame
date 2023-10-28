# StrategoGame

- [ ] Use of Local Storage - we plan to save players information localy before it gets saved to the api
- [ ] Client side state stores (e.g. redux or context)
- [ ] Toasts / global notifications or alerts - we intend to have different achivements that players can achive and when awarded these achivements will display as toasts 
- [ ] Error handling (both on api requests and render errors) - we plan to create our own error page to catch errors and stop the site from crashing. On our api if a 400 or 505 is thrown we will report the code and message 
- [ ] Network Calls
  - [ ] read data - will read when moves are made, when website is loaded etc. 
  - [ ] write data - will write a new move, new board or when user informations is added
  - [ ] websocket - two players will play the game together on different computers so websockets needed
- [ ] Developer type helping (typescript) - we will be using typescript
- [ ] 10+ pages via a router
- [ ] CI/CD pipeline
  - [ ] https support
  - [ ] Live production environment - we will have our deployment.yml and use github actions to host our site on the class server. 
  - [ ] Automated testing and linting in the pipeline (abort build if fails) - to our deployment file we make it build tests and use the linter in our deployment like we did for the linter assignment. 
- [ ] 3+ generic form input components
- [ ] 4+ generic layout components
- [ ] authentication and user account support 
  - [ ] admin pages and public pages
