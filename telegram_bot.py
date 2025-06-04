import os
import logging
from datetime import datetime
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters

# Load environment variables
load_dotenv()

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Constants
WEBSITE_URL = "https://your-website-url.com"  # Замените на ваш URL
PHONE = "+7-901-052-69-89"
ADDRESS = "г. Москва, метро 'Охотный ряд', Тверская улица, 20/1с1"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    keyboard = [
        [InlineKeyboardButton("🏠 Наши проекты", callback_data="projects")],
        [InlineKeyboardButton("💰 Услуги и цены", callback_data="services")],
        [InlineKeyboardButton("📞 Контакты", callback_data="contacts")],
        [InlineKeyboardButton("📝 Оставить заявку", callback_data="application")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "👋 Добро пожаловать в Crafted Living!\n\n"
        "Мы специализируемся на строительстве качественных домов.\n"
        "Чем могу помочь?",
        reply_markup=reply_markup
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    await update.message.reply_text(
        "Доступные команды:\n"
        "/start - Начать общение\n"
        "/help - Показать это сообщение\n"
        "/projects - Посмотреть проекты\n"
        "/services - Услуги и цены\n"
        "/contacts - Контактная информация\n"
        "/application - Оставить заявку"
    )

async def projects(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Show available projects."""
    projects_text = (
        "🏠 Наши популярные проекты:\n\n"
        "1. 'Форэнта'\n"
        "   - Каркасный дом\n"
        "   - Цена: 28 000 000 ₽\n\n"
        "2. 'Лурониум'\n"
        "   - Каркасный дом\n"
        "   - Цена: 21 000 000 ₽\n\n"
        "3. 'Микрус'\n"
        "   - Каркасный дом\n"
        "   - Цена: 19 000 000 ₽\n\n"
        "Хотите узнать подробнее о каком-то проекте?"
    )
    keyboard = [
        [InlineKeyboardButton("Подробнее о Форэнта", callback_data="project_forenta")],
        [InlineKeyboardButton("Подробнее о Лурониум", callback_data="project_luronium")],
        [InlineKeyboardButton("Подробнее о Микрус", callback_data="project_micrus")],
        [InlineKeyboardButton("🏠 Главное меню", callback_data="main_menu")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    if update.message:
        await update.message.reply_text(projects_text, reply_markup=reply_markup)
    else:
        await update.callback_query.message.edit_text(projects_text, reply_markup=reply_markup)

async def services(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Show services and prices."""
    services_text = (
        "💰 Наши услуги:\n\n"
        "1. Одноэтажные дома\n"
        "   - от 12 000 000 ₽\n\n"
        "2. Дома с мансардой\n"
        "   - от 20 000 000 ₽\n\n"
        "3. Двухэтажные дома\n"
        "   - от 30 000 000 ₽\n\n"
        "Хотите узнать подробнее о какой-то услуге?"
    )
    keyboard = [
        [InlineKeyboardButton("Одноэтажные дома", callback_data="service_1floor")],
        [InlineKeyboardButton("Дома с мансардой", callback_data="service_mansard")],
        [InlineKeyboardButton("Двухэтажные дома", callback_data="service_2floor")],
        [InlineKeyboardButton("🏠 Главное меню", callback_data="main_menu")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    if update.message:
        await update.message.reply_text(services_text, reply_markup=reply_markup)
    else:
        await update.callback_query.message.edit_text(services_text, reply_markup=reply_markup)

async def contacts(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Show contact information."""
    contacts_text = (
        "📞 Наши контакты:\n\n"
        f"Телефон: {PHONE}\n"
        "Время работы: 9:00-22:00\n\n"
        f"Адрес: {ADDRESS}\n\n"
        "🌐 Социальные сети:\n"
        "- VK: vk.com/club230679274\n"
        "- Telegram: t.me/your_channel"
    )
    keyboard = [
        [InlineKeyboardButton("📞 Позвонить", url=f"tel:{PHONE}")],
        [InlineKeyboardButton("🗺 Открыть карту", url="https://yandex.ru/maps/-/CCUZYMuKkD")],
        [InlineKeyboardButton("🏠 Главное меню", callback_data="main_menu")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    if update.message:
        await update.message.reply_text(contacts_text, reply_markup=reply_markup)
    else:
        await update.callback_query.message.edit_text(contacts_text, reply_markup=reply_markup)

async def application(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle application process."""
    context.user_data['application_stage'] = 'name'
    
    await update.message.reply_text(
        "📝 Заполните заявку, пожалуйста.\n\n"
        "Как к вам обращаться?"
    )

async def handle_application_input(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle application form inputs."""
    stage = context.user_data.get('application_stage')
    
    if stage == 'name':
        context.user_data['name'] = update.message.text
        context.user_data['application_stage'] = 'phone'
        await update.message.reply_text("Введите ваш номер телефона:")
    
    elif stage == 'phone':
        context.user_data['phone'] = update.message.text
        context.user_data['application_stage'] = 'message'
        await update.message.reply_text("Опишите ваш проект или оставьте сообщение:")
    
    elif stage == 'message':
        context.user_data['message'] = update.message.text
        # Here you would typically save the application to a database
        
        # Send confirmation to user
        await update.message.reply_text(
            "✅ Спасибо за заявку! Мы свяжемся с вами в ближайшее время.\n\n"
            f"Ваши данные:\n"
            f"Имя: {context.user_data['name']}\n"
            f"Телефон: {context.user_data['phone']}\n"
            f"Сообщение: {context.user_data['message']}"
        )
        
        # Clear application data
        context.user_data.clear()
        
        # Return to main menu
        keyboard = [
            [InlineKeyboardButton("🏠 Вернуться в главное меню", callback_data="main_menu")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text("Выберите дальнейшее действие:", reply_markup=reply_markup)

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle button presses."""
    query = update.callback_query
    await query.answer()
    
    if query.data == "main_menu":
        await start(update, context)
    elif query.data == "projects":
        await projects(update, context)
    elif query.data == "services":
        await services(update, context)
    elif query.data == "contacts":
        await contacts(update, context)
    elif query.data == "application":
        await application(update, context)
    elif query.data.startswith("project_"):
        # Handle specific project information
        project_info = {
            "forenta": "🏠 Проект 'Форэнта'\n\nПросторный каркасный дом\nПлощадь: 200 м²\nЦена: 28 000 000 ₽",
            "luronium": "🏠 Проект 'Лурониум'\n\nСовременный каркасный дом\nПлощадь: 180 м²\nЦена: 21 000 000 ₽",
            "micrus": "🏠 Проект 'Микрус'\n\nКомпактный каркасный дом\nПлощадь: 150 м²\nЦена: 19 000 000 ₽"
        }
        project_name = query.data.split("_")[1]
        keyboard = [[InlineKeyboardButton("◀️ Назад к проектам", callback_data="projects")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await query.message.edit_text(project_info.get(project_name, "Информация о проекте недоступна"), reply_markup=reply_markup)

def main() -> None:
    """Start the bot."""
    # Create the Application and pass it your bot's token
    application = Application.builder().token(os.getenv("TELEGRAM_BOT_TOKEN")).build()

    # Command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("projects", projects))
    application.add_handler(CommandHandler("services", services))
    application.add_handler(CommandHandler("contacts", contacts))
    application.add_handler(CommandHandler("application", application))

    # Button handler
    application.add_handler(CallbackQueryHandler(button_handler))

    # Message handler for application form
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_application_input))

    # Start the Bot
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main() 