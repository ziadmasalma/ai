# 🤖 ERPMax AI ChatBot

<div align="center">

<img width="639" height="618" alt="image" src="https://github.com/user-attachments/assets/077d9602-058e-4cc3-a63f-8982fc627b58" />

**An intelligent AI-powered assistant for ERPNext v12 - Built with OpenAI GPT-4**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Configuration](#-configuration) • [Screenshots](#-screenshots)

</div>

---

## 📋 Overview

ERPMax ChatBot is an intelligent assistant integrated directly into your ERPNext v12 system. It provides instant support and answers to your ERPNext-related questions in Arabic, helping users navigate the system efficiently.

### 🎯 Key Highlights

- ✨ **AI-Powered**: Leverages OpenAI's GPT-4o-mini for intelligent responses
- 🇵🇸 **Arabic Support**: Fully localized Arabic interface and responses
- 🎨 **Beautiful UI**: Modern, clean chat interface with custom color scheme
- ⚡ **Real-time**: Instant responses with loading indicators
- 🔒 **Focused**: Specialized in ERPNext v12 queries only
- 📱 **Responsive**: Works seamlessly across all devices

---

## ✨ Features

### 🤖 Intelligent Assistance
- Expert knowledge in ERPNext v12 modules:
  - Sales & Purchase
  - Stock Management
  - Accounting
  - Users, Roles & Permissions
  - Reports & Customization

### 💬 User Experience
- Clean, modern chat interface
- Real-time message updates
- Typing indicators
- Auto-scroll to latest messages
- Quick access from navbar

### 🎨 Custom Branding
- Branded color scheme:
  - Primary: `#006375`
  - Secondary: `#94C120`
  - Accent: `#8EC7D2`
  - Support colors for various UI elements

### 🛡️ Smart Filtering
- Only answers ERPNext-related questions
- Redirects non-relevant queries politely
- Provides technical support contact when needed

---

## 🚀 Installation

### Prerequisites
- ERPNext v12 or compatible version
- Frappe Framework
- OpenAI API Key

### Step 1: Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key

### Step 2: Install the ChatBot

1. **Download the file:**
   ```bash
   cd ~/frappe-bench/apps/erpnext/erpnext/public/js
   wget https://raw.githubusercontent.com/YOUR_REPO/chatbot.js
   ```

2. **Or create the file manually:**
   ```bash
   nano ~/frappe-bench/apps/erpnext/erpnext/public/js/chatbot.js
   # Paste the chatbot code
   ```

3. **Include in build:**
   Add to `hooks.py` in your custom app:
   ```python
   app_include_js = ["chatbot.js"]
   ```

4. **Build assets:**
   ```bash
   cd ~/frappe-bench
   bench build
   bench restart
   ```

5. **Clear cache:**
   ```bash
   bench clear-cache
   ```

---

## ⚙️ Configuration

### 1. Set Your API Key

Open `chatbot.js` and replace the API key:

```javascript
erpmax.chatbot = {
    apiKey: "YOUR_OPENAI_API_KEY_HERE",
    // ... rest of code
}
```

### 2. Customize Support Contact

Update the technical support number:

```javascript
// In the system prompt
"يرجى التواصل مع الدعم الفني على الرقم: YOUR_PHONE_NUMBER"
```

### 3. Adjust AI Settings (Optional)

```javascript
// In getAIResponse function
{
    model: "gpt-4o-mini",      // AI model
    temperature: 0.3,           // Response creativity (0-1)
    max_tokens: 500            // Maximum response length
}
```

---

## 💡 Usage

### Access the ChatBot

**Method 1: Navbar Icon**
- Look for the chat icon in the top navbar
- Click to open the assistant

**Method 2: JavaScript Console**
```javascript
erpmax.chatbot.show()
```

### Sample Questions

Try asking (in Arabic):
- "كيف أنشئ فاتورة مبيعات؟"
- "ما هي الصلاحيات المطلوبة لحذف مستند؟"
- "كيف أعمل تقرير للمخزون؟"
- "شرح لي عملية الشراء"

---

## 🎨 Screenshots

### Chat Interface
```
┌─────────────────────────────────────┐
│  ERPMax Assistant              [✕]  │
├─────────────────────────────────────┤
│                                     │
│  👋 أهلاً بك في ERPMax!             │
│  كيف بقدر أساعدك اليوم؟             │
│                                     │
│              كيف أنشئ فاتورة؟       │
│                                     │
│  لإنشاء فاتورة مبيعات:              │
│  1. اذهب إلى Sales                 │
│  2. اختر Sales Invoice...          │
│                                     │
├─────────────────────────────────────┤
│  [اكتب رسالتك...          ] [📤]   │
└─────────────────────────────────────┘
```

---

## 🔧 Customization

### Change Colors

Update the color scheme in the code:

```javascript
// User messages
background: '#006375'  // Primary color

// Bot messages  
background: '#8EC7D2'  // Secondary Accent

// Border
border: '1px solid #8EC7D2'
```

### Modify Response Length

```javascript
max_tokens: 500  // Increase for longer responses
```

### Add New Expertise Areas

Update the system prompt:

```javascript
content: `
أنت مساعد ذكي داخل نظام ERPNext فقط.

تخصصك:
- ERPNext v12
- Sales, Purchase, Stock, Accounting
- YOUR NEW AREA HERE
...
`
```

---

## 🐛 Troubleshooting

### ChatBot Not Appearing?
1. Clear browser cache
2. Run `bench clear-cache`
3. Rebuild assets: `bench build`
4. Hard refresh: `Ctrl + Shift + R`

### No Responses from AI?
1. Check your OpenAI API key is valid
2. Verify you have API credits
3. Check browser console for errors
4. Ensure internet connection is stable

### Arabic Text Issues?
1. Verify your browser supports RTL languages
2. Check ERPNext language settings
3. Clear cache and reload

---

## 📝 Technical Details

### File Structure
```
chatbot.js
├── erpmax.chatbot (Main object)
│   ├── init()           - Initialize chatbot
│   ├── show()           - Display dialog
│   ├── renderChat()     - Render UI
│   ├── renderMessages() - Display messages
│   ├── handleSubmit()   - Process user input
│   └── getAIResponse()  - Call OpenAI API
```

### Dependencies
- Frappe Framework
- jQuery (included in ERPNext)
- OpenAI API

### API Calls
- Endpoint: `https://api.openai.com/v1/chat/completions`
- Model: `gpt-4o-mini`
- Method: `POST`

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT-4 API
- **Frappe** for the amazing ERPNext framework
- **ERPNext Community** for continuous support

---

## 📞 Support

For technical support, contact: **022966527**

---

<div align="center">

**Made with ❤️ for the ERPNext Community**

⭐ Star this repo if you find it helpful!

</div>
