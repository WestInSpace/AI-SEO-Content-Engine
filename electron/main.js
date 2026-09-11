import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Get Wriable directory created by the os for this app
const userDataPath = app.getPath('userData');
const configPath = path.join(userDataPath, 'config.json');

<<<<<<< Updated upstream
=======
//ensure the history folder exists on startup
if(!fs.existsSync(responseHistory)){
	fs.mkdirSync(responseHistory, { recursive: true });
}

//pass the folder path to Express
process.env.RESPONSE_HISTORY = responseHistory;

>>>>>>> Stashed changes
function getStoredApiKey(){
	if(fs.existsSync(configPath)){
		try{
			const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
			return data.GEMINI_API_KEY || '';
		}catch (err){
			return '';
		}
	}
	return '';
}

//set runtime process.env before launching Express server
process.env.GEMINI_API_KEY = getStoredApiKey();

let mainWindow;

async function createWindow(){
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});
	
	const isDev = process.env.NODE_ENV === 'development';

	if(isDev){
		mainWindow.loadURL('http://localhost:3000');
		//mainWindow.webContents.openDevTools();
	}else{
		const indexPath = path.join(app.getAppPath(), 'frontend', 'dist', 'index.html');
        mainWindow.loadFile(indexPath);
	}
}

//IPC handlers for react frontend
ipcMain.handle('get-api-key', () => getStoredApiKey());

ipcMain.handle('save-api-key', (event, apiKey) => {
	try{
		const config = { GEMINI_API_KEY: apiKey };
		fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
		process.env.GEMINI_API_KEY = apiKey;
		return true;
	}catch(err){
		console.error('Failed to save API key:', err);
		return false;
	}
});

app.whenReady().then(async () => {
	try{
		//start Express backend
		await import('../backend/server.js');
	}catch(err){
		console.error('Failed to launch backend server:', err);
	}

	createWindow();

	app.on('activate', () => {
		if(BrowserWindow.getAllWindows().length === 0){
			createWindow();
		}
	});

});

// Quit when all windows are closed (exits Node process and frees ports)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});





