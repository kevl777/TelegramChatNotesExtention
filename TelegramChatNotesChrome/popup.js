document.addEventListener("DOMContentLoaded", () => {
  const chatIdElement = document.getElementById("chat-id");
  const noteElement = document.getElementById("note");
  const editButton = document.getElementById("edit");
  const saveButton = document.getElementById("save");
  const previewElement = document.getElementById("preview");

  noteElement.disabled = true;

  // Загрузка ID чата и заметки
  chrome.storage.local.get(["currentChatId", "notes"], (data) => {
    const chatId = data.currentChatId || "Неизвестно";
    chatIdElement.textContent = `ID чата: ${chatId}`;

    if (chatId !== "Неизвестно") {
      const notes = data.notes || {};
      const note = notes[chatId] || "";
      noteElement.value = note;
      previewElement.innerHTML = note; // Отображаем HTML-теги
    }
  });

  // Редактирование
  editButton.addEventListener("click", () => {
    noteElement.disabled = false;
    noteElement.focus();
  });

  // Сохранение
  saveButton.addEventListener("click", () => {
    const chatId = chatIdElement.textContent.replace("ID чата: ", "");
    if (chatId === "Неизвестно") {
      alert("ID чата не найден.");
      return;
    }

    const note = noteElement.value;

    chrome.storage.local.get("notes", (data) => {
      const notes = data.notes || {};
      notes[chatId] = note;

      chrome.storage.local.set({ notes }, () => {
        alert("Заметка сохранена.");
        noteElement.disabled = true;
        previewElement.innerHTML = note; // Отображаем HTML-теги
      });
    });
  });
});
