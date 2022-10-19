import requests
from bs4 import BeautifulSoup


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.5"
}


def get_product_details(product_url: str) -> dict:

    # Create an empty product details dictionary
    product_details = {}

    # Get the product page content and create a soup
    page = requests.get(product_url, headers=headers)
    soup = BeautifulSoup(page.content, features="lxml")
    try:
        # Scrape the product details
        title = soup.find(
            "span", attrs={"id": "productTitle"}).get_text().strip()
        extracted_price = soup.find(
            "span", attrs={"class": "apexPriceToPay"}).get_text().strip()
        price = "$" + extracted_price.split("$")[1]

        # Adding it to the product details dictionary
        product_details["title"] = title
        product_details["price"] = price

        # Return the product details dictionary
        return product_details
    except Exception as e:
        print("Could not fetch product details")
        print(f"Failed with exception: {e}")


product_url = input("Enter product url: ")
product_details = get_product_details(product_url)

print(product_details)
