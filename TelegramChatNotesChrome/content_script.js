// Функция для извлечения ID чата из URL
function getChatIdFromURL() {
  const hash = window.location.hash; // Получаем хэш из URL
  if (hash.startsWith("#")) {
    return hash.substring(1); // Убираем символ #
  }
  return null;
}

// Функция для обновления ID чата
function updateChatId() {
  const chatId = getChatIdFromURL();
  if (chatId) {
    chrome.storage.local.set({ currentChatId: chatId }, () => {
      console.log("Chat ID сохранён:", chatId);
    });
  }
}

// Наблюдатель для отслеживания изменений в URL
window.addEventListener("hashchange", updateChatId);

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", updateChatId);
