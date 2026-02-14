from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Open the app
        page.goto("http://localhost:5173")
        time.sleep(2)  # Wait for load

        # Click mic button
        page.click("#mic-button")
        time.sleep(1)

        # Take screenshot of English status
        page.screenshot(path="/home/jules/verification/voice_en.png")
        print("Captured voice_en.png")

        # Click language toggle
        page.click("#lang-toggle")
        time.sleep(1)

        # Take screenshot of Japanese status
        page.screenshot(path="/home/jules/verification/voice_jp.png")
        print("Captured voice_jp.png")

        browser.close()

if __name__ == "__main__":
    run()
