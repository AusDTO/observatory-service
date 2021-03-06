import os
from pathlib import Path  # Python 3.6+ only
from dotenv import load_dotenv
# import env

API_STAGING = "https://observatory-app.apps.y.cld.gov.au/api"
AGENCIES_ENDPOINT = "https://observatory-app.apps.y.cld.gov.au/api/agencies"
PROPERTIES_ENDPOINT = "https://observatory-app.apps.y.cld.gov.au/api/properties"


# Using environment variables
load_dotenv()

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

# Make sure USERNAME and PASSWORD exist in .env file
DTA_USERNAME = os.getenv("DTA_USERNAME")
DTA_PASSWORD = os.getenv("DTA_PASSWORD")


# DAGS_DIR = '/home/airflow/gcs/dags/'
# if not os.path.isdir(DAGS_DIR):
#     DAGS_DIR = '../../dags/'


# BigQuery Variables
DATASET_ID = 'dta_customers'
TABLE_ID = 'dta_ga_accounts'

AGENCY_NAME = "DTA"
AGENCY_DATA = [{
            "name": "DTA",
            "emailHosts": ["@dta.gov.au", "@digital.gov.au"]
        }]