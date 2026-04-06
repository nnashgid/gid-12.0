document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-buttons').forEach(container => {
    const buttons = container.querySelectorAll('button');
    const targetCards = document.querySelectorAll('.place-card, .event-card');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const query = button.textContent.trim();
        targetCards.forEach(card => {
          const badge = card.querySelector('.badge, .badge-pill');
          const category = badge ? badge.textContent.trim() : '';
          const visible = query === 'Все' || category.includes(query);
          card.style.display = visible ? '' : 'none';
        });
      });
    });
  });
});
