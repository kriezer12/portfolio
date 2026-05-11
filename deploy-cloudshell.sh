#!/bin/bash

# Kenneth Osorio Portfolio - Cloud Shell Deployment Script
# This script deploys the Next.js portfolio to Google Cloud Run.

# Set your Project ID if not already set in gcloud
PROJECT_ID=$(gcloud config get-value project)
SERVICE_NAME="portfolio-nextjs"
REGION="asia-southeast1"

echo "🚀 Starting deployment for project: $PROJECT_ID"

# 1. Enable necessary Google Cloud APIs
echo "🔧 Enabling required APIs..."
gcloud services enable run.googleapis.com \
                       containerregistry.googleapis.com \
                       cloudbuild.googleapis.com

# 2. Build and Push the container image using Cloud Build
# We use a multi-stage Dockerfile or the default Next.js build
echo "📦 Building container image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# 3. Deploy to Cloud Run
# Note: We are deploying with --allow-unauthenticated for a public portfolio.
# We also prompt for the GOOGLE_AI_API_KEY if it's not provided as an env var.
echo "🌐 Deploying to Cloud Run..."

gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production"

echo "✅ Deployment complete!"
echo "🔗 Your portfolio is live at the URL shown above."
echo ""
echo "⚠️  IMPORTANT: Don't forget to set your AI API keys in the Cloud Run Console:"
echo "gcloud run services update $SERVICE_NAME --set-env-vars GOOGLE_AI_API_KEY=YOUR_KEY --region $REGION"
