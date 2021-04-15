## Contribution Guidelines:

SocioMark is a social media platform that lets you upload images and secures them by embedding a personalised hash.

## Contribution Steps:

- If you want to work on an existing issue to make a contribution head to the [issue section](https://github.com/MLH-Fellowship/SocioMark/issues) for the project.
If you are working on a pre-existing issue, let us know by assigning it to yourself or let us know in the comment.
- You can also submit a issue to work on. The issue can be realted to any topic from bug, refactoring, UI changes, etc.
- If you have any question regarding the issues, feel free to ask in the issue's comment section.

- ### In order to start working on the issue:
  - Create a fork of the project.
  - Clone the repo locally with `git clone https://github.com/<YOUR_USERNAME>/SocioMark.git`
  - Checkout in a new branch with `git checkout -b <YOUR_BRANCH_NAME>`
  - Make the required changes
  - Add and commit your changes with `git add <changes>` and `git commit -m "your commit message"`
  - Then push the changes into your branch `git push origin branch_name`
  - Before making a PR, make sure your copy of the project is up-to-date with the main project.
  - If forked project is up-to-date with the main project, go ahead and make the PR.
  - #### If there has been any commit since you forked the project, there might be some conflicts while making the PR. In case of any conflicts:
    - Set an upstream with `git remote add upstream https://github.com/MLH-Fellowship/SocioMark.git`
    - Checkout to main branch and `git pull upstream main`
    - Checkout to the branch you were working on
    - Rebase it with the main branch with `git rebase main`
    - If there is any conflicts while rebasing, resolve them, and continue the rebase
    - Test it locally
    - If everything is working as expected, push it to the origin
    - Make a PR to the main project
- Once the PR is made, someone from our team will review it and approve/request changes accordingly.
