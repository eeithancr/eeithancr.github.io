// Calendario interactivo
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const calendarBody = document.getElementById("calendar-body");
const fechaInput = document.getElementById("fechaSeleccionada");

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

months.forEach((m, i) => {
  let opt = new Option(m, i);
  monthSelect.appendChild(opt);
});

const currentYear = new Date().getFullYear();
for (let y = currentYear - 1; y <= currentYear + 1; y++) {
  let opt = new Option(y, y);
  yearSelect.appendChild(opt);
}

monthSelect.value = new Date().getMonth();
yearSelect.value = currentYear;

function generateCalendar(month, year) {
  calendarBody.innerHTML = "";
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.textContent = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.textContent = date;
        cell.addEventListener("click", () => {
          const selectedDate = new Date(year, month, date);
          fechaInput.value = selectedDate.toISOString().split("T")[0];

          document.querySelectorAll("td").forEach(td => td.classList.remove("selected"));
          cell.classList.add("selected");
        });

        date++;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

monthSelect.addEventListener("change", () => generateCalendar(+monthSelect.value, +yearSelect.value));
yearSelect.addEventListener("change", () => generateCalendar(+monthSelect.value, +yearSelect.value));

generateCalendar(+monthSelect.value, +yearSelect.value);

// Enviar formulario
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const mensaje = document.getElementById("mensaje").value;
  const fecha = document.getElementById("fechaSeleccionada").value;

  if (!fecha) {
    alert("Por favor, selecciona una fecha del calendario.");
    return;
  }

  const res = await fetch("http://localhost:3000/enviar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, telefono, mensaje, fecha })
  });

  const data = await res.json();
  if (res.ok) {
    alert("¡Mensaje enviado por SMS!");
    this.reset();
    fechaInput.value = "";
    document.querySelectorAll("td").forEach(td => td.classList.remove("selected"));
  } else {
    alert("Error al enviar: " + data.error);
  }
});
