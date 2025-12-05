/**
 * KitchenEase AI Assistant - English Version Testing Suite
 * Comprehensive testing for the English chatbot functionality
 */

const fs = require('fs');
const path = require('path');

// Mock browser environment for Node.js
global.localStorage = {
    data: {},
    setItem: function(key, value) {
        this.data[key] = value;
    },
    getItem: function(key) {
        return this.data[key];
    },
    removeItem: function(key) {
        delete this.data[key];
    }
};

// Load the AI Engine
const KitchenEaseAI = require('./chatbot_intelligence_english.js');

class ChatbotTester {
    constructor() {
        this.ai = new KitchenEaseAI();
        this.testResults = [];
        this.totalTests = 0;
        this.passedTests = 0;
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = type === 'success' ? '✅' : 
                      type === 'error' ? '❌' : 
                      type === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`[${timestamp}] ${prefix} ${message}`);
    }

    async runTest(testName, testFunction) {
        this.totalTests++;
        try {
            this.log(`Running test: ${testName}`);
            const result = await testFunction();
            if (result.success) {
                this.passedTests++;
                this.log(`Test passed: ${testName}`, 'success');
            } else {
                this.log(`Test failed: ${testName} - ${result.message}`, 'error');
            }
            this.testResults.push({ name: testName, ...result });
        } catch (error) {
            this.log(`Test error: ${testName} - ${error.message}`, 'error');
            this.testResults.push({ name: testName, success: false, message: error.message });
        }
    }

    async testGreetingResponses() {
        const greetingMessages = [
            'Hello',
            'Hi there',
            'Hey',
            'Good morning',
            'What\'s up'
        ];

        const results = [];
        for (const message of greetingMessages) {
            const response = await this.ai.processMessage(message);
            const hasGreetingResponse = response.text && 
                (response.text.toLowerCase().includes('hello') || 
                 response.text.toLowerCase().includes('hi') ||
                 response.text.toLowerCase().includes('welcome'));
            
            results.push({
                message,
                response: response.text.substring(0, 100) + '...',
                hasGreetingResponse
            });
        }

        const allGreetings = results.every(r => r.hasGreetingResponse);
        return {
            success: allGreetings,
            message: allGreetings ? 'All greeting responses working' : 'Some greetings failed',
            details: results
        };
    }

    async testProductSearch() {
        const productQueries = [
            'Show me air fryers',
            'I need kitchen tools',
            'Looking for blender',
            'garlic press',
            'thermometer'
        ];

        const results = [];
        for (const query of productQueries) {
            const response = await this.ai.processMessage(query);
            const foundProducts = response.products && response.products.length > 0;
            
            results.push({
                query,
                productsFound: response.products ? response.products.length : 0,
                hasProducts: foundProducts
            });
        }

        const searchWorking = results.every(r => r.hasProducts);
        return {
            success: searchWorking,
            message: searchWorking ? 'Product search working correctly' : 'Product search failed',
            details: results
        };
    }

    async testPriceInquiry() {
        const priceQueries = [
            'How much does the air fryer cost?',
            'What is the price?',
            'Price of blender',
            'How expensive is the thermometer?'
        ];

        const results = [];
        for (const query of priceQueries) {
            const response = await this.ai.processMessage(query);
            const hasPrice = response.text && 
                (response.text.includes('$') || response.text.includes('price'));
            
            results.push({
                query,
                hasPrice: hasPrice,
                response: response.text.substring(0, 100) + '...'
            });
        }

        const priceWorking = results.every(r => r.hasPrice);
        return {
            success: priceWorking,
            message: priceWorking ? 'Price inquiry working' : 'Price inquiry failed',
            details: results
        };
    }

    async testShippingInquiry() {
        const shippingQueries = [
            'What are your shipping options?',
            'How much for shipping?',
            'Do you deliver?',
            'Shipping cost'
        ];

        const results = [];
        for (const query of shippingQueries) {
            const response = await this.ai.processMessage(query);
            const hasShipping = response.text && 
                (response.text.toLowerCase().includes('shipping') ||
                 response.text.toLowerCase().includes('delivery') ||
                 response.text.toLowerCase().includes('delivery'));
            
            results.push({
                query,
                hasShipping: hasShipping,
                response: response.text.substring(0, 100) + '...'
            });
        }

        const shippingWorking = results.every(r => r.hasShipping);
        return {
            success: shippingWorking,
            message: shippingWorking ? 'Shipping inquiry working' : 'Shipping inquiry failed',
            details: results
        };
    }

    async testFAQ() {
        const faqQueries = [
            'What is your return policy?',
            'Do you offer warranty?',
            'How can I pay?',
            'Contact information',
            'cleaning instructions'
        ];

        const results = [];
        for (const query of faqQueries) {
            const response = await this.ai.processMessage(query);
            const hasResponse = response.text && response.text.length > 20;
            
            results.push({
                query,
                hasResponse: hasResponse,
                responseLength: response.text.length
            });
        }

        const faqWorking = results.every(r => r.hasResponse);
        return {
            success: faqWorking,
            message: faqWorking ? 'FAQ responses working' : 'FAQ responses failed',
            details: results
        };
    }

    async testSupport() {
        const supportQueries = [
            'I need help',
            'My product is broken',
            'Customer support',
            'I have a problem'
        ];

        const results = [];
        for (const query of supportQueries) {
            const response = await this.ai.processMessage(query);
            const hasSupport = response.text && 
                (response.text.toLowerCase().includes('support') ||
                 response.text.toLowerCase().includes('help') ||
                 response.text.toLowerCase().includes('contact'));
            
            results.push({
                query,
                hasSupport: hasSupport,
                response: response.text.substring(0, 100) + '...'
            });
        }

        const supportWorking = results.every(r => r.hasSupport);
        return {
            success: supportWorking,
            message: supportWorking ? 'Support responses working' : 'Support responses failed',
            details: results
        };
    }

    async testOrderStatus() {
        const orderQueries = [
            'Where is my order?',
            'Track my order',
            'Order status',
            'When will it arrive?'
        ];

        const results = [];
        for (const query of orderQueries) {
            const response = await this.ai.processMessage(query);
            const hasOrderInfo = response.text && 
                (response.text.toLowerCase().includes('order') ||
                 response.text.toLowerCase().includes('track') ||
                 response.text.toLowerCase().includes('tracking'));
            
            results.push({
                query,
                hasOrderInfo: hasOrderInfo,
                response: response.text.substring(0, 100) + '...'
            });
        }

        const orderWorking = results.every(r => r.hasOrderInfo);
        return {
            success: orderWorking,
            message: orderWorking ? 'Order status responses working' : 'Order status responses failed',
            details: results
        };
    }

    async testUnknownIntent() {
        const unknownQueries = [
            'xyzabc123',
            'random text here',
            'something random',
            '123456'
        ];

        const results = [];
        for (const query of unknownQueries) {
            const response = await this.ai.processMessage(query);
            const hasResponse = response.text && response.text.length > 10;
            
            results.push({
                query,
                hasResponse: hasResponse,
                response: response.text.substring(0, 100) + '...'
            });
        }

        const unknownWorking = results.every(r => r.hasResponse);
        return {
            success: unknownWorking,
            message: unknownWorking ? 'Unknown intent handling working' : 'Unknown intent handling failed',
            details: results
        };
    }

    async testProductKnowledge() {
        const productTests = [];
        
        // Test each product in the knowledge base
        for (const product of this.ai.productKnowledge) {
            const response = await this.ai.processMessage(product.name);
            const found = response.products && 
                response.products.some(p => p.id === product.id);
            
            productTests.push({
                product: product.name,
                found: found
            });
        }

        const allProductsFound = productTests.every(t => t.found);
        return {
            success: allProductsFound,
            message: allProductsFound ? 'All products found in search' : 'Some products not found',
            details: productTests
        };
    }

    async testFAQDatabase() {
        const faqTests = [];
        
        for (const faq of this.ai.frequentlyAskedQuestions) {
            // Test each FAQ keyword
            const keyword = faq.keywords[0];
            const response = await this.ai.processMessage(keyword);
            const matched = response.text && response.text.length > 20;
            
            faqTests.push({
                faq: faq.question,
                keyword: keyword,
                matched: matched
            });
        }

        const allMatched = faqTests.every(t => t.matched);
        return {
            success: allMatched,
            message: allMatched ? 'All FAQ keywords matched' : 'Some FAQ keywords failed',
            details: faqTests
        };
    }

    async testConversationHistory() {
        // Add some messages to history
        await this.ai.processMessage('Hello');
        await this.ai.processMessage('I need a blender');
        await this.ai.processMessage('How much does it cost?');

        const summary = this.ai.getConversationSummary();
        const hasHistory = summary.messageCount >= 3;
        const hasDuration = summary.duration >= 0;
        
        return {
            success: hasHistory && hasDuration,
            message: 'Conversation history working',
            details: {
                messageCount: summary.messageCount,
                hasDuration: hasDuration,
                topics: summary.topics
            }
        };
    }

    async testExportFunction() {
        const exportData = this.ai.exportConversation();
        const hasRequiredFields = exportData.session && 
                                 exportData.history && 
                                 exportData.timestamp;
        
        return {
            success: hasRequiredFields,
            message: 'Export function working',
            details: {
                hasSession: !!exportData.session,
                hasHistory: !!exportData.history,
                hasTimestamp: !!exportData.timestamp
            }
        };
    }

    async runAllTests() {
        this.log('🚀 Starting KitchenEase English Chatbot Tests', 'info');
        this.log('=' .repeat(50), 'info');

        // Run all tests
        await this.runTest('Greeting Responses', () => this.testGreetingResponses());
        await this.runTest('Product Search', () => this.testProductSearch());
        await this.runTest('Price Inquiry', () => this.testPriceInquiry());
        await this.runTest('Shipping Inquiry', () => this.testShippingInquiry());
        await this.runTest('FAQ Responses', () => this.testFAQ());
        await this.runTest('Support Responses', () => this.testSupport());
        await this.runTest('Order Status', () => this.testOrderStatus());
        await this.runTest('Unknown Intent Handling', () => this.testUnknownIntent());
        await this.runTest('Product Knowledge Base', () => this.testProductKnowledge());
        await this.runTest('FAQ Database', () => this.testFAQDatabase());
        await this.runTest('Conversation History', () => this.testConversationHistory());
        await this.runTest('Export Function', () => this.testExportFunction());

        // Print results
        this.log('=' .repeat(50), 'info');
        this.log(`📊 Test Results: ${this.passedTests}/${this.totalTests} tests passed`, 
                 this.passedTests === this.totalTests ? 'success' : 'warning');

        if (this.passedTests === this.totalTests) {
            this.log('🎉 All tests passed! English chatbot is working perfectly!', 'success');
        } else {
            this.log(`⚠️  ${this.totalTests - this.passedTests} tests failed`, 'error');
        }

        // Save detailed report
        this.saveReport();

        return {
            total: this.totalTests,
            passed: this.passedTests,
            failed: this.totalTests - this.passedTests,
            percentage: ((this.passedTests / this.totalTests) * 100).toFixed(1)
        };
    }

    saveReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                total: this.totalTests,
                passed: this.passedTests,
                failed: this.totalTests - this.passedTests,
                percentage: ((this.passedTests / this.totalTests) * 100).toFixed(1)
            },
            results: this.testResults
        };

        const reportPath = path.join(__dirname, 'chatbot_test_report_english.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        this.log(`📄 Detailed report saved to: chatbot_test_report_english.json`);
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const tester = new ChatbotTester();
    tester.runAllTests().then(results => {
        process.exit(results.failed === 0 ? 0 : 1);
    });
}

module.exports = ChatbotTester;