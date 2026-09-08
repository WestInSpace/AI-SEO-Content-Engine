Setting up the Makefile

1. Open the Makefile in the home directory  
2. At the very top of the Makefile change the port numbers to match your chosen ports that you put in the frontend and backend .env files  

---

Using the Makefile

run the command in the termianl for your chosen task:

1.  `make install`			->	Install all project dependencies  
2.  `make startBack` 		->	Start only the backend server with logging  
3.  `make stopBack`			->	Stop only the backend server  
4.  `make startFront`		->	Start only the frontend server with logging  
5.  `make stopFront`		->	Stop only the frontend server  
6.  `make start`			->	Start both the frontend and backend serverswith logging  
7.  `make stop`				->	Stop both the frontend and backend servers  
8.  `make testElectron`		->	Start the frontend and run the application in election for testing  
9.  `make build`			-> 	Build the application for the current OS with electron
10. `make buildWin`			->	Build the application for Windows OS with electron
11. `make buildLin`			->	Build the application for the Linux OS with electron
12. `make buildMac`			->	Build the application for the Mac OS with electron
13. `make clearLogs`		->	Clear the local log files  
14. `make deleteLogs`		->	Delete the local log files




