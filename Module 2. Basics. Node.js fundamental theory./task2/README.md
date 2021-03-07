# Task 2

Write a program which should do the following:

* Read the content of csvfile from./csvdirectory. Example: https://epa.ms/nodejs19-hw1-ex1
* Use the **csvtojson** package (https://github.com/Keyang/node-csvtojson) to convert csvfile to **json** object.
* Write the **csv** file content to a new **txt** file. Use the following format: https://epa.ms/nodejs19-hw1-ex2.
* Do not load all the content of the **csv** file into RAM via stream (read/write file content line by line).
* In case of read/write errors, log them in the console.
* The program should be started via **npm script** using **nodemon** (i.e. npm run task2).
