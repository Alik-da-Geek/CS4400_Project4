# CS4400_Project4
## Ben's Workspace

- Client
  - Packages needed: axios, react-scripts
  - Set up client app: `cd` to `/client` then execute `npm start`
- Server
  - Packages needed: express, mysql, cors
  - Set up server: `cd` to `/server` then execute `npm start`



- If you encounter the following error when initializing the server 
> *Client does not support authentication protocol requested by server; consider upgrading MySQL client*

Try executing the following commands in the MySQL Workbench
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
```

- Make sure to not sync the node_modules directories to the remote repo since they are local packages for node.js by executing the following commands
  - Check for an existing `.gitignore` file in the project root directory
  - If you don't see one, create a new one by executing `touch .gitignore`
  - Add the following line to the file `**/node_modules`
  - `cd` to `/client` then execute `git rm -r --cached node_modules`
  - `cd` to `/client` then execute `git rm -r --cached node_modules`

- How to debug the client web page?
  - Right click and select `inspect`, log will be printed in the *console* page