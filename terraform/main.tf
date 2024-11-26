locals {
  credentials      = "gcloud.json"
  database_version = "MYSQL_8_0"
}

terraform {
  backend "gcs" {
  
    bucket = "gold-studio-frontend-tfstate"
  }
}

provider "google" {
  credentials = file(local.credentials)
  project     = var.project
  region      = var.region
}

resource "google_cloud_run_v2_service" "default" {
  name     = var.service_name
  location = var.region
  template {
    service_account = var.service_account 
    scaling {
      min_instance_count = var.min_instance
      max_instance_count = var.max_instance
    }
    containers {
      image = var.image_name
      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }
      resources {
        limits = {
          memory = "512Mi"
          cpu    = "1"
        }
      }
      ports {    
        container_port = 80
    
      }
    }
  }
  traffic {
    percent         = 100
    type            = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role    = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_v2_service.default.location
  project     = google_cloud_run_v2_service.default.project
  service     = google_cloud_run_v2_service.default.name
  policy_data = data.google_iam_policy.noauth.policy_data
}
