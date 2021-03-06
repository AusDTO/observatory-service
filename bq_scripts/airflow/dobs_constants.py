import os
from pathlib import Path  # Python 3.6+ only
# from dotenv import load_dotenv
# import env

# Delivering output data to endpoints of prototype backend RDS
API_STAGING = "https://observatory-app.apps.y.cld.gov.au/api"
AGENCIES_ENDPOINT = "https://observatory-app.apps.y.cld.gov.au/api/agencies"
PROPERTIES_ENDPOINT = "https://observatory-app.apps.y.cld.gov.au/api/properties"
OUTPUTS_ENDPOINT = "https://observatory-app.apps.y.cld.gov.au/api/output/"


# Using environment variables
# load_dotenv()

# env_path = Path('.') / '.env'
# load_dotenv(dotenv_path=env_path)

# Make sure USERNAME and PASSWORD exist in .env file
# API_USERNAME = os.getenv("USERNAME")
# API_PASSWORD = os.getenv("PASSWORD")

# DTA Google Cloud Path for Airflow in Google Cloud Storage
DAGS_DIR = '/home/airflow/gcs/dags/'
if not os.path.isdir(DAGS_DIR):
    DAGS_DIR = '../../dags/'


# BigQuery Project Variables
DATASET_ID = 'dta_customers'
TABLE_ID = 'dta_ga_accounts'

# Hostname : Dataset ID : Reference Number
# dta.gov.au : 99993137 : 1
# career-pathways.apps.b.cld.gov.au : 222282547 : 2
# designsystem.gov.au : 170387771 : 3
# domainname.gov.au : 169220999 : 4
# stylemanual.gov.au : 225103137 : 5

# Output tables in BigQuery for type 1 weekly stream
DATASET_EXEC_BASICS = 'dta_customers'
TABLE_EXEC_TYPE1 = 'exec_basics_prototype_weekly'
TABLE_EXEC_TYPE1_1 = 'exec_basics_prototype_weekly_99993137'
TABLE_EXEC_TYPE1_1_TP = 'exec_basics_prototype_weekly_99993137_toppages'
TABLE_EXEC_TYPE1_1_TG = 'exec_basics_prototype_weekly_99993137_topgrowth'
TABLE_EXEC_TYPE1_2 = 'exec_basics_prototype_weekly_222282547'
TABLE_EXEC_TYPE1_2_TP = 'exec_basics_prototype_weekly_222282547_toppages'
TABLE_EXEC_TYPE1_2_TG = 'exec_basics_prototype_weekly_222282547_topgrowth'
TABLE_EXEC_TYPE1_3 = 'exec_basics_prototype_weekly_170387771'
TABLE_EXEC_TYPE1_3_TP = 'exec_basics_prototype_weekly_170387771_toppages'
TABLE_EXEC_TYPE1_3_TG = 'exec_basics_prototype_weekly_170387771_topgrowth'
TABLE_EXEC_TYPE1_4 = 'exec_basics_prototype_weekly_169220999'
TABLE_EXEC_TYPE1_4_TP = 'exec_basics_prototype_weekly_169220999_toppages'
TABLE_EXEC_TYPE1_4_TG = 'exec_basics_prototype_weekly_169220999_topgrowth'
TABLE_EXEC_TYPE1_5 = 'exec_basics_prototype_weekly_225103137'
TABLE_EXEC_TYPE1_5_TP = 'exec_basics_prototype_weekly_225103137_toppages'
TABLE_EXEC_TYPE1_5_TG = 'exec_basics_prototype_weekly_225103137_topgrowth'

# Output tables in BigQuery for type 2 daily stream
TABLE_EXEC_TYPE2 = 'exec_basics_prototype_daily'
TABLE_EXEC_TYPE2_1 = 'exec_basics_prototype_daily_99993137'
TABLE_EXEC_TYPE2_1_TP_DAY1 = 'exec_basics_prototype_daily_99993137_toppages_day1'
TABLE_EXEC_TYPE2_1_TP_DAY2 = 'exec_basics_prototype_daily_99993137_toppages_day2'
TABLE_EXEC_TYPE2_1_TP_DAY3 = 'exec_basics_prototype_daily_99993137_toppages_day3'
TABLE_EXEC_TYPE2_1_TP_DAY4 = 'exec_basics_prototype_daily_99993137_toppages_day4'
TABLE_EXEC_TYPE2_1_TP_DAY5 = 'exec_basics_prototype_daily_99993137_toppages_day5'
TABLE_EXEC_TYPE2_1_TP_DAY6 = 'exec_basics_prototype_daily_99993137_toppages_day6'
TABLE_EXEC_TYPE2_1_TP_DAY7 = 'exec_basics_prototype_daily_99993137_toppages_day7'
TABLE_EXEC_TYPE2_1_TG_DAY1 = 'exec_basics_prototype_daily_99993137_topgrowth_day1'
TABLE_EXEC_TYPE2_1_TG_DAY2 = 'exec_basics_prototype_daily_99993137_topgrowth_day2'
TABLE_EXEC_TYPE2_1_TG_DAY3 = 'exec_basics_prototype_daily_99993137_topgrowth_day3'
TABLE_EXEC_TYPE2_1_TG_DAY4 = 'exec_basics_prototype_daily_99993137_topgrowth_day4'
TABLE_EXEC_TYPE2_1_TG_DAY5 = 'exec_basics_prototype_daily_99993137_topgrowth_day5'
TABLE_EXEC_TYPE2_1_TG_DAY6 = 'exec_basics_prototype_daily_99993137_topgrowth_day6'
TABLE_EXEC_TYPE2_1_TG_DAY7 = 'exec_basics_prototype_daily_99993137_topgrowth_day7'
TABLE_EXEC_TYPE2_2 = 'exec_basics_prototype_daily_222282547'
TABLE_EXEC_TYPE2_2_TP_DAY1 = 'exec_basics_prototype_daily_222282547_toppages_day1'
TABLE_EXEC_TYPE2_2_TP_DAY2 = 'exec_basics_prototype_daily_222282547_toppages_day2'
TABLE_EXEC_TYPE2_2_TP_DAY3 = 'exec_basics_prototype_daily_222282547_toppages_day3'
TABLE_EXEC_TYPE2_2_TP_DAY4 = 'exec_basics_prototype_daily_222282547_toppages_day4'
TABLE_EXEC_TYPE2_2_TP_DAY5 = 'exec_basics_prototype_daily_222282547_toppages_day5'
TABLE_EXEC_TYPE2_2_TP_DAY6 = 'exec_basics_prototype_daily_222282547_toppages_day6'
TABLE_EXEC_TYPE2_2_TP_DAY7 = 'exec_basics_prototype_daily_222282547_toppages_day7'
TABLE_EXEC_TYPE2_2_TG_DAY1 = 'exec_basics_prototype_daily_222282547_topgrowth_day1'
TABLE_EXEC_TYPE2_2_TG_DAY2 = 'exec_basics_prototype_daily_222282547_topgrowth_day2'
TABLE_EXEC_TYPE2_2_TG_DAY3 = 'exec_basics_prototype_daily_222282547_topgrowth_day3'
TABLE_EXEC_TYPE2_2_TG_DAY4 = 'exec_basics_prototype_daily_222282547_topgrowth_day4'
TABLE_EXEC_TYPE2_2_TG_DAY5 = 'exec_basics_prototype_daily_222282547_topgrowth_day5'
TABLE_EXEC_TYPE2_2_TG_DAY6 = 'exec_basics_prototype_daily_222282547_topgrowth_day6'
TABLE_EXEC_TYPE2_2_TG_DAY7 = 'exec_basics_prototype_daily_222282547_topgrowth_day7'
TABLE_EXEC_TYPE2_3 = 'exec_basics_prototype_daily_170387771'
TABLE_EXEC_TYPE2_3_TP_DAY1 = 'exec_basics_prototype_daily_170387771_toppages_day1'
TABLE_EXEC_TYPE2_3_TP_DAY2 = 'exec_basics_prototype_daily_170387771_toppages_day2'
TABLE_EXEC_TYPE2_3_TP_DAY3 = 'exec_basics_prototype_daily_170387771_toppages_day3'
TABLE_EXEC_TYPE2_3_TP_DAY4 = 'exec_basics_prototype_daily_170387771_toppages_day4'
TABLE_EXEC_TYPE2_3_TP_DAY5 = 'exec_basics_prototype_daily_170387771_toppages_day5'
TABLE_EXEC_TYPE2_3_TP_DAY6 = 'exec_basics_prototype_daily_170387771_toppages_day6'
TABLE_EXEC_TYPE2_3_TP_DAY7 = 'exec_basics_prototype_daily_170387771_toppages_day7'
TABLE_EXEC_TYPE2_3_TG_DAY1 = 'exec_basics_prototype_daily_170387771_topgrowth_day1'
TABLE_EXEC_TYPE2_3_TG_DAY2 = 'exec_basics_prototype_daily_170387771_topgrowth_day2'
TABLE_EXEC_TYPE2_3_TG_DAY3 = 'exec_basics_prototype_daily_170387771_topgrowth_day3'
TABLE_EXEC_TYPE2_3_TG_DAY4 = 'exec_basics_prototype_daily_170387771_topgrowth_day4'
TABLE_EXEC_TYPE2_3_TG_DAY5 = 'exec_basics_prototype_daily_170387771_topgrowth_day5'
TABLE_EXEC_TYPE2_3_TG_DAY6 = 'exec_basics_prototype_daily_170387771_topgrowth_day6'
TABLE_EXEC_TYPE2_3_TG_DAY7 = 'exec_basics_prototype_daily_170387771_topgrowth_day7'
TABLE_EXEC_TYPE2_4 = 'exec_basics_prototype_daily_169220999'
TABLE_EXEC_TYPE2_4_TP_DAY1 = 'exec_basics_prototype_daily_169220999_toppages_day1'
TABLE_EXEC_TYPE2_4_TP_DAY2 = 'exec_basics_prototype_daily_169220999_toppages_day2'
TABLE_EXEC_TYPE2_4_TP_DAY3 = 'exec_basics_prototype_daily_169220999_toppages_day3'
TABLE_EXEC_TYPE2_4_TP_DAY4 = 'exec_basics_prototype_daily_169220999_toppages_day4'
TABLE_EXEC_TYPE2_4_TP_DAY5 = 'exec_basics_prototype_daily_169220999_toppages_day5'
TABLE_EXEC_TYPE2_4_TP_DAY6 = 'exec_basics_prototype_daily_169220999_toppages_day6'
TABLE_EXEC_TYPE2_4_TP_DAY7 = 'exec_basics_prototype_daily_169220999_toppages_day7'
TABLE_EXEC_TYPE2_4_TG_DAY1 = 'exec_basics_prototype_daily_169220999_topgrowth_day1'
TABLE_EXEC_TYPE2_4_TG_DAY2 = 'exec_basics_prototype_daily_169220999_topgrowth_day2'
TABLE_EXEC_TYPE2_4_TG_DAY3 = 'exec_basics_prototype_daily_169220999_topgrowth_day3'
TABLE_EXEC_TYPE2_4_TG_DAY4 = 'exec_basics_prototype_daily_169220999_topgrowth_day4'
TABLE_EXEC_TYPE2_4_TG_DAY5 = 'exec_basics_prototype_daily_169220999_topgrowth_day5'
TABLE_EXEC_TYPE2_4_TG_DAY6 = 'exec_basics_prototype_daily_169220999_topgrowth_day6'
TABLE_EXEC_TYPE2_4_TG_DAY7 = 'exec_basics_prototype_daily_169220999_topgrowth_day7'
TABLE_EXEC_TYPE2_5 = 'exec_basics_prototype_daily_225103137'
TABLE_EXEC_TYPE2_5_TP_DAY1 = 'exec_basics_prototype_daily_225103137_toppages_day1'
TABLE_EXEC_TYPE2_5_TP_DAY2 = 'exec_basics_prototype_daily_225103137_toppages_day2'
TABLE_EXEC_TYPE2_5_TP_DAY3 = 'exec_basics_prototype_daily_225103137_toppages_day3'
TABLE_EXEC_TYPE2_5_TP_DAY4 = 'exec_basics_prototype_daily_225103137_toppages_day4'
TABLE_EXEC_TYPE2_5_TP_DAY5 = 'exec_basics_prototype_daily_225103137_toppages_day5'
TABLE_EXEC_TYPE2_5_TP_DAY6 = 'exec_basics_prototype_daily_225103137_toppages_day6'
TABLE_EXEC_TYPE2_5_TP_DAY7 = 'exec_basics_prototype_daily_225103137_toppages_day7'
TABLE_EXEC_TYPE2_5_TG_DAY1 = 'exec_basics_prototype_daily_225103137_topgrowth_day1'
TABLE_EXEC_TYPE2_5_TG_DAY2 = 'exec_basics_prototype_daily_225103137_topgrowth_day2'
TABLE_EXEC_TYPE2_5_TG_DAY3 = 'exec_basics_prototype_daily_225103137_topgrowth_day3'
TABLE_EXEC_TYPE2_5_TG_DAY4 = 'exec_basics_prototype_daily_225103137_topgrowth_day4'
TABLE_EXEC_TYPE2_5_TG_DAY5 = 'exec_basics_prototype_daily_225103137_topgrowth_day5'
TABLE_EXEC_TYPE2_5_TG_DAY6 = 'exec_basics_prototype_daily_225103137_topgrowth_day6'
TABLE_EXEC_TYPE2_5_TG_DAY7 = 'exec_basics_prototype_daily_225103137_topgrowth_day7'

# Output tables in BigQuery for type 3 hourly stream
TABLE_EXEC_TYPE3 = 'exec_basics_prototype_hourly'
TABLE_EXEC_TYPE3_1 = 'exec_basics_prototype_hourly_99993137'
TABLE_EXEC_TYPE3_2 = 'exec_basics_prototype_hourly_222282547'
TABLE_EXEC_TYPE3_3 = 'exec_basics_prototype_hourly_170387771'
TABLE_EXEC_TYPE3_4 = 'exec_basics_prototype_hourly_169220999'
TABLE_EXEC_TYPE3_5 = 'exec_basics_prototype_hourly_225103137'

AGENCY_NAME = 'DTA'

AGENCY_DATA = [{
            "name": "DTA",
            "emailHosts": ["@dta.gov.au", "@digital.gov.au"]
        }]

# Analytics output types
Analytics_TYPE1 = "exec_weekly"
Analytics_TYPE2 = "exec_daily"
Analytics_TYPE3 = "exec_hourly"