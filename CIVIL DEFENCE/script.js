// STATES ARRAY
const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue",
  "Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT - Abuja"
];

// Populate dropdown if exists
const stateSelect = document.getElementById("state");
if(stateSelect){
  states.forEach(state => {
      let option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
  });
}

// FORM SUBMISSION
const regForm = document.getElementById("regForm");
if(regForm){
  regForm.addEventListener("submit", function(e){
      e.preventDefault();

      let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

      let data = {
          fullname: document.getElementById("fullname").value,
          replacementNo: document.getElementById("replacementNo").value,
          state: document.getElementById("state").value,
          lga: document.getElementById("lga").value,
          nextOfKin: document.getElementById("nok").value,
          email: document.getElementById("email").value,
          address: document.getElementById("address").value,
          qualification: document.getElementById("qualification").value,
          status: "Pending"
      };

      volunteers.push(data);
      localStorage.setItem("volunteers", JSON.stringify(volunteers));

      document.getElementById("msg").innerText = "Application submitted successfully!";
      this.reset();
  });
}

// ADMIN FUNCTIONS
function loadAdminTable(){
  let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
  let tbody = document.getElementById("adminData");
  if(!tbody) return;

  tbody.innerHTML = "";
  volunteers.forEach((v,i)=>{
      tbody.innerHTML += `
      <tr>
          <td>${v.fullname}</td>
          <td>${v.replacementNo}</td>
          <td>${v.state}</td>
          <td>${v.lga}</td>
          <td>${v.nextOfKin}</td>
          <td>${v.email}</td>
          <td>${v.address}</td>
          <td>${v.qualification}</td>
          <td class="${v.status.toLowerCase()}">${v.status}</td>
          <td>
              <button onclick="updateStatus(${i},'Approved')" class="btn">Approve</button>
              <button onclick="updateStatus(${i},'Rejected')" class="btn">Reject</button>
          </td>
      </tr>`;
  });
}

function updateStatus(index, status){
  let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
  volunteers[index].status = status;
  localStorage.setItem("volunteers", JSON.stringify(volunteers));
  loadAdminTable();
}

// DASHBOARD TABLE
function loadDashboardTable(){
  let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
  let tbody = document.getElementById("dashboardData");
  if(!tbody) return;

  tbody.innerHTML = "";
  volunteers.forEach(v=>{
      tbody.innerHTML += `
      <tr>
          <td>${v.fullname}</td>
          <td>${v.replacementNo}</td>
          <td class="${v.status.toLowerCase()}">${v.status}</td>
      </tr>`;
  });
}

// LOAD TABLES IF PAGES EXIST
document.addEventListener("DOMContentLoaded", ()=>{
  loadAdminTable();
  loadDashboardTable();
});
