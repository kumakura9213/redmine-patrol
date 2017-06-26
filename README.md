# redmine-patrol

[![CircleCI](https://circleci.com/gh/kumakura9213/redmine-patrol.svg?style=svg)](https://circleci.com/gh/kumakura9213/redmine-patrol)

これは「Redmineに今日の作業記録を書いていない人にチャットワークで作業記録を書くようお願いするLambda関数」です。

## How to deploy

### :octocat: STEP 1. Clone

```sh
$ git clone https://github.com/kumakura9213/redmine-patrol.git
$ cd redmine-patrol
$ npm install
```

### :pencil: STEP 2. Edit config

```sh
$ cd redmine-patrol
$ cp template-env.yml env.yml
$ vi env.yml
$ cp config/template-default.json config/default.json
$ vi config/default.json
```

### :rocket: STEP 3. Deploy to AWS

```sh
$ cd redmine-patrol
$ ./node_modules/.bin/sls config credentials --provider aws --key XXX --secret XXX

# deploy for development
$ npm run deploy-dev

# deploy for production
$ npm run deploy-production
```

## How to cleanup

```sh
$ cd redmine-patrol

# remove for development
$ npm run remove-dev

# remove for production
$ npm run remove-production
```

## How to test

```sh
$ cd redmine-patrol
$ cp test/.template-env test/.env
$ vi test/.env
$ npm test
```
