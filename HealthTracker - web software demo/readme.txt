Web Software project "Health Tracker" for Codeblock Oy. 

The application tracks the users' health with user inputted values for sleep, exercise and eating. 
Health Tracker utilizes APIs and databases in the storing of user data. Health Tracker is currently down, 
but below are instructions for running the application locally.



How to run the application locally:

1. Make a database to elephantSQL
2. Run following SQL Statements:

        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(320) NOT NULL,
        password CHAR(60) NOT NULL
        );


        CREATE TABLE morning_reports(
        id SERIAL PRIMARY KEY,
        user_id INT,
        date DATE,
        sleep_duration FLOAT,
        sleep_quality INT,
        generic_mood INT
        );

        CREATE TABLE evening_reports(
        id SERIAL PRIMARY KEY,
        user_id INT,
        date DATE,
        exercise_time FLOAT,
        studying_time FLOAT,
        eating_reqularity INT,
        eating_quality INT,
        generic_mood INT
        );

3. Add database credentials to ./config/config.js (REAL DATABASE, NOT TEST DATABASE)
4. Run app.js


How to test the application:

1. Make a new database to elephantSQL with the same SQL statements as shown above.
2. Add database credentials to ./config/config.js (to TEST DATABASE)
3. If you are using VSCode, paste the following object into your launch.json file (if you dont have launch.json file, make one in path ./vscode/launch.json)

{
            "type": "pwa-node",
            "request": "launch",
            "name": "Run tests",
            "program": "${workspaceFolder}",
            "cwd": "${workspaceFolder}",
            "runtimeExecutable": "deno",
            "runtimeArgs": [
                "test",
                "--inspect-brk=127.0.0.1:9229",
                "--allow-all",
                "--unstable"
            ],
            "env": {"TEST_ENVIRONMENT":true},
            "attachSimplePort": 9229,
            "outputCapture": "std"
          },

And use 'Run tests' to launch the application.

Another way to run test is typing the following command in your command prompt:
    'deno test --inspect-brk=127.0.0.1:9229 --allow-all --unstable' 
and also remember to set environment variable TEST_ENVIONMENT=true.

I recommend using Visual Studio code, as it's much simpler.


If you are having problems running or testing the application, please contact me: miku@sevon.net

