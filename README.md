# Tennessee Tornado Predictor

## Selected Topic 
Based on a dataset from the *National Weather Service, Storm Prediction Center (SPC)*, we will analyze storm frequency and strength in the state of Tennessee between 1950 - 2013.

## Reason for Topic Selection
- We want to build a model that will predict the location and stregth of furture tornadoes in Tennessee.
- This information can be used by home buyers and home insurance companies.

## Description of Source Data
Data was extracted from data.world and originally sourced from *National Weather Service, Storm Prediction Center (SPC).* The original dataset represents tornado tracks from the United States, Puerto Rico, and the US Virgin Islands. 

For this project we filtered the data for tornadoes just in the state of Tennessee.
- [TN_Df.csv](https://github.com/clarerobb/Tennessee_Tornadoes/commit/739400549b9f43eae176e9723b7cf34afe49b1a7\#diff-2817076e6f91f9a7987c57ecb439f9f7bddebda85d7489b5af4fc273f9fd0fbc)

## Research Questions to Answer
- Has the frequency of tornadoes in Tennessee increased since 1950?
- What counties are most likely to experience tornadoes? 
- Have tornadoes increased in intensity in the last 50 years in the state of Tennessee? 

## Communication
In order to stay updated on status of each part of the project, we will message regularly through a direct message in slack and regular zoom meetings outside of designated class times.

## Tools
#### Data Cleaning 
- Python 3.7.13 (pandas and geopy libraries)
- Jupyter Notebook 6.4.8

#### Database
- PostgreSQL 11.16
- pgAdmin 4 v6.8

#### Connecting to Database
- Psycopg2

#### Machine Learning

#### Dashboard

## Data Cleaning
Raw data was extracted from data.world in [Historical_Tornado_Tracks_Raw.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Resources/Historical_Tornado_Tracks_Raw.csv). The file was filtered for Tennessee data only in Excel. Then, using Python and Pandas, the filtered dataset was be loaded into Jupyter Notebook in [ETL_Tornadoes copy.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/ETL/ETL_Tornados%20copy.ipynb)for data cleaning.

Additionally, each tornadoes starting and ending counties were calculated in [GetCounties.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/GetCounties.ipynb) with the `geopy` library and exported to [counties.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/counties.csv). 

## Database 
- Once the data was cleaned, [cleaned_tn_tornadoes.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Resources/cleaned_tn_tornadoes.csv) was imported into `cleaned_tn_tornadoes` table in the database in PgAdmin. [counties.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/counties.csv) was imported into the the `counties` table. The ERD below shows the relationship between the two tables. 
![ERD](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Database/Segment_2/Cleaned-TN_Tornadoes.png)
- The two tables were joined into `total_tn_tornadoes` and an exploratory data analysis was completed in the database as shown in [db_segment_2.sql](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Database/Segment_2/db_segment_2.sql). 
- `total_tn_tornadoes` was imported into [Final_Machine_Learning_Pred.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/Final_Machine_Learning_Pred.ipynb) with Psycopg2.

## Machine Learning Model
In order to use machine learning to predict outcomes for project questions, different machine learning models will need to be created.

Machine learning models will be created to predict the following:
- Magnitude of tornadoes
- Location of tornadoes
- Amount of property damage

There are two working ipynb files in the Machine Learning folder. `ML_Trial_Error.ipynb` is being used to test different learning algorithms that will produce the most efficient and accurate results. Once that is determined, code will be transferred to `Final_Machine_Learning_Pred.ipynb` which be used to connect to the database.

## Dashboard
Once a general dashboard display layout is determined, the Dashboard will be created using Javascript to be displayed as an interactive webpage. Depending on needs, CSS, D3, and Bootstrap components could be used to enhance the dashboard displays.
