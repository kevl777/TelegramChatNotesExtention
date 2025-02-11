// Функция для извлечения ID чата из URL
function getChatIdFromURL() {
  const hash = window.location.hash;
  if (hash.startsWith("#")) {
    return hash.substring(1); // Убираем #
  }
  return null;
}

// Отправка ID чата в локальное хранилище
function updateChatId() {
  const chatId = getChatIdFromURL();
  if (chatId) {
    chrome.storage.local.set({ currentChatId: chatId }, () => {
      console.log("Chat ID обновлён:", chatId);
    });
  }
}

// Наблюдение за изменениями DOM
const observer = new MutationObserver(() => {
  updateChatId(); // Проверяем и обновляем ID чата
});

// Настройка наблюдателя для отслеживания изменений страницы
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Инициализация
document.addEventListener("DOMContentLoaded", updateChatId);
