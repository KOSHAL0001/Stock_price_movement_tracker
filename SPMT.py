import yfinance as yf
import matplotlib.pyplot as plt
import datetime

# Define the stock ticker symbol and time frame
ticker_symbol = "AAPL"  # Replace with your desired stock ticker
start_date = datetime.datetime.now() - datetime.timedelta(days=30)  # Last 30 days
end_date = datetime.datetime.now()

# Fetch historical stock price data
stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)

# Plot the stock price movement
plt.figure(figsize=(10, 5))
plt.plot(stock_data['Close'], label=ticker_symbol, color='blue')
plt.xlabel("Date")
plt.ylabel("Closing Price (USD)")
plt.title(f"{ticker_symbol} Stock Price Movement")
plt.legend()
plt.grid()
plt.show()
