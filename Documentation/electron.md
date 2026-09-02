*Development*

starting the frontend for testing during development (assuming starting in the project root):  
	`cd ./frontend`  
	`npm run dev`

starting the backend for testing during development (assuming starting in the project root):  
	`cd ./backend`
	`npm run dev`

Running electron for testing (assuming starting in the project root):  
	`npm run dev:electron`

---

*Building*

To build the installer run this from the project root:  
	`npm run dist`  

This compiles your React frontend into frontend/dist/, bundles the Node backend and Electron runtime together, and generates an installer inside the root dist/ directory (.exe on Windows or .dmg on macOS).


