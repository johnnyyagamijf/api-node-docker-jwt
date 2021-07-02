	pipeline {
		agent {
		    docker {
		      image 'node:lts-buster-slim'
		    }
		  }
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
                        sh 'chmod +x Dockerfile'    
                        sh "docker build -t johnmdcampos/api-node-docker-jwt:${env.BUILD_ID} -f ./Dockerfile ."   
                        sh "docker tag johnmdcampos/api-node-docker-jwt:${env.BUILD_ID} johnmdcampos/api-node-docker-jwt:${env.BUILD_ID}:latest"
                        sh "docker push johnmdcampos/api-node-docker-jwt:${env.BUILD_ID}:latest"  
				}
			}
		}
	}
