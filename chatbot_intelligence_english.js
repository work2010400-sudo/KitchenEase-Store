// chatbot_intelligence_english.js
// This file contains the core logic for the AI Assistant's responses.

// Product data (Must match the data used in the main index.html for image paths)
const AIEngineProducts = [
    {
        name: "Smart Air Fryer XL",
        price: "$34.99",
        image: "images/air_fryer_product_8.png",
        description: "Healthy, oil-free cooking with Wi-Fi."
    },
    {
        name: "Electric Garlic Press",
        price: "$12.99",
        image: "images/garlic_press_product_7.jpg",
        description: "One-touch, easy-to-clean operation."
    },
    {
        name: "Bluetooth Meat Thermometer",
        price: "$18.99",
        image: "images/thermometer_product_6.jpg",
        description: "Wireless temperature monitoring for grilling."
    }
];

// The core function to process a user message and return a structured response
window.AIEngine = {
    async processMessage(message) {
        const lowerCaseMessage = message.toLowerCase().trim();

        // --- 1. Product Inquiry Responses ---
        if (lowerCaseMessage.includes('product') || lowerCaseMessage.includes('tool') || lowerCaseMessage.includes('kitchen tool') || lowerCaseMessage.includes('show me kitchen tools')) {
            return {
                type: 'products',
                text: "We offer a wide range of smart kitchen tools! Here are some of our bestsellers. Click any card for more details, or ask about a specific category (e.g., 'grilling' or 'blenders'):",
                products: AIEngineProducts
            };
        }

        // --- 2. Shipping/Order Responses ---
        if (lowerCaseMessage.includes('shipping') || lowerCaseMessage.includes('delivery') || lowerCaseMessage.includes('track') || lowerCaseMessage.includes('order help')) {
            return {
                type: 'text',
                text: "No problem! We offer **Fast & Free Shipping** on orders over $50 (2-3 business days). If you need to **track your order**, please provide your order number (e.g., TR123456)."
            };
        }
        
        // --- 3. Greeting/General Responses ---
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage === 'hi' || lowerCaseMessage.includes('hey') || lowerCaseMessage.includes('greeting')) {
            return {
                type: 'text',
                text: "👋 Hello there! Welcome to KitchenEase. I'm your AI Assistant, ready to help you find the smartest tools for your kitchen. What can I assist you with today?"
            };
        }

        // --- 4. Warranty Response ---
        if (lowerCaseMessage.includes('warranty') || lowerCaseMessage.includes('guarantee')) {
            return {
                type: 'text',
                text: "All our products come with a comprehensive **2-Year Warranty** against manufacturing defects. You can always check the product page for specific details."
            };
        }
        
        // --- 5. Default/Fallback Response ---
        return {
            type: 'text',
            text: "I'm not sure how to answer that yet, but I can help you with questions about **Products**, **Shipping**, or **Warranty**. Try one of the quick actions below!"
        };
    }
};

console.log('🤖 AI Engine loaded successfully.');
