# Technologies Used
## Data Cleaning and Analysis
Raw data is in CSV file.  Using Excel, CSV file was filtered for Tennessee data only.  Then, using Python and Pandas, filtered dataset will be loaded into Jupyter Notebook for Exploratory Data Analysis and Data Cleaning.

## Database Storage
Once data is cleaned, tables will be created in PgAdmin for use with PostgreSQL to match the dataset.  Then, cleaned dataset will be imported.

## Machine Learning
In order to use machine learning to predict outcomes for project questions, different machine learning models will need to be created.

<<<<<<< HEAD
For the following question, a classification model will be created:
- What counties are most likely to experience tornadoes?
Supervised learning with Random Forest Algorithms will be used.  This algorithm is robust against overfitting and runs efficiently on large datasets.

For the following questions, linear regression models will be created:
- Has the frequency of tornadoes in Tennessee increased since 1950?
- Have tornadoes increased in intensity in the state of Tennessee in the last 50 years?
MultiTaskLasso algorithm will be used.  It estimates sparse coefficients for multiple regression problems jointly.

## Dashboard
Once a general dashboard display layout is determined, the Dashboard will be created using Javascript to be displayed as an interactive webpage.  Depending on needs, CSS, D3, and Bootstrap components could be used to enhance the dashboard displays.
=======
Machine learning models will be created to predict the following:
1. Magnitude of tornadoes
2. Location of tornadoes
3. Amount of property damage

There are two working ipynb files in the Machine Learning folder.
"ML_Trial_Error.ipynb" is being used to test different learning algorithms that will produce the most efficient and accurate results.  Once that is determined, code will be transferred to "Final_Machine_Learning_Pred.ipynb" which be used to connect to the database.

## Dashboard
Once a general dashboard display layout is determined, the Dashboard will be created using Javascript to be displayed as an interactive webpage.  Depending on needs, CSS, D3, and Bootstrap components could be used to enhance the dashboard displays.
>>>>>>> f1e0e59103cfb06cee620946e2654a706769243e
