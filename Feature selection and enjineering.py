import pandas as pd
import numpy as np
import yfinance as yf
from sklearn.preprocessing import StandardScaler
from sklearn.feature_selection import SelectKBest, f_regression

# Define the stock ticker and time frame
ticker_symbol = "AAPL"  # Replace with the desired stock ticker
start_date = "2025-04-01"
end_date = "2025-05-01"

# Fetch stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Feature Engineering: Creating new features
stock_data['Daily Return'] = stock_data['Close'].pct_change()  # Percentage change in closing price
stock_data['Moving Average'] = stock_data['Close'].rolling(window=5).mean()  # 5-day moving average
stock_data['Volatility'] = stock_data['Close'].rolling(window=5).std()  # Rolling standard deviation
stock_data['High-Low Spread'] = stock_data['High'] - stock_data['Low']  # Difference between High and Low

# Drop rows with NaN values (introduced by rolling calculations)
stock_data.dropna(inplace=True)

# Feature Selection: Selecting the most relevant features
X = stock_data[['Open', 'High', 'Low', 'Close', 'Volume', 'Daily Return', 'Moving Average', 'Volatility', 'High-Low Spread']]
y = stock_data['Close']  # Target variable

# Scaling features to normalize data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Using statistical method to select best features
selector = SelectKBest(score_func=f_regression, k=5)
X_selected = selector.fit_transform(X_scaled, y)

# Display selected features
selected_features = X.columns[selector.get_support()]
print("Selected Features:", list(selected_features))
