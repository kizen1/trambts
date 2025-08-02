import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authService } from '@/services/authService'
import { toast } from 'sonner'

export function useRegister() {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Đăng ký thành công!')
    },
    onError: () => {
      toast.error('Đăng ký thất bại!')
    },
  })
}

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      toast.success('Đăng nhập thành công!')
      navigate({ to: '/stations' })
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const message = error?.response?.data?.error || 'Đăng nhập thất bại!'
      toast.error(message)
    },
  })
}
