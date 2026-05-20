const form = document.getElementById('job-form');

const jobsContainer = document.getElementById('jobs-container');

const emptyState = document.getElementById('empty-state');

const toast = document.getElementById('toast');

const totalJobs = document.getElementById('total-jobs');

const interviewCount = document.getElementById('interview-count');

const pendingCount = document.getElementById('pending-count');

const rejectedCount = document.getElementById('rejected-count');

const searchInput = document.getElementById('search');

const ptBtn = document.getElementById('pt-btn');

const enBtn = document.getElementById('en-btn');

let currentLanguage = 'pt';

let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

/* TRANSLATIONS */

const text = {

  pt: {
    title: 'Aplicações de Emprego',
    subtitle: 'Gerencie suas oportunidades de forma organizada',
    total: 'Total',
    interviews: 'Entrevistas',
    pending: 'Pendentes',
    rejected: 'Rejeitados',
    formTitle: 'Nova Aplicação',
    company: 'Empresa',
    position: 'Cargo',
    add: 'Adicionar',
    search: 'Pesquisar aplicações...',
    emptyTitle: 'Nenhuma aplicação cadastrada',
    emptyText: 'Comece adicionando sua primeira oportunidade.',
    added: 'Aplicação adicionada com sucesso',
    delete: 'Excluir'
  },

  en: {
    title: 'Job Applications',
    subtitle: 'Track and manage your opportunities',
    total: 'Total',
    interviews: 'Interviews',
    pending: 'Pending',
    rejected: 'Rejected',
    formTitle: 'New Application',
    company: 'Company',
    position: 'Position',
    add: 'Add',
    search: 'Search applications...',
    emptyTitle: 'No applications yet',
    emptyText: 'Start tracking your opportunities.',
    added: 'Application added successfully',
    delete: 'Delete'
  }

};

/* LANGUAGE */

function updateLanguage() {

  document.getElementById('title').textContent =
    text[currentLanguage].title;

  document.getElementById('subtitle').textContent =
    text[currentLanguage].subtitle;

  document.getElementById('total-text').textContent =
    text[currentLanguage].total;

  document.getElementById('interview-text').textContent =
    text[currentLanguage].interviews;

  document.getElementById('pending-text').textContent =
    text[currentLanguage].pending;

  document.getElementById('rejected-text').textContent =
    text[currentLanguage].rejected;

  document.getElementById('form-title').textContent =
    text[currentLanguage].formTitle;

  document.getElementById('company').placeholder =
    text[currentLanguage].company;

  document.getElementById('position').placeholder =
    text[currentLanguage].position;

  document.getElementById('submit-btn').textContent =
    text[currentLanguage].add;

  document.getElementById('search').placeholder =
    text[currentLanguage].search;

  document.getElementById('empty-title').textContent =
    text[currentLanguage].emptyTitle;

  document.getElementById('empty-text').textContent =
    text[currentLanguage].emptyText;

  renderJobs();

}

ptBtn.addEventListener('click', () => {

  currentLanguage = 'pt';

  updateLanguage();

});

enBtn.addEventListener('click', () => {

  currentLanguage = 'en';

  updateLanguage();

});

/* SAVE */

function saveJobs() {

  localStorage.setItem('jobs', JSON.stringify(jobs));

}

/* TOAST */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {

    toast.classList.remove('show');

  }, 2500);

}

/* RENDER */

function renderJobs(filteredJobs = jobs) {

  jobsContainer.innerHTML = '';

  if (filteredJobs.length === 0) {

    emptyState.style.display = 'block';

  }

  else {

    emptyState.style.display = 'none';

  }

  filteredJobs.forEach((job, index) => {

    const card = document.createElement('div');

    card.classList.add('job-card');

    let statusClass = '';

    if (job.status === 'Pending') {
      statusClass = 'pending';
    }

    if (job.status === 'Interview') {
      statusClass = 'interview';
    }

    if (job.status === 'Rejected') {
      statusClass = 'rejected';
    }

    let translatedStatus = job.status;

    if (currentLanguage === 'pt') {

      if (job.status === 'Pending') {
        translatedStatus = 'Pendente';
      }

      if (job.status === 'Interview') {
        translatedStatus = 'Entrevista';
      }

      if (job.status === 'Rejected') {
        translatedStatus = 'Rejeitado';
      }

    }

    card.innerHTML = `
      <h3>${job.position}</h3>

      <p>${job.company}</p>

      <span class="status ${statusClass}">
        ${translatedStatus}
      </span>

      <button class="delete-btn" onclick="deleteJob(${index})">
        ${text[currentLanguage].delete}
      </button>
    `;

    jobsContainer.appendChild(card);

  });

  updateStats();

}

/* ADD */

form.addEventListener('submit', (e) => {

  e.preventDefault();

  const company = document.getElementById('company').value;

  const position = document.getElementById('position').value;

  const status = document.getElementById('status').value;

  jobs.push({
    company,
    position,
    status
  });

  saveJobs();

  renderJobs();

  form.reset();

  showToast(text[currentLanguage].added);

});

/* DELETE */

function deleteJob(index) {

  jobs.splice(index, 1);

  saveJobs();

  renderJobs();

}

/* SEARCH */

searchInput.addEventListener('input', () => {

  const value = searchInput.value.toLowerCase();

  const filtered = jobs.filter(job =>

    job.company.toLowerCase().includes(value) ||

    job.position.toLowerCase().includes(value)

  );

  renderJobs(filtered);

});

/* STATS */

function updateStats() {

  totalJobs.textContent = jobs.length;

  interviewCount.textContent =
    jobs.filter(job => job.status === 'Interview').length;

  pendingCount.textContent =
    jobs.filter(job => job.status === 'Pending').length;

  rejectedCount.textContent =
    jobs.filter(job => job.status === 'Rejected').length;

}

/* INIT */

updateLanguage();

renderJobs();