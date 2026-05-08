const views = [...document.querySelectorAll('[data-view]')]
const targets = [...document.querySelectorAll('[data-view-target]')]

function setActiveView(name) {
  views.forEach((view) => {
    view.classList.toggle('view--active', view.dataset.view === name)
  })

  document.title = name === 'dashboard' ? 'LibraryHub Dashboard' : name === 'login' ? 'LibraryHub Login' : 'LibraryHub'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

targets.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveView(button.dataset.viewTarget)
  })
})

setActiveView('landing')
