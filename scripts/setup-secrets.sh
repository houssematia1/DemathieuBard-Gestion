#!/usr/bin/env bash
#
# setup-secrets.sh — Bootstrap des SealedSecrets de l'application BTP
#
# Applique les 8 SealedSecrets versionnes dans k8s/base/ sur un cluster.
# Idempotent : peut etre relance sans danger (kubectl apply).
#
# Prerequis :
#   - kubectl configure sur le bon cluster
#   - le controller Sealed Secrets installe dans kube-system
#     (sinon le script affiche les commandes Helm a executer et sort)
#
set -euo pipefail

NAMESPACE="btp-app"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=================================================="
echo " Bootstrap SealedSecrets — namespace ${NAMESPACE}"
echo " Repo root : ${REPO_ROOT}"
echo "=================================================="

# -------------------------------------------------------------------
# Etape 1 — Verification du controller Sealed Secrets
# -------------------------------------------------------------------
echo ""
echo "[1/4] Verification du controller Sealed Secrets..."

if ! kubectl get crd sealedsecrets.bitnami.com >/dev/null 2>&1; then
  echo "🔴 CRD sealedsecrets.bitnami.com absente : le controller n'est pas installe."
  echo ""
  echo "    Installez-le avec Helm :"
  echo "    helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets"
  echo "    helm repo update"
  echo "    helm install sealed-secrets-controller sealed-secrets/sealed-secrets \\"
  echo "      --namespace kube-system --set fullnameOverride=sealed-secrets-controller"
  echo ""
  exit 1
fi

RUNNING_PODS="$(kubectl get pods -n kube-system \
  -l app.kubernetes.io/name=sealed-secrets \
  --field-selector=status.phase=Running \
  --no-headers 2>/dev/null | wc -l | tr -d ' ')"

if [ "${RUNNING_PODS}" -lt 1 ]; then
  echo "🔴 Aucun pod sealed-secrets en Running dans kube-system."
  echo "    Verifiez : kubectl get pods -n kube-system -l app.kubernetes.io/name=sealed-secrets"
  exit 1
fi

echo "✅ Controller OK (${RUNNING_PODS} pod(s) Running)"

# -------------------------------------------------------------------
# Etape 2 — Verification du namespace applicatif
# -------------------------------------------------------------------
echo ""
echo "[2/4] Verification du namespace ${NAMESPACE}..."

if ! kubectl get namespace "${NAMESPACE}" >/dev/null 2>&1; then
  echo "Namespace ${NAMESPACE} absent : creation..."
  kubectl create namespace "${NAMESPACE}"
  echo "✅ Namespace ${NAMESPACE} cree"
else
  echo "✅ Namespace OK (${NAMESPACE} existe deja)"
fi

# -------------------------------------------------------------------
# Etape 3 — Apply des 8 SealedSecrets
# -------------------------------------------------------------------
echo ""
echo "[3/4] Application des SealedSecrets..."

SEALED_SECRETS=(
  "${REPO_ROOT}/k8s/base/mongodb/sealed-secret.yaml"
  "${REPO_ROOT}/k8s/base/rabbitmq/sealed-secret.yaml"
  "${REPO_ROOT}/k8s/base/shared/sealed-jwt-secret.yaml"
  "${REPO_ROOT}/k8s/base/user-service/sealed-secret.yaml"
  "${REPO_ROOT}/k8s/base/plan-service/sealed-secret.yaml"
  "${REPO_ROOT}/k8s/base/affaire-service/sealed-secret.yaml"
  "${REPO_ROOT}/k8s/base/controle-service/sealed-secret.yaml"
  "${REPO_ROOT}/k8s/base/notification-service/sealed-secret.yaml"
)

for file in "${SEALED_SECRETS[@]}"; do
  if [ ! -f "${file}" ]; then
    echo "⚠️  Fichier absent, ignore : ${file}"
    continue
  fi
  echo "  -> apply ${file#${REPO_ROOT}/}"
  kubectl apply -f "${file}"
done

# -------------------------------------------------------------------
# Etape 4 — Verification finale
# -------------------------------------------------------------------
echo ""
echo "[4/4] Verification des Secrets crees..."
sleep 3

EXPECTED_SECRETS=(
  "mongodb-secret"
  "rabbitmq-secret"
  "jwt-secret"
  "user-service-secret"
  "plan-service-secret"
  "affaire-service-secret"
  "controle-service-secret"
  "notification-service-secret"
)

MISSING=0
FOUND=0
for secret in "${EXPECTED_SECRETS[@]}"; do
  if kubectl get secret "${secret}" -n "${NAMESPACE}" >/dev/null 2>&1; then
    echo "  ✅ ${secret}"
    FOUND=$((FOUND + 1))
  else
    echo "  🔴 MANQUANT : ${secret}"
    MISSING=$((MISSING + 1))
  fi
done

echo ""
if [ "${MISSING}" -eq 0 ]; then
  echo "🟢 Bootstrap termine avec succes. ${FOUND}/8 Secrets en place."
  exit 0
else
  echo "🔴 Bootstrap incomplet. ${FOUND}/8 presents, ${MISSING} manquant(s)."
  exit 1
fi
