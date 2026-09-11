*Development*

To test using electron during development:  
	1. Open a terminal and navigate to the project root and run:  
		`npm run dev:frontend`  
	2. Open a new terminal and navigate to the project root and run:  
		`npm run dev:electron`  
	3. Watch a new window with the application open

---

*Building*

To build the installer run this from the project root:  
	`npm run dist`  

This will create a folder inside your project called "ai-seo-content-engine"  
You can then find the built files inside this directory in the subdirectory dist/

---

Some files will be stored for the app to work such as responseHistory (the history of all the ai responses)  
The save location will vary by OS here is the location for each of the common OS:

on linux the storage directory for the testing environment and built project is:  
`~/.config/ai-seo-content-engine/`

On Windows the storage directory for the testing environment and built project is:  
`C:\Users\<username>\AppData\Roaming\ai-seo-content-engine\`

On Mac the storage directory for the testing environment and built project is:  
`~/Library/Application Support/ai-seo-content-engine/`

---
