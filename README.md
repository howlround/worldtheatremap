# World Theatre Map

## Running the app

```bash
npm install
meteor
```

## Development

### Quick start

- Dependencies: Git, Meteor
- Fork and clone project
- `meteor npm install` and `meteor` to start the app

### 1. Install Git

- Check if git is already installed by opening `terminal` and typing `which git`. If you see see something like `/usr/bin/git` then git is already installed. If nothing is returned then complete the next step.
- Follow the instructions here: https://git-scm.com/downloads

### 2. Meteor

- `curl https://install.meteor.com/ | sh`

### 3. Fork and clone the project

To create your own app or to contribute changes to the World Theatre Map, first fork the project and clone the code locally

- Create a GitHub account or sign in with an existing account
- Go to https://github.com/howlround/worldtheatremap and click the `fork` button in the upper-right-hand corner
- Follow instructions to Clone or Download: https://help.github.com/articles/cloning-a-repository/

### 4. Copy and edit the settings file

- Make a copy of the `settings-default.json` file (can be any name you like, will be referred to as `settings.json` in this documentation)
- Currently all options are required

The options used in the settings.json file are:

````
{
  "AWSAccessKeyId": "",
  "AWSSecretAccessKey": "",
  "AWSRegion": "",
  "AWSSourceBucket": "",
  "AWSTargetBucket": "",
  "SendContentNotifications": false,
  "GoogleTranslateAPIKey": "",
  "public": {
    "AWSShareImageBucket": "",
    "WTMDataApi": "/graphql",
    "WTMDataApiAuth": "",
    "GoogleAnalytics": ""
  }
}
````

### 5. Start app

- Using a terminal, navigate into the cloned project directory (such as `cd worldtheatremap`)
- Type `meteor npm install`
- This command installs lots of dependencies and may take a few minutes.
- Type `meteor --settings settings.json` to start the app (where `settings.json` is the settings file you created in step 4)
- Using a browser navigate to http://localhost:3000

### 6. Meteor shell for creating admin users (optional)

If you need to create admin accounts you can either do it directly in the database using Mongo commands or using the Meteor shell

- Create an account on your new local version of the site (http://localhost:3000/join)
- Find the ObjectId of the user (either type Meteor.userId() in a browser console, or look in the user collection in Mongo)
- `meteor shell`
- `Roles.addUsersToRoles("xxxxxx", ['admin'])` where `xxxxxx` is the Mongo ObjectId of the user.

### 7. Styling and SCSS

We use scss for compiled css. All scss files can be found in `client/scss`.

If you are editing scss files you will need to use Grunt to compile into css.

- Grunt should already be installed when you ran `meteor npm install` above. You can run `which grunt` to verify it is installed.
- In a new terminal window, make sure you are in the project root directory and run the command `grunt`.
- Changes to the scss files will now be automatically compiled and the site should immediately update with the new styles.

### 8. Profile image uploading

- Images are hosted on Amazon S3 and use the Slingshot package to upload ().
- Our implementation resizes the images and resaves them on another S3 bucket.
- Our implementation is similar to this tutorial: http://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html
- The target bucket name and source bucket name can be configured in the settings.json file

### 9. Extracting strings for translation

- We use React Intl for translations. If you have added or altered code that uses a translatable string then you need to add it to the `i18n/en.json` file, and add translations to the appropriate translation files `i18n/es.json`, `i18n/fr.json`, etc.

## Deployment

If you would like to host your own version of the World Theatre Map, you will need to select a hosting provider and deploy your new app. We host the map on Galaxy: https://www.meteor.com/hosting

## Running tests

The World Theatre Map uses the Chimp testing framework for functional tests. Tests are written in Cucumber and located in the `tests` directory.

- Make sure the meteor app is running
- Run `meteor npm run chimp` in a terminal to run all tests
- You can run specific tests by adding a `@focus` tag to tests then running `meteor npm run chimp-watch`

## Scripts

To lint:

```bash
npm run lint
```

## Based on the Todo sample app from Meteor

- https://github.com/meteor/todos/tree/react
- Adapted from: https://github.com/meteor/todos/commit/3352ed5adccf55a624f84fd33e29b995bde38002
