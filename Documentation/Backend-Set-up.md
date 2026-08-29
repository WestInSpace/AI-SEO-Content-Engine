Setting up the bckend .env file:

1. navigate to the /backend directory  
2. rename the .env-fill file to .env  
3. Insert your Google gemini api key at the end of the GEMINI_API_KEY= line with no space  
	(Your rate limits and key managment can be found in Google AI studio at : `https://aistudio.google.com`)  
4. Put your desired port number for the backend at the end of the PORT= line with no space  

---

Setting up the backend config files:

1. Naviagte to the /backend directory  
2. rename the config-fill directory to config

*GeminiConfig*

1. Fill in the google gemini version you would like to use in single quotes.  
	recommended (as of 8/29/2026): 'gemini-3.6-flash'


---

To run the backend navigate to the root folder and run: make startBack  
To see the values that are being returned visit:  
http://localhost:,[your backend port number]/api/response/gemini

---
