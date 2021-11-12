# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [x] Run `npm install` to install your dependencies.
- [x] Build your database executing `npm run migrate`.
- [x] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs` , and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [x] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [x] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [x] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env. SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [x] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [x] Check Codegrade before the deadline to compare its results against your local tests.
- [x] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [x] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

  With **sessions-based authentication**, the server is responsible for keeping track of whether users are logged in or not, and the authentication method is reliant on cookies, making it almost exclusively usable in browser or browser-like environments, only. With **JSON Web Tokens**, the server sends a token to a client, and the client is responsible for saving it locally so that the logged-in state can be remembered.

  The advantages of the token based approach mostly come down to compatibility with a wider range of hardware/software, but a drawback is that tokens have a lifetime of whatever they were assigned upon creation, and cannot be invalidated outside of making a blacklist containing all the tokens to be voided, which is time consuming. A cookie, however, can be invalidated by the server at the server's discretion, though that means the server will need to have a system in place to keep track of all currently signed-in users, which can get annoying as your server starts to scale up.

2. What does `bcryptjs` do to help us store passwords in a secure manner?

  `bcryptjs` is a library that allows us to create and compare password hashes so we can scramble passwords for storage, instead of saving them in plain text. As a server manager, storing passwords in plain text is horrible practice, as if our database gets hacked, the hackers will end up having the login information of all our users -- a horrible security situation!

3. How are unit tests different from integration and end-to-end testing?

  - **Unit tests** are for ensuring individual units of our code function correctly in isolation.
  - **Integration tests** are for verifying that multiple different units of code work together as expected.
  - **End-to-end tests** are for testing our application front-to-back in the manner that a user would interact with it.

4. How does _Test Driven Development_ change the way we write applications and tests?

  **Test Driven Development** is a process where developers write tests for features they plan to implement _before_ actually creating said features in the first place. It is a 3-part process, which goes as follows:

  1. **RED PHASE** - The developer writes a test for a feature they want to implement; because this feature is not yet a reality, the test fails, which is where it gets its name from. The goal is to think about things that can go wrong, accounting for edge cases ahead of time. There is a limit to this, though, as according to true TDD standards, a developer should only write as much test code as it takes for the test to fail.

  2. **GREEN PHASE** - The developer shifts to writing production code, with the goal of only writing enough code to make their test in the RED PHASE pass.

  3. **REFACTORING PHASE** - With a working test, and functional production code, the developer is now free to reformat and improve their production code, with the sound knowledge that should they make a mistake or break their code in any way, their test will inform them of the problem right when it arises, preventing most errors from going unnoticed, assuming the test was good in the first place.
