There are two routes /gemini and /history

---
geminiRouter

To check the health of the gemini router you can visit this url once the backend has been started.  
`http://localhost:,[your backend port number]/api/gemini`  

example response:  
	status: 200 OK  
	{  
		status: 'online',  
		message: 'Gemini endpoint is ready. Submit a POST request with keywords to generate content'  
	}  


This will trigger the GET type endpoint in the gemini router. To get a response from the gemini router use the same url but pass it some json body containing an array of keywords to trigger the post endpoint.

example response on success:  
	status: 200 OK  
	{  
	  "success": true,  
	  "keywordsUsed": [  
	    "automation"  
	  ],  
	  "generated": {  
	    "socialMediaPost": {  
	      "platform": "LinkedIn",  
	      "postText": "Are you ready to scale your business operations effortlessly? Discover how modern automation tools can streamline your workflow, save hundreds of hours, and boost overall productivity. Embrace the future of work today!",  
	      "hashtags": [  
	        "#Automation me=Automation me=BusinessGrowth me=Productivity me=TechTrends"  
	      ]  
	    },  
	    "blogArticle": {  
	      "title": "The Ultimate Guide to Business Automation in 2024",  
	      "metaDescription": "Learn how implementing automation can transform your business workflows, boost efficiency, and save valuable time with our comprehensive guide.",  
	      "body": "In today's fast-paced digital landscape, automation has evolved from a futuristic luxury to a core business necessity. Companies of all sizes are turning to automated systems to handle repetitive tasks, reduce human error, and free up valuable time for strategic growth. From workflow automation platforms to advanced AI-driven tools, automating routine operations allows teams to focus on high-impact initiatives. In this article, we explore the key benefits of automation, the top tools to consider, and a step-by-step approach to integrating automated workflows into your organization seamlessly."  
	    },  
	    "youtubeScript": {  
	      "title": "How to Master Automation and Save 10+ Hours Every Week!",  
	      "hook": "What if you could eliminate your most boring, repetitive daily tasks and reclaim 10 hours of your week? Stay tuned to learn how automation can change your workflow forever!",  
	      "outline": [  
	        "Introduction to Business Automation",  
	        "Top 3 Daily Tasks You Should Automate Right Now",  
	        "Best Free and Paid Automation Tools",  
	        "Step-by-Step Setup Guide",  
	        "Conclusion and Call to Action"  
	      ],  
	      "scriptBody": "Welcome back to the channel! Today, we are diving deep into the world of automation. If you feel overwhelmed by administrative work, emails, and data entry, this video is for you. First, let's break down what automation actually means for your daily routine. We will look at practical tools like Zapier and Make, and show you real-world examples of how to set up triggers and actions. By the end of this video, you will have a clear blueprint to automate your work and focus on what truly matters. Don't forget to like and subscribe!"  
	    }  
	  }  
	}  

example response on fail:  
	status: 500  
	{  
		success: false,  
		error: userErrorMessage,  
		details: err.message  
	}  

---
historyRouter

To see the health of the history endpoint visit:  
`http://localhost:,[your backend port number]/api/gemini`  

This will visit the GET endpoint of the historyRouter. The history endpoint does not have a dedicated health check but if the connection is correct it should return status 200 OK, and maybe some file names from the responseHistory userDirectoy or responseHistory directory in the backend.

The function of this endpoint is to return all the file names inside the history directory to be displayed.
This way the files can be represented without opening them all.

example response on success:  
	status: 200 OK
	{  
		success: true,  
		fileNames: [09-10-2026_18-44-48.json, 09-10-2026_18-46-28.json]  
	}  

example response on fail:  
	status: 500  
	{
		success: false,
		error: 'Failed to retrieve history files',
		details: err.message
	}

When you want to get the contents of the file back visit the POST endpoint on the same url as above.  
Put the file name in the json body of the request.  
This will return the exact contents of a single file in the response histoy.  

example response on success:  
	status: 200 OK  
	{  
	  "success": true,  
	  "keywordsUsed": [  
	    "automation"  
	  ],  
	  "generated": {  
	    "socialMediaPost": {  
	      "platform": "LinkedIn",  
	      "postText": "Are you ready to scale your business operations effortlessly? Discover how modern automation tools can streamline your workflow, save hundreds of hours, and boost overall productivity. Embrace the future of work today!",  
	      "hashtags": [  
	        "#Automation me=Automation me=BusinessGrowth me=Productivity me=TechTrends"  
	      ]  
	    },  
	    "blogArticle": {  
	      "title": "The Ultimate Guide to Business Automation in 2024",  
	      "metaDescription": "Learn how implementing automation can transform your business workflows, boost efficiency, and save valuable time with our comprehensive guide.",  
	      "body": "In today's fast-paced digital landscape, automation has evolved from a futuristic luxury to a core business necessity. Companies of all sizes are turning to automated systems to handle repetitive tasks, reduce human error, and free up valuable time for strategic growth. From workflow automation platforms to advanced AI-driven tools, automating routine operations allows teams to focus on high-impact initiatives. In this article, we explore the key benefits of automation, the top tools to consider, and a step-by-step approach to integrating automated workflows into your organization seamlessly."  
	    },  
	    "youtubeScript": {  
	      "title": "How to Master Automation and Save 10+ Hours Every Week!",  
	      "hook": "What if you could eliminate your most boring, repetitive daily tasks and reclaim 10 hours of your week? Stay tuned to learn how automation can change your workflow forever!",  
	      "outline": [  
	        "Introduction to Business Automation",  
	        "Top 3 Daily Tasks You Should Automate Right Now",  
	        "Best Free and Paid Automation Tools",  
	        "Step-by-Step Setup Guide",  
	        "Conclusion and Call to Action"  
	      ],  
	      "scriptBody": "Welcome back to the channel! Today, we are diving deep into the world of automation. If you feel overwhelmed by administrative work, emails, and data entry, this video is for you. First, let's break down what automation actually means for your daily routine. We will look at practical tools like Zapier and Make, and show you real-world examples of how to set up triggers and actions. By the end of this video, you will have a clear blueprint to automate your work and focus on what truly matters. Don't forget to like and subscribe!"  
	    }  
	  }  
	}  

example response on fail:  
	status: 500  
	{  
		success: false,  
		error: userErrorMessage,  
		details: err.message  
	}  

example response on fail:
	status: 500
	{
		success: false,
		error: userErrorMessage,
		details: err.message
	}

When you want to delete a file visit this POST endpoint and pass it a file nmae in the body:  
`http://localhost:5000/api/history/delete`

This will delete the history file corrosponding to the  name you pass in the body.

example response on success:  
	status: 200 OK  
	{  
		success: true,  
		message: `File ${safeFileName} deleted successfully.`  
	}  

example response on fail:  
	status: 500  
	{  
		success: false,  
		error: userErrorMessage,  
		details: err.message  
	}  

---


