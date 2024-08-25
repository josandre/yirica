#!/bin/sh

RESOURCE_GROUP_NAME=hotel-hub-rg
APP_SERVICE_PLAN_NAME=hotel-hub-plan
REGISTRY_NAME=hotelhubregistry
APP_NAME=hotelHubApp
IMAGE_NAME=hotel-hub
IMAGE_TAG=latest

PLAN_EXISTS=$(az appservice plan show --name $APP_SERVICE_PLAN_NAME --resource-group $RESOURCE_GROUP_NAME --query "name" --output tsv 2>/dev/null)

if [ -z "$PLAN_EXISTS" ]; then
  echo "Creating App Service Plan..."
  az appservice plan create --name $APP_SERVICE_PLAN_NAME \
                            --resource-group $RESOURCE_GROUP_NAME \
                            --location centralus \
                            --sku B1
else
  echo "App Service Plan $APP_SERVICE_PLAN_NAME exists."
fi

ACR_EXISTS=$(az acr list --resource-group $RESOURCE_GROUP_NAME --query "[?name=='$REGISTRY_NAME'].name" --output tsv)

if [ -z "$ACR_EXISTS" ]; then
  echo "Creating Azure Container Registry..."
  az deployment group create --resource-group $RESOURCE_GROUP_NAME \
                             --template-file infra/azure/container-registry.json \
                             --parameters registryName=$REGISTRY_NAME
else
  echo "Azure Container Registry $REGISTRY_NAME already exists."
fi

REGISTRY_USERNAME=$(az acr credential show --name $REGISTRY_NAME --query "username" --output tsv)
REGISTRY_PASSWORD=$(az acr credential show --name $REGISTRY_NAME --query "passwords[0].value" --output tsv)

APP_EXISTS=$(az webapp show --name $APP_NAME --resource-group $RESOURCE_GROUP_NAME --query "name" --output tsv 2>/dev/null)

if [ -z "$APP_EXISTS" ]; then
  echo "Creating App Service..."
  az deployment group create --resource-group $RESOURCE_GROUP_NAME \
                             --template-file infra/azure/app-service.json \
                             --parameters appName=$APP_NAME \
                                          hostingPlanName=$APP_SERVICE_PLAN_NAME \
                                          registryName=$REGISTRY_NAME \
                                          registryUsername="$REGISTRY_USERNAME" \
                                          registryPassword="$REGISTRY_PASSWORD" \
                                          imageName=$IMAGE_NAME \
                                          imageTag=$IMAGE_TAG
else
  echo "App Service $APP_NAME already exists."
fi
