# ScaleTech_Task

> Backend-> Node JS & Express JS

> Database-> MongoDB

## Installation process
#### install npm packages
    1. install packages
    cd ScaleTech_Task
    npm install
   
2. <b> Go to the ScaleTech_Task folder create .env for connection, PORT and MONGO_URL.
    
    ##### sample code for .env
    ```env
   MONGO_URL = mongodb://localhost:27017/vote
   PORT = 6000
    ```
3. <b>deploy this project</b> on your local server by using this command
    ```bash
    npm start

    
#### 1. Submit vote api use cases 
    1.If userId Or optionId not in the database
![image](https://user-images.githubusercontent.com/92462707/226905140-c2f0b198-99d9-44e7-ac35-6bf6660f5b25.png)
    2.Star must not be less than 0 or greater than 5.
![image](https://user-images.githubusercontent.com/92462707/226905450-d5967980-32eb-4a7e-b72e-78a42bd246ea.png)
    3. Submit vote successfully
![image](https://user-images.githubusercontent.com/92462707/226905842-f716eadc-1f82-4b82-a5be-0ebe7599aae0.png)
    4. User is trying to vote more stars than he has
![image](https://user-images.githubusercontent.com/92462707/226906259-6b25594d-e30c-47d9-9e18-5d0c563e251b.png)
    5. Use doesn't have the star to vote
![image](https://user-images.githubusercontent.com/92462707/226906433-764b8396-8d3e-4e46-a9e6-61348a47f5f1.png)

#### 2. Vote detail api use cases
    1.If no user has voted to any option yet.
![image](https://user-images.githubusercontent.com/92462707/226907435-6578b5c8-fff1-4330-84c9-16b998ad0178.png)
    2.Star must not be less than 0 or greater than 5.
![image](https://user-images.githubusercontent.com/92462707/226907196-87c1dff5-44fe-4cc5-aecc-5152de6a5bd5.png)  


  






