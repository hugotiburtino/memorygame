pipeline {
  agent any
  stages {
    stage('Lint HTML') {
      steps {
        sh 'tidy -q -e index.html'
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
  }


}
