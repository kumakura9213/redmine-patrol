# redmine-patrol

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
$ cp config/template-default.json config/default.json
$ vi config/default.json
```

### :rocket: STEP 3. Deploy to AWS

```sh
$ cd redmine-patrol
$ ./node_modules/.bin/sls config credentials --provider aws --key XXX --secret XXX
$ npm run deploy
```

## How to cleanup

```sh
$ cd redmine-patrol
$ npm run remove
```

## How to test

```sh
$ cd redmine-patrol
$ npm test
```
