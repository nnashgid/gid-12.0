document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#route-form');
  const output = document.querySelector('#route-result');
  const status = document.querySelector('#route-status');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const routeData = {
      days: formData.get('days'),
      start: formData.get('start'),
      activity: formData.get('activity'),
      interests: formData.getAll('interests'),
      level: formData.get('level'),
      group: formData.get('group')
    };

    if (!window.CLAUDE_API_KEY || window.CLAUDE_API_KEY === 'YOUR_KEY_HERE') {
      status.textContent = 'CLAUDE_API_KEY не найден. Скопируй config.example.js в config.js и добавь ключ.';
      status.classList.add('error');
      return;
    }

    status.textContent = 'Генерируем маршрут...';
    status.classList.remove('error');
    output.innerHTML = '<p>Пожалуйста, подожди. Запрос отправлен к Claude API.</p>';

    try {
      const result = await generateRoute(routeData);
      output.innerHTML = `<div class="route-result">${result.replace(/\n/g, '<br>')}</div>`;
      status.textContent = 'Маршрут готов.';
    } catch (error) {
      output.innerHTML = '<p>Не удалось получить ответ от сервера. Проверь ключ и соединение.</p>';
      status.textContent = 'Ошибка генерации маршрута.';
      status.classList.add('error');
      console.error(error);
    }
  });
});

async function generateRoute(formData) {
  const prompt = `Ты эксперт по экотуризму Нижегородской области.\nСоставь подробный маршрут по следующим параметрам:\n- Дней: ${formData.days}\n- Старт: ${formData.start}\n- Активность: ${formData.activity}\n- Интересы: ${formData.interests.join(', ')}\n- Уровень: ${formData.level}\n- Группа: ${formData.group}\n\nИспользуй только реальные места Нижегородской области из этого списка:\nКерженский заповедник, Воскресенское Поветлужье, Пустынский заказник, Артемовские луга, Эко-тропа «Нижний-800», Ичалковские пещеры, Река Ветлуга, Моховые горы, Нацпарк «Нижегородское Поволжье», Зелёный город.\n\nФормат ответа: маршрут по дням с временем, расстоянием, описанием каждой точки, советами по снаряжению и питанию. Пиши живо и вдохновляюще, по-русски.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.CLAUDE_API_KEY}`
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return data?.completion?.content?.[0]?.text || data?.message?.content?.[0]?.text || data?.content?.[0]?.text || 'Ответ от Claude API неполный.';
}
