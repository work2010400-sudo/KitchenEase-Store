/**
 * KitchenEase AI Assistant - English Intelligence Engine
 * Advanced AI system for customer service and product assistance
 */

class KitchenEaseAI {
    constructor() {
        this.conversationHistory = [];
        this.userPreferences = {};
        this.sessionId = this.generateSessionId();
        this.hasGreeted = false; // Track if initial greeting was given
        this.initializeKnowledgeBase();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    initializeKnowledgeBase() {
        // Product Knowledge Base
        this.productKnowledge = [
            {
                id: 1,
                name: "Smart Air Fryer XL",
                price: "$34.99",
                keywords: ["air fryer", "fryer", "smart", "xl", "cooking", "healthy"],
                description: "Revolutionary air fryer with smart features and mobile app control",
                features: ["Wi-Fi enabled", "Oil-free cooking", "8 preset programs", "Digital display"],
                category: "cooking"
            },
            {
                id: 2,
                name: "Electric Garlic Press",
                price: "$12.99",
                keywords: ["garlic press", "garlic", "electric", "press", "kitchen tool"],
                description: "Effortless garlic crushing with one-touch operation",
                features: ["One-touch operation", "Easy to clean", "Stainless steel", "Ergonomic"],
                category: "kitchen tools"
            },
            {
                id: 3,
                name: "Bluetooth Meat Thermometer",
                price: "$18.99",
                keywords: ["thermometer", "meat", "bluetooth", "smart", "grilling", "temperature"],
                description: "Smart thermometer with wireless connectivity",
                features: ["Bluetooth connectivity", "Mobile app", "Dual probe", "Waterproof"],
                category: "smart devices"
            },
            {
                id: 4,
                name: "Automatic Soap Dispenser",
                price: "$9.99",
                keywords: ["soap dispenser", "automatic", "touch", "hygiene", "dispenser"],
                description: "Touch-free soap dispensing for better hygiene",
                features: ["Infrared sensor", "Waterproof", "Large capacity", "Energy efficient"],
                category: "kitchen accessories"
            },
            {
                id: 5,
                name: "USB Portable Blender",
                price: "$8.99",
                keywords: ["blender", "portable", "usb", "smoothie", "rechargeable", "travel"],
                description: "Portable blender for smoothies anywhere, anytime",
                features: ["USB rechargeable", "Portable design", "Safe base", "BPA-free"],
                category: "kitchen appliances"
            }
        ];

        // Frequently Asked Questions
        this.frequentlyAskedQuestions = [
            {
                keywords: ["shipping", "delivery", "shipping cost", "how long", "when"],
                question: "What are your shipping options and costs?",
                answer: "We offer free shipping on orders over $50 within the US. Standard shipping takes 2-3 business days for $5.99, and express shipping (1-2 days) costs $12.99. Orders over $50 qualify for free standard shipping.",
                category: "shipping"
            },
            {
                keywords: ["return", "refund", "exchange", "money back", "return policy"],
                question: "What is your return and refund policy?",
                answer: "We offer a 30-day return policy. Items must be in original condition and packaging. You can return products for a full refund or exchange. Return shipping is free for defective items.",
                category: "returns"
            },
            {
                keywords: ["warranty", "guarantee", "repair", "broken", "defect"],
                question: "Do products come with a warranty?",
                answer: "Yes! All our products come with a 2-year comprehensive warranty against manufacturing defects. We also offer free repair or replacement for any defective items.",
                category: "warranty"
            },
            {
                keywords: ["payment", "pay", "credit card", "paypal", "checkout", "secure"],
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely with 256-bit SSL encryption.",
                category: "payment"
            },
            {
                keywords: ["contact", "phone", "email", "support", "help", "customer service"],
                question: "How can I contact customer support?",
                answer: "Our customer support is available 24/7 via email at support@kitchen-ease.com, phone at +1 (555) 123-4567, or through our live chat. We typically respond within 2 hours.",
                category: "support"
            },
            {
                keywords: ["track", "order status", "where is my order", "tracking"],
                question: "How can I track my order?",
                answer: "You can track your order using the tracking number sent to your email. Visit our Order Tracking page and enter your order number. You'll receive real-time updates on your delivery status.",
                category: "orders"
            },
            {
                keywords: ["discount", "coupon", "promo", "sale", "offer", "deal"],
                question: "Do you offer discounts or promotions?",
                answer: "Yes! We regularly offer promotions and seasonal sales. Sign up for our newsletter to receive exclusive offers, first access to sales, and special discount codes.",
                category: "promotions"
            },
            {
                keywords: ["size", "dimensions", "small", "large", "fit", "compatibility"],
                question: "What sizes are available for your products?",
                answer: "Product dimensions vary by item. Each product page includes detailed specifications. For the Air Fryer XL, the capacity is 5.5 quarts, perfect for families of 3-5 people.",
                category: "product info"
            },
            {
                keywords: ["clean", "cleaning", "dishwasher", "maintenance", "care"],
                question: "How do I clean and maintain the products?",
                answer: "Most of our products are dishwasher safe. The Air Fryer has removable, dishwasher-safe parts. Always refer to the specific care instructions included with each product. Regular cleaning ensures optimal performance.",
                category: "maintenance"
            }
        ];

        // Greeting responses
        this.greetings = [
            "Hello! Welcome to KitchenEase! How can I assist you today?",
            "Hi there! I'm here to help you find the perfect kitchen tools. What are you looking for?",
            "Hello! I'm your KitchenEase assistant. Whether you need product info, shipping details, or anything else - I'm here to help!",
            "Welcome! Ready to upgrade your kitchen? Tell me what you need help with!",
            "Hey! I'm excited to help you discover amazing kitchen tools. What brings you here today?"
        ];

        // Fallback responses
        this.fallbackResponses = [
            "I'd be happy to help you with that! Could you tell me more about what you're looking for?",
            "That's a great question! Let me help you find the information you need. What specific area interests you?",
            "I'm here to assist! You can ask me about our products, shipping, returns, or any other questions you have.",
            "Thanks for reaching out! How can I make your KitchenEase experience better today?",
            "I'd love to help! Whether it's product recommendations or support, just let me know what you need."
        ];
    }

    // Main message processing function
    async processMessage(message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Add to conversation history
        this.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date()
        });

        // Analyze intent
        const intent = this.analyzeIntent(lowercaseMessage);

        // Generate appropriate response
        let response;
        switch (intent.type) {
            case 'greeting':
                response = this.handleGreeting();
                break;
            case 'product_search':
                response = this.handleProductSearch(lowercaseMessage);
                break;
            case 'price_inquiry':
                response = this.handlePriceInquiry(lowercaseMessage);
                break;
            case 'shipping_inquiry':
                response = this.handleShippingInquiry();
                break;
            case 'faq':
                response = this.handleFAQ(lowercaseMessage);
                break;
            case 'support':
                response = this.handleSupport();
                break;
            case 'order_status':
                response = this.handleOrderStatus();
                break;
            default:
                response = this.handleUnknownIntent(lowercaseMessage);
        }

        // Mark as greeted if this was the initial greeting
        if (intent.type === 'greeting' && !this.hasGreeted) {
            this.hasGreeted = true;
        }

        // Add response to conversation history
        this.conversationHistory.push({
            type: 'bot',
            message: response.text,
            timestamp: new Date(),
            intent: intent.type
        });

        return response;
    }

    // Intent analysis
    analyzeIntent(message) {
        // Greeting patterns
        const greetingPatterns = [
            'hello', 'hi', 'hey', 'good morning', 'good afternoon', 
            'good evening', 'greetings', 'what\'s up', 'howdy'
        ];

        // Product search patterns
        const productPatterns = [
            'show me', 'find', 'looking for', 'search', 'products', 
            'kitchen tools', 'cooking', 'appliance', 'need', 'want',
            'air fryer', 'garlic', 'thermometer', 'blender', 'soap'
        ];

        // Price inquiry patterns
        const pricePatterns = [
            'price', 'cost', 'how much', 'expensive', 'cheap', 'affordable',
            '$', 'dollar', 'usd'
        ];

        // Shipping patterns
        const shippingPatterns = [
            'shipping', 'delivery', 'ship', 'deliver', 'when will', 'how long',
            'tracking', 'arrival', 'receive', 'shipping cost', 'how much for shipping',
            'shipping options', 'free shipping', 'delivery time'
        ];

        // Support patterns
        const supportPatterns = [
            'help', 'support', 'problem', 'issue', 'broken', 'defect',
            'not working', 'malfunction'
        ];

        // FAQ patterns
        const faqPatterns = [
            'return', 'refund', 'warranty', 'guarantee', 'payment', 'contact',
            'clean', 'maintenance', 'size', 'discount', 'coupon'
        ];

        // Order status patterns
        const orderPatterns = [
            'order status', 'where is my order', 'tracking', 'shipped',
            'delivery status', 'when will it arrive'
        ];

        // Check for greeting
        if (greetingPatterns.some(pattern => message.includes(pattern))) {
            return { type: 'greeting', confidence: 0.9 };
        }

        // Check for order status
        if (orderPatterns.some(pattern => message.includes(pattern))) {
            return { type: 'order_status', confidence: 0.8 };
        }

        // Check for shipping
        if (shippingPatterns.some(pattern => message.includes(pattern))) {
            return { type: 'shipping_inquiry', confidence: 0.8 };
        }

        // Check for price inquiry
        if (pricePatterns.some(pattern => message.includes(pattern))) {
            return { type: 'price_inquiry', confidence: 0.7 };
        }

        // Check for FAQ
        if (faqPatterns.some(pattern => message.includes(pattern))) {
            return { type: 'faq', confidence: 0.7 };
        }

        // Check for support
        if (supportPatterns.some(pattern => message.includes(pattern))) {
            return { type: 'support', confidence: 0.6 };
        }

        // Check for product search
        if (productPatterns.some(pattern => message.includes(pattern))) {
            return { type: 'product_search', confidence: 0.6 };
        }

        return { type: 'unknown', confidence: 0.3 };
    }

    // Handle greetings
    handleGreeting() {
        let greeting;
        
        if (!this.hasGreeted) {
            // First greeting - give welcome message
            greeting = this.greetings[Math.floor(Math.random() * this.greetings.length)];
        } else {
            // Subsequent greetings - give friendly responses
            const followUpGreetings = [
                "Hello again! How can I help you today?",
                "Hi there! What would you like to explore?",
                "Welcome back! Need any assistance?",
                "Hey! Ready to find something great for your kitchen?"
            ];
            greeting = followUpGreetings[Math.floor(Math.random() * followUpGreetings.length)];
        }
        
        return {
            text: greeting,
            quickActions: [
                "Show me kitchen tools",
                "What are your shipping options?",
                "I need help with my order"
            ]
        };
    }

    // Handle product search
    handleProductSearch(message) {
        const matchedProducts = this.searchProducts(message);
        
        if (matchedProducts.length > 0) {
            return {
                text: `I found ${matchedProducts.length} products that match your request:`,
                products: matchedProducts,
                type: 'products'
            };
        } else {
            return {
                text: "I couldn't find exact matches for your search. Here are our most popular kitchen tools:",
                products: this.productKnowledge.slice(0, 3)
            };
        }
    }

    // Search products
    searchProducts(query) {
        return this.productKnowledge.filter(product => {
            const searchableText = [
                product.name.toLowerCase(),
                product.description.toLowerCase(),
                ...product.keywords.map(k => k.toLowerCase())
            ].join(' ');

            return searchableText.includes(query) || 
                   product.keywords.some(keyword => query.includes(keyword));
        });
    }

    // Handle price inquiries
    handlePriceInquiry(message) {
        const products = this.searchProducts(message);
        
        if (products.length > 0) {
            const productList = products.map(p => `${p.name}: ${p.price}`).join('\n');
            return {
                text: `Here are the prices for the products you inquired about:\n\n${productList}\n\nAll prices are in USD. Would you like more details about any specific product?`
            };
        } else {
            return {
                text: "Our products range from $8.99 to $34.99. Here's our price range:\n\n• USB Portable Blender: $8.99\n• Automatic Soap Dispenser: $9.99\n• Electric Garlic Press: $12.99\n• Bluetooth Meat Thermometer: $18.99\n• Smart Air Fryer XL: $34.99\n\nWhich product interests you?",
                products: this.productKnowledge
            };
        }
    }

    // Handle shipping inquiries
    handleShippingInquiry() {
        return {
            text: "🚚 **Shipping Information:**\n\n• **Free Shipping:** Orders over $50 (2-3 business days)\n• **Standard Shipping:** $5.99 (2-3 business days)\n• **Express Shipping:** $12.99 (1-2 business days)\n• **International Shipping:** Available to most countries\n\nAll orders are processed within 24 hours. You'll receive tracking information via email once your order ships!",
            quickActions: [
                "Track my order",
                "Return policy",
                "Contact support"
            ]
        };
    }

    // Handle FAQ
    handleFAQ(message) {
        const matchedFAQ = this.frequentlyAskedQuestions.find(faq => 
            faq.keywords.some(keyword => message.includes(keyword))
        );

        if (matchedFAQ) {
            return {
                text: `**${matchedFAQ.question}**\n\n${matchedFAQ.answer}`,
                quickActions: [
                    "More shipping info",
                    "Contact support",
                    "Show products"
                ]
            };
        } else {
            return {
                text: "I found some frequently asked questions that might help:\n\n• Shipping and delivery options\n• Return and refund policy\n• Warranty information\n• Payment methods\n• How to track orders\n\nWhich topic would you like to know more about?",
                quickActions: [
                    "Shipping options",
                    "Return policy", 
                    "Warranty info",
                    "Payment methods"
                ]
            };
        }
    }

    // Handle support requests
    handleSupport() {
        return {
            text: "🆘 **Customer Support**\n\nI'm here to help! You can reach our support team:\n\n• **Email:** support@kitchen-ease.com\n• **Phone:** +1 (555) 123-4567\n• **Live Chat:** Available 24/7\n• **Response Time:** Within 2 hours\n\nWhat specific issue can I help you resolve today?",
            quickActions: [
                "Order problem",
                "Product issue",
                "Return request",
                "Track order"
            ]
        };
    }

    // Handle order status inquiries
    handleOrderStatus() {
        return {
            text: "📦 **Order Tracking**\n\nTo track your order, please provide:\n\n• Order number (sent via email)\n• Email address used for the order\n\nYou can also track your order on our website using your order confirmation email. You'll receive real-time updates from our warehouse to your door!\n\nNeed your order number resent? I can help with that too.",
            quickActions: [
                "Resend order confirmation",
                "Contact support",
                "Shipping info"
            ]
        };
    }

    // Handle unknown intent
    handleUnknownIntent(message) {
        // Check if message contains any product keywords
        const productMatches = this.searchProducts(message);
        
        if (productMatches.length > 0) {
            return this.handleProductSearch(message);
        }

        // Return a helpful fallback response
        const fallback = this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
        
        return {
            text: fallback,
            quickActions: [
                "Show me products",
                "Shipping information",
                "Contact support",
                "FAQ"
            ]
        };
    }

    // Get conversation summary
    getConversationSummary() {
        return {
            sessionId: this.sessionId,
            messageCount: this.conversationHistory.length,
            topics: [...new Set(this.conversationHistory.map(m => m.intent).filter(Boolean))],
            duration: this.conversationHistory.length > 1 ? 
                (this.conversationHistory[this.conversationHistory.length - 1].timestamp - 
                 this.conversationHistory[0].timestamp) : 0
        };
    }

    // Export conversation data
    exportConversation() {
        return {
            session: this.getConversationSummary(),
            history: this.conversationHistory,
            timestamp: new Date().toISOString()
        };
    }

    // Reset conversation
    reset() {
        this.conversationHistory = [];
        this.userPreferences = {};
        this.sessionId = this.generateSessionId();
    }
}

// Initialize AI Engine
if (typeof window !== 'undefined') {
    window.AIEngine = new KitchenEaseAI();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KitchenEaseAI;
}

console.log('🤖 KitchenEase AI Engine (English) loaded successfully!');