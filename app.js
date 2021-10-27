const getUsers = async (number) => {
  const response = await fetch(`https://randomuser.me/api/?results=${number}`);
  console.log("fetching");
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
        <div slot="phone">${user.phone.split("-").join("")}</div>
    </glass-card>`;
};

getUsers(10);
