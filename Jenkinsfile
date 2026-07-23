pipeline {

    agent any

    stages {

        stage('Clone Code') {
            steps {
                sh '''
                echo "Cloning code..."
                checkout scm
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh '''
                echo "Building Spring Boot Backend..."
                cd backend
                mvn clean package -DskipTests
                cd ..
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                echo "Building React Frontend..."
                cd frontend
                npm install
                npm run build
                cd ..
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                echo "Building Docker images..."
                docker compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "Deploying application..."
                docker compose down || true
                docker compose up -d
                '''
            }
        }

        stage('Check Status') {
            steps {
                sh '''
                docker ps
                '''
            }
        }
    }

    post {
        success {
            sh 'echo "Deployment Successful"'
        }

        failure {
            sh 'echo "Deployment Failed"'
        }
    }
}