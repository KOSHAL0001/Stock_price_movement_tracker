import pandas as pd
import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.seasonal import seasonal_decompose
from scipy.stats import zscore

# Define the stock ticker and time frame
ticker_symbol = "AAPL"  # Replace with the desired stock ticker
start_date = "2025-04-01"
end_date = "2025-05-01"

# Fetch stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Identify Trends Using Moving Averages
stock_data['Short-Term Trend'] = stock_data['Close'].rolling(window=5).mean()  # 5-day moving average
stock_data['Long-Term Trend'] = stock_data['Close'].rolling(window=20).mean()  # 20-day moving average

# Identify Patterns Using Seasonal Decomposition
decomposition = seasonal_decompose(stock_data['Close'], model='additive', period=5)
stock_data['Trend Component'] = decomposition.trend
stock_data['Seasonal Component'] = decomposition.seasonal

# Detect Anomalies Using Z-score Method
stock_data['Price Z-score'] = zscore(stock_data['Close'])
anomalies = stock_data[np.abs(stock_data['Price Z-score']) > 2.5]  # Flag significant deviations

# Visualization
plt.figure(figsize=(15, 5))

# Plot Trends
plt.subplot(1, 2, 1)
plt.plot(stock_data.index, stock_data['Close'], label="Closing Price", color='blue', alpha=0.6)
plt.plot(stock_data.index, stock_data['Short-Term Trend'], label="Short-Term Trend", linestyle="dashed", color='red')
plt.plot(stock_data.index, stock_data['Long-Term Trend'], label="Long-Term Trend", linestyle="dashed", color='green')
plt.xlabel("Date")
plt.ylabel("Price")
plt.title("Stock Trends")
plt.legend()

# Plot Anomalies
plt.subplot(1, 2, 2)
sns.scatterplot(data=stock_data, x=stock_data.index, y='Close', hue=np.abs(stock_data['Price Z-score']) > 2.5, palette={True: 'red', False: 'blue'})
plt.xlabel("Date")
plt.ylabel("Closing Price")
plt.title("Anomaly Detection")

plt.tight_layout()
plt.show()

print("\nIdentified Anomalies:")
print(anomalies[['Close', 'Price Z-score']])
