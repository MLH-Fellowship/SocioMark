<p align="center"><img src="https://user-images.githubusercontent.com/34866653/114220820-1a41f980-998a-11eb-91f5-9b14abde98d7.png"></p>

# SocioMark
A social-media platform that lets you upload images and secure them with a personalized encryption. Your assets will always be yours, regardless of who posts it!

[![Netlify Status](https://api.netlify.com/api/v1/badges/e16b536d-64db-41c7-86dd-c29f1c48bc98/deploy-status)](https://app.netlify.com/sites/sociomark/deploys)
![Heroku](http://heroku-badge.herokuapp.com/?app=sociomark-backend&style=flat&svg=1)
![GitHub closed issues](https://img.shields.io/github/issues-closed/Open-Sourced-Olaf/SocioMark?style=flat)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/Open-Sourced-Olaf/SocioMark?color=green?style=flat)

<img src="https://user-images.githubusercontent.com/64848982/114246636-b8e15100-99b0-11eb-8cad-177589b2dd18.png">

## 👨‍💻 What it does
- SocioMark is essentially a social media platform that lets users create an account to upload and share images. Every image upload is added to the user's profile and can be shared with other users. 
- After uploading the image, the user's unique hash created from their profile is encoded within the image. Users can `verify` an image's `copyright` and see if it matches with the user who uploaded the image. If the verification fails, users can flag an image to take down, protecting the original creator's copyright.

<img src="https://user-images.githubusercontent.com/64848982/114246722-f1812a80-99b0-11eb-8d79-705978fc712f.png">

## 📱 Progressive WebApp
SocioMark is now a Progressive WebApp for better accessibility and user experience. It allows users to install the app directly from the web to their desktops/home screens and provides the native app-like experience. SocioMark is fully responsive, compatible and provides users with the same experience across tablets, mobile devices, and desktops

<p align="center">
  <img alt="Light" src="https://user-images.githubusercontent.com/34866653/114988100-8dc89700-9eb3-11eb-892a-217aa0b5622c.jpg" width="45%">
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Dark" src="https://user-images.githubusercontent.com/34866653/114988153-a0db6700-9eb3-11eb-81d8-1a84eae83aa3.png" width="50%">
</p>


## ⚛ Tech Stack
- Frontend : ReactJS (JavaScript), Tailwind CSS
- Backend : FastAPI (Python3)
- Database : MongoDB
- Image Processing : OpenCV (Python3)

## 💻 Run the project locally
- Clone the repo ```https://github.com/MLH-Fellowship/SocioMark.git```
- Navigate to ```SocioMark/backend```
- Run command to install all the Python (Server) dependencies ```pip install -r requirements.txt``` 
- Navigate to ```http://localhost:8000/docs``` to view the Swagger API end-points
- Navigate to ```SocioMark/frontend```
- Run command to install all the JavaScript (Client) dependencies ```npm install``` 
- Run command ```npm start```
- Navigate to ```http://localhost:3000/```

## 🚩 How to Contribute
- Fork and clone the repository ```git clone https://github.com/MLH-Fellowship/SocioMark.git```
- Create a branch ```git checkout -b "branch_name"```
- Make changes in that branch
- Add and commit your changes with ```git add <changes>``` and ```git commit -m "your commit message"```
- Then push the changes into your branch ```git push origin branch_name```
- Now you can create a PR using that branch in our repository.
- 🎉 You have successfully contributed to this project.

## 🤓 Future Improvements
- Follower functionality that improves interaction between users and lets users customize their feed pages
- Implement pagination for feed
- Sharing functionality to share images outside of platform

## 🤔 Challenges
- One of the main challenges we ran into with this project is incorporating the numerous functions required of a social media platform.
- From login and registering authentication to implementing like and comment functionality for posts and even building user profiles, there are many parts to creating a viable social media app, and it took a lot of work to implement everything.
- Additionally, building the encoder required a lot of research and trial and error. Finally, integrating the frontend and the backend of the platform and debugging the full functionality proved to be a challenge as well.

## ✨ Credits
- [Aitik Gupta](https://github.com/aitikgupta)
- [Bodhisha Thomas](https://github.com/bodhisha)
- [Deepak Agrawal](https://github.com/DebugAgrawal)
- [Sumi Kolli](https://github.com/sgkolli535)
