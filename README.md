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

## Team and Roles
- Sari Broudy: Database
- Savannah Posner: Machine Learning
- Jordan Holley Riggs: Presentation
- Matt Riley: Technology/Dashboard
- Clare Robbins: GitHub/Database

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
- Python (pandas, imbalanced-learn, scikit-Learn, numpy libraries)
- Jupyter Notebook

#### Dashboard
- Tableau
- Javascript
- Bootstap
- Leaflet
- D3
- HTML
- CSS

## Data Cleaning
Raw data was extracted from data.world in [Historical_Tornado_Tracks_Raw.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Resources/Historical_Tornado_Tracks_Raw.csv). The file was filtered for Tennessee data only in Excel. Then, using Python and Pandas, the filtered dataset was be loaded into Jupyter Notebook in [ETL_Tornadoes copy.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/ETL/ETL_Tornados%20copy.ipynb)for data cleaning.

Additionally, each tornadoes starting and ending counties were calculated in [GetCounties.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/GetCounties.ipynb) with the `geopy` library and exported to [counties.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/counties.csv). 

## Database 
- Once the data was cleaned, [cleaned_tn_tornadoes.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Resources/cleaned_tn_tornadoes.csv) was imported into `cleaned_tn_tornadoes` table in the database in PgAdmin. [counties.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/counties.csv) was imported into the the `counties` table. The ERD below shows the relationship between the two tables. 
![ERD](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Database/Segment_2/Cleaned-TN_Tornadoes.png)
- The two tables were joined into `total_tn_tornadoes` and an exploratory data analysis was completed in the database as shown in [db_segment_2.sql](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Database/Segment_2/db_segment_2.sql). 
- `total_tn_tornadoes` was imported into [Final_Machine_Learning_Pred.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/Final_Machine_Learning_Pred.ipynb) with Psycopg2.

## Machine Learning Model
- Description of preliminary data preprocessing 
- Description of preliminary feature engineering and preliminary feature selection, including their decision-making process 
- Description of how data was split into training and testing sets 
- Explanation of model choice, including limitations and benefits

## Presentation
Presentation can be found [here](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Presentations/Final%20Project%20Segment%202%20Presentation.pdf).

## Dashboard
- Storyboard of the dashboard can be found here. The dashboard will contain two bar charts made in Tableau that display the magnitude over time and frequency over time, respectively. Additionally, the dashboard will display an interactive map of each tornado.
- The dashboard will be visualized on an interactive webpage with the following tools: Tableau, Javascript, Bootstap, Leaflet, D3, HTML, CSS.
- Tornadoes will be mapped on the dashboard. The map will be interactive with information on each tornado displayed in a pop-up window and a filter based on magnitude. 
