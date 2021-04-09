<p align="center"><img src="https://user-images.githubusercontent.com/34866653/114220820-1a41f980-998a-11eb-91f5-9b14abde98d7.png"></p>

## SocioMark
SocioMark is an all-new social media platform that prioritizes image ownership and security using Machine Learning. By watermarking each image upon upload, the hash of the user is permanently encoded within the image and essentially lets photographers copyright their images. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/e16b536d-64db-41c7-86dd-c29f1c48bc98/deploy-status)](https://app.netlify.com/sites/sociomark/deploys)
![Heroku](http://heroku-badge.herokuapp.com/?app=sociomark-backend&style=flat&svg=1)
![GitHub closed issues](https://img.shields.io/github/issues-closed/Open-Sourced-Olaf/SocioMark?style=flat)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/Open-Sourced-Olaf/SocioMark?color=green?style=flat)

## 👨‍💻 What it does
- SocioMark is essentially a social media platform that lets users create an account to upload and share images. Every image upload is added to the user's profile and can be shared with other users. 
- After uploading the image, the user's unique hash created from their profile is encoded within the image. Users can `verify` an image's `copyright` and see if it matches with the user who uploaded the image. If the verification fails, users can flag an image to be taken down, protecting the original creator's copyright.

## ⚛ Tech Stack
- Frontend : Reactjs
- Backend : FastAPI,Python
- Database : MongoDB

## 💻 Run the project locally
- Clone the repo ```https://github.com/MLH-Fellowship/SocioMark.git```
- Navigate to the ```SocioMark/backend```
- Run command to install all the dependencies  ```pip install -r requirements.txt``` 
- Navigate to ```http://localhost:8000/docs``` to view the swagger api end points
- Navigate to the ```SocioMark/frontend```
- Run command to install all the dependencies  ```npm install``` 
- Run command ```npm start```
- Navigate to ```http://localhost:3000/```

## 🚩 How to Contribute
- Fork and clone the repository git clone https://github.com/Open-Sourced-Olaf/SocioMark
- Create a branch git checkout -b "branch_name"
- Make changes in that branch
- Add and commit your changes with git add and git commit -m "your commit message"
- Then push the changes into your branch git push origin branch_name
- Now you can create a PR using that branch in our repository.
- 🎉 you have successfully contributed to this project.

## 🤓 Future Improvements
- Follower functionality that improves interaction between users and lets users customize their feed pages
- Increase complexity of encoding user hash into image
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
