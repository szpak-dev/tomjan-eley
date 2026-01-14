.PHONY: copy-scraped-data load-products decompose init-translations help

SCRAPING_DATA_DIR := /Users/gorky/Sites/scraping
SCRAPED_DIR := ./scraped

# List of manufacturers to process
MANUFACTURERS := eley eley-hawk

help:
	@echo "Available targets:"
	@echo "  make copy-scraped-data      Copy raw JSONL files from scraping directory"
	@echo "  make load-products          Transform and load products from scraped JSONL"

copy-scraped-data:
	@echo "Copying scraped data from $(SCRAPING_DATA_DIR)..."
	@mkdir -p $(SCRAPED_DIR)
	@for mfr in $(MANUFACTURERS); do \
		mkdir -p $(SCRAPED_DIR)/$$mfr; \
		cp $(SCRAPING_DATA_DIR)/$$mfr/data/final_products.jsonl $(SCRAPED_DIR)/$$mfr/products.jsonl; \
		cp $(SCRAPING_DATA_DIR)/$$mfr/data/final_categories.jsonl $(SCRAPED_DIR)/$$mfr/categories.jsonl; \
		echo "✓ Copied $$mfr"; \
	done
	@echo "✓ All files copied successfully"

load-contents:
	@echo "Loading contents..."
	@npm run load:contents
