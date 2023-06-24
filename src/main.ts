import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplates from "./templates/ListTemplates";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplates.instance;

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.getElementById("newItem") as HTMLInputElement;

    const newEntryItem: string = input.value.trim();

    if (!newEntryItem.length) return;
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newEntryItem);
    fullList.addItem(newItem);
    template.render(fullList);
  });

  const clearItem = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItem.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
