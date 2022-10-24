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

## Data Cleaning and Analysis
Raw data is in CSV file. Using Excel, CSV file was filtered for Tennessee data only. Then, using Python and Pandas, the filtered dataset was be loaded into Jupyter Notebook for Exploratory Data Analysis and Data Cleaning.

## Database Storage
Once data is cleaned, a table was created in PgAdmin for use with PostgreSQL to match the dataset. Then, the cleaned dataset will be imported into the Machine Learning Model with Psycopg2.

## Machine Learning Model

## Dashboard
Once a general dashboard display layout is determined, the Dashboard will be created using Javascript to be displayed as an interactive webpage. Depending on needs, CSS, D3, and Bootstrap components could be used to enhance the dashboard displays.
