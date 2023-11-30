@Library('campudus-jenkins-shared-lib') _

final String SERVICE = "calculator"

final String IMAGE_NAME = "campudus/calculator"

final String REMOTE_HOST = 'campudus@grud.buschjostventile.de'
final String REMOTE_PORT = '2222'
final String SSH_CREDENTIALS = "jenkins-remote-deployment-buschjost"

final String REMOTE_PATH = '~/calculator'

pipeline {
  agent { label 'agent1' }

  options {
    timeout(time: 5, unit: 'MINUTES')
    ansiColor('xterm')
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  environment {
    GIT_HASH = sh(returnStdout: true, script: 'git log -1 --pretty=%h').trim()
  }

  stages {
    stage('init') {
      steps {
        buildName "#${env.BUILD_NUMBER}"

        wrap([$class: 'BuildUser']) {
          buildDescription("triggered by: ${BUILD_USER}")
        }
      }
    }

    stage('pre-cleanup') {
      steps {
        sh "docker rmi -f \$(docker images -qa --filter=reference='${IMAGE_NAME}') || true"
      }
    }

    stage('build') {
      steps {
        sh "docker build -t ${IMAGE_NAME}:latest -f Dockerfile --rm ."
      }
    }

    stage('push') {
      steps {
        withDockerRegistry([credentialsId: "dockerhub", url: ""]) {
          sh "docker push ${IMAGE_NAME}:latest"
        }
      }
    }

    stage('deploy') {
      steps {
        sshagent(credentials: [SSH_CREDENTIALS]) {
          // create remote directory
          sh "ssh ${REMOTE_HOST} -p ${REMOTE_PORT} 'mkdir -p ${REMOTE_PATH}'"

          // copy files
          sh "scp -P ${REMOTE_PORT} ./docker-compose.yml ${REMOTE_HOST}:${REMOTE_PATH}"

          // pull image and start
          sh "ssh ${REMOTE_HOST} -p ${REMOTE_PORT} 'cd ${REMOTE_PATH} && docker-compose pull ${SERVICE}'"
          sh "ssh ${REMOTE_HOST} -p ${REMOTE_PORT} 'cd ${REMOTE_PATH} && docker-compose up -d --force-recreate ${SERVICE}'"
        }
      }
    }

    stage('post-cleanup') {
      steps {
        sh 'docker rmi $(docker images -f "dangling=true" -q) || true'
      }
    }
  }
}
