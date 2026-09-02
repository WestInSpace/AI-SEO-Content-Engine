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
9.  `make build`			-> 	Build the application with electron to obtain .exe  
10. `make clearLogs`		->	Clear the local log files  
11. `make deleteLogs`		->	Delete the local log files




