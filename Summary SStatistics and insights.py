import pandas as pd
import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt
import seaborn as sns

# Define the stock ticker and time frame
ticker_symbol = "AAPL"  # Replace with the desired stock ticker
start_date = "2025-04-01"
end_date = "2025-05-01"

# Fetch stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Summary Statistics
summary_stats = stock_data.describe()
print("Summary Statistics:\n", summary_stats)

# Visualization Function
def visualize_stock_data(df):
    plt.figure(figsize=(15, 5))
    
    # Time-Series Plot
    plt.subplot(1, 3, 1)
    plt.plot(df.index, df['Close'], color='blue', label="Closing Price")
    plt.xlabel("Date")
    plt.ylabel("Closing Price (USD)")
    plt.title("Stock Price Trend")
    plt.legend()

    # Histogram of Closing Prices
    plt.subplot(1, 3, 2)
    sns.histplot(df['Close'], bins=20, kde=True, color='purple')
    plt.xlabel("Closing Price")
    plt.ylabel("Frequency")
    plt.title("Distribution of Closing Prices")

    # Boxplot for Stock Price Range
    plt.subplot(1, 3, 3)
    sns.boxplot(data=df[['Open', 'High', 'Low', 'Close']])
    plt.title("Stock Price Range")

    plt.tight_layout()
    plt.show()

# Generate visualizations
visualize_stock_data(stock_data)
