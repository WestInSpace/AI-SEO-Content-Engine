#Port configuration
BACKEND_PORT := 5000
FRONTEND_PORT := 3000

.PHONY: install startBack stopBack startFront stopFront start stop testElectron build clearLogs deleteLogs

# Install project dependencies
install:
	@echo "Installing backend dependancies . . ."
	@cd ./backend && npm install
	@echo "Installing frontend dependancies . . ."
	@cd ./frontend && npm install

# Start the backend running and redirect logs to log files
startBack:
	@mkdir -p ./logs/
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Starting backend server..." >> ./logs/backend.log
	@cd ./backend && nohup npm run dev < /dev/null >> ../logs/backend.log 2>&1 &
	@echo "Backend server running, check logs for output."
	@echo "[`date +'%Y-%m-%d %H:%M:%S'`] Backend server running" >> ./logs/backend.log

# Stop the backend running
stopBack:
	@echo "Stopping backend server on port $(BACKEND_PORT) . . ."
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Stopping backend server..." >> ./logs/backend.log
	-@PID=$$(fuser $(BACKEND_PORT)/tcp 2>/dev/null | xargs); \
	if [ -n "$$PID" ]; then \
		PPID=$$(ps -o ppid= -p $$PID 2>/dev/null | xargs); \
		kill -15 $$PPID $$PID 2>/dev/null || true; \
		sleep 0.5; \
		kill -9 $$PPID $$PID 2>/dev/null || true; \
	fi
	-@fuser -k -n tcp $(BACKEND_PORT) >> ./logs/backend.log 2>&1 || true
	@echo "[`date +'%Y-%m-%d %H:%M:%S'`] Backend server stopped." >> ./logs/backend.log

#Start the frontend running
startFront:
	@mkdir -p ./logs/
	@echo "Starting frontend server . . ."
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Starting frontend server..." >> ./logs/frontend.log
	@cd ./frontend && nohup npm run dev < /dev/null >> ../logs/frontend.log 2>&1 &
	@echo "Frontend running. See logs for output."
	@echo "[`date +'%Y-%m-%d %H:%M:%S'`] Frontend server running" >> ./logs/frontend.log

#Stop the frontend server
stopFront:
	@echo "Stopping frontend server on port $(FRONTEND_PORT) . . ."
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Stopping frontend server..." >> ./logs/frontend.log
	-@PID=$$(fuser $(FRONTEND_PORT)/tcp 2>/dev/null | xargs); \
	if [ -n "$$PID" ]; then \
		PPID=$$(ps -o ppid= -p $$PID 2>/dev/null | xargs); \
		kill -15 $$PPID $$PID 2>/dev/null || true; \
		sleep 0.5; \
		kill -9 $$PPID $$PID 2>/dev/null || true; \
	fi
	-@fuser -k -n tcp $(FRONTEND_PORT) >> ./logs/frontend.log 2>&1 || true
	@echo "[`date +'%Y-%m-%d %H:%M:%S'`] Frontend server stopped." >> ./logs/frontend.log
	@echo "Frontend Server Stopped!"

#Start the backend and frontend server.
start:
	@mkdir -p ./logs/
	@echo "Starting backend server . . ."
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Starting backend server..." >> ./logs/backend.log
	@cd ./backend && nohup npm run dev < /dev/null >> ../logs/backend.log 2>&1 &
	@echo "Starting frontend server . . ."
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Starting frontend server..." >> ./logs/frontend.log
	@cd ./frontend && nohup npm run dev < /dev/null >> ../logs/frontend.log 2>&1 &
	@echo "All services started, check logs for output."

#Stop the frontend and backend server
stop:
	@echo "Stopping backend server on port $(BACKEND_PORT) . . ."
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Stopping backend server..." >> ./logs/backend.log
	-@PID=$$(fuser $(BACKEND_PORT)/tcp 2>/dev/null | xargs); \
	if [ -n "$$PID" ]; then \
		PPID=$$(ps -o ppid= -p $$PID 2>/dev/null | xargs); \
		kill -15 $$PPID $$PID 2>/dev/null || true; \
		sleep 0.5; \
		kill -9 $$PPID $$PID 2>/dev/null || true; \
	fi
	-@fuser -k -n tcp $(BACKEND_PORT) >> ./logs/backend.log 2>&1 || true
	@echo "[`date +'%Y-%m-%d %H:%M:%S'`] Backend server stopped." >> ./logs/backend.log
	
	@echo "Stopping frontend server on port $(FRONTEND_PORT) . . ."
	@echo -e "\n[`date +'%Y-%m-%d %H:%M:%S'`] Stopping frontend server..." >> ./logs/frontend.log
	-@PID=$$(fuser $(FRONTEND_PORT)/tcp 2>/dev/null | xargs); \
	if [ -n "$$PID" ]; then \
		PPID=$$(ps -o ppid= -p $$PID 2>/dev/null | xargs); \
		kill -15 $$PPID $$PID 2>/dev/null || true; \
		sleep 0.5; \
		kill -9 $$PPID $$PID 2>/dev/null || true; \
	fi
	-@fuser -k -n tcp $(FRONTEND_PORT) >> ./logs/frontend.log 2>&1 || true
	@echo "[`date +'%Y-%m-%d %H:%M:%S'`] Frontend server stopped." >> ./logs/frontend.log

	@echo "All services stopped."

# run the testing in electron
testElectron:
	@echo "Starting frontend server..."
	@npm run dev:frontend &
	@sleep 5; #wait for frontend to stabalize
	@echo "Frontend now running."
	@echo "starting electron application in..."
	@npm run dev:electron
	@echo "Application now running in electron."

#Build the application in electron
build:
	@echo "Building application in Electron..."
	@npm run dist
	@echo "Build Complete!"

#Delete the content of the log files without deleting the file
clearLogs:
	@echo "Clearing all log file contents"
	@echo "" > ./logs/frontend.log
	@echo "" > ./logs/backend.log

#Delete all the local log files
deleteLogs:
	@echo "Deleting all log files"
	@rm -f $(ROOT_DIR)/logs/frontend.log
	@rm -f $(ROOT_DIR)/logs/backend.log


