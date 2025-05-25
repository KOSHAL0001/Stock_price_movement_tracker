import pandas as pd
import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt
from scipy.stats import zscore
from sklearn.preprocessing import MinMaxScaler, StandardScaler

# Define the stock ticker and time frame
ticker_symbol = "AAPL"  # Replace with the desired stock ticker
start_date = "2025-04-01"
end_date = "2025-05-01"

# Fetch stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Detect Outliers Using Z-score Method
stock_data['Price Z-score'] = zscore(stock_data['Close'])
outliers = stock_data[np.abs(stock_data['Price Z-score']) > 2.5]  # Flag extreme deviations

# Visualize Outliers
plt.figure(figsize=(10, 5))
plt.scatter(stock_data.index, stock_data['Close'], label="Stock Prices", color='blue', alpha=0.6)
plt.scatter(outliers.index, outliers['Close'], label="Outliers", color='red')
plt.xlabel("Date")
plt.ylabel("Closing Price")
plt.title("Stock Price Outliers")
plt.legend()
plt.show()

# Data Transformation
def transform_stock_data(df):
    # Min-Max Scaling
    scaler = MinMaxScaler()
    df['Normalized Close'] = scaler.fit_transform(df[['Close']])

    # Log Transformation to Reduce Skewness
    df['Log Volume'] = np.log1p(df['Volume'])  # Adding 1 to avoid log(0)

    # Standardization using Z-score Scaling
    std_scaler = StandardScaler()
    df[['Open', 'High', 'Low', 'Close']] = std_scaler.fit_transform(df[['Open', 'High', 'Low', 'Close']])

    return df

# Apply transformation
transformed_data = transform_stock_data(stock_data)

# Display transformed data sample
print("\nIdentified Outliers:\n", outliers[['Close', 'Price Z-score']])
print("\nTransformed Data Sample:\n", transformed_data.head())
