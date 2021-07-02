pipeline {
    agent none
    stages {
        // Obtém as credenciais para a conta desejada
        stage('Get credentials') {
            agent any
            steps {
                // Script para selecionar a conta que irá utilizar pela branch
                script {
                    switch (env.BRANCH_NAME) {
                        // Branch master (descomente abaixo a conta que for utilizar no projeto)
                        case 'master':
                            env.ACCOUNT_ID = "ssdssd"
                            break
                        // Qualquer outra branch não especificada
                        default:
                            env.ACCOUNT_ID = 'sdsassda'
                            break
                    }
                }
            }
        }
        // Pipeline da aplicação
        stage('Application pipeline') {

            // Execução da imagem docker, seguir os passos abaixo, mas sempre inserindo as informações do seu projeto.
            agent {
                docker {
                    alwaysPull true
                    args '--memory=2048m -u root --privileged -v /var/run/docker.sock:/var/run/docker.sock '
                   image 'docker:git'
                }
            }

            stages {
       
                // Stage de build do projeto dentro do Docker
                stage('Build') {
                    steps {
                        sh 'chmod +x Dockerfile'    
                        sh "docker build -t api-docker -f ./Dockerfile ."   
                        sh "docker tag api-docker api-docker:latest"
                        sh "docker push api-docker:latest"    
                    }
                }

                //Stage de Deploy, seguir os passos abaixo, mas sempre inserindo as informações do seu projeto.
                stage('Deploy') {
                    when {
                        anyOf {
                            branch 'master'
                            branch 'release'
                            branch 'develop'
                        }
                    }
                 }
            }
        }
    }
}
