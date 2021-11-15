
# Google Drive clone

Manage files and folders using firebase authentication with Cloud firestore and Storage as a backend for the sake of learning firebase API and getting familiar with handling databases and authentication. 




## live project

[Google Drive clone - live demo](https://google-drive-clone-firebase.netlify.app/)


## Features

- Sign in /log in /log out
- Add folders
- Add files
- Delete files
- Replace existing files on upload


## Tech Stack

**Client:** ReactJS, Bootstrap v5

**Server:** Google's Firebase products v9


## Lessons Learned

* Using authentication with firebase and how to implement the logic with other similar products.
* Setting and getting data from a database and showcasing it on the frontend.
* writing basic database API to manage several layers of data with relation to each other.
* basic understanding of writing security rules to manage multiple users access to their data.
* Usage of React router v5 to redirect and display the relevant data in different routes according to user's privileges.
* Bootstrap React usage- how to build mvp fast.

## Resources

* [cloud firestore](https://firebase.google.com/docs/firestore)  
* [storage](https://firebase.google.com/docs/storage)  
* [authentication](https://firebase.google.com/docs/auth)  
* [react router v5](https://v5.reactrouter.com/web/guides/quick-start)
* [Bootstrap React](https://react-bootstrap.github.io/)


## Run Locally

Clone the project

```bash
  git clone git@github.com:TalmSnir/Googl-Drive-Clone.git
```

Go to the project directory

```bash
  cd google-drive-clone-firebase
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


