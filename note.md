# note

これは作業時のメモです。  
たぶん当人にしか価値のない資料です。

## Log -Create Project~Deploy-

デプロイすると分かるけど、ServerlessはCloudFormationを利用してデプロイしている。  
リソースやイベントの設定に応じて、使うサービスが変わっていくけど、デフォルトでは以下を作るっぽい。

* AWS::CloudFormation::Stack  
Deploy用のスタックを作成する。このスタックが他のAWSサービスを
* AWS::IAM::Role  
Deploy用のロールを作成する。
* AWS::S3::Bucket  
Deploy用のバケットを作成する。
* AWS::Lambda::Function  
Deploy対象のLambda関数を作成する。
* AWS::Logs::LogGroup  
Deploy対象のLambda関数が出力するログのグループを作成する。

```sh
$ cd redmine-patrol
$ npm init -y
$ npm install --save config japanese-holidays moment request
$ npm install --save-dev serverless
$ ./node_modules/serverless/bin/serverless create --template aws-nodejs
Serverless: Generating boilerplate...
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.15.3
 -------'

Serverless: Successfully generated boilerplate for template: "aws-nodejs"
Serverless: NOTE: Please update the "service" property in serverless.yml with your service name

$ ./node_modules/.bin/sls config credentials --provider aws --key XXX --secret XXX
$ ./node_modules/.bin/sls deploy -r ap-northeast-1 -v
Serverless: Packaging service...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - redmine-patrol-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - redmine-patrol-dev
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (12.64 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - redmine-patrol-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - RedmineDashpatrolLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - RedmineDashpatrolLogGroup
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - RedmineDashpatrolLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - RedmineDashpatrolLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - RedmineDashpatrolLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - RedmineDashpatrolLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Events::Rule - RedmineDashpatrolEventsRuleSchedule1
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - RedmineDashpatrolLambdaVersionMe3ytCTBsPqdztRZReIVUCKe7VTkz6eS7TcWSdHrUv0
CloudFormation - CREATE_IN_PROGRESS - AWS::Events::Rule - RedmineDashpatrolEventsRuleSchedule1
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - RedmineDashpatrolLambdaVersionMe3ytCTBsPqdztRZReIVUCKe7VTkz6eS7TcWSdHrUv0
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - RedmineDashpatrolLambdaVersionMe3ytCTBsPqdztRZReIVUCKe7VTkz6eS7TcWSdHrUv0
CloudFormation - CREATE_COMPLETE - AWS::Events::Rule - RedmineDashpatrolEventsRuleSchedule1
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - RedmineDashpatrolLambdaPermissionEventsRuleSchedule1
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Permission - RedmineDashpatrolLambdaPermissionEventsRuleSchedule1
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Permission - RedmineDashpatrolLambdaPermissionEventsRuleSchedule1
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - redmine-patrol-dev
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - redmine-patrol-dev
Serverless: Stack update finished...
Service Information
service: redmine-patrol
stage: dev
region: ap-northeast-1
api keys:
  None
endpoints:
  None
functions:
  redmine-patrol: redmine-patrol-dev-redmine-patrol

Stack Outputs
RedmineDashpatrolLambdaFunctionQualifiedArn: arn:aws:lambda:ap-northeast-1:XXXXXXXXXXXX:function:redmine-patrol-dev-redmine-patrol:1
ServerlessDeploymentBucketName: redmine-patrol-dev-serverlessdeploymentbucket-1qgyx4d7ulf51
```

## Log -Remove-

CloudFormationで管理させているものはまとめて削除される。  
CloudFormationがインフラの構成管理ツールっていうのがよく分かる。

```sh
$ cd redmine-patrol
$ ./node_modules/.bin/sls remove -v
Serverless: Getting all objects in S3 bucket...
Serverless: Removing objects in S3 bucket...
Serverless: Removing Stack...
Serverless: Checking Stack removal progress...
CloudFormation - DELETE_IN_PROGRESS - AWS::CloudFormation::Stack - redmine-patrol-dev
CloudFormation - DELETE_IN_PROGRESS - AWS::Lambda::Permission - RedmineDashpatrolLambdaPermissionEventsRuleSchedule1
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - RedmineDashpatrolLambdaVersionMe3ytCTBsPqdztRZReIVUCKe7VTkz6eS7TcWSdHrUv0
CloudFormation - DELETE_COMPLETE - AWS::Lambda::Permission - RedmineDashpatrolLambdaPermissionEventsRuleSchedule1
CloudFormation - DELETE_IN_PROGRESS - AWS::Events::Rule - RedmineDashpatrolEventsRuleSchedule1
CloudFormation - DELETE_COMPLETE - AWS::Events::Rule - RedmineDashpatrolEventsRuleSchedule1
CloudFormation - DELETE_IN_PROGRESS - AWS::Lambda::Function - RedmineDashpatrolLambdaFunction
CloudFormation - DELETE_COMPLETE - AWS::Lambda::Function - RedmineDashpatrolLambdaFunction
CloudFormation - DELETE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - DELETE_IN_PROGRESS - AWS::Logs::LogGroup - RedmineDashpatrolLogGroup
CloudFormation - DELETE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
CloudFormation - DELETE_COMPLETE - AWS::Logs::LogGroup - RedmineDashpatrolLogGroup
CloudFormation - DELETE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
Serverless: Stack removal finished...
```
