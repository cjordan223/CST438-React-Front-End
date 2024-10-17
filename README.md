
# CST 438-Student Portal (React Front End)

This repository contains the frontend code for the registrar service, built with React. It interfaces with the backend and provides a lightweight, comprehensive system for students, admins, and instructors.
JWT authentication is used to determine user permissions, e.g. a student can't view or modify and class page, that is only viewable if you log in as an instructor. Selenium testing implemented to test all front end features.
A comprehensive SRS for the entire project can be found [here](https://drive.google.com/file/d/1b7quP2i_la1p6O8vwE_39JpEkyJJYrwj/view?usp=sharing).

## Technologies Used:

-   React
-   Bootstrap
-   Selenium

## Getting Started: 
#### As a precursor you should have the backend running already and listening on 8080.
Detailed instructions can be found on the backend repo [here](https://github.com/cjordan223/CST438-Spring-Backend).

## Prerequisites:

-   Node.js

## Installation:

``` 
git clone https://github.com/cjordan223/cst438_Assignment3
cd cst438_Assignment3 
npm install
npm start
```
### Run the application:

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

![SCR-20241016-thcw](https://github.com/user-attachments/assets/3988dd0d-9dad-4c53-a2d6-c97ee8c91d9e)


#### You have 3 options for login:
| Username | Password |
|--|--|
| Instructor | jgross@csumb.edu | jgross2024 |
| Student | user@csumb.edu | user |
| Admin | admin@csumb.edu | admin |

 
    
You can test the basic functions of each role and how you can update the information:


<img width="1179" alt="SCR-20241016-tkjb" src="https://github.com/user-attachments/assets/f4787ae2-97f5-40e8-a6b2-818e511c52fc">

<img width="856" alt="SCR-20241016-tkgt" src="https://github.com/user-attachments/assets/00c6742a-0d6a-4007-881d-aac162b7f17d">

<img width="1203" alt="SCR-20241016-tjxo" src="https://github.com/user-attachments/assets/5317714d-c2cc-443b-a7b2-7a968ea9c3fa">

<img width="1169" alt="SCR-20241016-tjzy" src="https://github.com/user-attachments/assets/cdefaa78-3b42-436e-bc4e-3502a7a3a57f">

<img width="1114" alt="SCR-20241016-tkco" src="https://github.com/user-attachments/assets/144a7dee-5e1d-45f9-ba1e-b70eb96443c0">

<img width="1163" alt="SCR-20241016-tkbn" src="https://github.com/user-attachments/assets/8fc98a0f-3892-40a8-973b-bbbade1159f3">


#### Once you're finished, down both servers. 
## Acknowledgments:

This project was completed by Conner Jordan, Erin Smajdek and Nima Mahaloo equally.
