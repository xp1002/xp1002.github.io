Partner:
    Name:Wanying He
    Name:Wenyu She 
    Name:Xiuping Tan

To create a empty database, we need to run (node makeDB.js) at the beginning to create the tableData first. Then the database will created. 

We did the extra credit for favorite and progress bar.

Our database file is called photos.db

After the database is created then we can run node server.js.


photobooth.html will go to the main page, after clicked enter will go to photo.css(file where all the functionality at).
    
File Structure:
    -----server.js, makeDB.js(database file), readme.md, photos.db
        ---/public (folder)
            --- all the photo we upload from the browser will end up in public folder
                photo.css, photo.html, photo.js(this 3 files for main page)
                photobooth.html, photobooth.css (this 2 files for enter page)
                font.css (create to get the font Dani provided)
            ---photobooth(folder): all the asset Dani provided

When we create the database, the database file name is photos.db
        
To get the asset photos, we use "../photobooth/favoritesIcon.png"

For the mobile version, we did a drop down menu for the sidebar (like upload photo function). So when the plus sign is clicked, the menu will overlay the photo. Since the assignment prompt only shows the first photo for the mobile version, so we set the first photo to display: block.

We linked the jQuery CDN but we have never use it since the assignment didn't allow to use.

To response a error message to user, we did an alert. So if user upload an photo that's already exisited or user wants to add to add tag that's already exisited it will pop up an alert window.