const views = [...document.querySelectorAll('[data-view]')]
const viewButtons = [...document.querySelectorAll('[data-view-target]')]
const loginForm = document.querySelector('.auth-form')
const emailInput = loginForm?.querySelector('input[name="email"]')
const passwordInput = loginForm?.querySelector('input[name="password"]')
const messageBox = loginForm?.querySelector('.form-message')

const validCredentials = {
  email: 'reader@libraryhub.com',
  password: 'Library123!',
}

function setActiveView(name) {
  views.forEach((view) => {
    view.classList.toggle('view--active', view.dataset.view === name)
  })

  document.title =
    name === 'dashboard'
      ? 'LibraryHub Dashboard'
      : name === 'login'
        ? 'LibraryHub Login'
        : 'LibraryHub'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function showMessage(text, tone) {
  if (!messageBox) return

  messageBox.textContent = text
  messageBox.hidden = false
  messageBox.dataset.tone = tone
}

function clearMessage() {
  if (!messageBox) return

  messageBox.textContent = ''
  messageBox.hidden = true
  delete messageBox.dataset.tone
}

function getFieldValue(input) {
  return input?.value.trim() ?? ''
}

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const nextView = button.dataset.viewTarget

    if (nextView) {
      setActiveView(nextView)
    }
  })
})

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault()

  const email = getFieldValue(emailInput)
  const password = getFieldValue(passwordInput)

  if (!email || !password) {
    showMessage('Error: Please fill in both email and password.', 'error')
    return
  }

  const isValidLogin =
    email.toLowerCase() === validCredentials.email && password === validCredentials.password

  if (!isValidLogin) {
    showMessage('Error: Invalid email or password.', 'error')
    return
  }

  showMessage('Login Successful', 'success')
  setTimeout(() => {
    setActiveView('dashboard')
    clearMessage()
    if (loginForm instanceof HTMLFormElement) {
      loginForm.reset()
    }
  }, 600)
})

loginForm?.addEventListener('input', () => {
  if (messageBox?.dataset.tone === 'error') {
    clearMessage()
  }
})

setActiveView('landing')
