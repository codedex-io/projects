import requests
from bs4 import BeautifulSoup

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.5"
}

def get_product_details(product_url: str) -> dict:
    # Create an empty product details dictionary
    product_details = {}
    
    try:
        # Get the product page content and create a soup
        page = requests.get(product_url, headers=headers)
        page.raise_for_status()  # Raise an error for bad responses
        soup = BeautifulSoup(page.content, features="lxml")
        
        # Scrape the product details
        title_elem = soup.find("span", attrs={"id": "productTitle"})
        price_elem = soup.find("span", attrs={"class": "a-price"})

        if title_elem:
            title = title_elem.get_text().strip()
            product_details["title"] = title
        else:
            print("Title not found")

        if price_elem:
            extracted_price = price_elem.get_text().strip()
            price = extracted_price.split("$")[-1]  # Get the last part after any dollar sign
            product_details["price"] = "$" + price
        else:
            print("Price not found")

    except requests.exceptions.RequestException as e:
        print(f"HTTP Request failed: {e}")
    except Exception as e:
        print("Could not fetch product details")
        print(f"Failed with exception: {e}")

    return product_details

product_url = input("Enter product url: ")
product_details = get_product_details(product_url)

print(product_details)
