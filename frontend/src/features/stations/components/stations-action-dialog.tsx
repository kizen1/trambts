'use client'

import { useLayoutEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { zodResolver } from '@hookform/resolvers/zod'
import { XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MultiImageUpload } from '@/components/multi-image-upload'
import { SelectDropdown } from '@/components/select-dropdown'
import {
  chuDauTuTypes,
  loaiTruTypes,
  phongMayTypes,
  tramCoTypes,
} from '../data/data'
import { Station } from '../data/schema'
import {
  useCreateStation,
  useDeleteStationImage,
  useUpdateStation,
} from '../hooks/stations-hooks'

const formSchema = z.object({
  maTram: z.string().min(1, { message: 'Mã Trạm không được trống.' }),
  nhanVienQuanLy: z
    .string()
    .min(1, { message: 'Nhân viên quản lý không được trống.' }),
  diaChi: z.string().min(1, { message: 'Địa chỉ không được trống.' }),
  maKhoa: z.string().min(1, { message: 'Mã khóa không được trống.' }),
  sdt: z
    .string()
    .min(1, { message: 'Số điện thoại không được trống.' })
    .regex(/^0\d{9}$/, {
      message: 'Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số.',
    }),
  thongTinCap: z
    .string()
    .min(1, { message: 'Thông tin cáp không được trống.' }),
  ghiChu: z.string(),
  tramCo: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Vui lòng chọn ít nhất sóng trạm.',
  }),
  loaiTru: z.string().min(1, { message: 'Loại trụ không được trống.' }),
  chuDauTu: z.string().min(1, { message: 'Chủ đầu tư không được trống.' }),
  phongMay: z.string().min(1, { message: 'Phòng máy không được trống.' }),
  maPE: z.string().min(1, { message: 'Mã PE không được trống.' }),
  toaDo: z
    .string()
    .min(1, { message: 'Tọa độ không được trống.' })
    .url({ message: 'Tọa độ phải là một đường dẫn hợp lệ.' }),
  hinhAnh: z.any(),
  isEdit: z.boolean(),
})
export type StationForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Station
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StationsActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const isEdit = !!currentRow
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState(currentRow?.hinhAnh ?? [])

  // Mutations
  const createStation = useCreateStation()
  const updateStation = isEdit ? useUpdateStation(currentRow?.id) : null
  const deleteImage = useDeleteStationImage(currentRow?.id)

  const form = useForm<StationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          hinhAnh: [],
          isEdit,
        }
      : {
          maTram: '',
          nhanVienQuanLy: '',
          diaChi: '',
          maKhoa: '',
          sdt: '',
          thongTinCap: '',
          ghiChu: '',
          tramCo: [],
          loaiTru: '',
          chuDauTu: '',
          phongMay: '',
          maPE: '',
          toaDo: '',
          hinhAnh: [],
          isEdit,
        },
  })

  const onSubmit = (values: StationForm) => {
    if (isEdit && updateStation) {
      updateStation.mutate(values)
    } else {
      createStation.mutate(values)
    }

    form.reset()
    // showSubmittedData(values)
    onOpenChange(false)
  }

  useLayoutEffect(() => {
    setImages(currentRow?.hinhAnh ?? [])
  }, [currentRow])

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? 'Sửa trạm' : 'Thêm trạm'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Cập nhật trạm. ' : 'Tạo trạm mới. '}
            Nhấn lưu khi sửa xong.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[70vh] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='maTram'
                render={({ field }) => (
                  <FormItem className='items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Mã Trạm</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='nhanVienQuanLy'
                render={({ field }) => (
                  <FormItem className='items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Nhân viên quản lý</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='diaChi'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='maKhoa'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Mã khóa</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sdt'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>SĐT liên hệ</FormLabel>
                    <FormControl>
                      <Input placeholder='0912345678' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='thongTinCap'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Thông tin cáp</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='ghiChu'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tramCo'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Trạm có</FormLabel>
                    <FormControl>
                      <div className='flex flex-wrap gap-2'>
                        {tramCoTypes.map((item) => (
                          <div
                            key={item}
                            className='flex items-center space-x-2'
                          >
                            <Checkbox
                              id={item}
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, item])
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  )
                                }
                              }}
                            />
                            <label htmlFor={item} className='text-sm'>
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='loaiTru'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Loại trụ</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Chọn loại trụ'
                      className='w-full'
                      items={loaiTruTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='chuDauTu'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Chủ đầu tư</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Chọn chủ đầu tư trụ'
                      className='w-full'
                      items={chuDauTuTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phongMay'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Phòng máy</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Chọn phòng máy'
                      className='w-full'
                      items={phongMayTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='maPE'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Mã PE</FormLabel>
                    <FormControl>
                      <Input placeholder='' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='toaDo'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Tọa độ</FormLabel>
                    <div className='flex items-center gap-2'>
                      <FormControl>
                        <Input placeholder='' {...field} />
                      </FormControl>
                      <Button type='button' asChild>
                        <a href={currentRow?.toaDo} target='_blank'>
                          Truy cập
                        </a>
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='hinhAnh'
                render={({ field }) => (
                  <FormItem className='space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel>Hình ảnh</FormLabel>
                    <MultiImageUpload
                      defaultFiles={field.value}
                      onFilesChange={field.onChange}
                    />
                    {isEdit && (
                      <div className='grid grid-cols-3 gap-2'>
                        {images.map(({ filename, path }, index) => (
                          <Dialog
                            key={filename}
                            onOpenChange={(open) =>
                              !open && setSelectedImage(null)
                            }
                          >
                            <DialogTrigger asChild>
                              <div className='relative'>
                                <img
                                  src={path}
                                  alt={`Image ${index}`}
                                  className='h-20 w-full cursor-pointer rounded object-cover hover:opacity-50 lg:h-32'
                                  onClick={() => setSelectedImage(path)}
                                />
                                <div
                                  className="bg-accent hover:text-muted-foreground absolute top-1 right-1 cursor-pointer rounded-full p-1 opacity-70 transition-opacity hover:opacity-100 [&_svg:not([class*='size-'])]:size-4"
                                  onClick={() => {
                                    if (filename) {
                                      deleteImage.mutate(filename, {
                                        onSuccess: () => {
                                          setImages((prev) =>
                                            prev.filter(
                                              (img) => img.filename !== filename
                                            )
                                          )
                                        },
                                      })
                                    }
                                  }}
                                >
                                  <XIcon />
                                  <span className='sr-only'>Close</span>
                                </div>
                              </div>
                            </DialogTrigger>
                            <DialogContent className='w-max p-0'>
                              <VisuallyHidden>
                                <DialogTitle>Ảnh trạm</DialogTitle>
                                <DialogDescription>
                                  {filename}
                                </DialogDescription>
                              </VisuallyHidden>
                              {selectedImage && (
                                <img
                                  src={selectedImage}
                                  alt={selectedImage}
                                  className='max-h-screen rounded'
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form'>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
