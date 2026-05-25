def validate_product(product):

    issues = []

    # Missing title
    if product.title is None:

        issues.append({
            "severity": "HIGH",
            "issue_type": "MISSING_TITLE",
            "message": "Product title is missing",
            "suggested_fix": "Add a proper product title"
        })

    # Missing brand
    if product.brand is None:

        issues.append({
            "severity": "MEDIUM",
            "issue_type": "MISSING_BRAND",
            "message": "Brand is missing",
            "suggested_fix": "Add brand information"
        })

    # Invalid price
    if (
        product.price is None
        or product.price <= 0
    ):

        issues.append({
            "severity": "HIGH",
            "issue_type": "INVALID_PRICE",
            "message": "Price is invalid",
            "suggested_fix": "Add valid product price"
        })

    # MRP lower than price
    if (
        product.mrp is not None
        and product.price is not None
        and product.mrp < product.price
    ):

        issues.append({
            "severity": "HIGH",
            "issue_type": "INVALID_MRP",
            "message": "MRP is lower than selling price",
            "suggested_fix": "Correct MRP or selling price"
        })

    # Out of stock
    if (
        product.availability is not None
        and product.availability == "out_of_stock"
    ):

        issues.append({
            "severity": "LOW",
            "issue_type": "OUT_OF_STOCK",
            "message": "Product is out of stock",
            "suggested_fix": "Restock product inventory"
        })

    return issues