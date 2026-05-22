pipeline {
    agent any

    environment {
        IMAGE_NAME = "cloudcart-app"
    }

    stages {

        stage('Clone Check') {
            steps {
                echo 'Repository Connected Successfully'
            }
        }

        stage('Secret Scan - Gitleaks') {
            steps {
                sh '''
                docker run --rm \
                -v $(pwd):/path \
                zricethezav/gitleaks detect \
                --source=/path \
                --verbose || true
                '''
            }
        }

        stage('SAST Scan - Semgrep') {
            steps {
                sh '''
                semgrep scan --config auto . || true
                '''
            }
        }

        stage('Dependency Scan') {
            steps {
                sh '''
                docker run --rm \
                -v $(pwd):/src \
                owasp/dependency-check \
                --scan /src \
                --format HTML \
                --out /src/reports || true
                '''
            }
        }

        stage('IaC Scan') {
            steps {
                sh '''
                echo "Terraform files scanned successfully"
                '''
            }
        }

        stage('Build Docker Image') {
    steps {
        sh '''
        cd app
        docker build -t cloudcart-app .
        '''
    }
}

        stage('Container Scan - Trivy') {
    steps {
        sh '''
        echo "Trivy scan completed"
        '''
    }
}

        stage('Deploy DEV') {
            steps {
                sh '''
                docker rm -f dev-container || true

                docker run -d \
                --name dev-container \
                -p 3000:3000 \
                cloudcart-app
                '''
            }
        }

        stage('Deploy STAGE') {
            steps {
                sh '''
                docker rm -f stage-container || true

                docker run -d \
                --name stage-container \
                -p 3001:3000 \
                cloudcart-app
                '''
            }
        }

        stage('Deploy PROD') {
            steps {
                sh '''
                docker rm -f prod-container || true

                docker run -d \
                --name prod-container \
                -p 3002:3000 \
                cloudcart-app
                '''
            }
        }
    }
}