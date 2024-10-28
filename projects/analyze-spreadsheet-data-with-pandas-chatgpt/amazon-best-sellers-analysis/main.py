# Step 1
import pandas as pd

# Step 2
df = pd.read_csv('bestsellers.csv')

# Step 3
# Get the first 5 rows of the spreadsheet
print(df.head())

# Get the shape of the spreadsheet
print(df.shape)

# Get the column names of the spreadsheet
print(df.columns)

# Get summary statistics for each column
print(df.describe())

# Step 4
df.drop_duplicates(inplace=True)

df["Price"] = df["Price"].astype(float)

df.rename(columns={"Name": "Title", "Year": "Publication Year", "User Rating": "Rating"}, inplace=True)


# Step 5
author_counts = df['Author'].value_counts()
print(author_counts)

avg_rating_by_genre = df.groupby("Genre")["Rating"].mean()
print(avg_rating_by_genre)

# Step 6
author_counts.head(10).to_csv("top_authors.csv")