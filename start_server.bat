@echo off
chcp 65001 >nul
echo 🚀 KitchenEase Store - بدء التشغيل
echo ==================================
echo.

echo 🌐 بدء تشغيل الخادم على المنفذ 8000...
echo.
echo 📱 اذهب إلى المتصفح وافتح: http://localhost:8000
echo.
echo الصفحات المتاحة:
echo   🏠 الصفحة الرئيسية:     http://localhost:8000
echo   🤖 الشات بوت:           http://localhost:8000/chatbot.html  
echo   💳 الدفع:              http://localhost:8000/payment.html
echo   ⚙️  لوحة التحكم:       http://localhost:8000/admin.html
echo   🧪 اختبار الشات بوت:    http://localhost:8000/test.html
echo.
echo لإيقاف الخادم: اضغط Ctrl+C
echo ==================================
echo.

python -m http.server 8000