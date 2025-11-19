'use client'

import { ProviderProps, useCallback, useMemo, useState, useTransition } from "react"
import { Loader } from "@/ui";
import { domAnimation, LazyMotion } from "framer-motion";
import { AuthContext } from "./context";
import { dispatchAuthAction, FormState } from "@/app/actions";

export function AuthProvider({children}: ProviderProps<undefined>) {
  const [state, setState] = useState<FormState>({
    type: 'login',
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    code: { value: '', error: '', purpose: 'password_reset' }
  })
  const [pending, startTransition] = useTransition()
  const activeType = useMemo(() => state.type, [state.type])
  const setActiveType = useCallback((type: FormState['type']) => {
    setState(state => ({...state, type}))
  }, [])

  const isReadyForSubmit = useCallback((type: FormState['type']) => {
    const isEmailValid = state.email.error === '' && state.email.value !== ''
    const isPasswordValid = state.password.error === '' && state.password.value !== ''
    if (type === 'verification') {
      const isCodeValid = state.code.value !== '' && state.code.error === ''
      return isEmailValid && isPasswordValid && isCodeValid
    }
    return isEmailValid && isPasswordValid
  }, [state])

  const submit = useCallback((type?: FormState['type']) => {
    if (!type || typeof type !== 'string') {
      type = activeType
    }
    const isReady = isReadyForSubmit(type)
    if (!isReady) {
      return
    }
    startTransition(async () => {
      dispatchAuthAction({...state, type}).then(setState)
    })
  }, [activeType, isReadyForSubmit, state])

  return <AuthContext.Provider value={{
    activeType, setActiveType,
    state, setState, submit
  }}>
    <LazyMotion features={domAnimation} strict>
      {children}
      <Loader open={pending} />
    </LazyMotion>
  </AuthContext.Provider>
  
}