class Form {

  constructor() {
    this.addPersonButton = document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-add"]')[0];

    this.deletePersonButton = document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-delete"]')[0];

    this.startDateInput = document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-start_date"]')[0];

    this.endDateInput = document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-end_date"]')[0];
    
    if (this.startDateInput) {
      this.startDateInput.addEventListener('change', this.startDateEventListener.bind(this));
    }

    if (this.addPersonButton) {
      this.addPersonButton.addEventListener('click', this.addPersonEventListener.bind(this));
    }

    if (this.deletePersonButton) {
      this.deletePersonButton.addEventListener('click', this.deletePersonEventListener.bind(this));
    }

    this.originalFieldset = document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-person-1"]')[0];

    document.querySelectorAll('[id^="crm-datenvertrieb"][id*="-person-"]').forEach(element => {
      const inputs = element.querySelectorAll("input, select, textarea");
      if (!Array.from(inputs).some(input => input.value.trim() !== "")) {
        element.remove();
      }
    });

    this.maxPerson = 4;

    this.countPerson = 0;
  }

  startDateEventListener(event) {
    var startDateValue = event.target.value;
    if (startDateValue) {
      var endDate = new Date(startDateValue);
      endDate.setFullYear(endDate.getFullYear() + 2);
     
      // take the leap year into consideration
      if (endDate.getMonth() !== new Date(startDateValue).getMonth()) {
        endDate.setDate(0);
      }

      this.endDateInput.value = endDate.toISOString().split("T")[0];
    }
  }

  addPersonEventListener(event) {
    event.preventDefault();
    const countFieldsets = document.querySelectorAll('fieldset[id*="-person-"]').length + 1;

    if (countFieldsets <= this.maxPerson) {
      const newFieldset = this.originalFieldset.cloneNode(true);
      newFieldset.querySelectorAll("input").forEach(element => {
        if (element.value) {
          element.setAttribute("value", "");
        }
      });

      this.changeIds(newFieldset, countFieldsets);

      document.querySelectorAll('[id^="crm-datenvertrieb"][id$="-personen"]')[0].insertBefore(newFieldset, this.addPersonButton);
    }

    if (countFieldsets == this.maxPerson) {
      event.target.style.display = "none";
    }
  }

  deletePersonEventListener(event) {
    event.preventDefault();
    event.target.parentElement.remove();
    const countFieldsets = document.querySelectorAll('fieldset[id*="-person-"]').length + 1;
    if (countFieldsets <= this.maxPerson) {
      this.addPersonButton.style = "block";
    }
    this.renewIds();
  }

  changeIds(element, id) {
    if (element instanceof HTMLFieldSetElement) {
      //element.id = element.id + "-" + id;
      element.id = element.id.replace(/(person).*\d?/, "$1-" + id);
      element.classList.add("active");
    }

    if (element instanceof HTMLLabelElement) {
      if (element.htmlFor.includes("vmgmt")) {
        element.htmlFor = element.htmlFor.replace(/(vmgmt.*)(\d)/, "$1" + id);
      }
    }

    if (element instanceof HTMLInputElement) {
      if (element.name.includes("vmgmt")) {
        element.name = element.name.replace(/(vmgmt.*)(\d)/, "$1" + id);
      }
      if (element.id.includes("vmgmt")) {
        element.id = element.id.replace(/(vmgmt.*)(\d)/, "$1" + id);
      }
    }

    if (element instanceof HTMLButtonElement) {
      element.addEventListener('click', this.deletePersonEventListener.bind(this));
    }

    if (element instanceof HTMLLegendElement) {
      //element.innerHTML = id + ". " + "Mitnutzende Person";
      element.innerHTML = element.innerHTML.replace(/\d+/g, id);
    }

    for (let child of element.children) {
      this.changeIds(child, id);
    }
  }

  renewIds() {
    const fieldsets = document.querySelectorAll('fieldset[id*="-person-"]');
    fieldsets.forEach((fieldset, index) => {
      this.changeIds(fieldset, index + 1);
    });
  }
}

export {
  Form
};
