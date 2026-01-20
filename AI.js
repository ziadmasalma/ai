// ERPMax ChatBot for ERPNext 12
// File: chatbot.js

frappe.provide('erpmax.chatbot');

erpmax.chatbot = {
    apiKey: "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",
    apiUrl: "https://api.openai.com/v1/chat/completions",
    messages: [],
    isLoading: false,

    init: function() {
        this.messages = [{
            text: "👋 أهلاً بك في ERPMax! كيف بقدر أساعدك اليوم؟",
            isUser: false,
            timestamp: new Date()
        }];
    },

    show: function() {
        const dialog = new frappe.ui.Dialog({
            title: __('ERPMax Assistant'),
            fields: [{
                fieldtype: 'HTML',
                fieldname: 'chat_container'
            }],
            primary_action_label: __('Close'),
            primary_action: function() {
                dialog.hide();
            }
        });

        dialog.show();
        dialog.$wrapper.find('.modal-dialog').css('max-width', '600px');
        
        this.renderChat(dialog);
        return dialog;
    },

    renderChat: function(dialog) {
        const container = dialog.fields_dict.chat_container.$wrapper;
        
        container.html(`
            <div class="chatbot-wrapper" style="display: flex; flex-direction: column; height: 500px;">
                <div class="chat-messages" style="
                    flex: 1;
                    overflow-y: auto;
                    padding: 15px;
                    background: #f5f7fa;
                    border-radius: 8px;
                    margin-bottom: 15px;
                ">
                    ${this.renderMessages()}
                </div>
                <div class="chat-input-wrapper" style="
                    display: flex;
                    gap: 10px;
                    padding: 10px;
                    background: white;
                    border-radius: 8px;
                    border: 1px solid #8EC7D2;
                ">
                    <input 
                        type="text" 
                        class="chat-input form-control" 
                        placeholder="اكتب رسالتك..."
                        style="flex: 1;"
                    />
                    <button class="btn btn-primary chat-send-btn" style="
                        background: #006375;
                        border: none;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `);

        this.attachEventListeners(container);
    },

    renderMessages: function() {
        let html = '';
        
        // عرض الرسائل بترتيبها الطبيعي (الجديدة تحت)
        this.messages.forEach(msg => {
            const alignment = msg.isUser ? 'flex-end' : 'flex-start';
            const bgColor = msg.isUser ? '#006375' : '#8EC7D2';
            const textColor = msg.isUser ? 'white' : '#333';
            
            html += `
                <div style="display: flex; justify-content: ${alignment}; margin-bottom: 12px;">
                    <div style="
                        max-width: 70%;
                        padding: 12px 16px;
                        border-radius: 16px;
                        background: ${bgColor};
                        color: ${textColor};
                        word-wrap: break-word;
                    ">
                        ${frappe.utils.escape_html(msg.text).replace(/\n/g, "<br>")}
                    </div>
                </div>
            `;
        });

        if (this.isLoading) {
            html += `
                <div style="display: flex; justify-content: flex-start; margin-bottom: 12px;">
                    <div style="
                        padding: 12px 16px;
                        border-radius: 16px;
                        background: #8EC7D2;
                        color: #333;
                    ">
                        <div class="loading-dots">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                </div>
            `;
        }

        return html;
    },

    attachEventListeners: function(container) {
        const input = container.find('.chat-input');
        const sendBtn = container.find('.chat-send-btn');
        const messagesContainer = container.find('.chat-messages');

        const sendMessage = () => {
            const text = input.val().trim();
            if (text) {
                this.handleSubmit(text, messagesContainer);
                input.val('');
            }
        };

        sendBtn.on('click', sendMessage);
        input.on('keypress', (e) => {
            if (e.which === 13) {
                sendMessage();
            }
        });

        // Add CSS for loading animation
        if (!$('#chatbot-styles').length) {
            $('head').append(`
                <style id="chatbot-styles">
                    .loading-dots span {
                        animation: blink 1.4s infinite;
                        animation-fill-mode: both;
                        display: inline-block;
                    }
                    .loading-dots span:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    .loading-dots span:nth-child(3) {
                        animation-delay: 0.4s;
                    }
                    @keyframes blink {
                        0%, 80%, 100% { opacity: 0; }
                        40% { opacity: 1; }
                    }
                </style>
            `);
        }
    },

    handleSubmit: function(text, messagesContainer) {
        // Add user message
        this.messages.push({
            text: text,
            isUser: true,
            timestamp: new Date()
        });

        this.isLoading = true;
        this.updateMessages(messagesContainer);

        // Get AI response
        this.getAIResponse(text).then(response => {
            this.messages.push({
                text: response,
                isUser: false,
                timestamp: new Date()
            });
            this.isLoading = false;
            this.updateMessages(messagesContainer);
        });
    },

    updateMessages: function(messagesContainer) {
        messagesContainer.html(this.renderMessages());
        messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
    },

    getAIResponse: async function(query) {
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: `
أنت مساعد ذكي داخل نظام ERPNext فقط.
❗ لا تجب على أي سؤال خارج ERPNext أو نظام Frappe.
❗ إذا كان السؤال لا يخص ERPNext، اعتذر وقل:
عذراً، لم أتمكن من إيجاد إجابة دقيقة لهذا السؤال. يرجى التواصل مع الدعم الفني على الرقم: 022966527"
"

❗ إذا لم تتمكن من الإجابة على سؤال متعلق بـ ERPNext، قل:
"عذراً، لم أتمكن من إيجاد إجابة دقيقة لهذا السؤال. يرجى التواصل مع الدعم الفني على الرقم: 022966527"

تخصصك:
- ERPNext v12
- Sales, Purchase, Stock, Accounting
- Users, Roles, Permissions
- Reports & Customization

أجب دائمًا باللغة العربية وبأسلوب مختصر وواضح.
`
                        },
                        {
                            role: "user",
                            content: query
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 500
                })
            });

            const data = await response.json();
            console.log("OpenAI response:", data);

            return data?.choices?.[0]?.message?.content
                || "❌ عذراً، لم أتمكن من إيجاد إجابة. يرجى التواصل مع الدعم الفني على الرقم: 022966527";

        } catch (error) {
            console.error("OpenAI Error:", error);
            return "❌ حدث خطأ في الاتصال. يرجى التواصل مع الدعم الفني على الرقم: 022966527";
        }
    }
};

// Initialize on page load
$(document).ready(function() {
    erpmax.chatbot.init();
    
    // Add button to navbar (optional)
    if (frappe.boot.user.name !== 'Guest') {
        $('.navbar-right').prepend(`
            <li>
                <a href="#" class="chatbot-trigger" title="ERPMax Assistant">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke-width="2"/>
                    </svg>
                </a>
            </li>
        `);
        
        $('.chatbot-trigger').on('click', function(e) {
            e.preventDefault();
            erpmax.chatbot.show();
        });
    }
});

// Usage: Call from anywhere in ERPNext
// erpmax.chatbot.show();