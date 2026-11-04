pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
        ENV_FILE = '/home/ubuntu/notesapp.env'
        COMPOSE_PARALLEL_LIMIT = '1'
    }

    stages {
        stage('Check Docker') {
            steps {
                sh '''
                    docker --version
                    docker compose version
                    docker ps
                '''
            }
        }

        stage('Validate Configuration') {
            steps {
                sh '''
                    docker compose \
                    --env-file "$ENV_FILE" \
                    -f "$COMPOSE_FILE" config -q
                '''
            }
        }

        stage('Build Images') {
            steps {
                sh '''
                    docker compose \
                    --env-file "$ENV_FILE" \
                    -f "$COMPOSE_FILE" build
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    docker compose \
                    --env-file "$ENV_FILE" \
                    -f "$COMPOSE_FILE" \
                    up -d --remove-orphans
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    docker compose \
                    --env-file "$ENV_FILE" \
                    -f "$COMPOSE_FILE" ps

                    for i in $(seq 1 30); do
                        if curl -fsS http://localhost/ > /dev/null; then
                            echo "Frontend is responding!"
                            exit 0
                        fi
                        sleep 5
                    done

                    echo "Frontend health check failed"
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'Notes App deployment successful!'
        }
        failure {
            echo 'Deployment failed. Check Jenkins console output.'
        }
    }
}
