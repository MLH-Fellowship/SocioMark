<p align="center"><img src="https://user-images.githubusercontent.com/34866653/114220820-1a41f980-998a-11eb-91f5-9b14abde98d7.png"></p>

## SocioMark
SocioMark is an all-new social media platform that prioritizes image ownership and security using Machine Learning. By watermarking each image upon upload, the hash of the user is permanently encoded within the image and essentially lets photographers copyright their images. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/e16b536d-64db-41c7-86dd-c29f1c48bc98/deploy-status)](https://app.netlify.com/sites/sociomark/deploys)
![Heroku](http://heroku-badge.herokuapp.com/?app=sociomark-backend&style=flat&svg=1)
![GitHub closed issues](https://img.shields.io/github/issues-closed/Open-Sourced-Olaf/SocioMark?style=flat)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/Open-Sourced-Olaf/SocioMark?color=green?style=flat)

## How it Works
1. Users are first shown a landing page that requires the user to Login, Register with a new account, or learn more about the platform.
2. For the user to have access to all the functionality of the platform, they will need to Login or Register.
3. If a user already has an account, they can Login on the Landing Page. Otherwise, the user will be taken to a Register page, where they can set up an account.
4. The first page after logging in or registering is the feed page, which features a continuous feed of posts and image uploads. At the top of the feed page is a component that allows the user to upload a new image. There is also a suggested users component that lets the user navigate to the profiles of other users. 
5. Each post has the user name and profile of the user who uploaded the image, a comment section, a like feature, a flag button that lets users report image reuploads, and a Verify button on hover that checks if the image has the correct user hash.
6. If an image is reported 3 times, it is automatically removed, because the image was most likely stolen and reuploaded.
7. When uploading an image, the user can choose a file and include a description. The user's personalized hash is encoded as a watermark in the image when it is uploaded.
8. The user's profile page includes a bio, profile picture, and a feed of their posts. Clicking on Edit Profile navigates the user to a separate page that lets them change their profile picture, user name, and bio. 
9. There is a navbar that lets users switch between the feed page (home), profile page, and a search bar to search for users. 

## Tech Stack
- Frontend : Reactjs
- Backend : FastAPI,Python
- Database : MongoDB

## Run the project locally
- Clone the repo ```https://github.com/Open-Sourced-Olaf/SocioMark.git```
- Navigate to the ```SocioMark/backend```
- Run command to install all the dependencies  ```pip install -r requirements.txt``` 
- Run the entry point ```python app/main.py```
- Navigate to ```http://localhost:8000/docs``` to view the swagger api end points

## How to Contribute
- Fork and clone the repository git clone https://github.com/Open-Sourced-Olaf/SocioMark
- Create a branch git checkout -b "branch_name"
- Make changes in that branch
- Add and commit your changes with git add and git commit -m "your commit message"
- Then push the changes into your branch git push origin branch_name
- Now you can create a PR using that branch in our repository.
- ðŸŽ‰ you have successfully contributed to this project.

## Future Improvements
- Follower functionality that improves interaction between users and lets users customize their feed pages
- Increase complexity of encoding user hash into image
- Sharing functionality to share images outside of platform

## Challenges
- One of the main challenges we ran into with this project is incorporating the numerous functions required of a social media platform.
- From login and registering authentication to implementing like and comment functionality for posts and even building user profiles, there are many parts to creating a viable social media app, and it took a lot of work to implement everything.
- Additionally, building the encoder required a lot of research and trial and error. Finally, integrating the frontend and the backend of the platform and debugging the full functionality proved to be a challenge as well.

## Credits
- [Aitik Gupta](https://github.com/aitikgupta)
- [Bodhisha Thomas](https://github.com/bodhisha)
- [Deepak Agrawal](https://github.com/DebugAgrawal)
- [Sumi Kolli](https://github.com/sgkolli535)
