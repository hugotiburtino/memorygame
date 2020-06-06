pipeline {
  agent any
  stages {
    stage('Install dev dependencies') {
      sh 'npm install'
    }
    stage('Lint HTML') {
      steps {
        sh 'npx html-validate index.html'
      }
    }
    stage('Lint JS') {
      steps {
        sh 'npx eslint js/app.js'
      }
    }
    stage('Upload to AWS') {
      steps {
        withAWS(credentials:'aws-static', region:'eu-central-1') {
          s3Upload(file:'css', bucket:'hugotiburtino-memorygame', path:'css')
          s3Upload(file:'img', bucket:'hugotiburtino-memorygame', path:'img')
          s3Upload(file:'js', bucket:'hugotiburtino-memorygame', path:'js')
          s3Upload(file:'index.html', bucket:'hugotiburtino-memorygame', path:'index.html')
        }
      }
    }
    stage('Clean') {
      steps {
        sh 'rm -rf node_modules'
      }
    }
  }


}
