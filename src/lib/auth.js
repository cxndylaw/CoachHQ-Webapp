import { supabase } from './supabase'

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: window.location.origin }
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (!error && data?.session) {
    localStorage.setItem('coachHQ_session', JSON.stringify(data.session))
  }
  return { data, error }
}

export const signOut = async () => {
  localStorage.removeItem('coachHQ_session')
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      localStorage.setItem('coachHQ_session', JSON.stringify(session))
      callback(session.user)
    } else {
      localStorage.removeItem('coachHQ_session')
      callback(null)
    }
  })
}