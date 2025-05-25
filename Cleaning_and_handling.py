import pandas as pd
import numpy as np
import yfinance as yf

# Define the stock ticker and time frame
ticker_symbol = "AAPL"  # Replace with the desired stock ticker
start_date = "2025-04-01"
end_date = "2025-05-01"

# Fetch stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Data Cleaning Process
def clean_stock_data(df):
    # Drop rows with missing values
    df.dropna(inplace=True)

    # Remove outliers using Z-score method
    z_scores = np.abs((df['Close'] - df['Close'].mean()) / df['Close'].std())
    df = df[z_scores < 3]  # Keeping values within 3 standard deviations

    # Convert index to datetime format for consistency
    df.index = pd.to_datetime(df.index)

    # Ensure column data types are correct
    df = df.astype({'Open': 'float64', 'High': 'float64', 'Low': 'float64', 'Close': 'float64', 'Volume': 'int64'})

    return df

# Clean the stock data
cleaned_data = clean_stock_data(stock_data)

# Display cleaned data sample
print(cleaned_data.head())
