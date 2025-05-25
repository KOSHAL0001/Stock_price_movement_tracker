import pandas as pd
import numpy as np
import yfinance as yf

# Define the stock ticker and time frame
ticker_symbol = "AAPL"  # Replace with the desired stock ticker
start_date = "2025-04-01"
end_date = "2025-05-01"

# Fetch stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Data Integrity Checks
def check_data_integrity(df):
    issues = {}

    # Check for missing values
    missing_values = df.isnull().sum()
    issues['Missing Values'] = missing_values[missing_values > 0]

    # Check for duplicate rows
    duplicate_count = df.duplicated().sum()
    issues['Duplicate Entries'] = duplicate_count

    # Check for inconsistent timestamp gaps
    expected_dates = pd.date_range(start=df.index.min(), end=df.index.max(), freq='B')  # Business days
    missing_dates = expected_dates.difference(df.index)
    issues['Missing Dates'] = missing_dates

    # Detect abnormal price fluctuations
    df['Price Change'] = df['Close'].pct_change()
    anomalies = df[np.abs(df['Price Change']) > 0.1]  # Flag changes greater than 10%
    issues['Price Anomalies'] = anomalies[['Close', 'Price Change']]

    return issues

# Validate data integrity
integrity_issues = check_data_integrity(stock_data)

# Display identified issues
for issue, details in integrity_issues.items():
    print(f"\n{issue}:")
    print(details)
