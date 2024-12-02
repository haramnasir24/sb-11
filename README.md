# SB-XI
Official Website for Science Bee 11 by NUST Science Society (Team Web and IT)


# Stack:

•⁠  ⁠Next.js, TailwindCSS, Typescript, ShadCN UI.

•⁠  ⁠Backend: Nodemailer, Google APIs for Google Sheets

•⁠  ⁠React Hook-Form, Zod for schema validation.

•⁠  ⁠Vercel for deployment


# Instructions:

•⁠ Clone the repository

git clone https://github.com/haramnasir24/sb-11.git 

(Note: Front-end team will work in /front-end branch and back-end team will work in /back-end branch)

•⁠ To create a branch, use this command:

`git branch <branch_name>`

•⁠ Switch to the newly created branch using:

`git checkout <branch_name>`

•⁠ Install dependencies (Note: Use pnpm, not npm)

`pnpm i`

• ⁠Pull the Latest Code (Ensure your branch is up-to-date with the main branch)

Configure git pull to use a rebase strategy for cleaner commit history (run this once per local repo):

`git config pull.rebase true`

Then, pull the latest code from the main branch:

`git pull origin main`

•⁠ Make Commits using this command: (We are using pnpm cz with Commitizen for standardized commit messages. Avoid using version control directly)

`pnpm cz`

• ⁠Create a Pull Request (PR):
Once your work is complete, push your branch and create a pull request for review.

# Additional Notes:

Commit Guidelines: Follow the commit message format enforced by Commitizen.
