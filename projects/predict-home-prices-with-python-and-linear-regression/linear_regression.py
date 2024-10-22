import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# This code requires the numpy, matplotlib, and scikit-learn libraries.
# Ensure these libraries are installed in your Python environment for the code to run successfully.


# Linear regression is a fundamental aspect of machine learning. Remember: this could be used to predict anything as long as there is a database to train a model on.

# Generate random house sizes
np.random.seed(0)
house_sizes = np.random.randint(800, 5000, 100)

# Generate corresponding house prices with some randomness
house_prices = 150 * house_sizes + np.random.normal(scale=10000, size=len(house_sizes))

plt.scatter(house_sizes, house_prices, marker='o', color='blue')
plt.title('House Prices vs. House Sizes')
plt.xlabel('House Size (sq.ft)')
plt.ylabel('House Price ($)')
plt.show()

x_train, x_test, y_train, y_test = train_test_split(house_sizes, house_prices, test_size=0.2, random_state=42)

# Reshape the data for NumPy
x_train = x_train.reshape(-1, 1)
x_test = x_test.reshape(-1, 1)

# Create and train the model
model = LinearRegression()
model.fit(x_train, y_train)

# Predict prices for the test set
predictions = model.predict(x_test)

plt.scatter(x_test, y_test, marker='o', color='blue', label='Actual Prices')
plt.plot(x_test, predictions, color='red', linewidth=2, label='Predicted Prices')
plt.title('House Price Prediction with Linear Regression')
plt.xlabel('House Size (sq.ft)')
plt.ylabel('House Price ($)')
plt.legend()
plt.show()
