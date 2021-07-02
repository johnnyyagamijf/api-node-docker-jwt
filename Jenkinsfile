pipeline {
    agent any
    stages {
        // Obtém as credenciais para a conta desejada
        stage('Get source') {
            steps {
                git url: 'https://github.com/johnnyyagamijf/api-node-docker-jwt.git', branch: 'master'
            }
        }
        // Pipeline da aplicação
        stage('Docker build') {
             steps {
                        dockerapp = docker.build("johnmdcampos/api-node-docker-jwt:${env.BUILD_ID}",
						'-f .')  
                   }
			}
   			
			stage('Docker push') {
                steps {
                        docker.withRegistry('https://registry.hub.docker.com','dockerhub')
                        dockerapp.push('latest')
						dockerapp.push("${env.BUILD_ID}")						
                    }
                }
        }
    }
