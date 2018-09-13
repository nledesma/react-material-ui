const base = process.env.API
const login = 'auth'
const inbox = 'inbox/received'
const sent = 'inbox/sent'
const draft = 'inbox/drafts'

export default {
  base: base,
  login: base + login,
  inbox: base + inbox,
  sent: base + sent,
  draft: base + draft
}
