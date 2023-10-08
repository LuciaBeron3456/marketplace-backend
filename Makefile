# Makefile para pipeline_v2
CONTAINER_REGISTRY ?= us.gcr.io
GCP_PROJECT ?= gke-staging-001
CONTAINER_IMAGE_NAME ?= bnaconecta-server
COMMIT_TAG ?= $(shell git rev-parse HEAD)
DOCKER_TAG ?= v2.3.98
CI_TOKEN_TYPE ?= Job-Token

DOCKER_IMAGE ?= ${CONTAINER_REGISTRY}/${GCP_PROJECT}/${CONTAINER_IMAGE_NAME}:${DOCKER_TAG}
DOCKER_IMAGE_2 ?= ${CONTAINER_REGISTRY}/${GCP_PROJECT}/${CONTAINER_IMAGE_NAME}:${COMMIT_TAG}

.DEFAULT_GOAL:=help

.EXPORT_ALL_VARIABLES:

ifndef VERBOSE
.SILENT:
endif

# set default shell
SHELL=/bin/bash -o pipefail -o errexit

# HELP
# Genera un menu de ayuda de las tareas en el Makefile
# https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## Esta ayuda
	awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-0-9]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: im
.DEFAULT_GOAL := help

buildkit-image: ## Ejecuta docker build para empaquetar la aplicación
                @docker build -f Dockerfile-buildkit -t ${DOCKER_IMAGE} .

build-image: ## Ejecuta docker build para empaquetar la aplicación
	@docker build \
		--progress plain -t ${DOCKER_IMAGE} -t ${DOCKER_IMAGE_2} .

kustomize-set-image: ## Retorna el nombre de la imagen a utilizar
	echo -n REPLACE_ME=${DOCKER_IMAGE}

push-image: ## Publica la imagen docker en el registro configurado
	@docker push -a ${CONTAINER_REGISTRY}/${GCP_PROJECT}/${CONTAINER_IMAGE_NAME}

setup: docker-setup
	@docker-compose up --timeout 120  --app=0

run-dev: docker-setup ## Lanza la aplicación de forma local, incluyendo Postgres
	@docker-compose up --timeout 120  --build
	
run-db: docker-setup ## Lanza la BD pero no levanta la app
	@docker-compose up --timeout 120 --scale app=0
	
run-as-prod: docker-setup ## Lanza la aplicación de forma local, incluyendo Postgres
	@docker-compose up --timeout 120 --build

e2e: ## Ejecuta test de aceptación
	@echo "ok"

test: ## Ejecuta los tests unitarios
	@echo "ok"

docker-setup:
	@docker network create dev_network || true

.PHONY: all build-image push-image kustomize-set-image docker-compose test e2e

