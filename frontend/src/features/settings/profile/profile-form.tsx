import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Loading from '@/components/loading'
import { getCurrentUser } from '@/features/auth/helpers/auth'
import { useUpdateUser, useUser } from '@/features/users/hooks/users-hooks'

const profileFormSchema = z.object({
  hoTen: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  sdt: z.string(),
  diaChi: z.string(),
  ghiChu: z.any(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileForm() {
  const currentUser = getCurrentUser()
  const { data: userUpdated, isPending } = useUser(currentUser.id)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    if (userUpdated) {
      form.reset({
        hoTen: userUpdated.hoTen || '',
        sdt: userUpdated.sdt || '',
        diaChi: userUpdated.diaChi || '',
        ghiChu: userUpdated.ghiChu || '',
      })
    }
  }, [userUpdated, form])

  const updateUser = useUpdateUser(currentUser?.id)

  if (isPending) <Loading />

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => updateUser.mutate(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='hoTen'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder='Nguyễn Văn Đồng' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='sdt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder='0123456789' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='diaChi'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder='123 Pham Văn Đồng, Thủ Đức' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='ghiChu'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Input placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending || !form.formState.isDirty}>
          {isPending ? 'Updating...' : 'Update profile'}
        </Button>
      </form>
    </Form>
  )
}
