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
- Sari Broudy: Database/Dashboard
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
- AWS

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
Raw data was extracted from data.world in [Historical_Tornado_Tracks_Raw.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Resources/Historical_Tornado_Tracks_Raw.csv). The file was filtered for Tennessee data only in Excel. Then, using Python and Pandas, the filtered dataset was be loaded into Jupyter Notebook in [ETL_Tornadoes copy.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/ETL/ETL_Tornados%20copy.ipynb) for data cleaning.

Additionally, each tornadoes starting and ending counties were calculated in [GetCounties.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/GetCounties.ipynb) with the `geopy` library and exported to [counties.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/counties.csv). 

## Database 
- Once the data was cleaned, [cleaned_tn_tornadoes.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Resources/cleaned_tn_tornadoes.csv) was imported into `cleaned_tn_tornadoes` table in the database in PgAdmin. [counties.csv](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/counties.csv) was imported into the the `counties` table. The ERD below shows the relationship between the two tables. <br>
![ERD](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Database/Cleaned-TN_Tornadoes.png)
- The two tables were joined into `total_tn_tornadoes` and an exploratory data analysis was completed in the database as shown in [db_segment_2.sql](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Database/Segment_2/db_segment_2.sql). 
- `total_tn_tornadoes` was imported into [Final_Machine_Learning_Pred.ipynb](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Machine_Learning/Final_Machine_Learning_Pred.ipynb) with Psycopg2.

## Machine Learning Model
There are three targets that we are aiming to predict: 
1. Property loss the that the tornadoes will cause.
2. Months in which the tornadoes will occur. 
3. Magnitude that the tornadoes will have. 

- The preliminary data was prepared through an ETL process. Intitially, the data contained over 50,0000 rows of data, and through the use of Google Colabrotory we were able to filter down the rows to 1,114 rows. Some of the data was scaled inconsistently before 1970 so we had to standardize the scale of measurements. The data set provided us initially with only coordinates, so we used Geopy to extract the different counties that were affected. We also dropped columns that didn't relate to our purposes or were inconsistent. 

- The target data is seperated from the original dataset, and then `.getdummies()` is used to attribute numerical assignments to categorical data. The decision to select different features for each target, was based on the relevency and accuracy affects that each feature applies towards the respective targets. To determine the affect that each variable had on the accuracy score, we ran different features through the machine learning trial and error code to experiment with which features increased and decreased the accuracy score. Once we were able to reach at least a 50% aaccuracy score with each target, we used the machine learning model yielding the highest accuracy score, with the features that were most relevent and yielded the highest accuracy scores, and places them into the final machine learning module with their respective accuracy scores. <br>
<img width="691" alt="Screen Shot 2022-11-14 at 5 14 30 PM" src="https://user-images.githubusercontent.com/106405775/201787580-ce7a1612-13e3-4228-bdd0-d33b00469b98.png">

- Using the train_test_split method, we seperated the data into training and testing data. For the Trial and Error file, we resampled each training samples so that the results of each model were represented correctly. 

- The models were chosen by creating a file with a large variety of different machine learning models. We experimented with the inputs, ran the training data through all of the models, and determined which models were working in the most appropriate manner. For some of our models, we created a pipeline of different models which allowed us to run our data through algorithms stacked on each other. However, because we are aiming to make numerical predictions about our targets, all of our models in our final document are linear regression models in some form. 

- We have been able to achieve at least 50% accuracy with each of our targets. The accuracy that was achieved throughout the trial and testing was recorded and shown on the final document. Additionally, each version of the machine learning trail and error was commited to the savannah_posner branch after each target had achieved 50% accuracy. 

We used the machine learning model to predict the estimated magnitude of a tornado at 54% accuracy.

![](https://raw.githubusercontent.com/clarerobb/Tennessee_Tornadoes/main/Machine_Learning/Screen%20Shot%202022-11-15%20at%207.19.14%20PM.png)

We used the machine learning model to predict the estimated property loss of a tornado at 55% accuracy.


![](https://raw.githubusercontent.com/clarerobb/Tennessee_Tornadoes/main/Machine_Learning/Screen%20Shot%202022-11-15%20at%207.19.43%20PM.png)

- With over 80% accuracy we are able to predict the months in which the tornados are likely to occur. This was done by laying MinMaxScaler(), PolynomialCountSketch(), LogisticRegression() models using a pipeline. 



![](https://raw.githubusercontent.com/clarerobb/Tennessee_Tornadoes/main/Machine_Learning/Screen%20Shot%202022-11-15%20at%207.19.02%20PM.png)

#### Future reccommendations: 
We recommend when performing the ETL on the dataset to eliminate outliers that could distort the data and lower the machine learning model's accuracy.

## Presentation
Presentation can be found [here](https://github.com/clarerobb/Tennessee_Tornadoes/blob/main/Presentations/Final%20Project%20Presentation.pdf).

## Dashboard
- The dashboard can be found [here](https://clarerobb.github.io/Tennessee_Tornadoes/). It contains six bar charts made in Tableau. Additionally, the dashboard will display an interactive map of each tornado. <br>
<img width="1121" alt="Screen Shot 2022-11-14 at 5 25 33 PM" src="https://user-images.githubusercontent.com/106405775/201788918-f5c3e8c4-a7ac-4a19-893d-db9ff1382051.png"> <br>
- Additionally, the dashboard displays an interactive map of each tornado. The tornadoes can be filtered by decade, and there is a popup with more information about each tornado. 
