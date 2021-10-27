const getUsers = async (number) => {
  const response = await fetch(`https://randomuser.me/api/?results=${number}`);
  try {
    const data = await response.json();
    data.results.forEach((user) => fillOne(user));
  } catch (error) {
    console.error(error);
  }
};

const cardsElement = document.querySelector("#cards");
const fillOne = (user) => {
  cardsElement.innerHTML =
    cardsElement.innerHTML +
    `<glass-card name="${user.name.first} ${user.name.last}" image="${
      user.picture.medium
    }">
        <div slot="email">${user.email}</div>
        <div slot="phone">${normalizePhoneNumber(user.phone)}</div>
    </glass-card>`;
};

normalizePhoneNumber = (phone) => {
  // can be 1234567... or (123) 456... or 123 456... or (123)-456...
  let normalizedPhone = phone;

  if (normalizedPhone.split("-").length > 1) {
    normalizedPhone = normalizedPhone.split("-").join("");
  }

  if (normalizedPhone.split(" ").length > 1) {
    normalizedPhone = normalizedPhone.split(" ").join("");
  }

  if (normalizedPhone.indexOf("(") !== -1) {
    normalizedPhone =
      normalizedPhone.substring(1, normalizedPhone.indexOf(")")) +
      normalizedPhone.substring(normalizedPhone.indexOf(")") + 1);
  }

  return normalizedPhone;
};

getUsers(10);
