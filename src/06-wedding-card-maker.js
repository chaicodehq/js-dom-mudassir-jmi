/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  if (!containerElement) return null;

  const handleClick = (e) => {
    const removeBtn = e.target.closest('.remove-btn');
    if (removeBtn) {
      const guestItem = removeBtn.closest('.guest-item');
      if (guestItem) {
        guestItem.remove();
      }
    }
  };

  containerElement.addEventListener('click', handleClick);

  return {
    addGuest: (name, side) => {
      if (!name || !side) return null;
      const guestItem = document.createElement('div');
      guestItem.className = 'guest-item';
      guestItem.dataset.name = name;
      guestItem.dataset.side = side;

      const span = document.createElement('span');
      span.textContent = name;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.textContent = 'Remove';

      guestItem.appendChild(span);
      guestItem.appendChild(removeBtn);
      containerElement.appendChild(guestItem);

      return guestItem;
    },

    removeGuest: (name) => {
      if (!name) return false;
      const guestItem = containerElement.querySelector(`.guest-item[data-name="${name}"]`);
      if (guestItem) {
        guestItem.remove();
        return true;
      }
      return false;
    },

    getGuests: () => {
      const guests = [];
      const items = containerElement.querySelectorAll('.guest-item');
      items.forEach(item => {
        const name = item.dataset.name;
        const side = item.dataset.side;
        if (name && side) {
          guests.push({ name, side });
        }
      });
      return guests;
    }
  };
}

export function setupThemeSelector(containerElement, previewElement) {
  if (!containerElement || !previewElement) return null;

  const themes = ['traditional', 'modern', 'royal'];

  themes.forEach(theme => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.textContent = theme;
    btn.dataset.theme = theme;
    containerElement.appendChild(btn);
  });

  const handleClick = (e) => {
    const btn = e.target.closest('.theme-btn');
    if (btn) {
      const theme = btn.dataset.theme;
      previewElement.className = theme;
      previewElement.dataset.theme = theme;
    }
  };

  containerElement.addEventListener('click', handleClick);

  return {
    getTheme: () => {
      return previewElement.dataset.theme || null;
    }
  };
}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null;

  const handleClick = (e) => {
    const editable = e.target.closest('[data-editable]');
    
    // Remove editing from any currently editing element
    const currentlyEditing = cardElement.querySelector('.editing');
    if (currentlyEditing) {
      currentlyEditing.classList.remove('editing');
      currentlyEditing.contentEditable = 'false';
    }

    if (editable) {
      editable.contentEditable = 'true';
      editable.classList.add('editing');
    }
    // If clicked on cardElement itself (not editable child), just clear editing
  };

  cardElement.addEventListener('click', handleClick);

  return {
    getContent: (field) => {
      if (!field) return null;
      const element = cardElement.querySelector(`[data-editable="${field}"]`);
      return element ? element.textContent : null;
    }
  };
}
