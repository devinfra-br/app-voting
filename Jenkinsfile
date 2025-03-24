pipeline {
    agent any

    environment {
        REGISTRY = "meu-repositorio-docker"
        BACKEND_IMAGE = "${REGISTRY}/backend:${env.BUILD_NUMBER}"
        FRONTEND_IMAGE = "${REGISTRY}/frontend:${env.BUILD_NUMBER}"
        WORKER_IMAGE = "${REGISTRY}/worker:${env.BUILD_NUMBER}"
        SEED_IMAGE = "${REGISTRY}/seed:${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Clonando código do branch ${env.BRANCH_NAME}"
                    checkout scm
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    echo "Executando testes para o backend (Python)"
                    dir('microservices/backend') {
                        sh 'pip install -r requirements.txt'
                        sh 'pytest'
                    }
                }
            }
        }

        stage('Test Frontend') {
            steps {
                script {
                    echo "Executando testes para o frontend (JavaScript)"
                    dir('microservices/frontend') {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Test Worker') {
            steps {
                script {
                    echo "Executando testes para o worker (Python)"
                    dir('microservices/worker') {
                        sh 'pip install -r requirements.txt'
                        sh 'pytest'
                    }
                }
            }
        }

        stage('Test Seed') {
            steps {
                script {
                    echo "Executando testes para o seed (JavaScript)"
                    dir('microservices/seed') {
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build & Push Backend') {
            steps {
                script {
                    echo "Construindo e enviando a imagem do backend"
                    sh "docker build -t ${BACKEND_IMAGE} ./microservices/backend"
                    sh "docker push ${BACKEND_IMAGE}"
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                script {
                    echo "Construindo e enviando a imagem do frontend"
                    sh "docker build -t ${FRONTEND_IMAGE} ./microservices/frontend"
                    sh "docker push ${FRONTEND_IMAGE}"
                }
            }
        }

        stage('Build & Push Worker') {
            steps {
                script {
                    echo "Construindo e enviando a imagem do worker"
                    sh "docker build -t ${WORKER_IMAGE} ./microservices/worker"
                    sh "docker push ${WORKER_IMAGE}"
                }
            }
        }

        stage('Build & Push Seed') {
            steps {
                script {
                    echo "Construindo e enviando a imagem do seed"
                    sh "docker build -t ${SEED_IMAGE} ./microservices/seed"
                    sh "docker push ${SEED_IMAGE}"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado para o branch ${env.BRANCH_NAME}"
        }
        failure {
            echo "Erro no pipeline!"
        }
    }
}
