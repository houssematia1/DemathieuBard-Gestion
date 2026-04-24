name: CD - Build Push Deploy Local

on:
  push:
    branches: [ "main" ]

jobs:
  docker-and-deploy:
    runs-on: [self-hosted, Windows, X64]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Docker login
        run: docker login -u "${{ secrets.DOCKERHUB_USERNAME }}" -p "${{ secrets.DOCKERHUB_TOKEN }}"
        shell: powershell

      # ─────────────────────────────────────────────
      # BUILD JARS
      # ─────────────────────────────────────────────

      - name: Build user-service jar
        run: |
          docker run --rm `
            -v "${{ github.workspace }}\user-service:/app" `
            -w /app `
            maven:3.9.9-eclipse-temurin-17 `
            mvn -B clean package -DskipTests
        shell: powershell

      - name: Build api-gateway jar
        run: |
          docker run --rm `
            -v "${{ github.workspace }}\api-gateway:/app" `
            -w /app `
            maven:3.9.9-eclipse-temurin-17 `
            mvn -B clean package -DskipTests
        shell: powershell

      - name: Build plan-service jar
        run: |
          docker run --rm `
            -v "${{ github.workspace }}\plan-service:/app" `
            -w /app `
            maven:3.9.9-eclipse-temurin-17 `
            mvn -B clean package -DskipTests
        shell: powershell

      - name: Build notification-service jar
        run: |
          docker run --rm `
            -v "${{ github.workspace }}\notification-service:/app" `
            -w /app `
            maven:3.9.9-eclipse-temurin-17 `
            mvn -B clean package -DskipTests
        shell: powershell

      - name: Build affaire-service jar
        run: |
          docker run --rm `
            -v "${{ github.workspace }}\affaire-service:/app" `
            -w /app `
            maven:3.9.9-eclipse-temurin-17 `
            mvn -B clean package -DskipTests
        shell: powershell

      - name: Build controle-service jar
        run: |
          docker run --rm `
            -v "${{ github.workspace }}\controle-service:/app" `
            -w /app `
            maven:3.9.9-eclipse-temurin-17 `
            mvn -B clean package -DskipTests
        shell: powershell

      # ─────────────────────────────────────────────
      # BUILD IMAGES
      # ─────────────────────────────────────────────

      - name: Build user-service image
        run: docker build -t docker.io/${{ secrets.DOCKERHUB_USERNAME }}/user-service:${{ github.sha }} ./user-service
        shell: powershell

      - name: Build api-gateway image
        run: docker build -t docker.io/${{ secrets.DOCKERHUB_USERNAME }}/api-gateway:${{ github.sha }} ./api-gateway
        shell: powershell

      - name: Build plan-service image
        run: docker build -t docker.io/${{ secrets.DOCKERHUB_USERNAME }}/plan-service:${{ github.sha }} ./plan-service
        shell: powershell

      - name: Build notification-service image
        run: docker build -t docker.io/${{ secrets.DOCKERHUB_USERNAME }}/notification-service:${{ github.sha }} ./notification-service
        shell: powershell

      - name: Build affaire-service image
        run: docker build -t docker.io/${{ secrets.DOCKERHUB_USERNAME }}/affaire-service:${{ github.sha }} ./affaire-service
        shell: powershell

      - name: Build controle-service image
        run: docker build -t docker.io/${{ secrets.DOCKERHUB_USERNAME }}/controle-service:${{ github.sha }} ./controle-service
        shell: powershell

      - name: Build frontend image
        run: docker build -t docker.io/${{ secrets.DOCKERHUB_USERNAME }}/frontend:${{ github.sha }} ./frontend-angular
        shell: powershell

      # ─────────────────────────────────────────────
      # TRIVY SECURITY SCAN
      # (bloque le pipeline si vulnérabilité CRITICAL)
      # ─────────────────────────────────────────────

      - name: Scan user-service with Trivy
        run: |
          docker run --rm `
            -v /var/run/docker.sock:/var/run/docker.sock `
            aquasec/trivy:latest image `
            --exit-code 1 `
            --severity CRITICAL `
            --no-progress `
            docker.io/${{ secrets.DOCKERHUB_USERNAME }}/user-service:${{ github.sha }}
        shell: powershell

      - name: Scan api-gateway with Trivy
        run: |
          docker run --rm `
            -v /var/run/docker.sock:/var/run/docker.sock `
            aquasec/trivy:latest image `
            --exit-code 1 `
            --severity CRITICAL `
            --no-progress `
            docker.io/${{ secrets.DOCKERHUB_USERNAME }}/api-gateway:${{ github.sha }}
        shell: powershell

      - name: Scan plan-service with Trivy
        run: |
          docker run --rm `
            -v /var/run/docker.sock:/var/run/docker.sock `
            aquasec/trivy:latest image `
            --exit-code 1 `
            --severity CRITICAL `
            --no-progress `
            docker.io/${{ secrets.DOCKERHUB_USERNAME }}/plan-service:${{ github.sha }}
        shell: powershell

      - name: Scan notification-service with Trivy
        run: |
          docker run --rm `
            -v /var/run/docker.sock:/var/run/docker.sock `
            aquasec/trivy:latest image `
            --exit-code 1 `
            --severity CRITICAL `
            --no-progress `
            docker.io/${{ secrets.DOCKERHUB_USERNAME }}/notification-service:${{ github.sha }}
        shell: powershell

      - name: Scan affaire-service with Trivy
        run: |
          docker run --rm `
            -v /var/run/docker.sock:/var/run/docker.sock `
            aquasec/trivy:latest image `
            --exit-code 1 `
            --severity CRITICAL `
            --no-progress `
            docker.io/${{ secrets.DOCKERHUB_USERNAME }}/affaire-service:${{ github.sha }}
        shell: powershell

      - name: Scan controle-service with Trivy
        run: |
          docker run --rm `
            -v /var/run/docker.sock:/var/run/docker.sock `
            aquasec/trivy:latest image `
            --exit-code 1 `
            --severity CRITICAL `
            --no-progress `
            docker.io/${{ secrets.DOCKERHUB_USERNAME }}/controle-service:${{ github.sha }}
        shell: powershell

      - name: Scan frontend with Trivy
        run: |
          docker run --rm `
            -v /var/run/docker.sock:/var/run/docker.sock `
            aquasec/trivy:latest image `
            --exit-code 1 `
            --severity CRITICAL `
            --no-progress `
            docker.io/${{ secrets.DOCKERHUB_USERNAME }}/frontend:${{ github.sha }}
        shell: powershell

      # ─────────────────────────────────────────────
      # PUSH IMAGES (seulement si Trivy OK)
      # ─────────────────────────────────────────────

      - name: Push user-service
        run: docker push docker.io/${{ secrets.DOCKERHUB_USERNAME }}/user-service:${{ github.sha }}
        shell: powershell

      - name: Push api-gateway
        run: docker push docker.io/${{ secrets.DOCKERHUB_USERNAME }}/api-gateway:${{ github.sha }}
        shell: powershell

      - name: Push plan-service
        run: docker push docker.io/${{ secrets.DOCKERHUB_USERNAME }}/plan-service:${{ github.sha }}
        shell: powershell

      - name: Push notification-service
        run: docker push docker.io/${{ secrets.DOCKERHUB_USERNAME }}/notification-service:${{ github.sha }}
        shell: powershell

      - name: Push affaire-service
        run: docker push docker.io/${{ secrets.DOCKERHUB_USERNAME }}/affaire-service:${{ github.sha }}
        shell: powershell

      - name: Push controle-service
        run: docker push docker.io/${{ secrets.DOCKERHUB_USERNAME }}/controle-service:${{ github.sha }}
        shell: powershell

      - name: Push frontend
        run: docker push docker.io/${{ secrets.DOCKERHUB_USERNAME }}/frontend:${{ github.sha }}
        shell: powershell

      # ─────────────────────────────────────────────
      # DEPLOY TO KUBERNETES
      # ─────────────────────────────────────────────

      - name: Check kubectl context
        run: kubectl config current-context
        shell: powershell

      - name: Deploy user-service
        run: |
          kubectl set image deployment/user-service user-service=docker.io/${{ secrets.DOCKERHUB_USERNAME }}/user-service:${{ github.sha }} -n btp-app
          kubectl rollout status deployment/user-service -n btp-app --timeout=180s
        shell: powershell

      - name: Deploy api-gateway
        run: |
          kubectl set image deployment/api-gateway api-gateway=docker.io/${{ secrets.DOCKERHUB_USERNAME }}/api-gateway:${{ github.sha }} -n btp-app
          kubectl rollout status deployment/api-gateway -n btp-app --timeout=180s
        shell: powershell

      - name: Deploy plan-service
        run: |
          kubectl set image deployment/plan-service plan-service=docker.io/${{ secrets.DOCKERHUB_USERNAME }}/plan-service:${{ github.sha }} -n btp-app
          kubectl rollout status deployment/plan-service -n btp-app --timeout=180s
        shell: powershell

      - name: Deploy notification-service
        run: |
          kubectl set image deployment/notification-service notification-service=docker.io/${{ secrets.DOCKERHUB_USERNAME }}/notification-service:${{ github.sha }} -n btp-app
          kubectl rollout status deployment/notification-service -n btp-app --timeout=180s
        shell: powershell

      - name: Deploy affaire-service
        run: |
          kubectl set image deployment/affaire-service affaire-service=docker.io/${{ secrets.DOCKERHUB_USERNAME }}/affaire-service:${{ github.sha }} -n btp-app
          kubectl rollout status deployment/affaire-service -n btp-app --timeout=180s
        shell: powershell

      - name: Deploy controle-service
        run: |
          kubectl set image deployment/controle-service controle-service=docker.io/${{ secrets.DOCKERHUB_USERNAME }}/controle-service:${{ github.sha }} -n btp-app
          kubectl rollout status deployment/controle-service -n btp-app --timeout=180s
        shell: powershell

      - name: Deploy frontend
        run: |
          kubectl set image deployment/frontend frontend=docker.io/${{ secrets.DOCKERHUB_USERNAME }}/frontend:${{ github.sha }} -n btp-app
          kubectl rollout status deployment/frontend -n btp-app --timeout=180s
        shell: powershell