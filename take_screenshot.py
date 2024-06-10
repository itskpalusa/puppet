from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Setting up Chrome options
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Run in headless mode (no browser UI)

# Initialize the Chrome driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

try:
    # Open a webpage
    driver.get('https://github.com/itskpalusa')

    # Set the browser window size
    width = 1780
    height = 1105
    driver.set_window_size(width, height)
    
    # Wait for the page to load completely
    time.sleep(5)  # Wait for 5 seconds

    # Take a screenshot
    screenshot_path = 'github_itskpalusa.png'
    driver.save_screenshot(screenshot_path)

    print(f"Screenshot saved to {screenshot_path}")

finally:
    # Close the browser
    driver.quit()
