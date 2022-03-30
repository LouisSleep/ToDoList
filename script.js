// Selectors
const text = document.querySelector(".AddText");
const buttonAdd = document.querySelector(".AddButton");
const TaskList = document.querySelector(".TaskList");
const PlaceHolder = document.querySelector(".placeholder");

const ListeDeTache = [];
load();
// function Add Task
function AddSomeTask(element) {
  // Create li
  const TaskTitle = document.createElement("li");
  TaskTitle.classList = "todo-li";
  TaskList.appendChild(TaskTitle);

  // Add value from input into todo-li

  const TextValue = document.createElement("p");
  TextValue.classList = "ContentLi";
  TextValue.innerText = element ?? text.value;
  TaskTitle.appendChild(TextValue);

  ListeDeTache.push(element ?? text.value);

  // Create Markbutton
  const ButtonMarkTask = document.createElement("button");
  ButtonMarkTask.classList = "MarkButton";
  ButtonMarkTask.innerHTML = '<i class="fa-solid fa-check"></i>';

  // Create Deletebutton
  const ButtonDeleteTask = document.createElement("button");
  ButtonDeleteTask.classList = "ButtonDelete";
  ButtonDeleteTask.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';

  //   Create Div

  const ContainButton = document.createElement("div");
  ContainButton.classList = "ContainButtons";

  ContainButton.appendChild(ButtonMarkTask);
  ContainButton.appendChild(ButtonDeleteTask);
  TaskTitle.appendChild(ContainButton);
  // Delete Button Action
  ButtonDeleteTask.addEventListener("click", Delete);

  // Checked Button Action
  ButtonMarkTask.addEventListener("click", checked);

  // Clear Input section
  text.value = "";

  if (ListeDeTache.length >= 1) {
    PlaceHolder.style.display = "none";
    console.log("none");
  }
  console.log(ListeDeTache.length);

  save();

  return TaskTitle;
}

// Save data en locastorage
function save() {
  // Ajoute un item dans le local storage en string --> JSON.stringify converti l'objet string
  localStorage.setItem(
    "Todo",
    JSON.stringify(
      //Transforme une itérable en liste
      Array.from(TaskList.children).map((element) => {
        return {
          name: element.innerText,
          state: element.classList.contains("checked"),
        };
      })
    )
  );
}

// Load data en localstorage

function load() {
  // Condition ternaire (condition ? si True : si False)
  const save =
    localStorage.getItem("Todo") !== null
      ? JSON.parse(localStorage.getItem("Todo"))
      : null;

  if (save !== null) {
    save.forEach((element) => {
      console.log(element);
      const AddElement = AddSomeTask(element.name);

      if (element.state) {
        checked({ target: AddElement.querySelector(".MarkButton") });
      }
    });
  }
}

function Delete(e) {
  const element = e.target;
  // delete element
  if (element.classList[0] === "ButtonDelete") {
    const Task = element.parentElement.parentElement;
    Task.classList.add("deleteAnimation");
    Task.addEventListener("transitionend", () => {
      Task.remove();
      save();
    });

    ListeDeTache.pop();
    console.log(ListeDeTache);

    if (ListeDeTache.length == 0) {
      PlaceHolder.style.display = "flex";
    }
  }
}

function checked(e) {
  const element = e.target;
  // checked element
  if (element.classList[0] === "MarkButton") {
    const Task = element.parentElement.parentElement;
    Task.classList.toggle("checked");
  }
  save();
}

// Press Enter to submit Task
text.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    buttonAdd.click();
    return false;
  }
});
