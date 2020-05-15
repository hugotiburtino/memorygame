pipeline {
  agent any
  stages {
    stage('Upload to AWS') {
      steps {
        withAWS(credentials:'aws-static', region:'') {
          s3Upload(file:'css', bucket:'hugotiburtino-memorygame', path:'css')
        }
      }
    }
  }


}
