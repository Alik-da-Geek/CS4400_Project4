# CS4400_Project4
## Ben's Workspace

- Client
  - Packages needed: axios, react-scripts
  - Set up client app: npm start
- Server
  - Packages needed: express, mysql, cors
  - Set up server: npm start



* If you encounter the following error when initializing the server
"Client does not support authentication protocol requested by server; consider upgrading MySQL client"

Try executing the following commands in the MySQL Workbench

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

** node_modules will not be synced to the remote repo