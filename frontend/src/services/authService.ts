import { SignInFormType } from '@/features/auth/sign-in/components/user-auth-form'
import { SignUpFormType } from '@/features/auth/sign-up/components/sign-up-form'
import { SignInInterface } from '@/features/auth/types'
import { api } from '.'

export const authService = {
  register: async (data: SignUpFormType): Promise<void> => {
    await api.post('/auth/register', data)
  },

  login: async (data: SignInFormType): Promise<SignInInterface> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },
}
