#!/bin/bash

# KitchenEase Store - Quick Start Script
# لتشغيل الموقع بسهولة

echo "🚀 KitchenEase Store - بدء التشغيل"
echo "=================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python غير مثبت. يرجى تثبيت Python أولاً."
    exit 1
fi

echo "✅ Python متوفر"
echo "🌐 بدء تشغيل الخادم على المنفذ 8000..."
echo ""
echo "📱 اذهب إلى المتصفح وافتح: http://localhost:8000"
echo ""
echo "الصفحات المتاحة:"
echo "  🏠 الصفحة الرئيسية:     http://localhost:8000"
echo "  🤖 الشات بوت:           http://localhost:8000/chatbot.html"
echo "  💳 الدفع:              http://localhost:8000/payment.html"
echo "  ⚙️  لوحة التحكم:       http://localhost:8000/admin.html"
echo "  🧪 اختبار الشات بوت:    http://localhost:8000/test.html"
echo ""
echo "لإيقاف الخادم: اضغط Ctrl+C"
echo "=================================="
echo ""

# Start the web server
$PYTHON_CMD -m http.server 8000