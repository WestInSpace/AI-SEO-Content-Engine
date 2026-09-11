**Install Node.js**  
`https://nodejs.org/en/download`

**Go to the GitHub repo and download the code**  
`https://github.com/WestInSpace/AI-SEO-Content-Engine`

---
**Get your Google Gemini API Key**
1. Go to: `https://aistudio.google.com/app/projects`  
2. Create a new Project to hold your API Key  
	a. Recommended name: `ai-seo-content-engine`  
3. Once the project is displayed click the "Create API Key" link on that project  
	a. Selecte the Project that the key will be linked to from the drop down menu  
4. Copy your API Key, you will need it in a future step


---
**Set-up the application**

1. Unizip the zip file that was downloaded from GitHub  
2. Open the folder and locate the .env-fill file.  
	a. Rename the file to .env  
3. Fill in the information in the file  
	a. Recommended information (Make sure to paste your API key after the GEMINI_API_KEY= field with no space):  
		```
		#Backend environment vatriables
		GEMINI_API_KEY=
		BACKEND_PORT=5001
		FRONTEND_PORT=3000

		#Frontend environment variables
		VITE_BACKEND_PORT=5001
		VITE_FRONTEND_PORT=3000
		```
4. Change the port numbers in the other files from 5000 to 5001 for the application install to work correctly on Mac.  
	a. The following files will need their backend port number changed to port 5001:  
		Note: The location that it needs changed will be at or near the top of all the files.  
		`./backend/server.js/`  
		`./frontend/src/pages/MainPage/MainPage.jsx`  
		`./frontend/src/pages/HistoryPage/HistoryPage.jsx`  
		`./Makefile`
---
**Install dependencies**

1. Open the terminal and navigate to the unziped project directory uisng cd:  
	`cd ./[Your directory]`  
2. Varify that node.js and npm are runnign correctly, if either command does not come back with a version number try installing node.js again from the link above  
	a. Run the command: `node --version`  
	b. Run the command: `npm --version`  
2. Install the dependencies uing the included Makefile  
	a. Run the command: `make install`

---
**Test the application in your browser**

1. From the terminal start the backend and frontend servers by running the command: `make start`  
2. Test the backend by visiting this url in your browser: `http://localhost:5001/api/gemini`  
	a. It should return a 200 OK status
	b. If it does not you may need to change your port number that runs the application. If this is the case please see my video  
3. Test the frontend by visiting this url in your browser: `http://localhost:3000/`
	a. You should see the frontend load correctly
4. Test an AI querry by entering some keywords into the box and hitting enter, or the generate button
5. It shoudl return a result, or if it returns that the Google Geminie servers are busy this shoudl also be considered a succsses because it shows that the applicatiuon can reach Gemini.  
6. Stop the frontend and backend servers by running this cammand in your terminal: `make stop`

---
**Test the application in electron**

1. From the terminal run: `make testElectron`  
2. Wait for it to load and the application window should automatically appear.  
3. Run a qurry by entering some keywords into the text box and hitting enter or the generate button  
4. If you get a result back or it says that the Gemini servers are busy this is considered a succsses.
5. Close the application window.
6. Run this command in the terminal to make sure everythign correctly stopped: `make stop`

---
**Build the applictions for your OS**

1. In the terminal run the command: `make build`  
	a. Wait for the command to finish  
2. Open the project directory in your file viewer and you shoudl now see a dist folder
	a. Open that folder and locate the .dmg file
3. Double click the file, then drag the app icon into your Applications folder.  
	a. Wait for the computer to finish copying the fiels over, you may need to enter your Mac admin password  
4. Close the installer window  
5. Right click the mounted disk icon on your desktop or in Finder, then select "Eject"  
6. Delete the original .dmg file  
7. Run the application lie you would any other Mac application  

---
**Uninstall Node.js, (Reccommended for the average user, but not required)**

#Uninstall Node.js with these commands on Mac (If installed with nvm)
1. run this command `nvm list`  
2. Uninstall the verison you want to uninstall with this command (replace X's with verion number): `nvm uninstall xx.xx.x`  
3. Delete nvm with this command: `rm -rf ~/.nvm`


#Uninstall Node.js with these commands on Mac (If installed directly via website):  
1. Remove the Node binaries and package runners  
`sudo rm -rf /usr/local/bin/node`  
`sudo rm -rf /usr/local/bin/npm`  
`sudo rm -rf /usr/local/bin/npx`  
`sudo rm -rf /usr/local/bin/corepack`  

2. Remove core libraries and header files  
`sudo rm -rf /usr/local/lib/node_modules`  
`sudo rm -rf /usr/local/include/node`  
`sudo rm -rf /usr/local/share/man/man1/node.1`  

3. Remove local user configuration files and history  
`rm -rf ~/.npm`  
`rm -rf ~/.npmrc`  
`rm -rf ~/.node-gyp`  
`rm -rf ~/.node_repl_history`  

---
**Varify that node has been removed by running the following commands (they should return command not found):**  
	a. `node -v`  
	b. `npm -v`


