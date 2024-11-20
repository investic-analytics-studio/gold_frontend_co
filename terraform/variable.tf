variable "project" {
  description = "name of google cloud project"
}

variable "region" {
  description = "location of google cloud server"
  default     = "asia-southeast1"
}

variable "cloudsql" {
  description = "cloudsql instance name format project:location:name"
}

variable "service_name" {
  description = "service name"
}
variable "service_account" {
  description = "service account email"
}

variable "image_name" {
  description = "docker image name"
}

variable "min_instance" {
  description = "minimum number of instance"
  default     = 1
}

variable "max_instance" {
  description = "maximum number of instance"
  default     = 1
}

