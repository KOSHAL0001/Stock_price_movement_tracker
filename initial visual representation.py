import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt

# Define the stock ticker and time frame
ticker_symbol = "AAPL"  # Replace with the desired stock ticker
start_date = "2025-04-01"
end_date = "2025-05-01"

# Fetch stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Create a basic time-series plot
plt.figure(figsize=(12, 6))
plt.plot(stock_data.index, stock_data['Close'], label="Closing Price", color='blue', linewidth=2)
plt.xlabel("Date")
plt.ylabel("Closing Price (USD)")
plt.title(f"{ticker_symbol} Stock Price Movement")
plt.legend()
plt.grid(True)

# Show the plot
plt.show()
