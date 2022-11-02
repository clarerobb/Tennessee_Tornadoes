CREATE TABLE tennessee_tornadoes(
FID		INT,
OM		INT,
YR	    INT,
MO 		int,
DY		int,
DATE	DATE,
TIME	TIME,
TZ		INT,
ST		VARCHAR,
STF		INT,
STN		INT,
MAG		INT,
INJ		INT,
FAT		INT,
LOSS	DEC,
CLOSS	DEC,
SLAT	DEC,
SLON	DEC,
ELAT	DEC,
ELON	DEC,
LEN		DEC,
WID		INT,
Shape_Leng	DEC
);

DROP TABLE cleaned_tn_tornadoes;
DROP TABLE counties; 

CREATE TABLE cleaned_tn_tornadoes(
			index			INT,
			FID				INT,
			YR				INT,
			MO				INT,
			DATE			DATE,
			TIME			TIME,	
			MAG				INT, 
			SLAT			DEC,	
			SLON			DEC,
			ELAT			DEC,
			ELON			DEC,
			LEN				DEC,
			WID				INT,
			Fatalities		INT,
			Injuries		INT,
			Property_Loss 	DEC
);

CREATE TABLE counties(
index			INT,
starting_county	VARCHAR,
ending_county	VARCHAR
);

SELECT * FROM cleaned_tn_tornadoes;
SELECT * FROM counties;

SELECT ctt.yr,
ctt.mo, 
ctt.date,
ctt.time,
ctt.mag,
ctt.slat,
ctt.slon,
ctt.elat,
ctt.elon,
ctt.len,
ctt.wid,
ctt.fatalities,
ctt.injuries,
ctt.property_loss,
c.starting_county,
c.ending_county
INTO total_tn_tornadoes
FROM cleaned_tn_tornadoes AS ctt
LEFT JOIN counties AS c
ON c.index=ctt.index;

SELECT date,
mag, 
property_loss,
fatalities,
injuries,
starting_county,
ending_county
INTO cat4_cat5_tornadoes
FROM total_tn_tornadoes
WHERE (mag>3) 

SELECT * FROM cat4_cat5_tornadoes;