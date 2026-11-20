function createLateralControls(move) {
  const held = new Map();
  let timer;

  function repeat() {
    const direction = Array.from(held.values()).pop();
    move(direction);
    timer = setTimeout(repeat, 42);
  }

  function clear() {
    clearTimeout(timer);
    held.clear();
  }

  window.addEventListener('blur', clear);
  document.addEventListener('keyup', event => {
    if (!held.delete(event.code)) return;
    if (!held.size) clear();
  });

  return {
    press(event, direction) {
      if (event.repeat || held.has(event.code)) return;
      held.set(event.code, direction);
      clearTimeout(timer);
      move(direction);
      timer = setTimeout(repeat, 105);
    },
    clear
  };
}
