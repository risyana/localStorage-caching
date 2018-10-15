module.exports = {
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "globals": {
        "window": true,
        "document": true,
        "fetch": true,
        "describe": true,
        "it": true,
        "before": true,
        "beforeEach": true,
        "after": true,
        "HTMLDivElement": true
    },
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    }
};