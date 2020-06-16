<!-- PROJECT LOGO -->
<h1 align="center">CAS-FEE-2020 Project I</h1>
<p align="center">
  <img src="public/assets/img/notes-logo.png" alt="CAS-FEE-2020">
</p>

<!-- GETTING STARTED -->
## Introduction

With this application you can manage your notes or to do's. Add new notes, set an expiration date and a priority. Your daily tasks are marked, so you never lose track of your daily to do's. 

Sort your notes by creation date, finished date, priority or simply list your completed tasks in ascending or descending order.

<p align="center">
  <img src="public/assets/img/project-1-printscreen.png" alt="CAS-FEE-2020">
</p>

## Features
* CRUD operations - add, update, delete notes.
* Sort notes by date in ascending/descending order.
* Sort completed notes based on "completed date" in ascending/descending order.
* Sort notes based on creation date in ascending/descending order.
* Sort notes based on importance in ascending/descending order.
* Complete notes.
* Highlighted notes of your daily workload.

### Prerequisites

You need a pre-installed MongoDB and NODE.js. The installation of these components is not covered by this documentation. Follow the instructions on the official websites of these components. So let's get started and take notes!

### Installation
1. Clone the repo
```sh
git clone https://github.com/webrooster/CAS_Projekt1.git
```

2. Access directory
```sh
cd CAS_Projekt1
```

3. Install NPM packages
```sh
npm install
```

4. Start your local MongoDB
```sh
mongod-start
```

5. Start app
```sh
npm start
```

6. Visit your browser and type
```sh
localhost:3000
```

## Versions
```sh
Node Version: v12.14.0
NPM Version: 6.13.4
MongoDB Version: 4.2 Community Edition
```

## Browser Support
* Firefox Quantum - Version 68.4.1esr (64-bit)
* Google Chrome - Version 83.0.4103.97 (Official Build) (64-bit)
* Safari - Version 13.1.1 (15609.2.9.1.2)

## Known issues
* No date picker support on Safari Browsers.

## Author
Roland von Aesch

## License

Distributed under the MIT License. See `LICENSE` for more information.